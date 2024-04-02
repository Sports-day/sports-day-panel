import {useState} from "react";
import {User} from "@/src/models/UserModel";
import {useAsync} from "react-use";
import {userinfoFactory} from "@/src/models/UserinfoModel";

export const useFetchUserinfo = () => {
    const [user, setUser] = useState<User>();
    const [isFetching, setIsFetching] = useState(true);

    useAsync(async () => {
        try {
            const data = await userinfoFactory().fetch();
            setUser(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    })

    return {
        user: user,
        isFetching: isFetching,
    }
}