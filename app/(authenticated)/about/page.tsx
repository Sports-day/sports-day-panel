'use client'
import {motion} from "framer-motion";
import {
    Box, Button,
    Card,
    CardContent, CardMedia,
    Container,
    Divider, IconButton,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid,
    useTheme
} from "@mui/material";
import * as React from "react";
import {
    FaQuoteLeft,
    FaTwitter,
    FaGithubAlt
} from "react-icons/fa";
import {
    HiCheckCircle, HiChevronDown,
    HiPaintBrush
} from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import CircleContainer from "@/components/layouts/circleContainer";
import Logo from "@/public/logo/logo.svg";
import {TbBrandKotlin, TbBrandNextjs} from "react-icons/tb";
import {SiAffinitydesigner, SiArgo, SiKubernetes} from "react-icons/si";

// export const metadata: Metadata = {
//     title: 'SPORTSDAY : About',
// }

export default function Page() {
    const theme = useTheme();
    return (
        <>
            <motion.div
                key={"sport"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{delay: 0.5, duration: 0.5, ease: 'easeOut'}}
            >
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
                        key={"anatano"}
                        initial={{opacity: 0, y: -40}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0}}
                        transition={{delay: 0, duration: 1, ease: [0, 0.55, 0.45, 1]}}
                    >
                        <CircleContainer noLogo={true}>
                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={1}
                                sx={{height: "100vh"}}
                            >
                                <Logo width={24 * 8.45} height={24} fill={theme.palette.text.primary}/>
                                <Typography fontSize={"18px"}>
                                    Sportsday Management Platform
                                </Typography>
                                <motion.div
                                    initial={{opacity: 0, y: -30}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                >
                                    <SvgIcon>
                                        <HiChevronDown color={theme.palette.text.secondary}/>
                                    </SvgIcon>
                                </motion.div>
                            </Stack>
                        </CircleContainer>
                    </motion.div>


                        <Container
                            maxWidth={"xl"}
                            disableGutters
                            sx={{px: 2, pb: 0, mt: "-50px"}}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={5}
                                py={3}
                            >
                                <Typography fontSize={"20px"}>
                                    SPORTSDAYの開発
                                </Typography>
                            </Stack>

                            <Grid container spacing={1.5}>

                                <Grid xs={12} sm={6} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay: 0, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card sx={{height:"220px"}}>
                                            <CardContent sx={{height:"100%"}}>
                                                <Stack
                                                    sx={{height:"100%"}}
                                                    direction={"column"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    spacing={1}
                                                    py={2}
                                                >
                                                    <Typography
                                                        fontSize={"16px"}>バックエンド・フロントエンド開発者</Typography>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>E5</Typography>
                                                        </Box>
                                                        <Typography variant={"h5"}>山本 哲也</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                    >
                                                        <IconButton component={Link}
                                                                    href={"https://github.com/testusuke"}
                                                                    target={"_blank"}>
                                                            <SvgIcon>
                                                                <FaGithubAlt color="#99a5d6"/>
                                                            </SvgIcon>
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>

                                <Grid xs={12} sm={6} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card sx={{height:"220px"}}>
                                            <CardContent sx={{height:"100%"}}>
                                                <Stack
                                                    sx={{height:"100%"}}
                                                    direction={"column"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    spacing={1}
                                                    py={2}
                                                >
                                                    <Typography
                                                        fontSize={"16px"}>フロントエンド開発者・UI/UXデザイナー</Typography>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>M5</Typography>
                                                        </Box>
                                                        <Typography variant={"h5"}>中村 祐輔</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                    >
                                                        <IconButton component={Link} href={"https://github.com/1nayu"}
                                                                    target={"_blank"}>
                                                            <SvgIcon>
                                                                <FaGithubAlt color="#99a5d6"/>
                                                            </SvgIcon>
                                                        </IconButton>
                                                        <IconButton component={Link} href={"https://twitter.com/1nayu"}
                                                                    target={"_blank"}>
                                                            <SvgIcon>
                                                                <FaTwitter color="#99a5d6"/>
                                                            </SvgIcon>
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                                <Grid xs={12} sm={6} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card sx={{height:"220px"}}>
                                            <CardContent  sx={{height:"100%"}}>
                                                <Stack
                                                    sx={{height:"100%"}}
                                                    direction={"column"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    spacing={1}
                                                    py={2}
                                                >
                                                    <Typography
                                                        fontSize={"16px"}>フロントエンド開発者</Typography>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>E2</Typography>
                                                        </Box>
                                                        <Typography variant={"h5"}>池嵜 太勇</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                    >
                                                        <IconButton component={Link}
                                                                    href={"https://github.com/Takkun0310"}
                                                                    target={"_blank"}>
                                                            <SvgIcon>
                                                                <FaGithubAlt color="#99a5d6"/>
                                                            </SvgIcon>
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>

                                <Grid xs={12} sm={6} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card sx={{height:"220px"}}>
                                            <CardContent>
                                                <Stack
                                                    direction={"column"}
                                                    justifyContent={"start"}
                                                    alignItems={"start"}
                                                    spacing={1}
                                                    py={2}
                                                    px={2}
                                                    sx={{overflow:"scrollable"}}
                                                >
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>フロントエンド</Typography>
                                                        </Box>
                                                        <SvgIcon>
                                                            <TbBrandNextjs color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>NextJS</Typography>

                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>バージョン管理</Typography>
                                                        </Box>
                                                        <SvgIcon>
                                                            <FaGithubAlt color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>GitHub</Typography>
                                                    </Stack>

                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>バックエンド</Typography>
                                                        </Box>
                                                        <SvgIcon>
                                                            <TbBrandKotlin color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>Kotlin</Typography>

                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>UIデザイン</Typography>
                                                        </Box>
                                                        <SvgIcon>
                                                            <SiAffinitydesigner color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>Serif Affinity Designer</Typography>
                                                    </Stack>

                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>コンテナ管理</Typography>
                                                        </Box>
                                                        <SvgIcon>
                                                            <SiKubernetes color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>Kubernetes</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#23398A"}>GitOps</Typography>
                                                        </Box>
                                                        <SvgIcon>
                                                            <SiArgo color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>ArgoCD</Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>

                                <Stack
                                    direction={"column"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    spacing={5}
                                    pt={10}
                                    pb={3}
                                    sx={{width: "100%"}}
                                >
                                    <Typography fontSize={"20px"}>
                                        SPORTSDAYは、球技大会をDXするWebプラットフォーム。
                                    </Typography>
                                </Stack>
                                <Grid xs={12} sm={6} lg={6}>
                                    <motion.div
                                        style={{width: "100%"}}
                                        initial={{opacity: 0, scale: 0.8}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card sx={{width: "100%"}}>
                                            <CardMedia
                                                component="img"
                                                width={"100%"}
                                                image="/images/form.png"
                                                alt="Form"
                                            />
                                            <CardContent sx={{width: "100%"}}>
                                                <Stack sx={{width: "100%", height: "100%"}} alignItems={"center"}
                                                       justifyContent={"center"} spacing={1}>
                                                    <Image src={"/logo/logo_form.png"} height={"24"} width={"302"}
                                                           alt={"SPORTSDAY Form"}/>
                                                    <Typography>
                                                        チーム編成を行うアプリケーション
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                                <Grid xs={12} sm={6} lg={6}>
                                    <motion.div
                                        style={{width: "100%"}}
                                        initial={{opacity: 0, scale: 0.8}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card sx={{width: "100%"}}>
                                            <CardMedia
                                                component="img"
                                                width={"100%"}
                                                image="/images/admin.png"
                                                alt="管理画面"
                                            />
                                            <CardContent sx={{width: "100%"}}>
                                                <Stack sx={{width: "100%", height: "100%"}} alignItems={"center"}
                                                       justifyContent={"center"} spacing={1}>
                                                    <Image src={"/logo/logo_admin.png"} height={"24"} width={"302"}
                                                           alt={"SPORTSDAY Admin"}/>
                                                    <Typography>
                                                        リーグの編成や競技の結果登録を行う進行管理アプリケーション
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            </Grid>

                            <Grid xs={12} sm={6} lg={6}>
                                <motion.div
                                    initial={{opacity: 0, y: "50px"}}
                                    whileInView={{opacity: 1, y: "0px"}}
                                    transition={{delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                >
                                    <Card sx={{mt:1.5}}>
                                        <CardContent  sx={{height:"100%"}}>
                                            <Stack
                                                sx={{height:"100%"}}
                                                direction={"column"}
                                                justifyContent={"start"}
                                                alignItems={"start"}
                                                spacing={1}
                                                py={2}
                                                px={2}
                                            >
                                                <Typography fontSize={"16px"}>
                                                    Sports-dayは、学校行事である球技大会の運営と進行管理をデジタル技術の活用により、スムーズに行うことを実現するWebアプリケーションです。 従来の紙ベースのアナログな管理方法から脱却し、試合の進行状況をリアルタイムで確認できるデジタルプラットフォームを提供します。
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>

                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={5}
                                pt={10}
                                pb={3}
                                sx={{width: "100%"}}
                            >
                                <Typography fontSize={"20px"}>
                                    SPORTSDAYの技術選択
                                </Typography>
                            </Stack>
                            <Grid xs={12} sm={6} lg={6}>
                                <motion.div
                                    style={{width: "100%"}}
                                    initial={{opacity: 0, scale: 0.8}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                >
                                    <Card sx={{width: "100%", mb:10}}>
                                        <CardMedia
                                            component="img"
                                            width={"100%"}
                                            image="/images/flow.png"
                                            alt="管理画面"
                                        />
                                        <CardContent sx={{width: "100%"}}>
                                            <Stack sx={{width: "100%", height: "100%"}} alignItems={"center"}
                                                   justifyContent={"center"} spacing={1}>
                                                <Typography>
                                                    SPORTSDAYの各アプリケーション関係
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                            <Grid xs={12} sm={6} lg={6}>
                                <motion.div
                                    style={{width: "100%"}}
                                    initial={{opacity: 0, scale: 0.8}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                >
                                    <Card sx={{width: "100%", mb:10}}>
                                        <CardContent sx={{width: "100%"}}>
                                            <Stack sx={{width: "100%", height: "100%", py:10}} alignItems={"center"}
                                                   justifyContent={"center"} spacing={1}>
                                                <Typography fontWeight={"600"} fontSize={"20px"}>
                                                    SPORTSDAYの開発者になりませんか？
                                                </Typography>
                                            </Stack>
                                            <Button
                                                sx={{width:"100%"}}
                                                variant={"contained"}
                                                color={"info"}
                                                href={"https://forms.office.com/Pages/ResponsePage.aspx?id=XYP-cpVeEkWK4KezivJfyNfX7_ygdxFHiwRmiJgWek1URUZOQ1JYTkpHWThPQVlQT1JBWFhWQllKVC4u"}
                                            >
                                                <Typography sx={{py:2}}>
                                                    フォームに答える
                                                </Typography>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>

                        </Container>
                </Box>
            </motion.div>
        </>
)
}
