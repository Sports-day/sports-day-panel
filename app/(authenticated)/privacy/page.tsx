'use client'
import {motion} from "framer-motion";
import {Navigation} from "@/components/layouts/navigation";
import {
    Box,
    Container,
    Stack,
    SvgIcon,
    Typography,
} from "@mui/material";
import * as React from "react";
// import Logo from "public/logo.svg"
import {
    HiEyeSlash
} from "react-icons/hi2";

// export const metadata: Metadata = {
//     title: 'SPORTSDAY : Page',
// }

export default function PrivacyPage() {
    return (
        <>
            <motion.div
                key={"sport"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{delay: 0.5, duration: 0.5, ease: 'easeOut'}}
            >
                <Navigation/>
                <Box
                    component={"main"}
                    minHeight={"96vh"}
                    sx={{
                        flexGrow: 1,
                        pb: 5,
                        overflow: "hidden"
                    }}
                >

                    {/*MainVisual*/}
                    <motion.div
                        key={"mainvisual"}
                        initial={{y: "-70vh"}}
                        animate={{y: "0px"}}
                        exit={{y: "-70vh"}}
                        transition={{delay: 0.5, duration: 1.1, ease: [0.83, 0, 0.17, 1]}}
                    >
                        <Container
                            maxWidth={false}
                            disableGutters
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={3}
                                sx={{
                                    paddingTop: 5,
                                    paddingBottom: "0px",
                                    marginBottom: "70px",
                                    position: "relative",
                                    zIndex: 1,
                                    width: "101vw",
                                    height: "90vh",
                                    background: "linear-gradient(#23398A, #08174B)"
                                }}
                            >
                                <motion.div
                                    key={"overview-content"}
                                    initial={{opacity: 0, y: "50px"}}
                                    animate={{opacity: 1, y: "0px"}}
                                    transition={{delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                >
                                    <Stack
                                        direction={"column"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        spacing={1}
                                        sx={{
                                            pt: 7,
                                            pb: 25
                                        }}
                                    >
                                        {/*<Logo width={24 * 8.45} height={24} fill={'#E8EBF8'}/>*/}
                                        <Stack direction={"row"}>
                                            <SvgIcon sx={{margin: 0.7}}><HiEyeSlash color={"#fff"}/></SvgIcon>
                                            <Typography sx={{color: "#e8ebf8", fontSize: "24px"}}>
                                                Privacy / License
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </motion.div>
                            </Stack>
                        </Container>
                        <Container
                            maxWidth={false}
                            sx={{
                                width: "140vw",
                                height: "100px",
                                left: "-20vw",
                                top: "-150px",
                                zIndex: "0",
                                position: "relative",
                                backgroundColor: "#08174B",
                                borderTopLeftRadius: "10px",
                                borderTopRightRadius: "10px",
                                borderBottomLeftRadius: "50% 50%",
                                borderBottomRightRadius: "50% 50%",
                            }}
                        >
                        </Container>
                    </motion.div>
                    <Container
                        maxWidth={"xl"}
                        disableGutters
                        sx={{px: 2, pb: 0, mt: "-50px"}}
                    >

                        <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"flex-start"}
                            spacing={2}
                            pt={15}
                            pb={10}
                        >
                            <Typography fontSize={"30px"} fontWeight={"bold"} pb={8}>
                                プライバシーポリシー
                            </Typography>
                            <Typography fontSize={"26px"} fontWeight={"bold"} pb={2}>
                                Google Analytics
                            </Typography>
                            <Typography fontSize={"18px"}>
                                SPORTSDAY TEAMでは、お客様の利用状況を把握するためにGoogle Analyticsを利用しています。
                            </Typography>
                            <Typography fontSize={"18px"}>
                                SPORTSDAYが発行するクッキーをもとにして、Google
                                inc.がお客様のSPORTSDAYへの訪問履歴を収集、記録、分析します。SPORTSDAY TEAMは、Google
                                inc.からその分析結果を受け取り、お客様のSPORTSDAYへの訪問状況を把握します。
                            </Typography>
                            <Typography fontSize={"18px"}>
                                Google Analyticsにより収集、記録、分析されたお客様の情報には、特定の個人を識別する情報は一切含まれません。また、それらの情報は、Google
                                inc.により同社のプライバシーポリシーに基づいて管理されます。
                            </Typography>

                            <Typography fontSize={"26px"} fontWeight={"bold"} pt={8} pb={2}>
                                Cookie
                            </Typography>
                            <Typography fontSize={"18px"}>
                                SPORTSDAYでは、Cookieを使用しています。クッキーは、WebサイトやサービスがWebブラウザーを介してコンピューターに保存する小さなファイルです。使用することでWebサイトがブラウザーを識別し、登録済みのアカウントがある場合関連付けます。
                            </Typography>
                        </Stack>
                        <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"flex-start"}
                            spacing={2}
                            pt={15}
                            pb={18}
                        >
                            <Typography fontSize={"30px"} fontWeight={"bold"} pb={8}>
                                知的財産情報
                            </Typography>
                            <Typography fontSize={"18px"}>
                                CopyRight 2023 SPORTSDAY TEAM All Rights Reserved, Licensed under Apache-2.0.
                            </Typography>
                            <Typography fontSize={"18px"} pb={8}>
                                NEXT.JSはVercel, Inc. KotlinはKotlin Foundation Google AnalyticsはGoogle, Inc.
                                MotionはFramerの商標または商品名です。
                            </Typography>
                            <Typography fontSize={"26px"} fontWeight={"bold"} pb={2}>
                                Heroicons
                            </Typography>
                            <Typography fontSize={"18px"}>
                                MIT License

                                Copyright (c) 2020 Refactoring UI Inc.
                            </Typography>
                            <Typography fontSize={"26px"} fontWeight={"bold"} pt={4} pb={2}>
                                Lucide
                            </Typography>
                            <Typography fontSize={"18px"}>
                                ISC License

                                Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather
                                (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
                            </Typography>
                        </Stack>
                    </Container>
                </Box>
            </motion.div>
        </>
    )
}
