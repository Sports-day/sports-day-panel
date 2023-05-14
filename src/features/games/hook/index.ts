import {useState} from "react";
import {Game, gameFactory, LeagueResult, TournamentResult} from "../../../models/GameModel";
import {useAsync} from "react-use";
import {Match} from "../../../models/MatchModel";
import {useFetchMyTeams, useFetchTeam} from "../../teams/hook";
import {teamFactory} from "../../../models/TeamModel";

export const useFetchGames = () => {
    const [games, setGames] = useState<Game[]>([])
    const [isFetching, setIsFetching] = useState(true)

    useAsync(async () => {
        try {
            const data = await gameFactory().index();
            setGames(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        games: games,
        isFetching: isFetching,
    }
}

export const useFetchGame = (gameId: number) => {
    const [game, setGame] = useState<Game>()
    const [isFetching, setIsFetching] = useState(true)

    useAsync(async () => {
        try {
            const data = await gameFactory().show(gameId);
            setGame(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        game: game,
        isFetching: isFetching,
    }
}

/**
 * Fetches all matches of a game
 * @param gameId
 */
export const useFetchGameMatches = (gameId: number) => {
    const [matches, setMatches] = useState<Match[]>([])
    const [isFetching, setIsFetching] = useState(true)

    useAsync(async () => {
        try {
            const data = await gameFactory().getGameMatches(gameId);
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

/**
 * Fetches game result
 * @param gameId
 */
export const useFetchGameResult = (gameId: number) => {
    const [result, setResult] = useState<TournamentResult | LeagueResult>()
    const [isFetching, setIsFetching] = useState(true)

    const {game, isFetching: isFetchingGame} = useFetchGame(gameId);

    useAsync(async () => {
        if(!isFetchingGame) {
            try {
                if (game?.type === "league") {
                    const data = await gameFactory().getLeagueResult(gameId);
                    setResult(data);
                }
                else if (game?.type === "tournament") {
                    const data = await gameFactory().getTournamentResult(gameId);
                    setResult(data);
                }
            }catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingGame])

    return {
        result: result,
        isFetching: isFetching,
    }
}

/**
 * Fetch my game results
 */
export const useFetchMyGameResults = () => {
    const [results, setResults] = useState<(TournamentResult | LeagueResult)[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const {games, isFetching: isFetchingGames} = useFetchMyTeamGames();

    useAsync(async () => {
        if(!isFetchingGames) {
            try {
                for (const game of games) {
                    if (game.type === "league") {
                        const data = await gameFactory().getLeagueResult(game.id);
                        setResults(results => [...results, data]);
                    }
                    else if (game.type === "tournament") {
                        const data = await gameFactory().getTournamentResult(game.id);
                        setResults(results => [...results, data]);
                    }
                }
            }catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingGames])

    return {
        results: results,
        isFetching: isFetching,
    }
}

/**
 * Fetches all games of a team
 * @param teamId
 */
export const useFetchTeamGames = (teamId: number) => {
    const [games, setGames] = useState<Game[]>([])
    const [isFetching, setIsFetching] = useState(true)

    useAsync(async () => {
        try {
            const team = await teamFactory().show(teamId);
            const data = await gameFactory().index()
                .then(values => values.filter(value => team.enteredGameIds.includes(value.id)));
            setGames(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        games: games,
        isFetching: isFetching,
    }
}

/**
 * Fetches all games of a user
 */
export const useFetchMyTeamGames = () => {
    const [games, setGames] = useState<Game[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const {teams, isFetching: isFetchingTeams} = useFetchMyTeams();

    useAsync(async () => {
        if (!isFetchingTeams) {
            try {
                const data = await gameFactory().index()
                    .then(values => values.filter(value => teams.some(team => team.enteredGameIds.includes(value.id))));
                setGames(data);
            } catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingTeams])

    return {
        games: games,
        isFetching: isFetching,
    }
}