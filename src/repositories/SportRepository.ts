import {Sport} from "../models/SportModel";
import {ApiClient} from "../lib/ApiClient";

const getSports = async (filter: boolean): Promise<Sport[]> => {
    const data = await ApiClient().getWithParams("/sports",
        {
            filter: filter
        }
    )
    return data.data
}

const getSport = async (id: number): Promise<Sport> => {
    const data = await ApiClient().get(`/sports/${id}`)
    return data.data
}

const deleteSport = async (id: number): Promise<void> => {
    await ApiClient().delete(`/sports/${id}`)
}

const createSport = async (omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
    const data = await ApiClient().post(`/sports`, omittedSport)
    return data.data
}

const updateSport = async (id: number, omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
    const data = await ApiClient().put(`/sports/${id}`, omittedSport)
    return data.data
}

const getProgress = async (id: number): Promise<number> => {
    const data = await ApiClient().get(`/sports/${id}/progress`)
    return data.data
}


export type SportRepository = {
    getSports: (filter: boolean) => Promise<Sport[]>,
    getSport: (id: number) => Promise<Sport>,
    deleteSport: (id: number) => Promise<void>,
    createSport: (omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">) => Promise<Sport>,
    updateSport: (id: number, omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">) => Promise<Sport>,
    getProgress: (id: number) => Promise<number>,
}

export const sportRepository: SportRepository = {
    getSports,
    getSport,
    deleteSport,
    createSport,
    updateSport,
    getProgress,
}