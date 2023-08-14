import {GroupRepository} from "../repositories/GroupRepository";
import {mockGroupRepository} from "../repositories/mock/GroupRepository";

export type Group = {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export const groupFactory = (repo?: GroupRepository) => {
    const repository = mockGroupRepository

    return {
        index: async (): Promise<Group[]> => {
            return await repository.getGroups()
        },
        show: async (id: number): Promise<Group> => {
            return await repository.getGroup(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteGroup(id)
        },
        create: async (omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
            return await repository.createGroup(omittedGroup)
        },
        update: async (id: number, omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
            return await repository.updateGroup(id, omittedGroup)
        }
    }
}