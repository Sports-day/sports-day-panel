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
import {GameBest} from "../../components/game/GameBest";
import {Navigation} from "../../components/layouts/navigation";
import {HiArrowLeftCircle, HiEllipsisHorizontalCircle} from "react-icons/hi2";
import * as React from "react";
import {useFetchSport, useFetchSportGames, useFetchSportProgress} from "../../src/features/sports/hook";
import {useFetchMyTeams} from "../../src/features/teams/hook";
import {createTheme} from "../../components/theme";
import {ThemeProvider} from "@mui/material/styles";
import {useRouter} from "next/router";
import {Footer} from "../../components/layouts/footer";
import {useFetchGameResult} from "../../src/features/games/hook";
import {useFetchImage} from "../../src/features/images/hook";
import {useFetchGameMatches} from "../../src/features/games/hook";
import {GameList} from "../../components/game/GameList"

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
    const {result} = useFetchGameResult(props.sportId)
    const {image} = useFetchImage(props.sportId)
    const {games, isFetching: isFethingGames} = useFetchSportGames(props.sportId)




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
                    pb: 5,
                    overflow:"hidden"
                }}
            >

                {/*MainVisual*/}
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
                                src={image?.attachment}
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

                    {/*MiddleNavigation*/}
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
                                        color:"#99a5d6"
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
                                        color:"#99a5d6"
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

                    {/*GameProgress, BestTeam*/}
                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        spacing={3}
                    >
                        <Grid container spacing={1.5}>

                            <Grid xs={12} sm={6} lg={6}>
                                <GameBest
                                    value1={result}
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

                <GameList sportId={props.sportId}/>

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