import {Information} from "../models/InformationModel";
import {ApiClient} from "../lib/ApiClient";

const getAllInformation = async (): Promise<Information[]> => {
    const data = await ApiClient().get("/information")
    return data.data
}

const getInformation = async (id: number): Promise<Information> => {
    const data = await ApiClient().get(`/information/${id}`)
    return data.data
}

const deleteInformation = async (id: number): Promise<void> => {
    await ApiClient().delete(`/information/${id}`)
}

const createInformation = async (omittedInformation: Omit<Information, "id">): Promise<Information> => {
    const data = await ApiClient().post(`/information`, omittedInformation)
    return data.data
}

const updateInformation = async (id: number, omittedInformation: Omit<Information, "id">): Promise<Information> => {
    const data = await ApiClient().put(`/information/${id}`, omittedInformation)
    return data.data
}

export type InformationRepository = {
    getAllInformation: () => Promise<Information[]>,
    getInformation: (id: number) => Promise<Information>,
    deleteInformation: (id: number) => Promise<void>,
    createInformation: (omittedInformation: Omit<Information, "id">) => Promise<Information>,
    updateInformation: (id: number, omittedInformation: Omit<Information, "id">) => Promise<Information>,
}

export const informationRepository: InformationRepository = {
    getAllInformation,
    getInformation,
    deleteInformation,
    createInformation,
    updateInformation,
}