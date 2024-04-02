import type {NextPage} from 'next'
import {useSession} from "next-auth/react";
import Auth from './auth';
import Dashboard from './dashboard';
import {useFetchMicrosoftAccount} from "../src/features/microsoft-account/hooks";
import {MicrosoftAccountContext} from "../components/context";

const Index: NextPage = () => {
    const {data: session} = useSession()
    const {microsoftAccount, isFetching} = useFetchMicrosoftAccount("me")

    if (session && !isFetching) {
        //  ログイン済み
        return (
            <>
                <MicrosoftAccountContext.Provider
                    value={{
                        //  @ts-ignore
                        data: microsoftAccount,
                        refresh: () => {
                        }
                    }}
                >
                    <Dashboard/>
                </MicrosoftAccountContext.Provider>
            </>
        )
    } else {
        //  ログイン待ち
        return <Auth/>;
    }
}

export default Index