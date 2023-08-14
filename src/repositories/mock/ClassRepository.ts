import {ApiClient} from "../../lib/ApiClient";
import {Class} from "../../models/ClassModel";
import {User} from "../../models/UserModel";
import {ClassRepository} from "../ClassRepository";

const mock: Class[] = [
    {
        id: 1,
        name: "1年1組",
        description: "1年1組",
        groupId: 1,
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 2,
        name: "1年2組",
        description: "1年2組",
        groupId: 1,
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
]

const getClasses = async (): Promise<Class[]> => {
    return mock
}

const getClass = async (id: number): Promise<Class> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}


const deleteClass = async (id: number): Promise<void> => {
}

const createClass = async (omittedClass: Omit<Class, "id" | "createdAt" | "updatedAt">): Promise<Class> => {
    return mock[0]
}

const updateClass = async (id: number, omittedClass: Omit<Class, "id" | "createdAt" | "updatedAt">): Promise<Class> => {
    return mock[0]
}

const getClassUsers = async (id: number): Promise<User[]> => {
    return []
}

export const mockClassRepository: ClassRepository = {
    getClasses,
    getClass,
    deleteClass,
    createClass,
    updateClass,
    getClassUsers,
}