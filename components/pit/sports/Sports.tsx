import styles from "../../../styles/Pit.module.scss";
import {useFetchSports} from "../../../src/features/sports/hook";
import {SportsContext} from "../context";
import {Box, Button, CircularProgress} from "@mui/material";
import { SportForm } from "./SportForm";
import {SportList} from "./SportList";
import {useState} from "react";

export function Sports() {
    const {sports, refresh: refreshSports, isFetching: isFetchingSports} = useFetchSports()
    // const {games, refresh: refreshGames, isFetching: isFetchingGames} = useFetchGames()

    //  state
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return(
        <>
            <SportsContext.Provider
                value={{
                    data: sports,
                    refresh: refreshSports
                }}
            >
                {/*<GamesContext.Provider*/}
                {/*    value={{*/}
                {/*        data: games,*/}
                {/*        refresh: refreshGames*/}
                {/*    }}*/}
                {/*>*/}
                    <div className={styles.content}>
                        <h1>競技</h1>

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

                        {isFetchingSports ?
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
                                <SportForm
                                    isOpen={isCreatorOpen}
                                    setClose={() => setIsCreatorOpen(false)}
                                    formType={"create"}
                                    refresh={refreshSports}
                                />

                                <SportList/>
                            </>
                        }
                    </div>
                {/*</GamesContext.Provider>*/}
            </SportsContext.Provider>
        </>
    )
}