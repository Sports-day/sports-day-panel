import {useState} from "react";
import {AllowedDomain, allowedDomainFactory} from "../../../models/AllowedDomainModel";
import {useAsyncRetry} from "react-use";

export const useFetchAllowedDomains = () => {
    const [allowedDomains, setAllowedDomains] = useState<AllowedDomain[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            const data = await allowedDomainFactory().index();
            setAllowedDomains(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        allowedDomains: allowedDomains,
        isFetching: isFetching,
        refresh: state.retry,
    }
}