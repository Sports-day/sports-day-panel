import styles from "../../../../../styles/Pit.module.scss";
import {useContext, useState} from "react";
import {EntriesContext, GameContext} from "../../../../context";
import {ConfirmDialog} from "../../../ConfirmDialog";
import {gameFactory} from "../../../../../src/models/GameModel";
import {Button} from "@mui/material";
import {LeagueTable} from "./LeagueTable";

export function LeagueController() {
    const {data: game, refresh} = useContext(GameContext)
    const {data: teams, refresh: refreshTeams} = useContext(EntriesContext)
    //  state
    const [isOpenGenerateLeague, setIsOpenGenerateLeague] = useState<boolean>(false)

    const generateLeague = async () => {
        //  delete
        await gameFactory().deleteGameMatches(game.id)
        //  generate
        await gameFactory().makeLeagueMatches(
            game.id,
            null
        )

        refresh()
        refreshTeams()
    }

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
                    作成
                </Button>

                <ConfirmDialog
                    open={isOpenGenerateLeague}
                    onClose={() => setIsOpenGenerateLeague(false)}
                    onConfirm={generateLeague}
                    confirmText={"リーグ表の生成"}
                    confirmColor={"primary"}
                >
                    リーグ表を生成しますか？
                    すでに作成している場合、マッチが全削除されます。
                </ConfirmDialog>

                <LeagueTable />
            </div>
        </>
    )
}