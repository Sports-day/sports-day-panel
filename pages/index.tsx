import type {NextPage} from 'next'
import {useSession} from "next-auth/react";
import Auth from './auth';
import Dashboard from './dashboard';
import Firstlogin from "./firstlogin";
const Index: NextPage = () => {
    const {data: session} = useSession()
    const firstlogin = false;
    if (session) {
        //  ログイン済み
        return (
            <>
                {firstlogin
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