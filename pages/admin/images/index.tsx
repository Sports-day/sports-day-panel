import {NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {Images} from "../../../components/pit/images/Images";

const AdminImagesIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <Images />
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}


export default AdminImagesIndex