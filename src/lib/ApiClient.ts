import axios from "axios";
import {getServerSession, Session} from "next-auth";
import {getSession, useSession} from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const headers = {
    "Content-Type": "application/json",
};

export const ApiClient = axios.create({ baseURL, headers });

// error handling
ApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        switch (error?.response?.status) {
            case 401:
                break;
            case 404:
                break;
            default:
                console.log("== internal server error");
        }

        const errorMessage = (error.response?.data?.message || "").split(",");
        throw new Error(errorMessage);
    }
)

// put token into header
ApiClient.interceptors.request.use(async (request: any) => {
    let session: Session | null
    //  server side
    if(typeof window === 'undefined') {
        session = await getServerSession()
    }
    //  client side
    else {
        session = await getSession()
    }

    //  do not have access token
    if (!session || !session.accessToken) {
        return request
    }

    //  token
    request.headers["Authorization"] = "Bearer " + session.accessToken


    return request
});
