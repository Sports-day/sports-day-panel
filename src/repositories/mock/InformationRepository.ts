import {Information} from "../../models/InformationModel";
import {ApiClient} from "../../lib/ApiClient";
import {InformationRepository} from "../InformationRepository";

const mock: Information[] = [
    {
        id: 1,
        name: "Demo",
        content: "デモンストレーション用です。",
    }
]

const getAllInformation = async (): Promise<Information[]> => {
    return mock
}

const getInformation = async (id: number): Promise<Information> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteInformation = async (id: number): Promise<void> => {
}

const createInformation = async (omittedInformation: Omit<Information, "id">): Promise<Information> => {
    return mock[0]
}

const updateInformation = async (id: number, omittedInformation: Omit<Information, "id">): Promise<Information> => {
    const {data} = await ApiClient.put(`/information/${id}`, omittedInformation)
    return data.data
}

export const mockInformationRepository: InformationRepository = {
    getAllInformation,
    getInformation,
    deleteInformation,
    createInformation,
    updateInformation,
}