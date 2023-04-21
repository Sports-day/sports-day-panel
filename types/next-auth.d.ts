import NextAuth, {DefaultSession, DefaultUser} from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"


declare module "next-auth" {

    interface Session {
        user: DefaultSession["user"]
        accessToken: string

    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string
            & DefaultUser
    }
}