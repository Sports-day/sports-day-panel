import {useAsyncRetry} from "react-use";
import {useState} from "react";
import {Team, teamFactory} from "@/src/models/TeamModel";
import {User} from "@/src/models/UserModel";

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