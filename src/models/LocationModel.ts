import {LocationRepository, locationRepository} from "../repositories/LocationRepository";

export type Location = {
    id: number,
    name: string,
}


export const locationFactory = (repo?: LocationRepository) => {
    const repository = repo ?? locationRepository

    return {
        index: async (): Promise<Location[]> => {
            return await repository.getLocations()
        },
        show: async (id: Pick<Location, "id">): Promise<Location> => {
            return await repository.getLocation(id)
        },
        delete: async (id: Pick<Location, "id">): Promise<void> => {
            return await repository.deleteLocation(id)
        },
        create: async (omittedLocation: Omit<Location, "id">): Promise<Location> => {
            return await repository.createLocation(omittedLocation)
        },
        update: async (id: Pick<Location, "id">, omittedLocation: Omit<Location, "id">): Promise<Location> => {
            return await repository.updateLocation(id, omittedLocation)
        }
    }
}