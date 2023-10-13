import {useContext, useState} from "react";
import {Sport, sportFactory} from "../../../models/SportModel";
import {useAsync, useAsyncRetry} from "react-use";
import {Game, gameFactory, LeagueTeamResult} from "../../../models/GameModel";
import {Team} from "../../../models/TeamModel";
import {GamesContext, TeamsContext} from "../../../../components/context";

/**
 * Fetches all sports
 */
export const useFetchSports = (filter: boolean = false) => {
    const [sports, setSports] = useState<Sport[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await sportFactory().index(filter);
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
 * @param filter
 */
export const useFetchSportGames = (sportId: number, filter: boolean = false) => {
    const [games, setGames] = useState<Game[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const sport = await sportFactory().show(sportId);

            const result = await gameFactory().index(filter)
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

export type BestTeam = {
    team: Team
    rank: number
}

export const useFetchSportBest3 = () => {
    const [bestTeams, setBestTeams] = useState<BestTeam[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const {data: games} = useContext(GamesContext)
    const {data: teams} = useContext(TeamsContext)

    useAsync(async () => {
        try {
            const teamResults: LeagueTeamResult[] = []
            // Get all league result
            for (const game of games) {
                if (game.type == "tournament") continue
                //  fetch
                const result = await gameFactory().getLeagueResult(game.id)
                result.teams.forEach(team => teamResults.push(team))
            }

            //  sort
            teamResults.sort((a, b) => b.score - a.score)

            setBestTeams(teamResults.slice(0, 3).map((teamResult, index) => {
                return {
                    team: teams.find(team => team.id == teamResult.teamId),
                    rank: index + 1
                } as BestTeam
            }))
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        bestTeams: bestTeams,
        isFetching: isFetching,
    }
}

export const useFetchSportProgress = (sportId: number) => {
    const [progress, setProgress] = useState<number>(0)
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await sportFactory().getProgress(sportId);
            setProgress(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        progress: progress,
        isFetching: isFetching,
        refresh: state.retry,
    }
}