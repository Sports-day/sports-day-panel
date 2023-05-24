import {GetServerSidePropsContext, NextPage} from "next";
import {useSession} from "next-auth/react";
import {PitDashboard} from "../../../../../../components/pit/PitDashboard";
import {GamePanel} from "../../../../../../components/pit/sports/games/GamePanel";

type Props = {
    sportId: number
    gameId: number
}

const AdminGameId: NextPage<Props> = (props: Props) => {
    const {data: session} = useSession({
        required: true
    })

    if (session && session.user.role == "admin") {
        return (
            <>
                <PitDashboard>
                    <GamePanel id={props.gameId}/>
                </PitDashboard>
            </>
        )
    } else {
        return null
    }
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    if (!context.query.sportId || !context.query.gameId) {
        return {
            notFound: true,
        }
    }
    const sportId = +context.query.sportId
    const gameId = +context.query.gameId

    if (isNaN(sportId) || isNaN(gameId)) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            sportId: sportId,
            gameId: gameId
        }
    }
}


export default AdminGameId