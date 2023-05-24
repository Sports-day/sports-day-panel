import {GetServerSidePropsContext, NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";
import {TeamPanel} from "../../../components/pit/teams/TeamPanel";

type Props = {
    id: number
}

const AdminTeamId: NextPage<Props> = ({id}) => {
    const {data: session} = useSession({
        required: true
    })


    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <TeamPanel id={id}/>
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    if (!context.query.id) {
        return {
            notFound: true,
        }
    }
    const id = +context.query.id

    if (isNaN(id)) {
        return {
            notFound: true,
        }
    }

    return {
        props: {id: id}
    }
}


export default AdminTeamId