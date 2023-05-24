import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {Groups} from "../../../components/pit/groups/Groups";
import {Sports} from "../../../components/pit/sports/Sports";

const AdminSportIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Sports />
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}


export default AdminSportIndex