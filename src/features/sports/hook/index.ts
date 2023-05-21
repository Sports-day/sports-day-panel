import {useState} from "react";
import {Sport, sportFactory} from "../../../models/SportModel";
import {useAsync, useAsyncRetry} from "react-use";
import {Game, gameFactory} from "../../../models/GameModel";
import {useFetchMyTeamGames} from "../../games/hook";

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

export const useFetchMySports = () => {
    const [sports, setSports] = useState<Sport[]>()
    const [isFetching, setIsFetching] = useState(true)

    const {games, isFetching: isFetchingGames} = useFetchMyTeamGames()

    useAsync(async () => {
        if(!isFetchingGames) {
            try {
                const sportIds = games.map(game => game.sportId)
                const result = await sportFactory().index()
                    .then(values => values.filter(value => sportIds.includes(value.id)))
                setSports(result)
            } catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingGames])

    return {
        sports: sports,
        isFetching: isFetching,
    }
}

/**
 * Fetches the sports with the highest weight
 */
export const useFetchMySport = () => {
    const [sport, setSport] = useState<Sport>()
    const [isFetching, setIsFetching] = useState(true)

    const {sports, isFetching: isFetchingSports} = useFetchMySports()

    useAsync(async () => {
        if(!isFetchingSports) {
            try {
                sports?.sort((a, b) => a.weight + b.weight)

                setSport(sports?.[0])
            } catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingSports])

    return {
        sport: sport,
        isFetching: isFetching,
    }
}