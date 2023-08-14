import {Game, LeagueResult, TournamentResult} from "../../models/GameModel";
import {ApiClient} from "../../lib/ApiClient";
import {Match, matchFactory} from "../../models/MatchModel";
import {Team, teamFactory} from "../../models/TeamModel";
import {GameRepository} from "../GameRepository";

const mock: Game[] = [
    {
        id: 1,
        name: "リーグA",
        description: "リーグA",
        sportId: 1,
        type: "league",
        calculationType: "total_score",
        weight: 2,
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 2,
        name: "リーグB",
        description: "リーグB",
        sportId: 1,
        type: "league",
        calculationType: "total_score",
        weight: 1,
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 3,
        name: "リーグA",
        description: "リーグA",
        sportId: 2,
        type: "league",
        calculationType: "total_score",
        weight: 2,
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    },
    {
        id: 4,
        name: "リーグB",
        description: "リーグB",
        sportId: 2,
        type: "league",
        calculationType: "total_score",
        weight: 1,
        createdAt: "2021-01-01 00:00:00",
        updatedAt: "2021-01-01 00:00:00"
    }
]

const getGames = async (): Promise<Game[]> => {
    return mock
}

const getGame = async (id: number): Promise<Game> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteGame = async (id: number): Promise<void> => {
}

const createGame = async (omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">): Promise<Game> => {
    return mock[0]
}

const updateGame = async (id: number, omittedGame: Omit<Game, "id" | "createdAt" | "updatedAt">): Promise<Game> => {
    return mock[0]
}

const getGameMatches = async (id: number): Promise<Match[]> => {
    const matches = await matchFactory().index()

    return matches.filter((m) => m.gameId === id)
}

const deleteGameMatches = async (id: number): Promise<void> => {
}

const getGameEntries = async (id: number): Promise<Team[]> => {
    const teams = await teamFactory().index()

    return teams.filter((t) => t.enteredGameIds.includes(id))
}

const addGameEntries = async (id: number, teamIds: number[]): Promise<Team[]> => {
    return []
}

const removeGameEntry = async (id: number, teamId: number): Promise<void> => {
}

const makeTournamentTree = async (id: number, parentMatchId: number | null): Promise<Match> => {
    return await matchFactory().show(1)
}

const updateTournamentTree = async (id: number): Promise<void> => {
}

const getTournamentResult = async (id: number): Promise<TournamentResult> => {
    return {
        gameId: id,
        teams: [],
        createdAt: "2021-01-01 00:00:00",
    }
}

const makeLeagueMatches = async (id: number, locationId: number | null): Promise<Match[]> => {
    return []
}

const getLeagueResult = async (id: number): Promise<LeagueResult> => {
    if (id != 1) {
        if (id == 3) {
            return {
                gameId: id,
                finished: false,
                teams: [
                    {
                        teamId: 2,
                        rank: 2,
                        win: 2,
                        lose: 0,
                        draw: 0,
                        score: 2,
                        goal: 20,
                        loseGoal: 0,
                        goalDiff: 20,
                    },
                    {
                        teamId: 3,
                        rank: 3,
                        win: 1,
                        lose: 0,
                        draw: 0,
                        score: 1,
                        goal: 10,
                        loseGoal: 0,
                        goalDiff: 10,
                    },
                ],
                createdAt: "2021-01-01 00:00:00",
            }
        } else {
            return {
                gameId: id,
                finished: false,
                teams: [],
                createdAt: "2021-01-01 00:00:00",
            }
        }
    }
    // リーグA
    return {
        gameId: id,
        finished: true,
        teams: [
            {
                teamId: 1,
                rank: 1,
                win: 3,
                lose: 0,
                draw: 0,
                score: 3,
                goal: 30,
                loseGoal: 0,
                goalDiff: 30,
            },
            {
                teamId: 2,
                rank: 2,
                win: 2,
                lose: 0,
                draw: 0,
                score: 2,
                goal: 20,
                loseGoal: 0,
                goalDiff: 20,
            },
            {
                teamId: 3,
                rank: 3,
                win: 1,
                lose: 0,
                draw: 0,
                score: 1,
                goal: 10,
                loseGoal: 0,
                goalDiff: 10,
            },
        ],
        createdAt: "2021-01-01 00:00:00",
    }
}

export const mockGameRepository: GameRepository = {
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