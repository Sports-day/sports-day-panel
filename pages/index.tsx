import type {NextPage} from 'next'
import {signIn, signOut, useSession} from "next-auth/react";

const Home: NextPage = () => {
    const {data: session} = useSession()

    if (session) {
        //  ログイン済み
        return (
            <>
                Signed in as {session.user?.name} <br/>
                {session.user?.email} <br/>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    } else {
        //  ログイン待ち
        return (
            <>
                Not signed in <br/>
                <button onClick={() => signIn("azure-ad", {callbackUrl: "/"})}>Sign in</button>
            </>
        )
    }
}

export default Home
