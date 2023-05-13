import {userRepository, UserRepository} from "../repositories/UserRepository";
import {MicrosoftAccount} from "./MicrosoftAccountModel";
import {Team} from "./TeamModel";

export type User = {
    id: number,
    name: string,
    studentId: number,
    gender: Gender,
    classId: number,
    createdAt: string,
    updatedAt: string
}

export type Gender = "MALE" | "FEMALE"

export const userFactory = (repo?: UserRepository) => {
    const repository = repo ?? userRepository

    return {
        index: async (): Promise<User[]> => {
            return await repository.getUsers()
        },
        show: async (id: Pick<User, "id">): Promise<User> => {
            return await repository.getUser(id)
        },
        delete: async (id: Pick<User, "id">): Promise<void> => {
            return await repository.deleteUser(id)
        },
        create: async (omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
            return await repository.createUser(omittedUser)
        },
        update: async (id: Pick<User, "id">, omittedUser: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
            return await repository.updateUser(id, omittedUser)
        },
        getLinkedMicrosoftAccounts: async (id: Pick<User, "id">): Promise<MicrosoftAccount[]> => {
            return await repository.getLinkedMicrosoftAccounts(id)
        },
        getTeams: async (id: Pick<User, "id">): Promise<Team[]> => {
            return await repository.getTeams(id)
        }
    }
}