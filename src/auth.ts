import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import authConfig from './auth.config'
import { updateOauthToken } from './lib/token'

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    signIn: async ({ account }) => {
      //Simple login by Provider Login
      if (account?.provider !== 'credentials') return true
      return false
    },
    jwt: async ({ token, account, user }) => {
      if (user) {
        token.id = user.id!
      }
      if (account) {
        token.provider = account.provider
        token.providerAccountId = account.providerAccountId
        token.refresh_token = account.refresh_token as string
        token.access_token = account.access_token!
        token.expires_at = account.expires_at!
        return token
      } else if (Date.now() < token.expires_at * 1000) {
        return token
      } else {
        // Need Update Token
        const newToken = await updateOauthToken(token)
        token.refresh_token = newToken.refresh_token
        token.access_token = newToken.access_token
        token.expires_at = newToken.expires_at
        return token
      }
    },
    session: async ({ session, token }) => {
      session.user.id = token.id
      if (token.expires_at && Date.now() > 1000 / Number(token.expires_at)) {
        // Need Update Token
        await updateOauthToken(token)
      }
      return {
        ...session,
        error: token.error,
      }
    },
  },
})
