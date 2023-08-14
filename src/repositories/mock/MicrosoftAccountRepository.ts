import {MicrosoftAccount} from "../../models/MicrosoftAccountModel";
import {ApiClient} from "../../lib/ApiClient";
import {MicrosoftAccountRepository} from "../MicrosoftAccountRepository";

const mock: MicrosoftAccount[] = [
    {
        id: 1,
        email: "guest@sports-day.net",
        name: "ゲスト",
        mailAccountName: "guest",
        role: "USER",
        userId: 1,
        linkLater: false,
        firstLogin: "",
        lastLogin: ""
    }
]

const getMicrosoftAccounts = async (): Promise<MicrosoftAccount[]> => {
    return mock
}

const getMicrosoftAccount = async (id: number | "me"): Promise<MicrosoftAccount> => {
    if (id === "me") {
        return mock[0]
    }
    return mock.find((c) => c.id === id) ?? mock[0]
}

const deleteMicrosoftAccount = async (id: number | "me"): Promise<void> => {
}

const setMicrosoftAccountRole = async (id: number | "me", role: string): Promise<MicrosoftAccount> => {
    return mock[0]
}

const linkMicrosoftAccount = async (id: number | "me", userId: number): Promise<void> => {
}

const unlinkMicrosoftAccount = async (id: number | "me"): Promise<void> => {
}

const linkLaterMicrosoftAccount = async (id: number | "me"): Promise<void> => {
}

export const mockMicrosoftAccountRepository: MicrosoftAccountRepository = {
    getMicrosoftAccounts,
    getMicrosoftAccount,
    deleteMicrosoftAccount,
    setMicrosoftAccountRole,
    linkMicrosoftAccount,
    unlinkMicrosoftAccount,
    linkLaterMicrosoftAccount,
}