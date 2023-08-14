import {sportRepository, SportRepository} from "../repositories/SportRepository";
import {mockSportRepository} from "../repositories/mock/SportRepository";

export type Sport = {
    id: number,
    name: string,
    description: string,
    iconId: number | null,
    weight: number,
    ruleId: number,
    gameIds: number[],
    createdAt: string,
    updatedAt: string
}

export const sportFactory = (repo?: SportRepository) => {
    const repository = mockSportRepository

    return {
        index: async (): Promise<Sport[]> => {
            return await repository.getSports()
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
        }
    }
}