import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
import { updateOauthToken } from "./lib/token"

export const {handlers,
    signIn,
    signOut,
    auth,
    unstable_update: update } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        signIn: async ({ account }) => {
            //Simple login by Provider Login
            if (account?.provider !== "credentials") return true;
            return false
        },
        jwt: async ({token, account}) => {
            if(account) {
                token.provider = account.provider;
                token.providerAccountId = account.providerAccountId;
                token.refresh_token = account.refresh_token as string;
                token.access_token = account.access_token!;
                token.expires_at = account.expires_at!;
            }
            return token;
        },
        session: async ({session, token}) => {
            if(token.expires_at && Date.now() > 1000 / Number(token.expires_at)) {
              // Need Update Token
              await updateOauthToken(token);
            }
            return {
                ...session,
                error: token.error,
            }
        }
    }
})