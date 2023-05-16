import {userRepository, UserRepository} from "../repositories/UserRepository";
import {MicrosoftAccount} from "./MicrosoftAccountModel";
import {Team} from "./TeamModel";

export type User = {
    id: number,
    name: string,
    studentId: number,
    gender: Gender,
    classId: number,
    teamIds: number[],
    createdAt: string,
    updatedAt: string
}

export type Gender = "male" | "female"

export const userFactory = (repo?: UserRepository) => {
    const repository = repo ?? userRepository

    return {
        index: async (): Promise<User[]> => {
            return await repository.getUsers()
        },
        show: async (id: number): Promise<User> => {
            return await repository.getUser(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteUser(id)
        },
        create: async (omittedUser: Omit<User, "id" | "teamIds" | "createdAt" | "updatedAt">): Promise<User> => {
            return await repository.createUser(omittedUser)
        },
        update: async (id: number, omittedUser: Omit<User, "id" | "teamIds" | "createdAt" | "updatedAt">): Promise<User> => {
            return await repository.updateUser(id, omittedUser)
        },
        getLinkedMicrosoftAccounts: async (id: number): Promise<MicrosoftAccount[]> => {
            return await repository.getLinkedMicrosoftAccounts(id)
        },
        getTeams: async (id: number): Promise<Team[]> => {
            return await repository.getTeams(id)
        }
    }
}