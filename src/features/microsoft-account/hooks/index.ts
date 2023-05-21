import {MicrosoftAccount, microsoftAccountFactory} from "../../../models/MicrosoftAccountModel";
import {useState} from "react";
import {useAsyncRetry} from "react-use";

export const useFetchMicrosoftAccounts = () => {
    const [microsoftAccounts, setMicrosoftAccounts] = useState<MicrosoftAccount[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await microsoftAccountFactory().index();
            setMicrosoftAccounts(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        microsoftAccounts: microsoftAccounts,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

export const useFetchMicrosoftAccount = (microsoftAccountId: number  | "me") => {
    const [microsoftAccount, setMicrosoftAccount] = useState<MicrosoftAccount>()
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await microsoftAccountFactory().show(microsoftAccountId);
            setMicrosoftAccount(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        microsoftAccount: microsoftAccount,
        isFetching: isFetching,
        refresh: state.retry,
    }
}