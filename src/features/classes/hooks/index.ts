import {useState} from "react";
import {Class, classFactory} from "../../../models/ClassModel";
import {useAsyncRetry} from "react-use";

export const useFetchClasses = () => {
    const [classes, setClasses] = useState<Class[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await classFactory().index();
            setClasses(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        classes: classes,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

export const useFetchClass = (id: number) => {
    const [classModel, setClassModel] = useState<Class>()
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);
            const data = await classFactory().show(id);
            setClassModel(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    }, [id])

    return {
        classModel: classModel,
        isFetching: isFetching,
        refresh: state.retry,
    }
}