import {MicrosoftAccount} from "../models/MicrosoftAccountModel";
import {ApiClient} from "../lib/ApiClient";

const getMicrosoftAccounts = async (): Promise<MicrosoftAccount[]> => {
    const {data} = await ApiClient.get("/microsoft-accounts")
    return data.data
}

const getMicrosoftAccount = async (id: Pick<MicrosoftAccount, "id">): Promise<MicrosoftAccount> => {
    const {data} = await ApiClient.get(`/microsoft-accounts/${id}`)
    return data.data
}

const deleteMicrosoftAccount = async (id: Pick<MicrosoftAccount, "id">): Promise<void> => {
    await ApiClient.delete(`/microsoft-accounts/${id}`)
}

const setMicrosoftAccountRole = async (id: Pick<MicrosoftAccount, "id">, role: string): Promise<MicrosoftAccount> => {
    const {data} = await ApiClient.put(`/microsoft-accounts/${id}/role`, {role})
    return data.data
}

const linkMicrosoftAccount = async (id: Pick<MicrosoftAccount, "id">, userId: number): Promise<void> => {
    await ApiClient.put(`/microsoft-accounts/${id}/link-user`, {userId})
}

const unlinkMicrosoftAccount = async (id: Pick<MicrosoftAccount, "id">): Promise<void> => {
    await ApiClient.delete(`/microsoft-accounts/${id}/link-user`)
}

export type MicrosoftAccountRepository = {
    getMicrosoftAccounts: () => Promise<MicrosoftAccount[]>,
    getMicrosoftAccount: (id: Pick<MicrosoftAccount, "id">) => Promise<MicrosoftAccount>,
    deleteMicrosoftAccount: (id: Pick<MicrosoftAccount, "id">) => Promise<void>,
    setMicrosoftAccountRole: (id: Pick<MicrosoftAccount, "id">, role: string) => Promise<MicrosoftAccount>,
    linkMicrosoftAccount: (id: Pick<MicrosoftAccount, "id">, userId: number) => Promise<void>,
    unlinkMicrosoftAccount: (id: Pick<MicrosoftAccount, "id">) => Promise<void>,
}

export const microsoftAccountRepository: MicrosoftAccountRepository = {
    getMicrosoftAccounts,
    getMicrosoftAccount,
    deleteMicrosoftAccount,
    setMicrosoftAccountRole,
    linkMicrosoftAccount,
    unlinkMicrosoftAccount,
}