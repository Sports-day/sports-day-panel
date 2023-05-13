import {Group} from "../models/GroupModel";
import {ApiClient} from "../lib/ApiClient";

const getGroups = async (): Promise<Group[]> => {
    const {data} = await ApiClient.get("/groups")
    return data.data
}

const getGroup = async (id: Pick<Group, "id">): Promise<Group> => {
    const {data} = await ApiClient.get(`/groups/${id}`)
    return data.data
}

const deleteGroup = async (id: Pick<Group, "id">): Promise<void> => {
    await ApiClient.delete(`/groups/${id}`)
}

const createGroup = async (omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
    const {data} = await ApiClient.post(`/groups`, omittedGroup)
    return data.data
}

const updateGroup = async (id: Pick<Group, "id">, omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
    const {data} = await ApiClient.put(`/groups/${id}`, omittedGroup)
    return data.data
}

export type GroupRepository = {
    getGroups: () => Promise<Group[]>,
    getGroup: (id: Pick<Group, "id">) => Promise<Group>,
    deleteGroup: (id: Pick<Group, "id">) => Promise<void>,
    createGroup: (omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">) => Promise<Group>,
    updateGroup: (id: Pick<Group, "id">, omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">) => Promise<Group>,
}

export const groupRepository: GroupRepository = {
    getGroups,
    getGroup,
    deleteGroup,
    createGroup,
    updateGroup,
}