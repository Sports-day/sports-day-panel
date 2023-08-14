import {User} from "../../models/UserModel";
import {MicrosoftAccount} from "../../models/MicrosoftAccountModel";
import {Team, teamFactory} from "../../models/TeamModel";
import {UserRepository} from "../UserRepository";

const mock: User[] = [
    {
        id: 1,
        name: "山田太郎(ゲスト)",
        studentId: "guest",
        gender: "male",
        classId: 1,
        teamIds: [1],
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 2,
        name: "高専太郎",
        studentId: "Kosen",
        gender: "male",
        classId: 1,
        teamIds: [1],
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 3,
        name: "高専花子",
        studentId: "Kosen",
        gender: "female",
        classId: 1,
        teamIds: [1],
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
]

const getUsers = async (): Promise<User[]> => {
    return mock
}

const getUser = async (id: number): Promise<User> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteUser = async (id: number): Promise<void> => {
}

const createUser = async (omittedUser: Omit<User, "id" | "teamIds" | "createdAt" | "updatedAt">): Promise<User> => {
    return mock[0]
}

const updateUser = async (id: number, omittedUser: Omit<User, "id" | "teamIds" | "createdAt" | "updatedAt">): Promise<User> => {
    return mock[0]
}

const getLinkedMicrosoftAccounts = async (id: number): Promise<MicrosoftAccount[]> => {
    return []
}

const getTeams = async (id: number): Promise<Team[]> => {
    const ids = mock.find((c) => c.id === id)?.teamIds

    if (ids === undefined) {
        return []
    }

    const teams = ids.map(async (id) => await teamFactory().show(id))
    return await Promise.all(teams)
}

export const mockUserRepository: UserRepository = {
    getUsers,
    getUser,
    deleteUser,
    createUser,
    updateUser,
    getLinkedMicrosoftAccounts,
    getTeams,
}