import type {NextPage} from 'next'
import {useSession} from "next-auth/react";
import Auth from './auth';
import Dashboard from './dashboard';
import Firstlogin from "./firstlogin";
import {useFetchMicrosoftAccount} from "../src/features/microsoft-account/hooks";

const Index: NextPage = () => {
    const {data: session} = useSession()
    const {microsoftAccount, isFetching} = useFetchMicrosoftAccount("me")

    if (session && !isFetching) {
        //  ログイン済み
        return (
            <>
                {microsoftAccount?.userId === null && !microsoftAccount?.linkLater
                    ? <Firstlogin />
                    : <Dashboard />
                }
            </>
        )
    } else {
        //  ログイン待ち
        return <Auth />;
    }
}

export default Index