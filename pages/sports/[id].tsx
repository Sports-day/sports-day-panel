import {GetServerSidePropsContext, NextPage} from "next";
import Head from "next/head";
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {GameProgress} from "../../components/game/game-progress";
import {GameBest} from "../../components/game/game-best";
import {Navigation} from "../../components/layouts/navigation";
import {HiArrowLeftCircle, HiEllipsisHorizontalCircle} from "react-icons/hi2";
import {GamePointBar} from "../../components/game/game-pointbar"
import * as React from "react";
import {useFetchSport, useFetchSportGames, useFetchSportProgress} from "../../src/features/sports/hook";
import {useFetchMyTeams} from "../../src/features/teams/hook";
import {createTheme} from "../../components/theme";
import {ThemeProvider} from "@mui/material/styles";
import {useRouter} from "next/router";
import {Footer} from "../../components/layouts/footer";

type Props = {
    sportId: number
}

const Id: NextPage<Props> = (props: Props) => {
    //  router
    const router = useRouter()
    const theme = createTheme();
    const {sport, isFetching} = useFetchSport(props.sportId)
    const {progress} = useFetchSportProgress(props.sportId)
    const {teams} = useFetchMyTeams();

    if (!isFetching && !sport) {
        //  404
        router.push("/404").then()
        return null
    }


    const sportName = sport?.name;
    const best = ["チーム1","チーム2","チーム3"];

    return(
        <>
            <ThemeProvider theme={theme}>
            <Head>
                <title>{`SPORTSDAY : ${sportName}`}</title>
            </Head>
            <Navigation/>
            <Box
                component={"main"}
                minHeight={"96vh"}
                sx={{
                    flexGrow: 1,
                    py: 5,
                    overflow:"hidden"
                }}
            >
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        paddingTop: "0px",
                }}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={3}
                        sx={{
                            position: "relative",
                            width: "101vw",
                            height:"fit-content",
                            backgroundColor: "#23398a",
                        }}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={3}
                            sx={{
                                py:8
                            }}
                        >
                            <Avatar
                                alt={sportName}
                                sx={{height: "3.5em", width: "3.5em"}}
                                src={"/public/images/basketball.jpg"}
                            >

                            </Avatar>
                            <Typography sx={{color: "#FFF", fontSize: "30px", fontWeight: "bold"}}>
                                {sportName}
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
                <Container
                    maxWidth={"xl"}
                    disableGutters
                    sx={{px:1, pb:0}}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Button onClick={() => router.back()}>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"flex-start"}
                                spacing={1}
                                sx={{
                                    padding:1,
                                    py:3,
                                    color:"#23398A",
                                    "@media (prefers-color-scheme: dark)": {
                                        color:"#FFFFFF"
                                    }
                                }}
                            >
                                <SvgIcon>
                                    <HiArrowLeftCircle/>
                                </SvgIcon>
                                <Typography>
                                    戻る
                                </Typography>
                            </Stack>
                        </Button>
                        <Button>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"flex-start"}
                                spacing={1}
                                sx={{
                                    padding:1,
                                    py:3,
                                    color:"#23398A",
                                    "@media (prefers-color-scheme: dark)": {
                                        color:"#FFFFFF"
                                    }
                                }}
                            >
                                <Typography>
                                    ルールを見る
                                </Typography>
                                <SvgIcon>
                                    <HiEllipsisHorizontalCircle/>
                                </SvgIcon>
                            </Stack>
                        </Button>
                    </Stack>
                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        spacing={3}
                    >
                        <Grid container spacing={1.5}>

                            <Grid xs={12} sm={6} lg={6}>
                                <GameBest
                                    value1={best[0]}
                                    value2={best[1]}
                                    value3={best[2]}
                                />
                            </Grid>

                            <Grid xs={12} sm={6} lg={6}>
                                <GameProgress
                                    chartSeries={[progress, 100-progress]}
                                    labels={["完了した競技", "未完了の競技"]}
                                />
                            </Grid>

                        </Grid>
                    </Stack>
                </Container>
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        paddingTop: "0px",
                        position:"relative",
                        bottom:"-40px"
                    }}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={3}
                        minHeight={"50vh"}
                        sx={{
                            position: "relative",
                            width: "101vw",
                            height:"fit-content",
                            backgroundColor: "#23398a",
                        }}
                    >
                        <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            spacing={3}
                            width={"100vw"}
                        >
                            <Stack
                                width={"100%"}
                                maxWidth={"xl"}
                                sx={{px:2, pb:3, pt:3}}
                                spacing={2}
                            >
                                <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                    対戦一覧
                                </Typography>
                                <GamePointBar
                                    leftScore={80}
                                    rightScore={70}
                                />
                                <GamePointBar
                                    leftScore={80}
                                    rightScore={70}
                                />
                                <GamePointBar
                                    leftScore={80}
                                    rightScore={70}
                                />
                            </Stack>
                            <Divider/>
                            <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                対戦が終了すると項目が追加されます
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Footer/>
            </ThemeProvider>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    if (!context.query.id) {
        return {
            notFound: true,
        }
    }
    const id = +context.query.id

    if (isNaN(id)) {
        return {
            notFound: true,
        }
    }

    return {
        props: {sportId: id}
    }
}

export default Id