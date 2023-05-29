import {useState} from "react";
import {Information, informationFactory} from "../../../models/InformationModel";
import {useAsyncRetry} from "react-use";


export const useFetchAllInformation = () => {
    const [allInformation, setAllInformation] = useState<Information[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await informationFactory().index();
            setAllInformation(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    })

    return {
        allInformation: allInformation,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

export const useFetchInformation = (informationId: number) => {
    const [information, setInformation] = useState<Information>();
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await informationFactory().show(informationId);
            setInformation(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    })

    return {
        information: information,
        isFetching: isFetching,
        refresh: state.retry,
    }
}