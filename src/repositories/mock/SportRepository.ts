import {Sport} from "../../models/SportModel";
import {ApiClient} from "../../lib/ApiClient";
import {SportRepository} from "../SportRepository";

const mock: Sport[] = [
    {
        id: 1,
        name: "ビーチボール",
        description: "富山県発祥のビーチバレー",
        iconId: 1,
        weight: 2,
        ruleId: 1,
        gameIds: [1, 2],
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 2,
        name: "バドミントン",
        description: "普通のバドミントン",
        iconId: 2,
        weight: 1,
        ruleId: 2,
        gameIds: [3, 4],
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
]
const getSports = async (): Promise<Sport[]> => {
    return mock
}

const getSport = async (id: number): Promise<Sport> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteSport = async (id: number): Promise<void> => {
}

const createSport = async (omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
    return mock[0]
}

const updateSport = async (id: number, omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
    return mock[0]
}

export const mockSportRepository: SportRepository = {
    getSports,
    getSport,
    deleteSport,
    createSport,
    updateSport,
}