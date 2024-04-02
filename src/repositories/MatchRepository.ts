import {ApiClient} from "../lib/ApiClient";
import {Match} from "../models/MatchModel";

const getMatches = async (): Promise<Match[]> => {
    const data = await ApiClient().get(`/matches`)
    return data.data
}

const getMatch = async (id: number): Promise<Match> => {
    const data = await ApiClient().get(`/matches/${id}`)
    return data.data
}

const deleteMatch = async (id: number): Promise<void> => {
    await ApiClient().delete(`/matches/${id}`)
}

const updateMatch = async (id: number, omittedMatch: Omit<Match, "id" | "parents" | "children" | "createdAt" | "updatedAt">): Promise<Match> => {
    const data = await ApiClient().put(`/matches/${id}`, omittedMatch)
    return data.data
}

export type MatchRepository = {
    getMatches: () => Promise<Match[]>,
    getMatch: (id: number) => Promise<Match>,
    deleteMatch: (id: number) => Promise<void>,
    updateMatch: (id: number, omittedMatch: Omit<Match, "id" | "parents" | "children" | "createdAt" | "updatedAt">) => Promise<Match>,
}

export const matchRepository: MatchRepository = {
    getMatches,
    getMatch,
    deleteMatch,
    updateMatch,
}