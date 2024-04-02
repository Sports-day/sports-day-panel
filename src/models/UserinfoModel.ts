import {UserinfoRepository, userinfoRepository} from "@/src/repositories/UserinfoRepository";
import {User} from "@/src/models/UserModel";

export const userinfoFactory = (repo?: UserinfoRepository) => {
    const repository = repo ?? userinfoRepository

    return {
        fetch: async (): Promise<User> => {
            return await repository.getUserinfo()
        },
    }
}