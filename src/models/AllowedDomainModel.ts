import {allowedDomainRepository, AllowedDomainRepository} from "../repositories/AllowedDomainRepository";

export type AllowedDomain = {
    id: number,
    domain: string,
    description: string,
    createdAt: string,
}

export const allowedDomainFactory = (repo?: AllowedDomainRepository) => {
    const repository = repo ?? allowedDomainRepository

    return {
        index: async (): Promise<AllowedDomain[]> => {
            return await repository.getAllowedDomains()
        },
        show: async (id: Pick<AllowedDomain, "id">): Promise<AllowedDomain> => {
            return await repository.getAllowedDomain(id)
        },
        delete: async (id: Pick<AllowedDomain, "id">): Promise<void> => {
            return await repository.deleteAllowedDomain(id)
        },
        create: async (omittedAllowedDomain: Omit<AllowedDomain, "id">): Promise<AllowedDomain> => {
            return await repository.createAllowedDomain(omittedAllowedDomain)
        },
        update: async (id: Pick<AllowedDomain, "id">, omittedAllowedDomain: Omit<AllowedDomain, "id">): Promise<AllowedDomain> => {
            return await repository.updateAllowedDomain(id, omittedAllowedDomain)
        }
    }
}