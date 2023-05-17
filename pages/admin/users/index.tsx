import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {Users} from "../../../components/pit/users/Users";

const AdminUsersIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Users />
                </PitDashboard>
            </>
        )
    } else {
        return (<p>please login</p>)
    }
}


export default AdminUsersIndex