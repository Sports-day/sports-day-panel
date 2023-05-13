import {User} from "../models/UserModel";
import {ApiClient} from "../lib/ApiClient";
import {MicrosoftAccount} from "../models/MicrosoftAccountModel";
import {Team} from "../models/TeamModel";

const getUsers = async (): Promise<User[]> => {
    const {data} = await ApiClient.get("/users")
    return data.data
}

const getUser = async (id: number): Promise<User> => {
    const {data} = await ApiClient.get(`/users/${id}`)
    return data.data
}

const deleteUser = async (id: number): Promise<void> => {
    await ApiClient.delete(`/users/${id}`)
}

const createUser = async (omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
    const {data} = await ApiClient.post(`/users`, omittedUser)
    return data.data
}

const updateUser = async (id: number, omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
    const {data} = await ApiClient.put(`/users/${id}`, omittedUser)
    return data.data
}

const getLinkedMicrosoftAccounts = async (id: number): Promise<MicrosoftAccount[]> => {
    const {data} = await ApiClient.get(`/users/${id}/microsoft-accounts`)
    return data.data
}

const getTeams = async (id: number): Promise<Team[]> => {
    const {data} = await ApiClient.get(`/users/${id}/teams`)
    return data.data
}

export type UserRepository = {
    getUsers: () => Promise<User[]>,
    getUser: (id: number) => Promise<User>,
    deleteUser: (id: number) => Promise<void>,
    createUser: (omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">) => Promise<User>,
    updateUser: (id: number, omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">) => Promise<User>,
    getLinkedMicrosoftAccounts: (id: number) => Promise<MicrosoftAccount[]>,
    getTeams: (id: number) => Promise<Team[]>,
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