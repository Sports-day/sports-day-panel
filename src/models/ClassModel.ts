import {classRepository, ClassRepository} from "../repositories/ClassRepository";
import {User} from "./UserModel";

export type Class = {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export const classFactory = (repo?: ClassRepository) => {
    const repository = repo ?? classRepository

    return {
        index: async (): Promise<Class[]> => {
            return await repository.getClasses()
        },
        show: async (id: number): Promise<Class> => {
            return await repository.getClass(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteClass(id)
        },
        create: async (omittedClass: Omit<Class, "id" | "createdAt" | "updatedAt">): Promise<Class> => {
            return await repository.createClass(omittedClass)
        },
        update: async (id: number, omittedClass: Omit<Class, "id" | "createdAt" | "updatedAt">): Promise<Class> => {
            return await repository.updateClass(id, omittedClass)
        },
        getUsers: async (id: number): Promise<User[]> => {
            return await repository.getClassUsers(id)
        }
    }
}