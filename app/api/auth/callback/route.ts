import {NextRequest} from "next/server"

export async function POST(request: NextRequest) {
    //  form data
    const form = await request.formData()
    //  get state and code
    const code = form.get('code')

    //  pass code to the backend
    const loginEndpoint = process.env.NEXT_PUBLIC_API_URL + '/login'

    //  post code to the backend using fetch
    const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: code,
        }),
    })

    //  get cookie from response
    const cookie = response.headers.get('set-cookie')

    if (cookie) {
        // redirect to root page
        return new Response(null, {
            status: 301,
            headers: {
                "Location": '/',
                "Set-Cookie": cookie,
            },
        })
    }

    //  redirect to root page
    return new Response(null, {
        status: 301,
        headers: {
            "Location": '/',
        },
    })
}
