import {MatchRepository, matchRepository} from "../repositories/MatchRepository";

export type Match = {
    id: number,
    locationId: number,
    gameId: number,
    sportId: number,
    startAt: string,
    leftTeamId: number,
    rightTeamId: number,
    leftScore: number,
    rightScore: number,
    result: MatchResult,
    status: MatchStatus,
    note: string | null,
    judge: string | null,
    createdAt: string,
    updatedAt: string
}


type MatchResult = "left_win" | "right_win" | "draw"
type MatchStatus = "standby" | "in_progress" | "finished" | "cancelled"

export const matchFactory = (repo?: MatchRepository) => {
    const repository = repo ?? matchRepository

    return {
        index: async (): Promise<Match[]> => {
            return await repository.getMatches()
        },
        show: async (id: Pick<Match, "id">): Promise<Match> => {
            return await repository.getMatch(id)
        },
        delete: async (id: Pick<Match, "id">): Promise<void> => {
            return await repository.deleteMatch(id)
        },
        update: async (id: Pick<Match, "id">, omittedMatch: Omit<Match, "id" | "createdAt" | "updatedAt">): Promise<Match> => {
            return await repository.updateMatch(id, omittedMatch)
        }
    }
}