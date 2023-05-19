import {useState} from "react";
import {useAsyncRetry} from "react-use";
import {locationFactory, Location} from "../../../models/LocationModel";

export const useFetchLocations = () => {
    const [locations, setLocations] = useState<Location[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await locationFactory().index()

            setLocations(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        locations: locations,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

export const useFetchLocation = (locationId: number) => {
    const [location, setLocation] = useState<Location>()
    const [isFetching, setIsFetching] = useState(true)

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await locationFactory().show(locationId)
            setLocation(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    })

    return {
        location: location,
        isFetching: isFetching,
        refresh: state.retry,
    }
}