import {NextPage} from "next";
import Head from "next/head";
import {
    Alert,
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
import {Footer} from "../components/layouts/footer";
import {ImagesContext, LocationsContext, TeamsContext} from "../components/context";
import {useFetchDashboard} from "../src/features/unit/dashboard";
import {Loading} from "../components/layouts/loading";
import {motion} from "framer-motion";
import {Notification} from "../components/layouts/notification";
import {OtherInfo} from "../components/dashboard/Overview/OtherInfo";

const DashBoard: NextPage = () => {
    //  Unit Hook
    const {
        isFetching,
        images,
        locations,
        teams,
        sports,
        informationList,
        //  for individual section
        mySport,
        myGame,
        myTeam,
        myTeamUsers,
        myTeamMatches,
        myTeamRank
    } = useFetchDashboard()

    const theme = createTheme();

    return (
        <>
            {isFetching && (
                <motion.div
                    key={"loading"}
                    initial={{opacity: 0}}
                    animate={{opacity: 0.2}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2, ease: [0, 0.5, 0, 1]}}
                >
                    <Loading/>
                </motion.div>
            )}
            {!isFetching && (
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
                                <motion.div
                                    key={"dashboard"}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.4, ease: [0.83, 0, 0.17, 1]}}
                                >
                                    <Navigation/>
                                    <Box
                                        component={"main"}
                                        minHeight={"96vh"}
                                        sx={{
                                            flexGrow: 1,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <motion.div
                                            key={"overview-background"}
                                            initial={{y: "-100px"}}
                                            animate={{y: "0px"}}
                                            exit={{opacity: 0, y:"-100px"}}
                                            transition={{duration: 0.6, ease: [0.54, -0.01, 0, 1]}}
                                        >
                                            <Container
                                                maxWidth={false}
                                                disableGutters
                                                sx={{
                                                    paddingBottom: "0px",
                                                    marginBottom:"30px",
                                                    position: "relative",
                                                    zIndex: 1,
                                                    width: "101vw",
                                                    height: "fit-content",
                                                    backgroundColor: "#23398a",
                                                }}
                                            >
                                                <motion.div
                                                    key={"overview-content"}
                                                    initial={{opacity: 0, y: "50px"}}
                                                    animate={{opacity: 1, y: "0px"}}
                                                    transition={{delay:0.4, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                                >
                                                    <Container
                                                        maxWidth={"xl"}
                                                        sx={{paddingTop: 8.5}}
                                                    >
                                                        {informationList
                                                            .map((info) => {
                                                                return (
                                                                    <Notification
                                                                        key={info.id}
                                                                        infoName={info.name}
                                                                        infoContent={info.content}
                                                                    />
                                                                );
                                                            })}
                                                    </Container>
                                                    {mySport && myTeam &&
                                                        <Box sx={{pt: 2}}>
                                                            <Overview
                                                                mySport={mySport}
                                                                myTeam={myTeam}
                                                                myTeamUsers={myTeamUsers}
                                                                myTeamRank={myTeamRank}
                                                            />
                                                        </Box>
                                                    }
                                                    {!mySport && !myTeam &&
                                                        <Stack
                                                            direction={"column"}
                                                            justifyContent={"center"}
                                                            alignItems={"center"}
                                                            spacing={1}
                                                            py={3}
                                                            px={2}
                                                            width={"100%"}
                                                            maxWidth={"xl"}
                                                        >
                                                            <OtherInfo infoName={""} infoContent={"どの競技にも参加していません。"} infoSubContent={"競技に参加しない方でも、各競技の進行状況を見ることができます。競技に参加する予定にも関わらずこのメッセージが表示されている場合は、お近くのスタッフにお伝えください。"}/>
                                                        </Stack>
                                                    }
                                                </motion.div>
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
                                        </motion.div>

                                        <motion.div
                                            key={"dashboard-content"}
                                            initial={{opacity: 0, y: "50px"}}
                                            animate={{opacity: 1, y: "0px"}}
                                            transition={{delay:0.5, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                        >
                                            <Container
                                                maxWidth={"xl"}
                                                disableGutters
                                                sx={{px: 1, py: 3, mt:"-100px"}}
                                            >
                                                <Stack
                                                    direction={"column"}
                                                    justifyContent={"space-between"}
                                                    spacing={3}
                                                >
                                                    <Grid container spacing={1.5}>

                                                        {mySport && myGame && myTeam &&
                                                            <Grid xs={12} sm={12} lg={12}>
                                                                <Schedule
                                                                    sportId={mySport.id}
                                                                    gameId={myGame.id}
                                                                    matches={myTeamMatches}
                                                                    myTeamId={myTeam.id}
                                                                />
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
                                        </motion.div>
                                    </Box>
                                    <Footer/>
                                </motion.div>
                            </ThemeProvider>
                        </TeamsContext.Provider>
                    </LocationsContext.Provider>
                </ImagesContext.Provider>
            )}
        </>
    )
}

export default DashBoard