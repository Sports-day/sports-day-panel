import {NextPage} from "next";
import Head from "next/head";
import {
    Box,
    Container,
    Stack,
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
            <div>
                ローディング画面
            </div>
        )
    }

    return (
        <motion.div
            initial={{opacity: 0.3}}
            animate={{opacity: 1}}
            exit={{opacity: 0.3}}
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
                                {mySport && myTeam &&
                                    <Container
                                        maxWidth={false}
                                        disableGutters
                                        sx={{
                                            paddingTop: 5,
                                            paddingBottom: "20px",
                                            position: "relative",
                                            width: "101vw",
                                            height: "fit-content",
                                            backgroundColor: "#23398a",
                                        }}
                                    >
                                        <Overview
                                            mySport={mySport}
                                            myTeam={myTeam}
                                            myTeamUsers={myTeamUsers}
                                            myTeamRank={myTeamRank}
                                        />
                                    </Container>
                                }

                                <Container
                                    maxWidth={"xl"}
                                    disableGutters
                                    sx={{px: 1, py: 3}}
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
                                            {sports.map((sport) => {
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