import {GetServerSidePropsContext, NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../../components/pit/PitDashboard";
import {SportPanel} from "../../../../components/pit/sports/sport/SportPanel";

type Props = {
    sportId: number
}

const AdminSportId: NextPage<Props> = (props: {sportId: number}) => {
    const {data: session} = useSession({
        required: true
    })


    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <SportPanel id={props.sportId} />
                </PitDashboard>
            </>
        )
    } else {
        return (<p>please login</p>)
    }
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    if (!context.query.sportId) {
        return {
            notFound: true,
        }
    }
    const id = +context.query.sportId

    if (isNaN(id)) {
        return {
            notFound: true,
        }
    }

    return {
        props: {sportId: id}
    }
}


export default AdminSportId