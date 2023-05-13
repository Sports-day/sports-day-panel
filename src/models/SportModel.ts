import {sportRepository, SportRepository} from "../repositories/SportRepository";

export type Sport = {
    id: number,
    name: string,
    description: string,
    iconId: number | null,
    gameIds: number[],
    createdAt: string,
    updatedAt: string
}

export const sportFactory = (repo?: SportRepository) => {
    const repository = repo ?? sportRepository

    return {
        index: async (): Promise<Sport[]> => {
            return await repository.getSports()
        },
        show: async (id: Pick<Sport, "id">): Promise<Sport> => {
            return await repository.getSport(id)
        },
        delete: async (id: Pick<Sport, "id">): Promise<void> => {
            return await repository.deleteSport(id)
        },
        create: async (omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
            return await repository.createSport(omittedSport)
        },
        update: async (id: Pick<Sport, "id">, omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
            return await repository.updateSport(id, omittedSport)
        }
    }
}