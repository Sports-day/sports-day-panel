import {ApiClient} from "../lib/ApiClient";
import {Location} from "../models/LocationModel";

const getLocations = async (): Promise<Location[]> => {
    const {data} = await ApiClient.get("/locations")
    return data.data
}

const getLocation = async (id: Pick<Location, "id">): Promise<Location> => {
    const {data} = await ApiClient.get(`/locations/${id}`)
    return data.data
}

const deleteLocation = async (id: Pick<Location, "id">): Promise<void> => {
    const {data} = await ApiClient.delete(`/locations/${id}`)
}

const createLocation = async (omittedLocation: Omit<Location, "id">): Promise<Location> => {
    const {data} = await ApiClient.post(`/locations`, omittedLocation)
    return data.data
}

const updateLocation = async (id: Pick<Location, "id">, omittedLocation: Omit<Location, "id">): Promise<Location> => {
    const {data} = await ApiClient.put(`/locations/${id}`, omittedLocation)
    return data.data
}

export type LocationRepository = {
    getLocations: () => Promise<Location[]>,
    getLocation: (id: Pick<Location, "id">) => Promise<Location>,
    deleteLocation: (id: Pick<Location, "id">) => Promise<void>,
    createLocation: (omittedLocation: Omit<Location, "id">) => Promise<Location>,
    updateLocation: (id: Pick<Location, "id">, omittedLocation: Omit<Location, "id">) => Promise<Location>,
}

export const locationRepository: LocationRepository = {
    getLocations,
    getLocation,
    deleteLocation,
    createLocation,
    updateLocation,
}