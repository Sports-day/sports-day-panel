import type {NextPage} from 'next'
import {useSession} from "next-auth/react";
import Auth from './auth';
import Dashboard from './dashboard';

const Index: NextPage = () => {
    const {data: session} = useSession()
    if (session) {
        //  ログイン済み
        return <Dashboard />
    } else {
        //  ログイン待ち
        return <Auth />;
    }
}

export default Index