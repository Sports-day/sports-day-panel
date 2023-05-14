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
            const response = await fetchMe(account.id_token)

            return response.status == 200
        },
        //  @ts-ignore
        async session({session, token}) {

            if (token) {
                // session.user.id = token.id
                session.user.role = token.role
                session.user.email = token.email
                session.user.name = token.name
                session.accessToken = token.accessToken
            }

            return session
        },
        //  @ts-ignore
        async jwt({token, profile, account}) {
            if (account && profile) {
                const res = await fetchMe(account.id_token)
                const data = await res.json()

                token.role = data.data.role
                token.name = profile.name
                token.email = profile.email
                token.accessToken = account.id_token
            }
            return token
        }
    },
}

const fetchMe = async (token: string) => {
    const baseRequest: RequestInit = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
    }

    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/authorization", baseRequest)
}

// @ts-ignore
export default NextAuth(authOptions)