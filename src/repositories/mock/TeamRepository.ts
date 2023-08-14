import {Team} from "../../models/TeamModel";
import {User, userFactory} from "../../models/UserModel";
import {TeamRepository} from "../TeamRepository";

const mock: Team[] = [
    {
        id: 1,
        name: "Team A",
        description: "Team A",
        classId: 1,
        userIds: [1, 2, 3],
        enteredGameIds: [1],
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 2,
        name: "Team B",
        description: "Team B",
        classId: 2,
        userIds: [],
        enteredGameIds: [1, 2, 3, 4],
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 3,
        name: "Team C",
        description: "Team C",
        classId: 2,
        userIds: [],
        enteredGameIds: [1, 2, 3, 4],
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    }
]

const getTeams = async (): Promise<Team[]> => {
    return mock
}

const getTeam = async (id: number): Promise<Team> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteTeam = async (id: number): Promise<void> => {
}

const createTeam = async (omittedTeam: Omit<Team, "id" | "userIds" | "enteredGameIds" | "createdAt" | "updatedAt">): Promise<Team> => {
    return mock[0]
}

const updateTeam = async (id: number, omittedTeam: Omit<Team, "id" | "userIds" | "enteredGameIds" | "createdAt" | "updatedAt">): Promise<Team> => {
    return mock[0]
}

const getTeamUsers = async (id: number): Promise<User[]> => {
    const ids = mock.find((c) => c.id === id)?.userIds
    if (ids === undefined) {
        return []
    }

    const users = ids.map(async (id) => await userFactory().show(id))
    return Promise.all(users)
}

const addTeamUsers = async (id: number, userIds: number[]): Promise<Team> => {
    return mock[0]
}

const removeTeamUser = async (id: number, userId: number): Promise<Team> => {
    return mock[0]
}

export const mockTeamRepository: TeamRepository = {
    getTeams,
    getTeam,
    deleteTeam,
    createTeam,
    updateTeam,
    getTeamUsers,
    addTeamUsers,
    removeTeamUser,
}