import {ApiClient} from "../lib/ApiClient";
import {Class} from "../models/ClassModel";
import {User} from "../models/UserModel";

const getClasses = async (): Promise<Class[]> => {
    const data = await ApiClient().get("/classes")
    return data.data
}

const getClass = async (id: number): Promise<Class> => {
    const data = await ApiClient().get(`/classes/${id}`)
    return data.data
}


const deleteClass = async (id: number): Promise<void> => {
    await ApiClient().delete(`/classes/${id}`)
}

const createClass = async (omittedClass: Omit<Class, "id" | "createdAt" | "updatedAt">): Promise<Class> => {
    const data = await ApiClient().post(`/classes`, omittedClass)
    return data.data
}

const updateClass = async (id: number, omittedClass: Omit<Class, "id" | "createdAt" | "updatedAt">): Promise<Class> => {
    const data = await ApiClient().put(`/classes/${id}`, omittedClass)
    return data.data
}

const getClassUsers = async (id: number): Promise<User[]> => {
    const data = await ApiClient().get(`/classes/${id}/users`)
    return data.data
}

export type ClassRepository = {
    getClasses: () => Promise<Class[]>,
    getClass: (id: number) => Promise<Class>,
    deleteClass: (id: number) => Promise<void>,
    createClass: (omittedClass: Omit<Class, "id" | "createdAt" | "updatedAt">) => Promise<Class>,
    updateClass: (id: number, omittedClass: Omit<Class, "id" | "createdAt" | "updatedAt">) => Promise<Class>,
    getClassUsers: (id: number) => Promise<User[]>,
}

export const classRepository: ClassRepository = {
    getClasses,
    getClass,
    deleteClass,
    createClass,
    updateClass,
    getClassUsers,
}