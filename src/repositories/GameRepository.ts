import {Game, LeagueResult, TournamentResult} from "../models/GameModel";
import {ApiClient} from "../lib/ApiClient";
import {Match} from "../models/MatchModel";
import {Team} from "../models/TeamModel";

const getGames = async (): Promise<Game[]> => {
    const {data} = await ApiClient.get("/games")
    return data.data
}

const getGame = async (id: Pick<Game, "id">): Promise<Game> => {
    const {data} = await ApiClient.get(`/games/${id}`)
    return data.data
}

const deleteGame = async (id: Pick<Game, "id">): Promise<void> => {
    await ApiClient.delete(`/games/${id}`)
}

const createGame = async (omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">): Promise<Game> => {
    const {data} = await ApiClient.post(`/games`, omittedGame)
    return data.data
}

const updateGame = async (id: Pick<Game, "id">, omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">): Promise<Game> => {
    const {data} = await ApiClient.put(`/games/${id}`, omittedGame)
    return data.data
}

const getGameMatches = async (id: Pick<Game, "id">): Promise<Match[]> => {
    const {data} = await ApiClient.get(`/games/${id}/matches`)
    return data.data
}

const deleteGameMatches = async (id: Pick<Game, "id">): Promise<void> => {
    await ApiClient.delete(`/games/${id}/matches`)
}

const getGameEntries = async (id: Pick<Game, "id">): Promise<Team[]> => {
    const {data} = await ApiClient.get(`/games/${id}/entries`)
    return data.data
}

const addGameEntries = async (id: Pick<Game, "id">, teamIds: Pick<Team, "id">[]): Promise<Team[]> => {
    const {data} = await ApiClient.post(
        `/games/${id}/entries`,
        {
            teamIds: teamIds
        }
    )
    return data.data
}

const removeGameEntry = async (id: Pick<Game, "id">, teamId: Pick<Team, "id">): Promise<void> => {
    await ApiClient.delete(`/games/${id}/entries/${teamId}`)
}

const makeTournamentTree = async (id: Pick<Game, "id">, parentMatchId: Pick<Match, "id"> | null): Promise<Match> => {
    const {data} = await ApiClient.post(
        `/games/${id}/tournament`,
        {
            parentId: parentMatchId
        }
    )
    return data.data
}

const updateTournamentTree = async (id: Pick<Game, "id">): Promise<void> => {
    await ApiClient.post(`/games/${id}/tournament/update-tree`)
}

const getTournamentResult = async (id: Pick<Game, "id">): Promise<TournamentResult> => {
    const {data} = await ApiClient.get(`/games/${id}/tournament/result`)
    return data.data
}

const makeLeagueMatches = async (id: Pick<Game, "id">): Promise<Match[]> => {
    const {data} = await ApiClient.post(`/games/${id}/league`)
    return data.data
}

const getLeagueResult = async (id: Pick<Game, "id">): Promise<LeagueResult> => {
    const {data} = await ApiClient.get(`/games/${id}/league/result`)
    return data.data
}

export type GameRepository = {
    getGames: () => Promise<Game[]>,
    getGame: (id: Pick<Game, "id">) => Promise<Game>,
    deleteGame: (id: Pick<Game, "id">) => Promise<void>,
    createGame: (omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">) => Promise<Game>,
    updateGame: (id: Pick<Game, "id">, omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">) => Promise<Game>,
    getGameMatches: (id: Pick<Game, "id">) => Promise<Match[]>,
    deleteGameMatches: (id: Pick<Game, "id">) => Promise<void>,
    getGameEntries: (id: Pick<Game, "id">) => Promise<Team[]>,
    addGameEntries: (id: Pick<Game, "id">, teamIds: Pick<Team, "id">[]) => Promise<Team[]>,
    removeGameEntry: (id: Pick<Game, "id">, teamId: Pick<Team, "id">) => Promise<void>,
    makeTournamentTree: (id: Pick<Game, "id">, parentMatchId: Pick<Match, "id"> | null) => Promise<Match>,
    updateTournamentTree: (id: Pick<Game, "id">) => Promise<void>,
    getTournamentResult: (id: Pick<Game, "id">) => Promise<TournamentResult>,
    makeLeagueMatches: (id: Pick<Game, "id">) => Promise<Match[]>,
    getLeagueResult: (id: Pick<Game, "id">) => Promise<LeagueResult>,
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