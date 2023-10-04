import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {Tags} from "../../../components/pit/tags/Tags";

const AdminSportIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Tags />
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}


export default AdminSportIndex