import {createContext} from "react";
import {Group} from "../../../src/models/GroupModel";
import {Class} from "../../../src/models/ClassModel";
import { User } from "../../../src/models/UserModel";
import {MicrosoftAccount} from "../../../src/models/MicrosoftAccountModel";
import {Team} from "../../../src/models/TeamModel";

export type GenericContextType<T> = {
    data: T
    refresh: VoidFunction
}

export type GroupsContextType = GenericContextType<Group[]>
export const GroupsContext = createContext<GroupsContextType>({
    data: [],
    refresh: () => {}
})


export type ClassesContextType = GenericContextType<Class[]>
export const ClassesContext = createContext<ClassesContextType>({
    data: [],
    refresh: () => {}
})

export type UsersContextType = GenericContextType<User[]>
export const UsersContext = createContext<UsersContextType>({
    data: [],
    refresh: () => {}
})


export type MicrosoftAccountsContextType = GenericContextType<MicrosoftAccount[]>
export const MicrosoftAccountsContext = createContext<MicrosoftAccountsContextType>({
    data: [],
    refresh: () => {}
})

export type TeamsContextType = GenericContextType<Team[]>
export const TeamsContext = createContext<TeamsContextType>({
    data: [],
    refresh: () => {}
})
