import {teamRepository, TeamRepository} from "../repositories/TeamRepository";
import {User} from "./UserModel";

export type Team = {
    id: number,
    name: string,
    description: string,
    classId: number,
    teamTagsId: number | null,
    userIds: number[],
    enteredGameIds: number[],
    createdAt: string,
    updatedAt: string
}

export const teamFactory = (repo?: TeamRepository) => {
    const repository = repo ?? teamRepository

    return {
        index: async (): Promise<Team[]> => {
            return await repository.getTeams()
        },
        show: async (id: number): Promise<Team> => {
            return await repository.getTeam(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteTeam(id)
        },
        create: async (omittedTeam: Omit<Team, "id" | "userIds" | "enteredGameIds" | "createdAt" | "updatedAt">): Promise<Team> => {
            return await repository.createTeam(omittedTeam)
        },
        update: async (id: number, omittedTeam: Omit<Team, "id" | "userIds" | "enteredGameIds" | "createdAt" | "updatedAt">): Promise<Team> => {
            return await repository.updateTeam(id, omittedTeam)
        },
        getTeamUsers: async (id: number): Promise<User[]> => {
            return await repository.getTeamUsers(id)
        },
        addTeamUsers: async (id: number, userIds: number[]): Promise<Team> => {
            return await repository.addTeamUsers(id, userIds)
        },
        removeTeamUser: async (id: number, userId: number): Promise<Team> => {
            return await repository.removeTeamUser(id, userId)
        }
    }
}