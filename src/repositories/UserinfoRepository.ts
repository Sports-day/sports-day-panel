import {User} from "@/src/models/UserModel";
import {ApiClient} from "@/src/lib/ApiClient";

const getUserinfo = async (): Promise<User> => {
    const data = await ApiClient().get(`/userinfo`)
    return data.data
}

export type UserinfoRepository = {
    getUserinfo: () => Promise<User>,
}

export const userinfoRepository: UserinfoRepository = {
    getUserinfo,
}
