const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

const headers = {
    "Content-Type": "application/json",
};

async function fetchWithToken(url: string, options: RequestInit | undefined = {}) {
    //  get token
    let token
    if (typeof window === 'undefined') {
        const {cookies} = require("next/headers");
        token = cookies().get("access_token")?.value
    }

    const mergedOptions: RequestInit = {
        cache: "no-cache",
        credentials: "include",
        ...options,
        headers: {
            ...headers,
            ...options.headers,
            Cookie: `access_token=${token}`
        },
    }

    try {
        const fullUrl = `${ApiUrl}${url}`
        const response = await fetch(fullUrl, mergedOptions);

        // Check if the response was ok (status in the range 200-299)
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    break
                case 404:
                    break
                default:
                    console.log("== internal server error")
            }
        }

        return await response.json()
    } catch (error) {
        // Handle errors (e.g., network issues)
        console.error("Fetch error: ", error);
        throw error;
    }
}

export type ApiClientType = {
    get: (url: string) => Promise<any>,
    getWithParams: (url: string, params: any) => Promise<any>,
    getWithOption: (url: string, option: RequestInit | undefined) => Promise<any>,
    post: (url: string, data: any) => Promise<any>,
    put: (url: string, data: any) => Promise<any>,
    delete: (url: string) => Promise<any>,
}

export const ApiClient = (): ApiClientType => {
    return {
        get: (url: string) => fetchWithToken(url, {method: "GET"}),
        getWithParams: (url: string, params: any) => {
            const query = new URLSearchParams(params).toString()
            return fetchWithToken(`${url}?${query}`, {method: "GET"})
        },
        getWithOption: (url: string, option: RequestInit | undefined = {}) => fetchWithToken(url, {method: "GET", ...option}),
        post: (url: string, data: any) => fetchWithToken(url, {method: "POST", body: JSON.stringify(data)}),
        put: (url: string, data: any) => fetchWithToken(url, {method: "PUT", body: JSON.stringify(data)}),
        delete: (url: string) => fetchWithToken(url, {method: "DELETE"}),
    }
}
