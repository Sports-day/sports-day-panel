import {useContext} from "react";
import {EntriesContext, GameContext} from "../../../../context";

export function TournamentController() {
    const {data: game, refresh} = useContext(GameContext)
    const {data: teams, refresh: refreshTeams} = useContext(EntriesContext)

    return (
        <>
            Tournament Controller
        </>
    )
}