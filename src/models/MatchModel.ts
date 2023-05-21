import {MatchRepository, matchRepository} from "../repositories/MatchRepository";

export type Match = {
    id: number,
    locationId: number | null,
    gameId: number,
    sportId: number,
    startAt: string,
    leftTeamId: number | null,
    rightTeamId: number | null,
    leftScore: number,
    rightScore: number,
    result: MatchResult,
    status: MatchStatus,
    note: string | null,
    judge: string | null,
    parents: number[],
    children: number[],
    createdAt: string,
    updatedAt: string
}


export type MatchResult = "left_win" | "right_win" | "draw"
export type MatchStatus = "standby" | "in_progress" | "finished" | "cancelled"

export const matchFactory = (repo?: MatchRepository) => {
    const repository = repo ?? matchRepository

    return {
        index: async (): Promise<Match[]> => {
            return await repository.getMatches()
        },
        show: async (id: number): Promise<Match> => {
            return await repository.getMatch(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteMatch(id)
        },
        update: async (id: number, omittedMatch: Omit<Match, "id" | "parents" | "children" | "createdAt" | "updatedAt">): Promise<Match> => {
            return await repository.updateMatch(id, omittedMatch)
        }
    }
}