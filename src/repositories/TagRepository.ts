import {Tag} from "../models/TagModel";
import {ApiClient} from "../lib/ApiClient";


const getTags = async (): Promise<Tag[]> => {
    const data = await ApiClient().get("/tags")
    return data.data
}

const getTag = async (id: number): Promise<Tag> => {
    const data = await ApiClient().get(`/tags/${id}`)
    return data.data
}

const deleteTag = async (id: number): Promise<void> => {
    await ApiClient().delete(`/tags/${id}`)
}

const createTag = async (omittedTag: Omit<Tag, "id" | "createdAt" | "updatedAt">): Promise<Tag> => {
    const data = await ApiClient().post(`/tags`, omittedTag)
    return data.data
}

const updateTag = async (id: number, omittedTag: Omit<Tag, "id" | "createdAt" | "updatedAt">): Promise<Tag> => {
    const data = await ApiClient().put(`/tags/${id}`, omittedTag)
    return data.data
}

export type TagRepository = {
    getTags: () => Promise<Tag[]>,
    getTag: (id: number) => Promise<Tag>,
    deleteTag: (id: number) => Promise<void>,
    createTag: (omittedTag: Omit<Tag, "id" | "createdAt" | "updatedAt">) => Promise<Tag>,
    updateTag: (id: number, omittedTag: Omit<Tag, "id" | "createdAt" | "updatedAt">) => Promise<Tag>,
}

export const tagRepository: TagRepository = {
    getTags,
    getTag,
    deleteTag,
    createTag,
    updateTag,
}
