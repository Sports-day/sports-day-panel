import {groupRepository, GroupRepository} from "../repositories/GroupRepository";

export type Group = {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export const groupFactory = (repo?: GroupRepository) => {
    const repository = repo ?? groupRepository

    return {
        index: async (): Promise<Group[]> => {
            return await repository.getGroups()
        },
        show: async (id: Pick<Group, "id">): Promise<Group> => {
            return await repository.getGroup(id)
        },
        delete: async (id: Pick<Group, "id">): Promise<void> => {
            return await repository.deleteGroup(id)
        },
        create: async (omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
            return await repository.createGroup(omittedGroup)
        },
        update: async (id: Pick<Group, "id">, omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
            return await repository.updateGroup(id, omittedGroup)
        }
    }
}