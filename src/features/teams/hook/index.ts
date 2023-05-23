import {useAsync, useAsyncRetry} from "react-use";
import {useState} from "react";
import {Team, teamFactory} from "../../../models/TeamModel";
import {useFetchMyUser} from "../../users/hook";
import {User} from "../../../models/UserModel";

export const useFetchTeams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);
            const data = await teamFactory().index();
            setTeams(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    });
    return {
        teams: teams,
        isFetching: isFetching,
        refresh: state.retry,
    };
}

export const useFetchTeam = (teamId: number) => {
    const [team, setTeam] = useState<Team>();
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);
            const data = await teamFactory().show(teamId);
            setTeam(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    });

    return {
        team: team,
        isFetching: isFetching,
        refresh: state.retry,
    };
}

export const useFetchTeamUsers = (teamId: number) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);
            const data = await teamFactory().getTeamUsers(teamId);
            setUsers(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    })

    return {
        users: users,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

export const useFetchMyTeams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const {user, isFetching: isFetchingUser} = useFetchMyUser();

    useAsync(async () => {
        if (!isFetchingUser) {
            try {
                const data = await teamFactory().index()
                    .then(values => values.filter(value => user?.teamIds.includes(value.id)))
                setTeams(data);
            } catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [isFetchingUser]);
    return {
        teams: teams,
        isFetching: isFetching,
    };
}

export const useFetchMyTeamRank = () => {
    const [rank, setRank] = useState<number>();
    const [isFetching, setIsFetching] = useState(true);


    useAsync(async () => {
        //  TODO チームのランク
        setRank(2)
        setIsFetching(false)
    });
    return {
        rank: rank,
        isFetching: isFetching,
    };
}