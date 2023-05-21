import {Group} from "../models/GroupModel";
import {ApiClient} from "../lib/ApiClient";

const getGroups = async (): Promise<Group[]> => {
    const {data} = await ApiClient.get("/groups")
    return data.data
}

const getGroup = async (id: number): Promise<Group> => {
    const {data} = await ApiClient.get(`/groups/${id}`)
    return data.data
}

const deleteGroup = async (id: number): Promise<void> => {
    await ApiClient.delete(`/groups/${id}`)
}

const createGroup = async (omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
    const {data} = await ApiClient.post(`/groups`, omittedGroup)
    return data.data
}

const updateGroup = async (id: number, omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
    const {data} = await ApiClient.put(`/groups/${id}`, omittedGroup)
    return data.data
}

export type GroupRepository = {
    getGroups: () => Promise<Group[]>,
    getGroup: (id: number) => Promise<Group>,
    deleteGroup: (id: number) => Promise<void>,
    createGroup: (omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">) => Promise<Group>,
    updateGroup: (id: number, omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">) => Promise<Group>,
}

export const groupRepository: GroupRepository = {
    getGroups,
    getGroup,
    deleteGroup,
    createGroup,
    updateGroup,
}