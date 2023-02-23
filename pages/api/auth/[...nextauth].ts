import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

export const authOptions = {
    providers: [
        AzureADProvider({
            // @ts-ignore
            clientId: process.env.AZUREAD_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.AZUREAD_CLIENT_SECRET,
            tenantId: process.env.AZUREAD_TENANT_ID,
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        //  @ts-ignore
        async signIn({user, account, profile, email, credentials}) {
            console.log("account", account)

            //  Request access to backend

            return true
        },
    },
}

// @ts-ignore
export default NextAuth(authOptions)