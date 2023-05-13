import {User} from "../models/UserModel";
import {ApiClient} from "../lib/ApiClient";
import {MicrosoftAccount} from "../models/MicrosoftAccountModel";
import {Team} from "../models/TeamModel";

const getUsers = async (): Promise<User[]> => {
    const {data} = await ApiClient.get("/users")
    return data.data
}

const getUser = async (id: Pick<User, "id">): Promise<User> => {
    const {data} = await ApiClient.get(`/users/${id}`)
    return data.data
}

const deleteUser = async (id: Pick<User, "id">): Promise<void> => {
    const {data} = await ApiClient.delete(`/users/${id}`)
}

const createUser = async (omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
    const {data} = await ApiClient.post(`/users`, omittedUser)
    return data.data
}

const updateUser = async (id: Pick<User, "id">, omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
    const {data} = await ApiClient.put(`/users/${id}`, omittedUser)
    return data.data
}

const getLinkedMicrosoftAccounts = async (id: Pick<User, "id">): Promise<MicrosoftAccount[]> => {
    const {data} = await ApiClient.get(`/users/${id}/microsoft-accounts`)
    return data.data
}

const getTeams = async (id: Pick<User, "id">): Promise<Team[]> => {
    const {data} = await ApiClient.get(`/users/${id}/teams`)
    return data.data
}

export type UserRepository = {
    getUsers: () => Promise<User[]>,
    getUser: (id: Pick<User, "id">) => Promise<User>,
    deleteUser: (id: Pick<User, "id">) => Promise<void>,
    createUser: (omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">) => Promise<User>,
    updateUser: (id: Pick<User, "id">, omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">) => Promise<User>,
    getLinkedMicrosoftAccounts: (id: Pick<User, "id">) => Promise<MicrosoftAccount[]>,
    getTeams: (id: Pick<User, "id">) => Promise<Team[]>,
}

export const userRepository: UserRepository = {
    getUsers,
    getUser,
    deleteUser,
    createUser,
    updateUser,
    getLinkedMicrosoftAccounts,
    getTeams,
}