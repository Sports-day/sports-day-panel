import {Sport} from "../models/SportModel";
import {ApiClient} from "../lib/ApiClient";

const getSports = async (): Promise<Sport[]> => {
    const {data} = await ApiClient.get("/sports")
    return data.data
}

const getSport = async (id: Pick<Sport, "id">): Promise<Sport> => {
    const {data} = await ApiClient.get(`/sports/${id}`)
    return data.data
}

const deleteSport = async (id: Pick<Sport, "id">): Promise<void> => {
    const {data} = await ApiClient.delete(`/sports/${id}`)
}

const createSport = async (omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
    const {data} = await ApiClient.post(`/sports`, omittedSport)
    return data.data
}

const updateSport = async (id: Pick<Sport, "id">, omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">): Promise<Sport> => {
    const {data} = await ApiClient.put(`/sports/${id}`, omittedSport)
    return data.data
}


export type SportRepository = {
    getSports: () => Promise<Sport[]>,
    getSport: (id: Pick<Sport, "id">) => Promise<Sport>,
    deleteSport: (id: Pick<Sport, "id">) => Promise<void>,
    createSport: (omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">) => Promise<Sport>,
    updateSport: (id: Pick<Sport, "id">, omittedSport: Omit<Sport, "id" | "gameIds" | "createdAt" | "updatedAt">) => Promise<Sport>,
}

export const sportRepository: SportRepository = {
    getSports,
    getSport,
    deleteSport,
    createSport,
    updateSport,
}