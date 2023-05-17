import {useRouter} from "next/router";
import styles from "../../../../styles/Pit.module.scss";
import {Box, CircularProgress, Divider} from "@mui/material";
import {useFetchGame, useFetchGameEntries} from "../../../../src/features/games/hook";
import {GameProfile} from "./GameProfile";
import {GameEntries} from "./GameEntries";
import {LeagueController} from "./league/LeagueController";
import {TournamentController} from "./tournament/TournamentController";
import {EntriesContext, GameContext} from "../../context";

export function GamePanel(props: { id: number }) {
    //  router
    const router = useRouter()
    //  fetch
    const {game, refresh, isFetching} = useFetchGame(props.id)
    const {teams: entries, isFetching: isFetchingEntries, refresh: refreshEntries} = useFetchGameEntries(props.id)


    if (!isFetching && !game) {
        //  404
        router.push("/404").then()
        return null
    }

    return (
        <>
            <GameContext.Provider
                value={{
                    // @ts-ignore
                    data: game,
                    refresh: refresh,
                }}
            >
                <EntriesContext.Provider
                    value={{
                        data: entries,
                        refresh: refreshEntries,
                    }}
                >
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

                                <GameProfile />

                                <Divider light/>

                                <GameEntries isFetching={isFetchingEntries}/>

                                <Divider light/>

                                {/* matches */}
                                {game?.type === "league" ?
                                    <>
                                        <h2>リーグ</h2>

                                        {/* controller */}
                                        <LeagueController />
                                    </>
                                    :
                                    <>
                                        <h2>トーナメント</h2>

                                        {/* controller */}
                                        {/*@ts-ignore*/}
                                        <TournamentController />
                                    </>
                                }
                            </>
                        }
                    </div>
                </EntriesContext.Provider>
            </GameContext.Provider>
        </>
    )
}