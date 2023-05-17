import {NextPage} from "next";
import Head from "next/head";
import {
    Box,
    Container, List, ListItem, ListItemText,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import * as React from "react";
import MyOverview from "../components/dashboard/MyOverview";
import MySchedule from "../components/dashboard/MySchedule";
import {SportsListElement} from "../components/dashboard/SportsListElement";
import {useFetchMyTeams} from "../src/features/teams/hook";
import {useFetchMySport, useFetchSports} from "../src/features/sports/hook";
import {Navigation} from "../components/layouts/navigation";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";



const DashBoard: NextPage = () => {
    const {teams} = useFetchMyTeams();
    const {sport} = useFetchMySport();
    const {sports} = useFetchSports();
    const theme = createTheme();
    //my overview
    const myRank = "順位";

    //my schedule
    const [team1,team2,team3]=["X1-1","X1-2","X1-3"];
    const [time1,time2,time3]=["10:00","11:00","12:00"];
    const [location1,location2,location3]=["場所1","場所2","場所3"];

    //sports list
    const [listSport1, listSport2, listSport3] = ["競技1", "競技2", "競技3"];
    const [listIcon1, listIcon2, listIcon3] = ["1", "2", "3"];
    const [listLink1, listLink2, listLink3] = ["/sports", "/sports", "/sports"];

    return(
        <ThemeProvider theme={theme}>
            <Head>
                <title>SPORTSDAY : Dashboard</title>
            </Head>
            <Navigation/>
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
                        overviewSport={sport?.name}
                        overviewTeam={teams[0]?.name}
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
                            {sports.map((sport) => {
                                return (
                                    <Grid sm={12} md={12} lg={12} key={sport.id}>
                                        <SportsListElement
                                            comp={sport.name}
                                            icon={listIcon1}
                                            link={`/sports/${sport.id}`}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default DashBoard