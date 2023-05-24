import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {Teams} from "../../../components/pit/teams/Teams";

const AdminTeamsIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Teams />
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}


export default AdminTeamsIndex