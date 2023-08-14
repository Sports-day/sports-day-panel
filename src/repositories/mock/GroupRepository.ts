import {Group} from "../../models/GroupModel";
import {ApiClient} from "../../lib/ApiClient";
import {GroupRepository} from "../GroupRepository";

const mock: Group[] = [
    {
        id: 1,
        name: "Group A",
        description: "Group A",
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    }
]

const getGroups = async (): Promise<Group[]> => {
    return mock
}

const getGroup = async (id: number): Promise<Group> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteGroup = async (id: number): Promise<void> => {
}

const createGroup = async (omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
    return mock[0]
}

const updateGroup = async (id: number, omittedGroup: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<Group> => {
    return mock[0]
}

export const mockGroupRepository: GroupRepository = {
    getGroups,
    getGroup,
    deleteGroup,
    createGroup,
    updateGroup,
}