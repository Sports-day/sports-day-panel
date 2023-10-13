import {sportRepository, SportRepository} from "../repositories/SportRepository";

export type Sport = {
    id: number,
    name: string,
    description: string,
    iconId: number | null,
    weight: number,
    ruleId: number,
    gameIds: number[],
    tagId: number | null,
    createdAt: string,
    updatedAt: string
}

export const sportFactory = (repo?: SportRepository) => {
    const repository = repo ?? sportRepository

    return {
        index: async (filter: boolean = false): Promise<Sport[]> => {
            return await repository.getSports(filter)
        },
        show: async (id: number): Promise<Sport> => {
            return await repository.getSport(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteSport(id)
        },
        create: async (omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
            return await repository.createSport(omittedSport)
        },
        update: async (id: number, omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
            return await repository.updateSport(id, omittedSport)
        },
        getProgress: async (id: number): Promise<number> => {
            return await repository.getProgress(id)
        }
    }
}