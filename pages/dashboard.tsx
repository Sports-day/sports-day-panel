import {NextPage} from "next";
import Head from "next/head";
import {
    Box,
    Container,
    Stack,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import * as React from "react";
import MyOverview from "../components/dashboard/MyOverview";
import MySchedule from "../components/dashboard/MySchedule";
import {SportsListElement} from "../components/dashboard/SportsListElement";

const DashBoard: NextPage = () => {

    //my overview
    const mySport = "競技名";
    const myTeam = "チーム";
    const myRank = "順位";

    //my schedule
    const [team1,team2,team3]=["X1-1","X1-2","X1-3"];
    const [time1,time2,time3]=["10:00","11:00","12:00"];
    const [location1,location2,location3]=["場所1","場所2","場所3"];

    //sports list
    const [listSport1, listSport2, listSport3] = ["競技1", "競技2", "競技3"];
    const [listIcon1, listIcon2, listIcon3] = ["1", "2", "3"];
    const [listLink1, listLink2, listLink3] = ["/sport", "/sport", "/sport"];

    return(
        <>
            <Head>
                <title>SPORTSDAY : Dashboard</title>
            </Head>
            <Box
                component={"main"}
                sx={{
                    flexGrow: 1,
                    py: 5
                }}
            >
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        paddingTop: "0px",
                        paddingBottom: "20px",
                        position: "relative",
                        left: "-8px",
                        top: "-8px",
                        width: "100vw",
                        height:"fit-content",
                        backgroundColor: "#23398a",
                }}
                >
                    <MyOverview
                        overviewSport={mySport}
                        overviewTeam={myTeam}
                        overviewRank={myRank}
                    />
                </Container>

                <Container
                    maxWidth={"xl"}
                    disableGutters
                    sx={{px:0.5, py:3}}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        spacing={3}
                    >
                        <Grid container spacing={2}>

                            <Grid xs={12} sm={12} lg={12}>
                                <MySchedule
                                    scTeam1={team1} scTeam2={team2} scTeam3={team3}
                                    scTime1={time1} scTime2={time2} scTime3={time3}
                                    scLocation1={location1} scLocation2={location2} scLocation3={location3}
                                />
                            </Grid>

                            <Grid sm={12} md={12} lg={12}>
                                <SportsListElement
                                    comp={listSport1}
                                    icon={listIcon1}
                                    link={listLink1}
                                />
                            </Grid>
                            <Grid sm={12} md={12} lg={12}>
                                <SportsListElement
                                    comp={listSport2}
                                    icon={listIcon2}
                                    link={listLink2}
                                />
                            </Grid>
                            <Grid sm={12} md={12} lg={12}>
                                <SportsListElement
                                    comp={listSport3}
                                    icon={listIcon3}
                                    link={listLink3}
                                />
                            </Grid>

                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default DashBoard