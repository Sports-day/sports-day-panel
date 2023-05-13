import {Team} from "../models/TeamModel";
import {ApiClient} from "../lib/ApiClient";
import {User} from "../models/UserModel";

const getTeams = async (): Promise<Team[]> => {
    const {data} = await ApiClient.get("/teams")
    return data.data
}

const getTeam = async (id: Pick<Team, "id">): Promise<Team> => {
    const {data} = await ApiClient.get(`/teams/${id}`)
    return data.data
}

const deleteTeam = async (id: Pick<Team, "id">): Promise<void> => {
    await ApiClient.delete(`/teams/${id}`)
}

const createTeam = async (omittedTeam: Omit<Team, "id" | "userIds" | "createdAt" | "updatedAt">): Promise<Team> => {
    const {data} = await ApiClient.post(`/teams`, omittedTeam)
    return data.data
}

const updateTeam = async (id: Pick<Team, "id">, omittedTeam: Omit<Team, "id" | "userIds" | "createdAt" | "updatedAt">): Promise<Team> => {
    const {data} = await ApiClient.put(`/teams/${id}`, omittedTeam)
    return data.data
}

const getTeamUsers = async (id: Pick<Team, "id">): Promise<User[]> => {
    const {data} = await ApiClient.get(`/teams/${id}/users`)
    return data.data
}

const addTeamUsers = async (id: Pick<Team, "id">, userIds: Pick<User, "id">[]): Promise<Team> => {
    const {data} = await ApiClient.post(
        `/teams/${id}/users`,
        {
            users: userIds
        }
    )
    return data.data
}

const removeTeamUser = async (id: Pick<Team, "id">, userId: Pick<User, "id">): Promise<Team> => {
    const {data} = await ApiClient.delete(`/teams/${id}/users/${userId}`)
    return data.data
}

export type TeamRepository = {
    getTeams: () => Promise<Team[]>,
    getTeam: (id: Pick<Team, "id">) => Promise<Team>,
    deleteTeam: (id: Pick<Team, "id">) => Promise<void>,
    createTeam: (omittedTeam: Omit<Team, "id" | "userIds" | "createdAt" | "updatedAt">) => Promise<Team>,
    updateTeam: (id: Pick<Team, "id">, omittedTeam: Omit<Team, "id" | "userIds" | "createdAt" | "updatedAt">) => Promise<Team>,
    getTeamUsers: (id: Pick<Team, "id">) => Promise<User[]>,
    addTeamUsers: (id: Pick<Team, "id">, userIds: Pick<User, "id">[]) => Promise<Team>,
    removeTeamUser: (id: Pick<Team, "id">, userId: Pick<User, "id">) => Promise<Team>,
}

export const teamRepository: TeamRepository = {
    getTeams,
    getTeam,
    deleteTeam,
    createTeam,
    updateTeam,
    getTeamUsers,
    addTeamUsers,
    removeTeamUser,
}