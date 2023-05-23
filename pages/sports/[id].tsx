import {GetServerSidePropsContext, NextPage} from "next";
import Head from "next/head";
import {
    Avatar,
    Box,
    Button,
    Container,
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
import {createTheme} from "../../components/theme";
import {ThemeProvider} from "@mui/material/styles";
import {useRouter} from "next/router";
import {Footer} from "../../components/layouts/footer";
import {useFetchImage} from "../../src/features/images/hook";
import {GameList} from "../../components/game/GameList"
import {useFetchSportData} from "../../src/features/unit/sports";
import {GamesContext, LocationsContext, MatchesContext, TeamsContext} from "../../components/context";

type Props = {
    sportId: number
}

const Id: NextPage<Props> = (props: Props) => {
    //  router
    const router = useRouter()
    const theme = createTheme();
    const {
        isFetching,
        image,
        sport,
        games,
        teams,
        matches,
        locations
    } = useFetchSportData(props.sportId)

    if (!isFetching && !sport) {
        return null
    }


    if (isFetching) {
        return (
            <>
                ローディング画面
            </>
        )
    }

    return (
        <>
            <GamesContext.Provider
                value={{
                    data: games,
                    refresh: () => {
                    }
                }}
            >
                <TeamsContext.Provider
                    value={{
                        data: teams,
                        refresh: () => {}
                    }}
                >
                    <MatchesContext.Provider
                        value={{
                            data: matches,
                            refresh: () => {}
                        }}
                    >
                        <LocationsContext.Provider
                            value={{
                                data: locations,
                                refresh: () => {}
                            }}
                        >

                            <ThemeProvider theme={theme}>
                                <Head>
                                    <title>{`SPORTSDAY : ${sport.name}`}</title>
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
                                                height: "fit-content",
                                                backgroundColor: "#23398a",
                                            }}
                                        >
                                            <Stack
                                                direction={"row"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                spacing={3}
                                                sx={{
                                                    py: 8
                                                }}
                                            >
                                                <Avatar
                                                    alt={sport.name}
                                                    sx={{height: "3.5em", width: "3.5em"}}
                                                    src={image?.attachment}
                                                >

                                                </Avatar>
                                                <Typography sx={{color: "#FFF", fontSize: "30px", fontWeight: "bold"}}>
                                                    {sport.name}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Container>

                                    <Container
                                        maxWidth={"xl"}
                                        disableGutters
                                        sx={{px: 1, pb: 0}}
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
                                                        padding: 1,
                                                        py: 3,
                                                        color: "#23398A",
                                                        "@media (prefers-color-scheme: dark)": {
                                                            color: "#99a5d6"
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
                                                        padding: 1,
                                                        py: 3,
                                                        color: "#23398A",
                                                        "@media (prefers-color-scheme: dark)": {
                                                            color: "#99a5d6"
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
                                                    <GameBest/>
                                                </Grid>

                                                <Grid xs={12} sm={6} lg={6}>
                                                    <GameProgress/>
                                                </Grid>

                                            </Grid>
                                        </Stack>

                                    </Container>

                                    <GameList sportId={props.sportId}/>

                                </Box>
                                <Footer/>
                            </ThemeProvider>
                        </LocationsContext.Provider>
                    </MatchesContext.Provider>
                </TeamsContext.Provider>
            </GamesContext.Provider>
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