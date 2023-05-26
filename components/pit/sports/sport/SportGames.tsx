import styles from "../../../../styles/Pit.module.scss";
import {Sport} from "../../../../src/models/SportModel";
import {SportGameList} from "./SportGameList";
import {useFetchSportGames} from "../../../../src/features/sports/hook";
import {Box, Button, CircularProgress} from "@mui/material";
import {useState} from "react";
import {GameForm} from "../games/GameForm";
import {CrossGameAutomaticMatchEditor} from "../games/automation/CrossGameAutomaticMatchEditor";

export function SportGames(props: { sport: Sport, refresh: VoidFunction }) {
    const {games, isFetching, refresh: refreshGames} = useFetchSportGames(props.sport.id)
    //  state
    const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false)
    const [isCrossGameEditorOpen, setIsCrossGameEditorOpen] = useState<boolean>(false)

    return (
        <>
            <div className={styles.content}>

                <h2>リーグ・トーナメント一覧</h2>

                <Button
                    variant="contained"
                    sx={{
                        position: "absolute",
                        right: "110px",
                        top: "20px",
                    }}
                    onClick={() => setIsCrossGameEditorOpen(true)}
                >
                    ゲーム間一括編集
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                    }}
                    onClick={() => setIsCreatorOpen(true)}
                >
                    作成
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
                        <SportGameList games={games}/>

                        <GameForm
                            isOpen={isCreatorOpen}
                            setClose={() => setIsCreatorOpen(false)}
                            formType={"create"}
                            refresh={() => {
                                refreshGames()
                                props.refresh()
                            }}
                            sportId={props.sport.id}
                        />

                        <CrossGameAutomaticMatchEditor
                            isOpen={isCrossGameEditorOpen}
                            setClose={() => setIsCrossGameEditorOpen(false)}
                            refresh={() => {
                                refreshGames()
                                props.refresh()
                            }}
                            games={games}
                        />
                    </>
                }

            </div>
        </>
    )
}