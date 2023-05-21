import type {NextPage} from 'next'
import {signIn} from "next-auth/react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Auth.module.css'
import {Avatar, Button, Card, CardContent, Container, Grid, Stack, SvgIcon, Typography} from "@mui/material";
import Logo from "public/logo.svg"
import MSLogo from "public/ms.svg"
import * as React from "react";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";
import {SiMicrosoftteams} from "react-icons/si";

const Auth: NextPage = () => {
    const theme = createTheme();
    return(
        <ThemeProvider theme={theme}>
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
                    spacing={3}
                    sx={{ overflow:"-moz-hidden-unscrollable"}}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"flex-start"}
                        spacing={2}
                    >
                        <Typography fontSize={"30px"} fontWeight={"bold"}>みんなの</Typography>
                        <Typography fontSize={"30px"} fontWeight={"bold"}>球技大会、</Typography>
                        <Typography fontSize={"30px"} fontWeight={"bold"}>あなたの</Typography>
                        <Stack
                            direction={"row"}
                            spacing={0.5}
                        >
                            <Logo width={28*8.45} height={28} fill={"black"}/>
                            <Typography fontSize={"30px"} fontWeight={"bold"} sx={{position:"relative", bottom:"9px"}}>。</Typography>
                        </Stack>
                    </Stack>
                    <Stack width={"100%"}>
                        <Card>
                            <Button
                                onClick={() => signIn("azure-ad", {callbackUrl: "/"})}
                                sx={{width:"100%"}}
                            >
                                <CardContent sx={{width:"100%"}}>
                                    <Stack
                                        direction={"row"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        spacing={2}
                                    >
                                        <MSLogo width={16} height={16}/>
                                        <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                            KOSENアカウントではじめよう
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Button>
                        </Card>
                    </Stack>
                </Stack>
            </Container>
        </ThemeProvider>
    )
}

export default Auth