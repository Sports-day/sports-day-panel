'use client'
import {Button} from "@mui/material";
import crypto from 'crypto';
import * as querystring from "querystring";
import {ReactNode, useEffect, useState} from "react";


export type LoginButtonProps = {
    children: ReactNode
}

export default function LoginButton(props: LoginButtonProps) {
    const [authorizationUrl, setAuthorizationUrl] = useState<string>('')

    useEffect(() => {
        const authorizationBaseUrl = process.env.NEXT_PUBLIC_OIDC_AUTHORIZE_URL
        //  query params
        const clientId = process.env.NEXT_PUBLIC_OIDC_CLIENT_ID
        const redirectUri = process.env.NEXT_PUBLIC_OIDC_REDIRECT_URL
        const scope = process.env.NEXT_PUBLIC_OIDC_SCOPE ?? "openid profile email"
        //  generate random nonce and state
        const nonce = crypto.randomBytes(16).toString('hex')

        const queryData = {
            "client_id": clientId,
            "redirect_uri": redirectUri,
            "response_type": "code",
            "response_mode": "form_post",
            "scope": scope,
            "nonce": nonce,
        }

        //  make query string
        const searchParams = querystring.stringify(queryData);
        //  make url
        setAuthorizationUrl(`${authorizationBaseUrl}?${searchParams}`)
    }, [])

    return (
        <Button
            href={authorizationUrl}
            sx={{width: "fit-content"}}
        >
            {props.children}
        </Button>
    );
}
