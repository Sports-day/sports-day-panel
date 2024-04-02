import {Team} from "../models/TeamModel";
import {ApiClient} from "../lib/ApiClient";
import {User} from "../models/UserModel";

const getTeams = async (): Promise<Team[]> => {
    const data = await ApiClient().get("/teams")
    return data.data
}

const getTeam = async (id: number): Promise<Team> => {
    const data = await ApiClient().get(`/teams/${id}`)
    return data.data
}

const deleteTeam = async (id: number): Promise<void> => {
    await ApiClient().delete(`/teams/${id}`)
}

const createTeam = async (omittedTeam: Omit<Team, "id" | "userIds" | "enteredGameIds" | "createdAt" | "updatedAt">): Promise<Team> => {
    const data = await ApiClient().post(`/teams`, omittedTeam)
    return data.data
}

const updateTeam = async (id: number, omittedTeam: Omit<Team, "id" | "userIds" | "enteredGameIds" | "createdAt" | "updatedAt">): Promise<Team> => {
    const data = await ApiClient().put(`/teams/${id}`, omittedTeam)
    return data.data
}

const getTeamUsers = async (id: number): Promise<User[]> => {
    const data = await ApiClient().get(`/teams/${id}/users`)
    return data.data
}

const addTeamUsers = async (id: number, userIds: number[]): Promise<Team> => {
    const data = await ApiClient().post(
        `/teams/${id}/users`,
        {
            users: userIds
        }
    )
    return data.data
}

const removeTeamUser = async (id: number, userId: number): Promise<Team> => {
    const data = await ApiClient().delete(`/teams/${id}/users/${userId}`)
    return data.data
}

export type TeamRepository = {
    getTeams: () => Promise<Team[]>,
    getTeam: (id: number) => Promise<Team>,
    deleteTeam: (id: number) => Promise<void>,
    createTeam: (omittedTeam: Omit<Team, "id" | "userIds" | "enteredGameIds" | "createdAt" | "updatedAt">) => Promise<Team>,
    updateTeam: (id: number, omittedTeam: Omit<Team, "id" | "userIds" | "enteredGameIds" | "createdAt" | "updatedAt">) => Promise<Team>,
    getTeamUsers: (id: number) => Promise<User[]>,
    addTeamUsers: (id: number, userIds: number[]) => Promise<Team>,
    removeTeamUser: (id: number, userId: number) => Promise<Team>,
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