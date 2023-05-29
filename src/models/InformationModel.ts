import {InformationRepository, informationRepository} from "../repositories/InformationRepository";

export type Information = {
    id: number,
    name: string,
    content: string
}

export const informationFactory = (repo?: InformationRepository) => {
    const repository = repo ?? informationRepository

    return {
        index: async (): Promise<Information[]> => {
            return await repository.getAllInformation()
        },
        show: async (id: number): Promise<Information> => {
            return await repository.getInformation(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteInformation(id)
        },
        create: async (omittedInformation: Omit<Information, "id">): Promise<Information> => {
            return await repository.createInformation(omittedInformation)
        },
        update: async (id: number, omittedInformation: Omit<Information, "id">): Promise<Information> => {
            return await repository.updateInformation(id, omittedInformation)
        }
    }
}