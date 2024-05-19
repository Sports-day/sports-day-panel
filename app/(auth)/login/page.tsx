'use client'
import {Button, Stack, Typography} from "@mui/material";
import Logo from "@/public/logo/logo.svg"
import * as React from "react";
import {motion, AnimatePresence} from "framer-motion";
import LoginButton from "@/components/auth/LoginButton";
import WiderLogo from "@/components/layouts/logo/widerlogo";
import PrivacyPolicyDrawer from "@/components/layouts/privacyPolicyDrawer";
import {useTheme} from "@mui/material/styles";

// export const metadata: Metadata = {
//     title: 'SPORTSDAY : Login',
// }

export default function Page() {
    const theme = useTheme();
    return (
        <AnimatePresence mode={"wait"}>
            <motion.div
                key={"auth"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{delay: 0.2, duration: 0.5, ease: 'easeInOut'}}
            >
                <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center" sx={{background:`linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`}}>
                    <Stack justifyContent="center" alignItems="center" spacing={1}>
                        <Typography fontSize={"20px"} fontWeight={"bold"} color={theme.palette.text.primary}>みんなの球技大会</Typography>
                        <Stack
                            direction={"row"}
                            spacing={0.5}
                            pl={1.5}
                            pb={2}
                        >
                            <Typography
                                fontSize={"20px"}
                                fontWeight={"bold"}
                                color={theme.palette.text.primary}
                                sx={{position: "relative", bottom: "5px"}}
                            >
                                あなたの
                            </Typography>
                            <Logo width={18 * 8.45} height={18} fill={theme.palette.text.primary}/>
                            <Typography
                                fontSize={"20px"}
                                fontWeight={"bold"}
                                color={theme.palette.text.primary}
                                sx={{position: "relative", bottom: "7px"}}
                            >。</Typography>
                        </Stack>
                        <LoginButton/>
                        <PrivacyPolicyDrawer transparent>
                            <Typography fontSize={"14px"} py={1} color={theme.palette.text.primary}>
                                プライバシーポリシー
                            </Typography>
                        </PrivacyPolicyDrawer>
                        <Typography pb={2} fontSize={"13px"} fontWeight={"400"} color={theme.palette.text.disabled}>SPORTSDAYを使うにはCookieが必要です</Typography>
                        <Button>
                            <Stack direction={"row"} spacing={0.5}>
                                <Typography fontWeight={"600"} color={theme.palette.text.disabled}>(C)2024</Typography>
                                <WiderLogo/>
                            </Stack>
                        </Button>
                    </Stack>
                </Stack>
            </motion.div>
        </AnimatePresence>
    )
}
