'use client'
import {
    Box,
    Container, LinearProgress,
    Stack, Typography,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import * as React from "react";
import Overview from "@/components/dashboard/Overview";
import Schedule from "@/components/dashboard/schedule/schedule";
import {SportsListElement} from "@/components/dashboard/SportsListElement";
import {Navigation} from "@/components/layouts/navigation";
import {ImagesContext, LocationsContext, TeamsContext, UsersContext} from "@/components/context";
import {useFetchDashboard} from "@/src/features/unit/dashboard";
import {Loading} from "@/components/layouts/loading";
import {motion} from "framer-motion";
import {OtherInfo} from "@/components/dashboard/Overview/OtherInfo";
import {InformationList} from "@/components/InformationList";
import Logo from "@/public/logo/logo.svg";
import CircleContainer from "@/components/layouts/circleContainer";
import JudgeSchedule from "@/components/dashboard/schedule/judgeSchedule";

// export const metadata: Metadata = {
//     title: 'SPORTSDAY : Dashboard',
// }

export default function Page() {
    //  Unit Hook
    const {
        isFetching,
        images,
        locations,
        teams,
        users,
        sports,
        //  for individual section
        mySport,
        myGame,
        myTeam,
        myTeamUsers,
        myTeamMatches,
        myTeamRank,
        myJudgeMatches
    } = useFetchDashboard()

    return (
        <>
            {isFetching && (
                <motion.div
                    key={"loading"}
                    initial={{opacity: 0, y:-150}}
                    animate={{opacity: 0.5, y:0}}
                    exit={{opacity: 0}}
                    transition={{duration: 1, ease: [0, 0.5, 0, 1]}}
                >
                    <CircleContainer>
                        <Box py={7} px={2}>
                            <LinearProgress />
                        </Box>
                    </CircleContainer>
                </motion.div>
            )}
            {!isFetching &&
                (
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
                            <UsersContext.Provider
                                value={{
                                    data: users,
                                    refresh: () => {

                                    }
                                }}
                            >
                                    <Box
                                        component={"main"}
                                        minHeight={"96vh"}
                                        sx={{
                                            flexGrow: 1,
                                            overflow: "hidden",
                                            pb: 9
                                        }}
                                    >
                                            <CircleContainer>
                                                {mySport && myTeam &&
                                                    <Box>
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
                                                        <OtherInfo infoName={""}
                                                                   infoContent={"どの競技にも参加していません。"}
                                                                   infoSubContent={"競技に参加しない方でも、各競技の進行状況を見ることができます。競技に参加する予定にも関わらずこのメッセージが表示されている場合は、お近くのスタッフにお伝えください。"}/>
                                                    </Stack>
                                                }
                                            </CircleContainer>

                                            <Container
                                                maxWidth={"xl"}
                                                disableGutters
                                                sx={{px: 1, py: 3, mt: "-100px"}}
                                            >
                                                <Stack
                                                    direction={"column"}
                                                    justifyContent={"space-between"}
                                                    spacing={3}
                                                >
                                                    <Grid container spacing={1.5}>

                                                        {mySport && myGame && myTeam &&
                                                            <>
                                                                <Grid xs={12} sm={6} lg={6}>
                                                                    <Schedule
                                                                        sportId={mySport.id}
                                                                        gameId={myGame.id}
                                                                        matches={myTeamMatches}
                                                                        myTeamId={myTeam.id}
                                                                    />
                                                                </Grid>
                                                                <Grid xs={12} sm={6} lg={6}>
                                                                    <JudgeSchedule
                                                                        sportId={mySport.id}
                                                                        gameId={myGame.id}
                                                                        matches={myJudgeMatches}
                                                                        myTeamId={myTeam.id}
                                                                    />
                                                                </Grid>
                                                            </>
                                                        }
                                                        <Typography pl={2} pt={2}>
                                                            すべての競技
                                                        </Typography>
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
                            </UsersContext.Provider>
                        </TeamsContext.Provider>
                    </LocationsContext.Provider>
                </ImagesContext.Provider>
            )}
        </>
    )
}
