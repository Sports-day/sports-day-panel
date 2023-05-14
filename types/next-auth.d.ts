import NextAuth, {DefaultSession, DefaultUser} from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import exp from "constants";


export type RoleType = "admin" | "user"

declare module "next-auth" {

    interface Session {
        user: {
            role: RoleType
            & DefaultSession["user"]
        }
        accessToken: string

    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: RoleType
        accessToken: string
            & DefaultUser
    }
}