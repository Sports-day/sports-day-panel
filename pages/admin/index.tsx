import type {NextPage} from 'next'
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../components/pit/PitDashboard";
import {HowToUse} from "../../components/pit/HowToUse";


const AdminIndex: NextPage = () => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <HowToUse/>
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}

export default AdminIndex
