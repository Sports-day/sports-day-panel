import {MicrosoftAccount} from "../models/MicrosoftAccountModel";
import {ApiClient} from "../lib/ApiClient";

const getMicrosoftAccounts = async (): Promise<MicrosoftAccount[]> => {
    const {data} = await ApiClient.get("/microsoft-accounts")
    return data.data
}

const getMicrosoftAccount = async (id: number | "me"): Promise<MicrosoftAccount> => {
    const {data} = await ApiClient.get(`/microsoft-accounts/${id}`)
    return data.data
}

const deleteMicrosoftAccount = async (id: number | "me"): Promise<void> => {
    await ApiClient.delete(`/microsoft-accounts/${id}`)
}

const setMicrosoftAccountRole = async (id: number | "me", role: string): Promise<MicrosoftAccount> => {
    const {data} = await ApiClient.put(`/microsoft-accounts/${id}/role`, {role})
    return data.data
}

const linkMicrosoftAccount = async (id: number | "me", userId: number): Promise<void> => {
    await ApiClient.put(`/microsoft-accounts/${id}/link-user`, {userId})
}

const unlinkMicrosoftAccount = async (id: number | "me"): Promise<void> => {
    await ApiClient.delete(`/microsoft-accounts/${id}/link-user`)
}

export type MicrosoftAccountRepository = {
    getMicrosoftAccounts: () => Promise<MicrosoftAccount[]>,
    getMicrosoftAccount: (id: number | "me") => Promise<MicrosoftAccount>,
    deleteMicrosoftAccount: (id: number | "me") => Promise<void>,
    setMicrosoftAccountRole: (id: number | "me", role: string) => Promise<MicrosoftAccount>,
    linkMicrosoftAccount: (id: number | "me", userId: number) => Promise<void>,
    unlinkMicrosoftAccount: (id: number | "me") => Promise<void>,
}

export const microsoftAccountRepository: MicrosoftAccountRepository = {
    getMicrosoftAccounts,
    getMicrosoftAccount,
    deleteMicrosoftAccount,
    setMicrosoftAccountRole,
    linkMicrosoftAccount,
    unlinkMicrosoftAccount,
}