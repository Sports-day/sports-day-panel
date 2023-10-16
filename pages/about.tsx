import {NextPage} from "next";
import { motion } from "framer-motion";
import Head from "next/head";
import {Navigation} from "../components/layouts/navigation";
import {
    Box,
    Card,
    CardContent, CardMedia,
    Container,
    Divider, IconButton,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import * as React from "react";
import {createTheme} from "../components/theme";
import {ThemeProvider} from "@mui/material/styles";
import Logo from "public/logo.svg"
import {
    FaQuoteLeft,
    FaTwitter,
    FaGithubAlt
} from "react-icons/fa";
import {
    HiCheckCircle,
    HiPaintBrush
} from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import {useSession} from "next-auth/react";

const About: NextPage = () => {
    useSession({
        required: true,
    })
    const theme = createTheme();
    return (
        <>
            <ThemeProvider theme={theme}>
                <motion.div
                    key={"sport"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{delay: 0.5, duration: 0.5, ease: 'easeOut'}}
                >
                    <Head>
                        <title>{`SPORTSDAY : About`}</title>
                    </Head>
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
                                        marginBottom:"70px",
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
                                        transition={{delay:1.5, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={1}
                                            sx={{
                                                pt: 7,
                                                pb: 25
                                            }}
                                        >
                                            <Logo width={24 * 8.45} height={24} fill={'#E8EBF8'}/>
                                            <Typography sx={{color: "#e8ebf8", fontSize: "24px"}}>
                                                TEAM
                                            </Typography>
                                        </Stack>
                                    </motion.div>
                                </Stack>
                            </Container>
                            <Container
                                maxWidth={false}
                                sx={{
                                    width: "140vw",
                                    height:"100px",
                                    left:"-20vw",
                                    top:"-150px",
                                    zIndex: "0",
                                    position:"relative",
                                    backgroundColor: "#08174B",
                                    borderTopLeftRadius:"10px",
                                    borderTopRightRadius:"10px",
                                    borderBottomLeftRadius: "50% 50%",
                                    borderBottomRightRadius: "50% 50%",
                                }}
                            >
                            </Container>
                        </motion.div>
                        <Container
                            maxWidth={"xl"}
                            disableGutters
                            sx={{px: 2, pb: 0, mt:"-50px"}}
                        >

                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={5}
                                pt={15}
                                pb={10}
                            >
                                <SvgIcon>
                                    <FaQuoteLeft color={"#99a5d6"}/>
                                </SvgIcon>
                                <Typography fontSize={"20px"}>
                                    これまで、掲示板や放送・Teamsで大会の現況を伝えていましたが、見逃しや聞き逃しが多く、競技会場にいない人には情報が伝わりにくいなどの問題がありました。
                                </Typography>
                            </Stack>

                            <motion.div
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1}}
                                transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                            >
                                <Card>
                                    <CardMedia
                                        component="img"
                                        width={"100%"}
                                        image="/pit-screenshot.png"
                                        alt="管理画面"
                                    />
                                    <CardContent>
                                        <Typography fontSize={"16px"} color={"#99a5d6"}>
                                            管理画面
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={5}
                                pt={15}
                                pb={20}
                            >
                                <SvgIcon>
                                    <HiCheckCircle color={"#99a5d6"}/>
                                </SvgIcon>
                                <Typography fontSize={"20px"}>
                                    このアプリは、管理画面で入力された点数を自動的に計算・集計し、ユーザーがリアルタイムに結果を確認できるようにすることで、大会の進行をスムーズにし、学生の参加をより促進することを目的として製作しました。
                                </Typography>
                            </Stack>

                            <Grid container spacing={1.5}>

                                <Grid xs={12} sm={12} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay:0, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card>
                                            <CardContent>
                                                <Stack
                                                    direction={"column"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    spacing={1}
                                                    py={2}
                                                >
                                                    <Typography fontSize={"16px"}>バックエンド・フロントエンド開発者</Typography>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={2}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"} color={"#23398A"}>E4</Typography>
                                                        </Box>
                                                        <Typography variant={"h5"}>山本 哲也</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                    >
                                                        <IconButton component={Link} href={"https://github.com/testusuke"} target={"_blank"}>
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

                                <Grid xs={12} sm={12} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay:0.1, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card>
                                            <CardContent>
                                                <Stack
                                                    direction={"column"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    spacing={1}
                                                    py={2}
                                                >
                                                    <Typography fontSize={"16px"}>フロントエンド開発者・UI/UXデザイナー</Typography>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        py={2}
                                                    >
                                                        <Box py={0.4}
                                                             px={2}
                                                             sx={{
                                                                 borderRadius: "15px",
                                                                 backgroundColor: "#99a5d6"
                                                             }}
                                                        >
                                                            <Typography fontSize={"16px"} color={"#23398A"}>M4</Typography>
                                                        </Box>
                                                        <Typography variant={"h5"}>中村 祐輔</Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                    >
                                                        <IconButton component={Link} href={"https://github.com/1nayu"} target={"_blank"}>
                                                            <SvgIcon>
                                                                <FaGithubAlt color="#99a5d6"/>
                                                            </SvgIcon>
                                                        </IconButton>
                                                        <IconButton component={Link} href={"https://twitter.com/1nayu"} target={"_blank"}>
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

                                <Grid xs={12} sm={12} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay:0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card
                                            sx={{
                                                height: "fit-content",
                                                p:1
                                            }}
                                        >
                                            <CardContent>
                                                <Stack
                                                    direction={"column"}
                                                    spacing={1}
                                                >
                                                    <Typography fontSize={"16px"} color={"#99a5d6"}>
                                                        バックエンド
                                                    </Typography>
                                                    <Divider/>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"space-between"}
                                                    >
                                                        <Typography fontSize={"24px"} color={"#FFF"}>
                                                            Kotlin
                                                        </Typography>
                                                        <Typography fontSize={"24px"} color={"#99a5d6"}>
                                                            99.8%
                                                        </Typography>
                                                    </Stack>
                                                    <Divider/>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"space-between"}
                                                    >
                                                        <Typography fontSize={"24px"} color={"#FFF"}>
                                                            Dockerfile
                                                        </Typography>
                                                        <Typography fontSize={"24px"} color={"#99a5d6"}>
                                                            0.2%
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>

                                <Grid xs={12} sm={12} lg={6}>
                                    <motion.div
                                        initial={{opacity: 0, y: "50px"}}
                                        whileInView={{opacity: 1, y: "0px"}}
                                        transition={{delay:0.3, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Card
                                            sx={{
                                                height: "fit-content",
                                                p:1
                                            }}
                                        >
                                            <CardContent>
                                                <Stack
                                                    direction={"column"}
                                                    spacing={1}
                                                >
                                                    <Typography fontSize={"16px"} color={"#99a5d6"}>
                                                        フロントエンド
                                                    </Typography>
                                                    <Divider/>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"space-between"}
                                                    >
                                                        <Typography fontSize={"24px"} color={"#FFF"}>
                                                            Typescript
                                                        </Typography>
                                                        <Typography fontSize={"24px"} color={"#99a5d6"}>
                                                            98.9%
                                                        </Typography>
                                                    </Stack>
                                                    <Divider/>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"space-between"}
                                                    >
                                                        <Typography fontSize={"24px"} color={"#FFF"}>
                                                            その他
                                                        </Typography>
                                                        <Typography fontSize={"24px"} color={"#99a5d6"}>
                                                            1.1%
                                                        </Typography>
                                                    </Stack>
                                                </Stack>

                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>

                            </Grid>

                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={5}
                                pt={15}
                                pb={10}
                            >
                                <SvgIcon>
                                    <HiPaintBrush color={"#99a5d6"}/>
                                </SvgIcon>
                                <Typography fontSize={"20px"}>
                                    多くの人に使ってもらえる設計
                                </Typography>
                            </Stack>

                            <motion.div
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1}}
                                transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                            >
                                <Container maxWidth={"md"}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            width={"100%"}
                                            image="/sportsday-color.png"
                                            alt="色"
                                        />
                                    </Card>
                                </Container>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1}}
                                transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                            >
                                <Box py={3}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            width={"100%"}
                                            image="/sportsday-ui.png"
                                            alt="UI"
                                        />
                                    </Card>
                                </Box>
                            </motion.div>

                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={5}
                                pt={15}
                                pb={10}
                            >
                                <SvgIcon>
                                    <FaQuoteLeft color={"#99a5d6"}/>
                                </SvgIcon>
                                <Typography fontSize={"20px"}>
                                    SPORTSDAYは、カラーバリアフリーや手の届きやすい位置のボタン配置、使用するフォントなどについて、ユニバーサルデザインを意識してUI・UXデザインを行いました。
                                </Typography>
                            </Stack>

                            <motion.div
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1}}
                                transition={{delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                            >
                                <Grid container spacing={1.5} sx={{mb:9}}>

                                    <Grid xs={12} sm={6} lg={3}>
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                padding: "20px",
                                                backgroundColor: "#f1f2f6",
                                                borderRadius: "15px",
                                                borderBottomLeftRadius: "3px"}}
                                        >
                                            <Image
                                                width={"120"}
                                                height={"25"}
                                                src="/nextjs.png"
                                                alt="nextjs"
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid xs={12} sm={6} lg={3}>
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                padding: "20px",
                                                backgroundColor: "#f1f2f6",
                                                borderRadius: "15px",
                                                borderBottomLeftRadius: "3px"}}
                                        >
                                            <Image
                                                width={"120"}
                                                height={"26"}
                                                src="/kotlin-black.png"
                                                alt="kotlin"
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid xs={12} sm={6} lg={3}>
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                padding: "20px",
                                                backgroundColor: "#f1f2f6",
                                                borderRadius: "15px",
                                                borderBottomLeftRadius: "3px"}}
                                        >
                                            <Image
                                                width={"120"}
                                                height={"61"}
                                                src="/kubernetes.png"
                                                alt="kubernetes"
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid xs={12} sm={6} lg={3}>
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                padding: "20px",
                                                backgroundColor: "#f1f2f6",
                                                borderRadius: "15px",
                                                borderBottomLeftRadius: "3px"}}
                                        >
                                            <Image
                                                width={"120"}
                                                height={"55"}
                                                src="/argocd.png"
                                                alt="argocd"
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid xs={12} sm={6} lg={3}>
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                padding: "20px",
                                                backgroundColor: "#f1f2f6",
                                                borderRadius: "15px",
                                                borderBottomLeftRadius: "3px"}}
                                        >
                                            <Image
                                                width={"120"}
                                                height={"120"}
                                                src="/ga.png"
                                                alt="Google Analytics"
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid xs={12} sm={6} lg={3}>
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                padding: "20px",
                                                backgroundColor: "#f1f2f6",
                                                borderRadius: "15px",
                                                borderBottomLeftRadius: "3px"}}
                                        >
                                            <Image
                                                width={"80"}
                                                height={"80"}
                                                src="/ts.png"
                                                alt="typescript"
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid xs={12} sm={6} lg={3}>
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                padding: "20px",
                                                backgroundColor: "#f1f2f6",
                                                borderRadius: "15px",
                                                borderBottomLeftRadius: "3px"}}
                                        >
                                            <Image
                                                width={"100"}
                                                height={"100"}
                                                src="/framer.png"
                                                alt="framer"
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid xs={12} sm={6} lg={3}>
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                padding: "20px",
                                                backgroundColor: "#f1f2f6",
                                                borderRadius: "15px",
                                                borderBottomLeftRadius: "3px"}}
                                        >
                                            <Image
                                                width={"90"}
                                                height={"90"}
                                                src="/ndw.png"
                                                alt="nayu386designworks"
                                            />
                                        </Stack>
                                    </Grid>

                                </Grid>
                            </motion.div>

                        </Container>
                    </Box>
                </motion.div>
            </ThemeProvider>
        </>
    )
}

export default About