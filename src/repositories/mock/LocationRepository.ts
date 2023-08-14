import {Location} from "../../models/LocationModel";
import {LocationRepository} from "../LocationRepository";

const mock: Location[] = [
    {
        id: 1,
        name: "第一体育館",
    },
    {
        id: 2,
        name: "第二体育館",
    }
]

const getLocations = async (): Promise<Location[]> => {
    return mock
}

const getLocation = async (id: number): Promise<Location> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteLocation = async (id: number): Promise<void> => {
}

const createLocation = async (omittedLocation: Omit<Location, "id">): Promise<Location> => {
    return mock[0]
}

const updateLocation = async (id: number, omittedLocation: Omit<Location, "id">): Promise<Location> => {
    return mock[0]
}

export const mockLocationRepository: LocationRepository = {
    getLocations,
    getLocation,
    deleteLocation,
    createLocation,
    updateLocation,
}