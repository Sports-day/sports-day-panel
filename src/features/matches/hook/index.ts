import {Match, matchFactory} from "../../../models/MatchModel";
import {useAsync} from "react-use";
import {useState} from "react";
import {useFetchMySport} from "../../sports/hook";
import {gameFactory} from "../../../models/GameModel";
import {useFetchMyTeams} from "../../teams/hook";

export const useFetchMatches = () => {
    const [matches, setMatches] = useState<Match[]>([])
    const [isFetching, setIsFetching] = useState(true)

    useAsync(async () => {
        try {
            const data = await matchFactory().index();
            setMatches(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        matches: matches,
        isFetching: isFetching,
    }
}

export const useFetchMatch = (matchId: number) => {
    const [match, setMatch] = useState<Match>()
    const [isFetching, setIsFetching] = useState(true)

    useAsync(async () => {
        try {
            const data = await matchFactory().show(matchId);
            setMatch(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        match: match,
        isFetching: isFetching,
    }
}

export const useFetchMySportMatches = () => {
    const [matches, setMatches] = useState<Match[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const {sport, isFetching: isFetchingMySport} = useFetchMySport();
    const {teams, isFetching: isFetchingMyTeams} = useFetchMyTeams();

    useAsync(async () => {
        if (!isFetchingMySport && !isFetchingMyTeams) {
            try {
                const games = await gameFactory().index()
                    .then(values => values.filter(value => sport?.gameIds.includes(value.id)));

                let matches: Match[] = []
                for (const game of games) {
                    const filteredMatches = await gameFactory().getGameMatches(game.id)
                        .then(values => {
                            return values.filter(match => {
                                return teams.some(team => team.id === match.leftTeamId || team.id === match.rightTeamId)
                            })
                        })
                    //  push
                    matches.push(...filteredMatches)
                }

                setMatches(matches);
            } catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingMySport, isFetchingMyTeams])

    return {
        matches: matches,
        isFetching: isFetching,
    }
}