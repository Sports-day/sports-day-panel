import {Group, groupFactory} from "../../../models/GroupModel";
import {useState} from "react";
import {useAsyncRetry} from "react-use";

export const useFetchGroups = () => {
    const [groups, setGroups] = useState<Group[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await groupFactory().index();
            setGroups(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        groups: groups,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

export const useFetchGroup = (groupId: number) => {
    const [group, setGroup] = useState<Group>()
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await groupFactory().show(groupId);
            setGroup(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        group: group,
        isFetching: isFetching,
        refresh: state.retry,
    }
}