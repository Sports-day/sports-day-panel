import {useRouter} from "next/router";
import styles from "../../../../styles/Pit.module.scss";
import {Box, CircularProgress, Divider} from "@mui/material";
import {useFetchGame} from "../../../../src/features/games/hook";
import {GameProfile} from "./GameProfile";
import {GameEntries} from "./GameEntries";
import {LeagueController} from "./league/LeagueController";
import {TournamentController} from "./tournament/TournamentController";

export function GamePanel(props: { id: number }) {
    //  router
    const router = useRouter()
    //  fetch
    const {game, refresh, isFetching} = useFetchGame(props.id)


    if (!isFetching && !game) {
        //  404
        router.push("/404").then()
        return null
    }

    return (
        <>
            <div className={styles.content}>
                {isFetching ?
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: "100px",
                        }}
                    >
                        <CircularProgress/>
                    </Box>
                    :
                    <>
                        <h1>{game?.name}</h1>

                        {/*// @ts-ignore*/}
                        <GameProfile game={game} refresh={refresh} />

                        <Divider light />

                        {/*// @ts-ignore*/}
                        <GameEntries game={game} refresh={refresh} />

                        <Divider light />

                        {/* matches */}
                        { game?.type === "league" ?
                            <>
                                <h2>リーグ</h2>

                                {/* controller */}
                                <LeagueController game={game} refresh={refresh} />
                            </>
                            :
                            <>
                                <h2>トーナメント</h2>

                                {/* controller */}
                                {/*@ts-ignore*/}
                                <TournamentController game={game} refresh={refresh} />
                            </>
                        }
                    </>
                }
            </div>
        </>
    )
}