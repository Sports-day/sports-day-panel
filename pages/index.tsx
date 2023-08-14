import type {NextPage} from 'next'
import Auth from './auth';
import Dashboard from './dashboard';
import {useFetchMicrosoftAccount} from "../src/features/microsoft-account/hooks";
import {MicrosoftAccountContext} from "../components/context";

export const runtime = 'edge';

const Index: NextPage = () => {
    const {microsoftAccount, isFetching} = useFetchMicrosoftAccount("me")

    if (!isFetching) {
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