import {ApiClient} from "../lib/ApiClient";
import {Location} from "../models/LocationModel";

const getLocations = async (): Promise<Location[]> => {
    const data = await ApiClient().get("/locations")
    return data.data
}

const getLocation = async (id: number): Promise<Location> => {
    const data = await ApiClient().get(`/locations/${id}`)
    return data.data
}

const deleteLocation = async (id: number): Promise<void> => {
    await ApiClient().delete(`/locations/${id}`)
}

const createLocation = async (omittedLocation: Omit<Location, "id">): Promise<Location> => {
    const data = await ApiClient().post(`/locations`, omittedLocation)
    return data.data
}

const updateLocation = async (id: number, omittedLocation: Omit<Location, "id">): Promise<Location> => {
    const data = await ApiClient().put(`/locations/${id}`, omittedLocation)
    return data.data
}

export type LocationRepository = {
    getLocations: () => Promise<Location[]>,
    getLocation: (id: number) => Promise<Location>,
    deleteLocation: (id: number) => Promise<void>,
    createLocation: (omittedLocation: Omit<Location, "id">) => Promise<Location>,
    updateLocation: (id: number, omittedLocation: Omit<Location, "id">) => Promise<Location>,
}

export const locationRepository: LocationRepository = {
    getLocations,
    getLocation,
    deleteLocation,
    createLocation,
    updateLocation,
}