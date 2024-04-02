'use client'
import {createContext} from "react";
import { User } from "@/src/models/UserModel";
import {Team} from "@/src/models/TeamModel";
import {Game} from "@/src/models/GameModel";
import {Match} from "@/src/models/MatchModel";
import {Location} from "@/src/models/LocationModel";
import {Image} from "@/src/models/ImageModel";

export type GenericContextType<T> = {
    data: T
    refresh: VoidFunction
}

export type UsersContextType = GenericContextType<User[]>
export const UsersContext = createContext<UsersContextType>({
    data: [],
    refresh: () => {}
})

export type TeamsContextType = GenericContextType<Team[]>
export const TeamsContext = createContext<TeamsContextType>({
    data: [],
    refresh: () => {}
})

export type GamesContextType = GenericContextType<Game[]>
export const GamesContext = createContext<GamesContextType>({
    data: [],
    refresh: () => {}
})


export type MatchesContextType = GenericContextType<Match[]>
export const MatchesContext = createContext<MatchesContextType>({
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
