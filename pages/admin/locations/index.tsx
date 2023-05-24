import {NextPage} from "next";
import {useSession} from "next-auth/react";
import { Locations } from "../../../components/pit/locations/Locations";
import {PitDashboard} from "../../../components/pit/PitDashboard";

const AdminLocationsIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Locations />
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}


export default AdminLocationsIndex