import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {Matches} from "../../../components/pit/matches/Matches";

const AdminMatchesIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Matches />
                </PitDashboard>
            </>
        )
    } else {
        return (<p>please login</p>)
    }
}


export default AdminMatchesIndex