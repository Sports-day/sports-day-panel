import {NextPage} from "next";
import Head from "next/head";
import {
    Alert,
    Box,
    Container,
    Stack, Typography,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import * as React from "react";
import Overview from "../components/dashboard/Overview";
import Schedule from "../components/dashboard/schedule";
import {SportsListElement} from "../components/dashboard/SportsListElement";
import {Navigation} from "../components/layouts/navigation";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";
import {motion} from "framer-motion";
import {Footer} from "../components/layouts/footer";
import {ImagesContext, LocationsContext, TeamsContext} from "../components/context";
import {useFetchDashboard} from "../src/features/unit/dashboard";
import {Loading} from "../components/layouts/loading";

const DashBoard: NextPage = () => {
    //  Unit Hook
    const {
        isFetching,
        images,
        locations,
        teams,
        sports,
        //  for individual section
        mySport,
        myTeam,
        myTeamUsers,
        myTeamMatches,
        myTeamRank
    } = useFetchDashboard()

    const theme = createTheme();

    if (isFetching) {
        return (
            <Loading/>
        )
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5, ease: 'easeInOut'}}
        >
            <ImagesContext.Provider
                value={{
                    data: images,
                    refresh: () => {
                    }
                }}
            >
                <LocationsContext.Provider
                    value={{
                        data: locations,
                        refresh: () => {
                        }
                    }}
                >
                    <TeamsContext.Provider
                        value={{
                            data: teams,
                            refresh: () => {
                            }
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <Head>
                                <title>SPORTSDAY : Dashboard</title>
                            </Head>
                            <Navigation/>
                            <Box
                                component={"main"}
                                minHeight={"96vh"}
                                sx={{
                                    flexGrow: 1,
                                    overflow: "hidden"
                                }}
                            >
                                <Container
                                    maxWidth={false}
                                    disableGutters
                                    sx={{
                                        paddingTop: 5,
                                        paddingBottom: "0px",
                                        marginBottom:"30px",
                                        position: "relative",
                                        zIndex: 1,
                                        width: "101vw",
                                        height: "fit-content",
                                        backgroundColor: "#23398a",
                                    }}
                                >
                                    {mySport && myTeam &&
                                        <Overview
                                            mySport={mySport}
                                            myTeam={myTeam}
                                            myTeamUsers={myTeamUsers}
                                            myTeamRank={myTeamRank}
                                        />
                                    }
                                    {!mySport && !myTeam &&
                                        <Stack
                                            direction={"column"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={1}
                                            pt={8}
                                            px={2}
                                            width={"100%"}
                                            maxWidth={"xl"}
                                        >
                                            <Alert severity={"info"}>あなたには競技がアサインされていません。各競技の進行状況のみをご覧いだだけます。</Alert>
                                        </Stack>
                                    }
                                </Container>
                                <Container
                                    maxWidth={false}
                                    sx={{
                                        width: "140vw",
                                        height:"100px",
                                        left:"-20vw",
                                        top:"-100px",
                                        zIndex: "0",
                                        position:"relative",
                                        backgroundColor: "#23398a",
                                        borderTopLeftRadius:"10px",
                                        borderTopRightRadius:"10px",
                                        borderBottomLeftRadius: "50% 50%",
                                        borderBottomRightRadius: "50% 50%",
                                    }}
                                >
                                </Container>

                                <Container
                                    maxWidth={"xl"}
                                    disableGutters
                                    sx={{px: 1, py: 3, mt:"-90px"}}
                                >
                                    <Stack
                                        direction={"column"}
                                        justifyContent={"space-between"}
                                        spacing={3}
                                    >
                                        <Grid container spacing={1.5}>

                                            {mySport && myTeam &&
                                                <Grid xs={12} sm={12} lg={12}>
                                                    <Schedule matches={myTeamMatches} myTeamId={myTeam.id}/>
                                                </Grid>
                                            }
                                            {sports
                                                .sort((a, b) => b.weight - a.weight)
                                                .map((sport) => {
                                                return (
                                                    <Grid xs={12} sm={12} lg={12} key={sport.id}>
                                                        <SportsListElement
                                                            sport={sport}
                                                        />
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </Stack>
                                </Container>
                            </Box>
                            <Footer/>
                        </ThemeProvider>
                    </TeamsContext.Provider>
                </LocationsContext.Provider>
            </ImagesContext.Provider>
        </motion.div>
    )
}

export default DashBoard