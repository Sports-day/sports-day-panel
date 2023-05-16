import styles from "../../../styles/Pit.module.scss";
import {useFetchTeams} from "../../../src/features/teams/hook";
import {useState} from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import {TeamCreateForm} from "./TeamCreateForm";
import {TeamList} from "./TeamList";
import {ClassesContext} from "../context";
import {useFetchClasses} from "../../../src/features/classes/hooks";


export function Teams() {
    const {teams, refresh , isFetching: isFetchingTeams} = useFetchTeams()
    const {classes, refresh: refreshClasses, isFetching: isFetchingClasses} = useFetchClasses()
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <ClassesContext.Provider value={{data: classes, refresh: refreshClasses}}>
                <div className={styles.content}>

                    <h1>チーム</h1>
                    <p>複数のユーザーをチームで管理できます。</p>

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

                    <TeamCreateForm
                        isOpen={isCreatorOpen}
                        setClose={() => setIsCreatorOpen(false)}
                        refresh={refresh}
                    />

                    {isFetchingTeams || isFetchingClasses ?
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
                            <TeamList teams={teams}/>
                        </>
                    }

                </div>
            </ClassesContext.Provider>
        </>
    )
}