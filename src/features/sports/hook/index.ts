import {useState} from "react";
import {Sport, sportFactory} from "../../../models/SportModel";
import {useAsync, useAsyncRetry} from "react-use";
import {Game, gameFactory, LeagueTeamResult} from "../../../models/GameModel";
import {Team} from "../../../models/TeamModel";

/**
 * Fetches all sports
 */
export const useFetchSports = () => {
    const [sports, setSports] = useState<Sport[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await sportFactory().index();
            setSports(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        sports: sports,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

/**
 * Fetches a sports
 * @param sportId
 */
export const useFetchSport = (sportId: number) => {
    const [sport, setSport] = useState<Sport>()
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await sportFactory().show(sportId);
            setSport(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        sport: sport,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

/**
 * Fetches the games of a sports
 * @param sportId
 */
export const useFetchSportGames = (sportId: number) => {
    const [games, setGames] = useState<Game[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const sport = await sportFactory().show(sportId);

            const result = await gameFactory().index()
                .then(values =>
                    values.filter(value => sport.gameIds.includes(value.id))
                )
            setGames(result)
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        games: games,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

/**
 * Fetches the progress of a sports
 * @param sportId
 */
export const useFetchSportProgress = (sportId: number) => {
    const [progress, setProgress] = useState<number>(0)
    const [isFetching, setIsFetching] = useState(true)

    const {games, isFetching: isFetchingGames} = useFetchSportGames(sportId)

    const state = useAsyncRetry(async () => {
        if(!isFetchingGames) {
            try {
                setIsFetching(true);

                let total = 0
                let finished = 0

                for (const game of games) {
                    const matches = await gameFactory().getGameMatches(game.id)

                    total += matches.length
                    finished += matches.filter(match => match.status == "finished").length
                }

                const result = Math.round((finished / total) * 100)
                setProgress(result)
            } catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingGames])

    return {
        progress: progress,
        isFetching: isFetching,
    }
}

export type BestTeam = {
    team: Team
    rank: number
}

export const useFetchSportBest3 = (sportId: number) => {
    const [bestTeams, setBestTeams] = useState<BestTeam[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const {games, isFetching: isFetchingGames} = useFetchSportGames(sportId)

    useAsync(async () => {
        if(!isFetchingGames) {
            try {
                const teamResults: LeagueTeamResult[] = []
                // Get all league result
                for (const game of games) {
                    if (game.type != "tournament") continue
                    //  fetch
                    const result = await gameFactory().getLeagueResult(game.id)
                    result.teams.forEach(team => teamResults.push(team))
                }

                //  sort
                teamResults.sort((a, b) => b.score - a.score)

            } catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingGames])

    return {
        bestTeams: bestTeams,
        isFetching: isFetching,
    }
}