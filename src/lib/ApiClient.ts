import axios from "axios";
import Cookies from "js-cookie";

const TOKEN_COOKIE_EXPIRE = 10 // minutes
const baseURL = process.env.NEXT_PUBLIC_API_URL + "/v1";

const headers = {
    "Content-Type": "application/json",
};

export const ApiClient = axios.create({ baseURL, headers, timeout: 1000*20 });

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
    let token: string | undefined

    //  todo: get token from cookie

    //  do not have access token
    if (token === undefined) {
        return request
    }

    //  token
    request.headers["Authorization"] = "Bearer " + token

    return request
});
