import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    role: Role;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
        error?: "RefreshTokenError"
    }
}
   
declare module "next-auth/jwt" {
    interface JWT {
      access_token: string
      expires_at: number
      refresh_token?: string
      error?: "RefreshTokenError"
    }
}