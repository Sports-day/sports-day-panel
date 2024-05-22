'use client'
import {Button, Stack, Typography} from "@mui/material";
import Logo from "@/public/logo/logo.svg"
import * as React from "react";
import {motion, AnimatePresence} from "framer-motion";
import LoginButton from "@/components/auth/LoginButton";
import WiderLogo from "@/components/layouts/logo/widerlogo";
import PrivacyPolicyDrawer from "@/components/layouts/privacyPolicyDrawer";

// export const metadata: Metadata = {
//     title: 'SPORTSDAY : Login',
// }

export default function Page() {
    return (
                <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center" sx={{background:"radial-gradient(ellipse at left, #5F6DC2, #3E4EB3)"}}>
                    <Stack justifyContent="center" alignItems="center" spacing={1}>
                        <Typography fontSize={"20px"} fontWeight={"bold"} color={"#EFF0F8"}>みんなの球技大会</Typography>
                        <Stack
                            direction={"row"}
                            spacing={0.5}
                            pl={1.5}
                            pb={2}
                        >
                            <Typography
                                fontSize={"20px"}
                                fontWeight={"bold"}
                                color={"#EFF0F8"}
                                sx={{position: "relative", bottom: "5px"}}
                            >
                                あなたの
                            </Typography>
                            <Logo width={18 * 8.45} height={18} fill={"#EFF0F8"}/>
                            <Typography
                                fontSize={"20px"}
                                fontWeight={"bold"}
                                color={"#EFF0F8"}
                                sx={{position: "relative", bottom: "7px"}}
                            >。</Typography>
                        </Stack>
                        <PrivacyPolicyDrawer>
                            <Typography fontSize={"14px"} py={1}>
                                プライバシーポリシー
                            </Typography>
                        </PrivacyPolicyDrawer>
                        <Typography pb={2} fontSize={"13px"} fontWeight={"400"} color={"#9aa6e5"}>SPORTSDAYを使うにはCookieが必要です</Typography>
                        <Button>
                            <Stack direction={"row"} spacing={0.5}>
                                <Typography fontWeight={"600"} color={"#99a5d6"}>(C)2024</Typography>
                                <WiderLogo/>
                            </Stack>
                        </Button>
                    </Stack>
                </Stack>
    )
}
