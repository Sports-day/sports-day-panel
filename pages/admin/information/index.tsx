import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {InformationComponent} from "../../../components/pit/information/InformationComponent";

const AdminInformationIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <InformationComponent />
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}


export default AdminInformationIndex