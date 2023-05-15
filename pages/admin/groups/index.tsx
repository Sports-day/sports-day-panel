import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {Groups} from "../../../components/pit/Groups";

const AdminGroupsIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Groups />
                </PitDashboard>
            </>
        )
    } else {
        return (<p>please login</p>)
    }
}


export default AdminGroupsIndex