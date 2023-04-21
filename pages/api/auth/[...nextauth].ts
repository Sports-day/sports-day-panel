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
        async signIn({account}) {
            //  Request access to backend
            const baseRequest: RequestInit = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + account.id_token
                },
            }

            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/authorization", baseRequest)

            return response.status == 200
        },
        //  @ts-ignore
        async session({session, token}) {

            if (token) {
                // session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
                session.accessToken = token.accessToken
            }

            return session
        },
        //  @ts-ignore
        async jwt({token, profile, account}) {
            if (account && profile) {
                // token.id = "NO_ID"
                token.name = profile.name
                token.email = profile.email
                token.accessToken = account.id_token
            }
            return token
        }
    },
}

// @ts-ignore
export default NextAuth(authOptions)