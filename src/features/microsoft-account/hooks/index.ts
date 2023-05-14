import {MicrosoftAccount, microsoftAccountFactory} from "../../../models/MicrosoftAccountModel";
import {useState} from "react";
import {useAsync} from "react-use";
import {useSession} from "next-auth/react";

export const useFetchMicrosoftAccounts = () => {
    const [microsoftAccounts, setMicrosoftAccounts] = useState<MicrosoftAccount[]>([])
    const [isFetching, setIsFetching] = useState(true)

    useAsync(async () => {
        try {
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
    }
}

export const useFetchMicrosoftAccount = (microsoftAccountId: number  | "me") => {
    const [microsoftAccount, setMicrosoftAccount] = useState<MicrosoftAccount>()
    const [isFetching, setIsFetching] = useState(true)

    useAsync(async () => {
        try {
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
    }
}