import {useFetchSport} from "../../../../src/features/sports/hook";
import {EntriesContext, GameContext} from "../../../context";
import {useContext} from "react";
import {useFetchGameMatches} from "../../../../src/features/games/hook";
import {MatchesTable} from "../../matches/MatchesTable";

export type GameMatchesProps = {
    sportId: number
    gameId: number
}

export function GameMatches(props: GameMatchesProps) {
    const {sport} = useFetchSport(props.sportId)
    const {matches} = useFetchGameMatches(props.gameId)

    //  context
    const {data: game} = useContext(GameContext)
    const {data: entries} = useContext(EntriesContext)

    if (!sport || !game) {
        return null
    }

    return (
        <>

            <MatchesTable
                sports={new Array(sport)}
                games={new Array(game)}
                teams={entries}
                matches={matches}
            />
        </>
    )
}