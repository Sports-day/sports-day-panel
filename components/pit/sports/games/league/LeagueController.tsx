import styles from "../../../../../styles/Pit.module.scss";
import {useContext, useState} from "react";
import {EntriesContext, GameContext} from "../../../../context";
import {Button} from "@mui/material";
import {LeagueTable} from "./LeagueTable";
import {LeagueCreator} from "./LeagueCreator";

export function LeagueController() {
    const {data: game, refresh} = useContext(GameContext)
    const {refresh: refreshTeams} = useContext(EntriesContext)
    //  state
    const [isOpenGenerateLeague, setIsOpenGenerateLeague] = useState<boolean>(false)

    return (
        <>
            <div className={styles.content}>
                <h2>リーグ表</h2>

                <Button
                    variant="contained"
                    sx={{
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                    }}
                    onClick={() => setIsOpenGenerateLeague(true)}
                >
                    リーグ表作成
                </Button>

                <LeagueCreator
                    isOpen={isOpenGenerateLeague}
                    setClose={() => setIsOpenGenerateLeague(false)}
                    refresh={() => {
                        refresh()
                        refreshTeams()
                    }}
                    game={game}
                />

                <LeagueTable />
            </div>
        </>
    )
}