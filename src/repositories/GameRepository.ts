import {Game, LeagueResult, TournamentResult} from "../models/GameModel";
import {ApiClient} from "../lib/ApiClient";
import {Match} from "../models/MatchModel";
import {Team} from "../models/TeamModel";

const getGames = async (filter: boolean): Promise<Game[]> => {
    const data = await ApiClient().getWithParams("/games",
        {
            filter: filter
        })
    return data.data
}

const getGame = async (id: number): Promise<Game> => {
    const data = await ApiClient().get(`/games/${id}`)
    return data.data
}

const deleteGame = async (id: number): Promise<void> => {
    await ApiClient().delete(`/games/${id}`)
}

const createGame = async (omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">): Promise<Game> => {
    const data = await ApiClient().post(`/games`, omittedGame)
    return data.data
}

const updateGame = async (id: number, omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">): Promise<Game> => {
    const data = await ApiClient().put(`/games/${id}`, omittedGame)
    return data.data
}

const getGameMatches = async (id: number): Promise<Match[]> => {
    const data = await ApiClient().get(`/games/${id}/matches`)
    return data.data
}

const deleteGameMatches = async (id: number): Promise<void> => {
    await ApiClient().delete(`/games/${id}/matches`)
}

const getGameEntries = async (id: number): Promise<Team[]> => {
    const data = await ApiClient().get(`/games/${id}/entries`)
    return data.data
}

const addGameEntries = async (id: number, teamIds: number[]): Promise<Team[]> => {
    const data = await ApiClient().post(
        `/games/${id}/entries`,
        {
            teamIds: teamIds
        }
    )
    return data.data
}

const removeGameEntry = async (id: number, teamId: number): Promise<void> => {
    await ApiClient().delete(`/games/${id}/entries/${teamId}`)
}

const makeTournamentTree = async (id: number, parentMatchId: number | null): Promise<Match> => {
    const data = await ApiClient().post(
        `/games/${id}/tournament`,
        {
            parentId: parentMatchId
        }
    )
    return data.data
}

const updateTournamentTree = async (id: number): Promise<void> => {
    await ApiClient().post(`/games/${id}/tournament/update-tree`, {})
}

const getTournamentResult = async (id: number): Promise<TournamentResult> => {
    const data = await ApiClient().get(`/games/${id}/tournament/result`)
    return data.data
}

const makeLeagueMatches = async (id: number, locationId: number | null): Promise<Match[]> => {
    const data = await ApiClient().post(
        `/games/${id}/league`,
        {
            locationId: locationId
        }
    )
    return data.data
}

const getLeagueResult = async (id: number, restrict: boolean): Promise<LeagueResult> => {
    const data = await ApiClient().getWithParams(
        `/games/${id}/league/result`,
        {
            restrict: restrict
        }
    )
    return data.data
}

export type GameRepository = {
    getGames: (filter: boolean) => Promise<Game[]>,
    getGame: (id: number) => Promise<Game>,
    deleteGame: (id: number) => Promise<void>,
    createGame: (omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">) => Promise<Game>,
    updateGame: (id: number, omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">) => Promise<Game>,
    getGameMatches: (id: number) => Promise<Match[]>,
    deleteGameMatches: (id: number) => Promise<void>,
    getGameEntries: (id: number) => Promise<Team[]>,
    addGameEntries: (id: number, teamIds: number[]) => Promise<Team[]>,
    removeGameEntry: (id: number, teamId: number) => Promise<void>,
    makeTournamentTree: (id: number, parentMatchId: number | null) => Promise<Match>,
    updateTournamentTree: (id: number) => Promise<void>,
    getTournamentResult: (id: number) => Promise<TournamentResult>,
    makeLeagueMatches: (id: number, locationId: number | null) => Promise<Match[]>,
    getLeagueResult: (id: number, restrict: boolean) => Promise<LeagueResult>,
}

export const gameRepository: GameRepository = {
    getGames,
    getGame,
    deleteGame,
    createGame,
    updateGame,
    getGameMatches,
    deleteGameMatches,
    getGameEntries,
    addGameEntries,
    removeGameEntry,
    makeTournamentTree,
    updateTournamentTree,
    getTournamentResult,
    makeLeagueMatches,
    getLeagueResult,
}