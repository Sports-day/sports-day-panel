import type {NextPage} from 'next'
import {signIn} from "next-auth/react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Auth.module.css'
import {Button, Container, Stack, Typography} from "@mui/material";
import Logo from "public/logo.svg"
import * as React from "react";

const Auth: NextPage = () => {
    return(
        <>
            <Head>
                <title>SPORTSDAY : Login</title>
                <meta name="description" content="SPORTSDAY Login page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container
                maxWidth={"xl"}
            >
                <Stack
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    width={"100%"}
                    height={"100vh"}
                    spacing={5}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"flex-start"}
                        spacing={3}
                    >
                        <Typography variant={"h4"}>みんなの</Typography>
                        <Typography variant={"h4"}>球技大会、</Typography>
                        <Typography variant={"h4"}>あなたの</Typography>
                        <Stack
                            direction={"row"}
                            spacing={0.5}
                        >
                            <Logo width={28*8.45} height={28} fill={'black'}/>
                            <Typography variant={"h4"} sx={{position:"relative", bottom:"5px"}}>。</Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={"column"}
                        justifyContent={"flex-end"}
                        alignItems={"flex-end"}
                    >
                        <Button
                            onClick={() => signIn("azure-ad", {callbackUrl: "/"})}
                            sx={{backgroundColor: "#23398a", width:"100%"}}
                        >
                            <Typography sx={{color: "#ffffff", fontSize: "16px"}}>
                                KOSENアカウントではじめよう
                            </Typography>
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}

export default Auth