import {createContext} from "react";
import {Group} from "../../src/models/GroupModel";
import {Class} from "../../src/models/ClassModel";
import { User } from "../../src/models/UserModel";
import {MicrosoftAccount} from "../../src/models/MicrosoftAccountModel";
import {Team} from "../../src/models/TeamModel";
import {Sport} from "../../src/models/SportModel";
import {Game} from "../../src/models/GameModel";
import {Match} from "../../src/models/MatchModel";
import {Location} from "../../src/models/LocationModel";
import {Image} from "../../src/models/ImageModel";

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

export type SportsContextType = GenericContextType<Sport[]>
export const SportsContext = createContext<SportsContextType>({
    data: [],
    refresh: () => {}
})

export type GamesContextType = GenericContextType<Game[]>
export const GamesContext = createContext<GamesContextType>({
    data: [],
    refresh: () => {}
})

export type GameContextType = GenericContextType<Game>
export const GameContext = createContext<GameContextType>({
    data: {} as Game,
    refresh: () => {}
})

export type MatchesContextType = GenericContextType<Match[]>
export const MatchesContext = createContext<MatchesContextType>({
    data: [],
    refresh: () => {}
})

export type EntriesContextType = GenericContextType<Team[]>
export const EntriesContext = createContext<EntriesContextType>({
    data: [],
    refresh: () => {}
})

export type LocationsContextType = GenericContextType<Location[]>
export const LocationsContext = createContext<LocationsContextType>({
    data: [],
    refresh: () => {}
})

export type ImagesContextType = GenericContextType<Image[]>
export const ImagesContext = createContext<ImagesContextType>({
    data: [],
    refresh: () => {}
})