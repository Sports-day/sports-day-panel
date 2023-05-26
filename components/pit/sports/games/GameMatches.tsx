import styles from "../../../../styles/Pit.module.scss";
import {useFetchSport} from "../../../../src/features/sports/hook";
import {EntriesContext, GameContext} from "../../../context";
import {useContext, useState} from "react";
import {useFetchGameMatches} from "../../../../src/features/games/hook";
import {MatchesTable} from "../../matches/MatchesTable";
import {Button} from "@mui/material";
import {AutomaticMatchEditor} from "./automation/AutomaticMatchEditor";

export type GameMatchesProps = {
    sportId: number
    gameId: number
}

export function GameMatches(props: GameMatchesProps) {
    const {sport} = useFetchSport(props.sportId)
    const {matches, refresh: refreshMatches} = useFetchGameMatches(props.gameId)

    //  context
    const {data: game} = useContext(GameContext)
    const {data: entries} = useContext(EntriesContext)

    const [isOpenAutomaticEditor, setIsOpenAutomaticEditor] = useState(false)

    if (!sport || !game) {
        return null
    }

    return (
        <>
            <div className={styles.content}>
                <h2>マッチ一覧</h2>

                <Button
                    variant="contained"
                    sx={{
                        position: "absolute",
                        right: "20px",
                        top: "10px",
                    }}
                    onClick={() => setIsOpenAutomaticEditor(true)}
                >
                    一括編集
                </Button>

                <AutomaticMatchEditor
                    isOpen={isOpenAutomaticEditor}
                    setClose={() => setIsOpenAutomaticEditor(false)}
                    refresh={refreshMatches}
                    game={game}
                    matches={matches}
                    entries={entries}
                />

                <MatchesTable
                    sports={new Array(sport)}
                    games={new Array(game)}
                    teams={entries}
                    matches={
                        matches.sort((a, b) => a.startAt.localeCompare(b.startAt))
                    }
                />

            </div>
        </>
    )
}