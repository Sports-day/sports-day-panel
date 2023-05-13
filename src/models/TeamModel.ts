import {teamRepository, TeamRepository} from "../repositories/TeamRepository";
import {User} from "./UserModel";

export type Team = {
    id: number,
    name: string,
    classId: number,
    userIds: number[],
    createdAt: string,
    updatedAt: string
}

export const teamFactory = (repo?: TeamRepository) => {
    const repository = repo ?? teamRepository

    return {
        index: async (): Promise<Team[]> => {
            return await repository.getTeams()
        },
        show: async (id: Pick<Team, "id">): Promise<Team> => {
            return await repository.getTeam(id)
        },
        delete: async (id: Pick<Team, "id">): Promise<void> => {
            return await repository.deleteTeam(id)
        },
        create: async (omittedTeam: Omit<Team, "id" | "userIds" | "createdAt" | "updatedAt">): Promise<Team> => {
            return await repository.createTeam(omittedTeam)
        },
        update: async (id: Pick<Team, "id">, omittedTeam: Omit<Team, "id" | "userIds" | "createdAt" | "updatedAt">): Promise<Team> => {
            return await repository.updateTeam(id, omittedTeam)
        },
        getTeamUsers: async (id: Pick<Team, "id">): Promise<User[]> => {
            return await repository.getTeamUsers(id)
        },
        addTeamUsers: async (id: Pick<Team, "id">, userIds: Pick<User, "id">[]): Promise<Team> => {
            return await repository.addTeamUsers(id, userIds)
        },
        removeTeamUser: async (id: Pick<Team, "id">, userId: Pick<User, "id">): Promise<Team> => {
            return await repository.removeTeamUser(id, userId)
        }
    }
}