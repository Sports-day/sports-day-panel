import {User, userFactory} from "../../../models/UserModel";
import {useState} from "react";
import {useAsync, useAsyncRetry} from "react-use";
import {microsoftAccountFactory} from "../../../models/MicrosoftAccountModel";

export const useFetchUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            const data = await userFactory().index();
            setUsers(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    });

    return {
        users: users,
        isFetching: isFetching,
        refresh: state.retry,
    };
}

export const useFetchUser = (userId: number) => {
    const [user, setUser] = useState<User>();
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            const data = await userFactory().show(userId);
            setUser(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    });

    return {
        user: user,
        isFetching: isFetching,
        refresh: state.retry,
    };
}

export const useFetchMyUser = () => {
    const [user, setUser] = useState<User>();
    const [isFetching, setIsFetching] = useState(true);

    useAsync(async () => {
        try {
            const {userId} = await microsoftAccountFactory().show("me");
            const data = await userFactory().show(userId);
            setUser(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    })

    return {
        user: user,
        isFetching: isFetching,
    }
}