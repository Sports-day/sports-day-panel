import styles from "../../../../styles/Pit.module.scss";
import {Box, Button, CircularProgress} from "@mui/material";
import {useContext, useState} from "react";
import {GameEntryList} from "./GameEntryList";
import {GameEntryForm} from "./GameEntryForm";
import {EntriesContext, GameContext} from "../../context";

export function GameEntries(props: {isFetching: boolean}) {
    const {data: game, refresh} = useContext(GameContext)
    const {data: teams, refresh: refreshTeams} = useContext(EntriesContext)
    //  state
    const [isAppendEntry, setIsAppendEntry] = useState<boolean>(false)

    return (
        <>
            <div className={styles.content}>
                <h2>エントリー一覧</h2>

                <Button
                    variant="contained"
                    sx={{
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                    }}
                    onClick={() => setIsAppendEntry(true)}
                >
                    追加
                </Button>

                {props.isFetching ?
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
                        <GameEntryList
                            gameId={game.id}
                            entries={teams}
                            refresh={refreshTeams}
                        />

                        <GameEntryForm
                            isOpen={isAppendEntry}
                            setClose={() => setIsAppendEntry(false)}
                            refresh={refreshTeams}
                            entryIds={
                                teams.map(team => team.id)
                            }
                            gameId={game.id}
                        />
                    </>
                }
            </div>
        </>
    )
}