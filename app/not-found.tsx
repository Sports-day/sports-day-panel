import type {Metadata} from 'next'
import Head from 'next/head'
import {Box, Button, Container, Stack, Typography, SvgIcon} from "@mui/material";
import Mark from "@/public/mark.svg"
import {BiErrorAlt} from "react-icons/bi"
import * as React from "react";
import NextLink from "next/link";

export const metadata: Metadata = {
    title: 'SPORTSDAY : 404'
}

export default function NotFound() {
    return (
        <>
            <Head>
                <title>SPORTSDAY : Error</title>
                <meta name="description" content="SPORTSDAY Login page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Box
                maxHeight={"100vh"}
                sx={{
                    backgroundColor: "#23398A",
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden'
                }}
            >
                <Container
                    maxWidth={"md"}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={"100%"}
                        height={"100vh"}
                        spacing={5}
                    >

                        <Stack
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={1}
                        >
                            <Typography fontSize={"30px"} color={"#fff"}>
                                (Ｔ＿Ｔ)
                            </Typography>
                        </Stack>
                        <Stack
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={1}
                            p={5}
                            width={"100%"}
                            sx={{
                                border: "1px solid #99a5d6",
                                borderRadius: "15px",
                                borderBottomLeftRadius: "3px"
                            }}
                        >
                            <Box
                                pb={0.5}
                            >
                                <Mark
                                    width={20}
                                    height={20}
                                    fill={"#99a5d6"}
                                />
                            </Box>
                            <Typography fontSize={"16px"} color={"#99a5d6"}>ページが見つかりません</Typography>
                            <Stack
                                spacing={1}
                                direction={"row"}
                            >
                                <SvgIcon>
                                    <BiErrorAlt color={"#99a5d6"}/>
                                </SvgIcon>
                                <Typography fontSize={"16px"} color={"#99a5d6"}>status code : 404</Typography>
                            </Stack>
                        </Stack>
                        <Button
                            href={"/"}
                            component={NextLink}
                            sx={{
                                width: "100%",
                                height: "fit-content",
                                padding: "20px",
                                backgroundColor: "#fff",
                                border: "1px solid #fff",
                                borderRadius: "15px",
                                borderBottomLeftRadius: "3px"
                            }}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={2}
                            >
                                <Typography sx={{color: "#5664e3", fontSize: "16px"}}>
                                    トップに戻る
                                </Typography>
                            </Stack>
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
