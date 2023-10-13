import {GameRepository, gameRepository} from "../repositories/GameRepository";
import {Team} from "./TeamModel";
import {Match} from "./MatchModel";

export type Game = {
    id: number,
    name: string,
    description: string,
    sportId: number,
    type: GameType,
    calculationType: GameCalculationType,
    weight: number,
    tagId: number | null,
    createdAt: string,
    updatedAt: string
}

export type GameType = "tournament" | "league"
export type GameCalculationType = "total_score" | "diff_score"

export type TournamentResult = {
    gameId: number,
    teams: TournamentTeamResult[],
    createdAt: string,
}

export type TournamentTeamResult = {
    teamId: number,
    rank: number,
}

export type LeagueResult = {
    gameId: number,
    finished: boolean,
    teams: LeagueTeamResult[],
    createdAt: string,
}

export type LeagueTeamResult = {
    teamId: number,
    rank: number,
    win: number,
    lose: number,
    draw: number,
    score: number,
    goal: number,
    loseGoal: number,
    goalDiff: number,
}

export const gameFactory = (repo?: GameRepository) => {
    const repository = repo ?? gameRepository

    return {
        index: async (filter: boolean = false): Promise<Game[]> => {
            return await repository.getGames(filter)
        },
        show: async (id: number): Promise<Game> => {
            return await repository.getGame(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteGame(id)
        },
        create: async (omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">): Promise<Game> => {
            return await repository.createGame(omittedGame)
        },
        update: async (id: number, omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">): Promise<Game> => {
            return await repository.updateGame(id, omittedGame)
        },
        getGameMatches: async (id: number): Promise<Match[]> => {
            return await repository.getGameMatches(id)
        },
        deleteGameMatches: async (id: number): Promise<void> => {
            return await repository.deleteGameMatches(id)
        },
        getGameEntries: async (id: number): Promise<Team[]> => {
            return await repository.getGameEntries(id)
        },
        addGameEntries: async (id: number, teamIds: number[]): Promise<Team[]> => {
            return await repository.addGameEntries(id, teamIds)
        },
        removeGameEntry: async (id: number, teamId: number): Promise<void> => {
            return await repository.removeGameEntry(id, teamId)
        },
        makeTournamentTree: async (id: number, parentMatchId: number | null): Promise<Match> => {
            return await repository.makeTournamentTree(id, parentMatchId)
        },
        updateTournamentTree: async (id: number): Promise<void> => {
            return await repository.updateTournamentTree(id)
        },
        getTournamentResult: async (id: number): Promise<TournamentResult> => {
            return await repository.getTournamentResult(id)
        },
        makeLeagueMatches: async (id: number, locationId: number | null = null): Promise<Match[]> => {
            return await repository.makeLeagueMatches(id, locationId)
        },
        getLeagueResult: async (id: number, restrict: boolean = false): Promise<LeagueResult> => {
            return await repository.getLeagueResult(id, restrict)
        },
    }
}