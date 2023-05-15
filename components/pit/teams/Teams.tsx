import styles from "../../../styles/Pit.module.scss";
import {useFetchTeams} from "../../../src/features/teams/hook";
import {useState} from "react";
import {Button} from "@mui/material";
import {TeamCreateForm} from "./TeamCreateForm";
import {TeamList} from "./TeamList";


export function Teams() {
    const {teams, refresh} = useFetchTeams()
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
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

                <TeamList teams={teams}/>

            </div>
        </>
    )
}