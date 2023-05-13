import {AllowedDomain} from "../models/AllowedDomainModel";
import {ApiClient} from "../lib/ApiClient";

const getAllowedDomains = async (): Promise<AllowedDomain[]> => {
    const {data} = await ApiClient.get("/allowed-domains")
    return data.data
}

const getAllowedDomain = async (id: Pick<AllowedDomain, "id">): Promise<AllowedDomain> => {
    const {data} = await ApiClient.get(`/allowed-domains/${id}`)
    return data.data
}

const deleteAllowedDomain = async (id: Pick<AllowedDomain, "id">): Promise<void> => {
    const {data} = await ApiClient.delete(`/allowed-domains/${id}`)
}

const createAllowedDomain = async (omittedAllowedDomain: Omit<AllowedDomain, "id">): Promise<AllowedDomain> => {
    const {data} = await ApiClient.post(`/allowed-domains`, omittedAllowedDomain)
    return data.data
}

const updateAllowedDomain = async (id: Pick<AllowedDomain, "id">, omittedAllowedDomain: Omit<AllowedDomain, "id">): Promise<AllowedDomain> => {
    const {data} = await ApiClient.put(`/allowed-domains/${id}`, omittedAllowedDomain)
    return data.data
}

export type AllowedDomainRepository = {
    getAllowedDomains: () => Promise<AllowedDomain[]>,
    getAllowedDomain: (id: Pick<AllowedDomain, "id">) => Promise<AllowedDomain>,
    deleteAllowedDomain: (id: Pick<AllowedDomain, "id">) => Promise<void>,
    createAllowedDomain: (omittedAllowedDomain: Omit<AllowedDomain, "id">) => Promise<AllowedDomain>,
    updateAllowedDomain: (id: Pick<AllowedDomain, "id">, omittedAllowedDomain: Omit<AllowedDomain, "id">) => Promise<AllowedDomain>,
}

export const allowedDomainRepository: AllowedDomainRepository = {
    getAllowedDomains,
    getAllowedDomain,
    deleteAllowedDomain,
    createAllowedDomain,
    updateAllowedDomain,
}