import {alpha} from "@mui/material/styles";
import {Box, Stack, LinearProgress, Container,Grid, useTheme} from "@mui/material";
// import Logo from "public/mark.svg"
import * as React from "react";
import Logo from "@/public/logo/logo.svg";
import {motion} from "framer-motion";

export const MoGraphImage = () => {
    const theme = useTheme()
    return(
        <>
            <Container maxWidth={"xs"} sx={{width: "100%"}}>
                <Stack
                    px={2}
                    py={2}
                    pr={2}
                    mb={2}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "12px",
                        backgroundColor: `${theme.palette.secondary.light}99`,
                    }}>
                    <motion.div
                        key={"sdlogo"}
                        style={{position: "absolute"}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{delay: 1, duration: 1, ease: [0.25, 1, 0.5, 1]}}
                    >
                        <motion.div
                            key={"d-sdlogo"}
                            initial={{opacity: 1, y:0}}
                            animate={{opacity: 0, y:-20}}
                            transition={{delay: 3.5, duration: 0.5, ease: [0.76, 0, 0.24, 1]}}
                        >
                            <Logo width={16 * 8.45} height={16} fill={`${theme.palette.text.primary}80`}/>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        key={"dash"}
                        style={{position: "absolute"}}
                        initial={{opacity: 0, y:20}}
                        animate={{opacity: 1, y:0}}
                        exit={{opacity: 0}}
                        transition={{delay: 3.7, duration: 0.5, ease: [0, 0.55, 0.45, 1]}}
                    >
                        <motion.div
                            key={"d-dash"}
                            initial={{opacity: 1}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{delay: 6.5, duration: 0.5, ease: [0.76, 0, 0.24, 1]}}
                        >
                                        <Box
                                            px={2}
                                            py={1.5}
                                            mb={"8px"}
                                            pr={2}
                                            sx={{
                                                width: "100%",
                                                height: "86px",
                                                borderRadius: "12px",
                                                backgroundColor: `${theme.palette.secondary.light}33`,
                                                border: `1px solid ${theme.palette.secondary.dark}66`,
                                            }}>
                                        </Box>

                                        <Stack
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            sx={{
                                                width: "100%",
                                                height:"80px",
                                                borderRadius: "12px",
                                                backgroundColor: `${theme.palette.text.primary}80`,
                                            }}>
                                            あ
                                        </Stack>
                        </motion.div>
                    </motion.div>
                </Stack>
            </Container>
        </>
    )
}