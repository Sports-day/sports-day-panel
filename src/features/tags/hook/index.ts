import {Tag, tagFactory} from "../../../models/TagModel";
import {useState} from "react";
import {useAsyncRetry} from "react-use";


export const useFetchTags = () => {
    const [tags, setTags] = useState<Tag[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true)
            const data = await tagFactory().index()
            setTags(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsFetching(false)
        }
    })

    return {
        tags: tags,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

export const useFetchTag = (tagId: number) => {
    const [tag, setTag] = useState<Tag>()
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true)
            const data = await tagFactory().show(tagId)
            setTag(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsFetching(false)
        }
    })

    return {
        tag: tag,
        isFetching: isFetching,
        refresh: state.retry,
    }
}
