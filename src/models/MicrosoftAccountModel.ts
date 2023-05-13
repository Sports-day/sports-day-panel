import {microsoftAccountRepository, MicrosoftAccountRepository} from "../repositories/MicrosoftAccountRepository";

export type MicrosoftAccount = {
    id: number,
    email: string,
    name: string,
    mailAccountName: string,
    role: string,
    userId: number,
    firstLogin: string,
    lastLogin: string
}

export const microsoftAccountFactory = (repo?: MicrosoftAccountRepository) => {
    const repository = repo ?? microsoftAccountRepository

    return {
        index: async (): Promise<MicrosoftAccount[]> => {
            return await repository.getMicrosoftAccounts()
        },
        show: async (id: Pick<MicrosoftAccount, "id">): Promise<MicrosoftAccount> => {
            return await repository.getMicrosoftAccount(id)
        },
        delete: async (id: Pick<MicrosoftAccount, "id">): Promise<void> => {
            return await repository.deleteMicrosoftAccount(id)
        },
        setRole: async (id: Pick<MicrosoftAccount, "id">, role: string): Promise<MicrosoftAccount> => {
            return await repository.setMicrosoftAccountRole(id, role)
        },
        linkUser: async (id: Pick<MicrosoftAccount, "id">, userId: number): Promise<void> => {
            return await repository.linkMicrosoftAccount(id, userId)
        },
        unlinkUser: async (id: Pick<MicrosoftAccount, "id">): Promise<void> => {
            return await repository.unlinkMicrosoftAccount(id)
        }
    }
}