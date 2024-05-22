'use client'
import {Box, Button, Container, Stack, Typography} from "@mui/material";
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
            <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center"
                   sx={{backgroundColor: `${theme.palette.text.primary}1A`}}>
                <motion.div
                    key={"auth"}
                    style={{
                        background: `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
                        boxShadow: `0px 0px 15px ${theme.palette.primary.dark}80`
                    }}
                    initial={{opacity: 0, scale: 0.4,scaleZ:0, borderRadius: 70}}
                    animate={{opacity: 1, scale: 1,scaleZ:1, borderRadius: 0}}
                    exit={{opacity: 0}}
                    transition={{delay: 0, duration: 2, ease: [0.76, 0, 0.24, 1]}}
                >
                    <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center">
                        <Stack justifyContent="center" alignItems="center" spacing={2}>
                            <motion.div
                                key={"minnnano"}
                                initial={{opacity: 0, y: 40}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0}}
                                transition={{delay: 1.5, duration: 1, ease: [0, 0.55, 0.45, 1]}}
                            >
                                <Typography fontSize={"20px"} fontWeight={"bold"}
                                            color={theme.palette.text.primary}>みんなの球技大会</Typography>
                            </motion.div>
                            <motion.div
                                key={"anatano"}
                                initial={{opacity: 0, y: 40}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0}}
                                transition={{delay: 1.6, duration: 1, ease: [0, 0.55, 0.45, 1]}}
                            >
                                <Stack
                                    direction={"row"}
                                    spacing={0.5}
                                    pl={1.5}
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
                            </motion.div>

                            <motion.div
                                key={"buttons"}
                                style={{width:"100vw"}}
                                initial={{opacity: 0, y: 40}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0}}
                                transition={{delay: 1.7, duration: 1, ease: [0, 0.55, 0.45, 1]}}
                            >
                                <Container maxWidth={"xs"}>
                                    <Box sx={{justifyContent: "center", width: "100%", mt:2}}>
                                        <LoginButton/>
                                        <PrivacyPolicyDrawer transparent>
                                            <Typography fontSize={"14px"} py={1} color={theme.palette.text.secondary}>
                                                プライバシーポリシー
                                            </Typography>
                                        </PrivacyPolicyDrawer>
                                        <Typography pb={2} pt={1} fontSize={"13px"} fontWeight={"400"} textAlign={"center"}
                                                    color={theme.palette.text.disabled}>SPORTSDAYを使うにはCookieが必要です</Typography>
                                        <Button sx={{width: "100%"}}>
                                            <Stack direction={"row"} spacing={0.5}>
                                                <Typography fontWeight={"600"}
                                                            color={theme.palette.text.disabled}>(C)2024</Typography>
                                                <WiderLogo/>
                                            </Stack>
                                        </Button>
                                    </Box>
                                </Container>
                            </motion.div>
                        </Stack>
                    </Stack>
                </motion.div>
            </Stack>
        </AnimatePresence>
    )
}
