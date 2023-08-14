import {Match} from "../../models/MatchModel";
import {MatchRepository} from "../MatchRepository";

const mock: Match[] = [
    {
        "id": 1,
        "locationId": 1,
        "gameId": 1,
        "sportId": 1,
        "startAt": "2023-05-30T09:30:42",
        "leftTeamId": 1,
        "rightTeamId": 2,
        "leftScore": 13,
        "rightScore": 12,
        "result": "left_win",
        "status": "finished",
        "note": "",
        "judge": "1-2",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
    {
        "id": 2,
        "locationId": 1,
        "gameId": 1,
        "sportId": 1,
        "startAt": "2023-05-30T09:40:42",
        "leftTeamId": 2,
        "rightTeamId": 3,
        "leftScore": 5,
        "rightScore": 10,
        "result": "right_win",
        "status": "finished",
        "note": "",
        "judge": "3-1",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
    {
        "id": 3,
        "locationId": 1,
        "gameId": 1,
        "sportId": 1,
        "startAt": "2023-05-30T09:50:42",
        "leftTeamId": 1,
        "rightTeamId": 3,
        "leftScore": 0,
        "rightScore": 0,
        "result": "left_win",
        "status": "in_progress",
        "note": "",
        "judge": "3-2",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
    //  game 2
    {
        "id": 4,
        "locationId": 1,
        "gameId": 2,
        "sportId": 1,
        "startAt": "2023-05-30T09:30:42",
        "leftTeamId": 2,
        "rightTeamId": 3,
        "leftScore": 13,
        "rightScore": 12,
        "result": "left_win",
        "status": "finished",
        "note": "",
        "judge": "1-2",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
    {
        "id": 5,
        "locationId": 1,
        "gameId": 2,
        "sportId": 1,
        "startAt": "2023-05-30T09:40:42",
        "leftTeamId": 3,
        "rightTeamId": 2,
        "leftScore": 5,
        "rightScore": 10,
        "result": "right_win",
        "status": "finished",
        "note": "",
        "judge": "3-1",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
    //  game 3
    {
        "id": 6,
        "locationId": 2,
        "gameId": 3,
        "sportId": 2,
        "startAt": "2023-05-30T09:30:42",
        "leftTeamId": 2,
        "rightTeamId": 3,
        "leftScore": 13,
        "rightScore": 12,
        "result": "left_win",
        "status": "finished",
        "note": "",
        "judge": "1-2",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
    {
        "id": 7,
        "locationId": 2,
        "gameId": 3,
        "sportId": 2,
        "startAt": "2023-05-30T09:40:42",
        "leftTeamId": 3,
        "rightTeamId": 2,
        "leftScore": 5,
        "rightScore": 10,
        "result": "right_win",
        "status": "finished",
        "note": "",
        "judge": "3-1",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
    //  game 4
    {
        "id": 8,
        "locationId": 2,
        "gameId": 4,
        "sportId": 2,
        "startAt": "2023-05-30T09:30:42",
        "leftTeamId": 2,
        "rightTeamId": 3,
        "leftScore": 13,
        "rightScore": 4,
        "result": "left_win",
        "status": "finished",
        "note": "",
        "judge": "1-2",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
    {
        "id": 9,
        "locationId": 2,
        "gameId": 4,
        "sportId": 2,
        "startAt": "2023-05-30T09:40:42",
        "leftTeamId": 3,
        "rightTeamId": 2,
        "leftScore": 15,
        "rightScore": 10,
        "result": "left_win",
        "status": "finished",
        "note": "",
        "judge": "3-1",
        "parents": [],
        "children": [],
        "createdAt": "2023-05-22T18:00:17.029944",
        "updatedAt": "2023-05-30T09:40:36.208864"
    },
]

const getMatches = async (): Promise<Match[]> => {
    return mock
}

const getMatch = async (id: number): Promise<Match> => {
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteMatch = async (id: number): Promise<void> => {
}

const updateMatch = async (id: number, omittedMatch: Omit<Match, "id" | "parents" | "children" | "createdAt" | "updatedAt">): Promise<Match> => {
    return mock[0]
}

export const mockMatchRepository: MatchRepository = {
    getMatches,
    getMatch,
    deleteMatch,
    updateMatch,
}