import {TagRepository, tagRepository} from "../repositories/TagRepository";


export type Tag = {
    id: number,
    name: string,
    enabled: boolean,
    createdAt: string,
    updatedAt: string
}

export const tagFactory = (repo?: TagRepository) => {
    const repository = repo ?? tagRepository

    return {
        index: async (): Promise<Tag[]> => {
            return await repository.getTags()
        },
        show: async (id: number): Promise<Tag> => {
            return await repository.getTag(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteTag(id)
        },
        create: async (omittedTag: Omit<Tag, "id" | "createdAt" | "updatedAt">): Promise<Tag> => {
            return await repository.createTag(omittedTag)
        },
        update: async (id: number, omittedTag: Omit<Tag, "id" | "createdAt" | "updatedAt">): Promise<Tag> => {
            return await repository.updateTag(id, omittedTag)
        }
    }
}
