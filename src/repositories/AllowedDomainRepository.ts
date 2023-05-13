import {AllowedDomain} from "../models/AllowedDomainModel";
import {ApiClient} from "../lib/ApiClient";

const getAllowedDomains = async (): Promise<AllowedDomain[]> => {
    const {data} = await ApiClient.get("/allowed-domains")
    return data.data
}

const getAllowedDomain = async (id: number): Promise<AllowedDomain> => {
    const {data} = await ApiClient.get(`/allowed-domains/${id}`)
    return data.data
}

const deleteAllowedDomain = async (id: number): Promise<void> => {
    await ApiClient.delete(`/allowed-domains/${id}`)
}

const createAllowedDomain = async (omittedAllowedDomain: Omit<AllowedDomain, "id">): Promise<AllowedDomain> => {
    const {data} = await ApiClient.post(`/allowed-domains`, omittedAllowedDomain)
    return data.data
}

const updateAllowedDomain = async (id: number, omittedAllowedDomain: Omit<AllowedDomain, "id">): Promise<AllowedDomain> => {
    const {data} = await ApiClient.put(`/allowed-domains/${id}`, omittedAllowedDomain)
    return data.data
}

export type AllowedDomainRepository = {
    getAllowedDomains: () => Promise<AllowedDomain[]>,
    getAllowedDomain: (id: number) => Promise<AllowedDomain>,
    deleteAllowedDomain: (id: number) => Promise<void>,
    createAllowedDomain: (omittedAllowedDomain: Omit<AllowedDomain, "id">) => Promise<AllowedDomain>,
    updateAllowedDomain: (id: number, omittedAllowedDomain: Omit<AllowedDomain, "id">) => Promise<AllowedDomain>,
}

export const allowedDomainRepository: AllowedDomainRepository = {
    getAllowedDomains,
    getAllowedDomain,
    deleteAllowedDomain,
    createAllowedDomain,
    updateAllowedDomain,
}