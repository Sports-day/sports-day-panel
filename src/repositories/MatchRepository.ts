import {ApiClient} from "../lib/ApiClient";
import {Match} from "../models/MatchModel";

const getMatches = async (): Promise<Match[]> => {
    const {data} = await ApiClient.get(`/matches`)
    return data.data
}

const getMatch = async (id: Pick<Match, "id">): Promise<Match> => {
    const {data} = await ApiClient.get(`/matches/${id}`)
    return data.data
}

const deleteMatch = async (id: Pick<Match, "id">): Promise<void> => {
    await ApiClient.delete(`/matches/${id}`)
}

const updateMatch = async (id: Pick<Match, "id">, omittedMatch: Omit<Match, "id" | "createdAt" | "updatedAt">): Promise<Match> => {
    const {data} = await ApiClient.put(`/matches/${id}`, omittedMatch)
    return data.data
}

export type MatchRepository = {
    getMatches: () => Promise<Match[]>,
    getMatch: (id: Pick<Match, "id">) => Promise<Match>,
    deleteMatch: (id: Pick<Match, "id">) => Promise<void>,
    updateMatch: (id: Pick<Match, "id">, omittedMatch: Omit<Match, "id" | "createdAt" | "updatedAt">) => Promise<Match>,
}

export const matchRepository: MatchRepository = {
    getMatches,
    getMatch,
    deleteMatch,
    updateMatch,
}