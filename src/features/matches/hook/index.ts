import {Match, matchFactory} from "../../../models/MatchModel";
import {useAsync, useAsyncRetry} from "react-use";
import {useState} from "react";
export const useFetchMatches = () => {
    const [matches, setMatches] = useState<Match[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

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
        refresh: state.retry
    }
}

export const useFetchMatch = (matchId: number) => {
    const [match, setMatch] = useState<Match>()
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

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
        refresh: state.retry,
    }
}
