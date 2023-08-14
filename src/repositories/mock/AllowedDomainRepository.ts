import {AllowedDomain} from "../../models/AllowedDomainModel";
import {ApiClient} from "../../lib/ApiClient";
import {AllowedDomainRepository} from "../AllowedDomainRepository";

const getAllowedDomains = async (): Promise<AllowedDomain[]> => {
    return [
        {
            id: 1,
            domain: "example.com",
            description: "example.com",
            createdAt: "2021-01-01 00:00:00",
        },
        {
            id: 2,
            domain: "example.net",
            description: "example.net",
            createdAt: "2021-01-01 00:00:00",
        }
    ]
}

const getAllowedDomain = async (id: number): Promise<AllowedDomain> => {
    return {
        id: 1,
        domain: "example.com",
        description: "example.com",
        createdAt: "2021-01-01 00:00:00",
    }
}

const deleteAllowedDomain = async (id: number): Promise<void> => {
}

const createAllowedDomain = async (omittedAllowedDomain: Omit<AllowedDomain, "id">): Promise<AllowedDomain> => {
    return {
        id: 100,
        domain: "example.co.jp",
        description: "example.co.jp",
        createdAt: "2021-01-01 00:00:00",
    }
}

const updateAllowedDomain = async (id: number, omittedAllowedDomain: Omit<AllowedDomain, "id">): Promise<AllowedDomain> => {
    return {
        id: 100,
        domain: "example.co.jp",
        description: "example.co.jp",
        createdAt: "2021-01-01 00:00:00",
    }
}

export const mockAllowedDomainRepository: AllowedDomainRepository = {
    getAllowedDomains,
    getAllowedDomain,
    deleteAllowedDomain,
    createAllowedDomain,
    updateAllowedDomain,
}