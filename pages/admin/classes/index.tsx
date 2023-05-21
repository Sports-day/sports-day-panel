import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {Classes} from "../../../components/pit/classes/Classes";

const AdminClassesIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Classes />
                </PitDashboard>
            </>
        )
    } else {
        return (<p>please login</p>)
    }
}


export default AdminClassesIndex