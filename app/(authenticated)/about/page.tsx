'use client'
import {motion} from "framer-motion";
import {
    Box, Button,
    Card,
    CardContent, CardMedia, Chip,
    Container,
    IconButton,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid,
    useTheme
} from "@mui/material";
import * as React from "react";
import {
    FaTwitter,
    FaGithubAlt
} from "react-icons/fa";
import {
    HiChevronDown,
} from "react-icons/hi2";
import Link from "next/link";
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

                            <Grid container spacing={1.5}>

                                <Grid xs={12} sm={6} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card
                                            sx={{
                                                height:"220px",
                                                background:`linear-gradient(${theme.palette.warning.main}30, ${theme.palette.secondary.dark})`
                                        }}
                                        >
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
                                                        align={"center"}
                                                        fontSize={"16px"}>第35回 全国高専プログラミングコンテスト</Typography>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Typography align={"center"} variant={"h5"}>自由部門 優秀賞</Typography>
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: theme.palette.warning.main,
                                                                 minWidth: "65px",
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#fff"}>受賞</Typography>
                                                        </Box>
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
                                        <Card
                                            sx={{
                                                height:"220px",
                                                background:`linear-gradient(${theme.palette.warning.main}30, ${theme.palette.secondary.dark})`
                                            }}
                                        >
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
                                                        align={"center"}
                                                        fontSize={"16px"}>The 16th NAPROCK INTERNATIONAL PROGRAMMING CONTEST</Typography>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Typography align={"center"} variant={"h5"}>Original Section Second Prize</Typography>
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: theme.palette.warning.main,
                                                                 minWidth: "65px",
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#fff"}>受賞</Typography>
                                                        </Box>
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
                                        <Card
                                            sx={{
                                                height:"220px",
                                                background:`linear-gradient(${theme.palette.warning.main}30, ${theme.palette.secondary.dark})`
                                            }}
                                        >
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
                                                        align={"center"}
                                                        fontSize={"16px"}>第35回 全国高専プログラミングコンテスト</Typography>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={0}
                                                    >
                                                        <Typography align={"center"} variant={"h5"}>NSD企業賞</Typography>
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: theme.palette.warning.main,
                                                                 minWidth: "65px",
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"}
                                                                        color={"#fff"}>受賞</Typography>
                                                        </Box>
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
                                        SPORTSDAYの開発
                                    </Typography>
                                </Stack>

                                <Grid xs={12} sm={12} lg={12}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card>
                                            <CardContent>
                                                <Stack
                                                    direction={"column"}
                                                    justifyContent={"start"}
                                                    alignItems={"start"}
                                                    spacing={0}
                                                    py={1}
                                                    px={2}
                                                    sx={{width:"100%", overflow:"scrollable"}}
                                                >
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={1}
                                                        sx={{width:"100%", borderBottom:`1px solid ${theme.palette.text.disabled}`}}
                                                    >
                                                        <Chip label={"フロントエンド"}/>
                                                        <SvgIcon>
                                                            <TbBrandNextjs color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>NextJS</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={1}
                                                        sx={{width:"100%", borderBottom:`1px solid ${theme.palette.text.disabled}`}}
                                                    >
                                                        <Chip label={"バックエンド"}/>
                                                        <SvgIcon>
                                                            <TbBrandKotlin color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>Kotlin</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={1}
                                                        sx={{width:"100%", borderBottom:`1px solid ${theme.palette.text.disabled}`}}
                                                    >
                                                        <Chip label={"コンテナ管理"}/>
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
                                                        py={1}
                                                        sx={{width:"100%", borderBottom:`1px solid ${theme.palette.text.disabled}`}}
                                                    >
                                                        <Chip label={"GitOps"}/>
                                                        <SvgIcon>
                                                            <SiArgo color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>ArgoCD</Typography>
                                                    </Stack>

                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={1}
                                                        sx={{width:"100%", borderBottom:`1px solid ${theme.palette.text.disabled}`}}
                                                    >
                                                        <Chip label={"バージョン管理"}/>
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
                                                        py={1}
                                                        sx={{width:"100%"}}
                                                    >
                                                        <Chip label={"UIデザイン"}/>
                                                        <SvgIcon>
                                                            <SiAffinitydesigner color="#99a5d6"/>
                                                        </SvgIcon>
                                                        <Typography variant={"h5"}>Affinity Designer</Typography>
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
                                                        <Typography variant={"h5"}>鈴木 三士郎</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                    >
                                                        <IconButton component={Link} href={"https://github.com/suzuki346"}
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
                                                        <Typography variant={"h5"}>上野 陸大</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                    >
                                                        <IconButton component={Link} href={"https://github.com/uenoriku1209"}
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
                                                                        color={"#23398A"}>E1</Typography>
                                                        </Box>
                                                        <Typography variant={"h5"}>川崎 優弥</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                    >
                                                        <IconButton component={Link} href={"https://github.com/hakase61912"}
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
                                <Grid xs={12} sm={12} lg={12}>
                                    <motion.div
                                        style={{width: "100%"}}
                                        initial={{opacity: 0, scale: 0.8}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card sx={{width: "100%", mt:1}}>
                                            <CardMedia
                                                component="img"
                                                width={"100%"}
                                                image="https://github.com/Sports-day/.github/assets/58895178/bb300f4c-2d56-4c7a-8e3b-d9b35427991d"
                                                alt="管理画面"
                                            />
                                            <CardContent sx={{width: "100%"}}>
                                                <Stack sx={{width: "100%", height: "100%"}} alignItems={"center"}
                                                       justifyContent={"center"} spacing={1}>
                                                    <Typography>
                                                        SPORTSDAY導入前後のワークフロー
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
                                                image="https://github.com/Sports-day/.github/assets/58895178/f2904013-ed1f-45de-adec-311bd5d0b4d3"
                                                alt="Form"
                                            />
                                            <CardContent sx={{width: "100%"}}>
                                                <Stack sx={{width: "100%", height: "100%"}} alignItems={"center"}
                                                       justifyContent={"center"} spacing={1}>
                                                    <Stack direction={"row"} spacing={1} pb={2} justifyContent={"center"} alignItems={"center"}>
                                                        <Logo width={16 * 8.45} height={16} fill={theme.palette.text.primary}/>
                                                        <Typography fontWeight={"600"}>Form</Typography>
                                                    </Stack>
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
                                                image="https://github.com/user-attachments/assets/68c9d6c4-770c-4094-b976-db0a75cf18d5"
                                                alt="管理画面"
                                            />
                                            <CardContent sx={{width: "100%"}}>
                                                <Stack sx={{width: "100%", height: "100%"}} alignItems={"center"}
                                                       justifyContent={"center"} spacing={1}>
                                                    <Stack direction={"row"} spacing={1} pb={2} justifyContent={"center"} alignItems={"center"}>
                                                        <Logo width={16 * 8.45} height={16} fill={theme.palette.text.primary}/>
                                                        <Typography fontWeight={"600"}>Admin</Typography>
                                                    </Stack>
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
                                    style={{width: "100%"}}
                                    initial={{opacity: 0, scale: 0.8}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                >
                                    <Card sx={{width: "100%", mb:10, mt:1}}>
                                        <CardMedia
                                            component="img"
                                            width={"100%"}
                                            image="https://github.com/Sports-day/.github/assets/58895178/387d1734-6f1a-4860-b2f7-dae1ae01d724"
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
                                        <CardContent sx={{width: "100%"}}>
                                            <Stack sx={{width: "100%", height: "100%", py:10}} alignItems={"center"}
                                                   justifyContent={"center"} spacing={1}>
                                                <Typography fontWeight={"600"} fontSize={"16px"}>
                                                    SPORTSDAYの開発者になりませんか？
                                                </Typography>
                                            </Stack>
                                            <Button
                                                sx={{width:"100%", mb:2}}
                                                variant={"contained"}
                                                color={"info"}
                                                href={"https://forms.office.com/Pages/ResponsePage.aspx?id=XYP-cpVeEkWK4KezivJfyNfX7_ygdxFHiwRmiJgWek1URUZOQ1JYTkpHWThPQVlQT1JBWFhWQllKVC4u"}
                                            >
                                                <Typography sx={{py:2}}>
                                                    フォームに答える
                                                </Typography>
                                            </Button>
                                            <Button
                                                sx={{width:"100%", textTransform:"none"}}
                                                variant={"contained"}
                                                color={"primary"}
                                                href={"https://github.com/Sports-day"}
                                            >
                                                <Typography sx={{py:2}}>
                                                    SPORTSDAYのGitHubを見る
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
