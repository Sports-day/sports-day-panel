import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {MicrosoftAccounts} from "../../../components/pit/microsoft-accounts/MicrosoftAccounts";

const AdminMicrosoftAccountsIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <MicrosoftAccounts />
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}


export default AdminMicrosoftAccountsIndex