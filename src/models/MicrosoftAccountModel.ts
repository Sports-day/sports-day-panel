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
        show: async (id: number): Promise<MicrosoftAccount> => {
            return await repository.getMicrosoftAccount(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteMicrosoftAccount(id)
        },
        setRole: async (id: number, role: string): Promise<MicrosoftAccount> => {
            return await repository.setMicrosoftAccountRole(id, role)
        },
        linkUser: async (id: number, userId: number): Promise<void> => {
            return await repository.linkMicrosoftAccount(id, userId)
        },
        unlinkUser: async (id: number): Promise<void> => {
            return await repository.unlinkMicrosoftAccount(id)
        }
    }
}