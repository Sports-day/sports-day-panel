import styles from "../../../../styles/Pit.module.scss";
import {Game} from "../../../../src/models/GameModel";
import {Box, Button, CircularProgress} from "@mui/material";
import {useState} from "react";
import {useFetchGameEntries} from "../../../../src/features/games/hook";
import {GameEntryList} from "./GameEntryList";
import {GameEntryForm} from "./GameEntryForm";

export function GameEntries(props: { game: Game, refresh: VoidFunction }) {
    const {teams, isFetching, refresh: refreshTeams} = useFetchGameEntries(props.game.id)
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
                        <GameEntryList
                            gameId={props.game.id}
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
                            gameId={props.game.id}
                        />
                    </>
                }
            </div>
        </>
    )
}