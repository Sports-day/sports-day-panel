'use client'
import {Button, Stack, Typography} from "@mui/material";
import crypto from 'crypto';
import * as querystring from "querystring";
import {useEffect, useState} from "react";
import MSLogo from "@/public/images/ms.svg";
import * as React from "react";
import {useTheme} from "@mui/material/styles";

export default function LoginButton() {
    const theme = useTheme();
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

    const buttonDisplayName = process.env.NEXT_PUBLIC_OIDC_DISPLAY_NAME ?? "ログインできません"

    return (
        <Button
            variant="contained"
            color={"secondary"}
            href={authorizationUrl}
            sx={{px:3, py:2,mb:1, width:"100%", backgroundColor:`${theme.palette.text.primary}`}}
            disableElevation
        >
            <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={2}
            >
                <MSLogo width={16} height={16}/>
                <Typography fontSize={"14px"} color={theme.palette.background.paper}>
                    {buttonDisplayName}
                </Typography>
            </Stack>
        </Button>
    );
}
