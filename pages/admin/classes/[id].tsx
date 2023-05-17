import {GetServerSidePropsContext, NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../components/pit/PitDashboard";

type Props = {
    id: number
}

const AdminClassId: NextPage<Props> = ({id}) => {
    const {data: session} = useSession({
        required: true
    })


    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <p>実装しなくちゃ</p>
                </PitDashboard>
            </>
        )
    } else {
        return (<p>please login</p>)
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


export default AdminClassId