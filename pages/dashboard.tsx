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
import {useFetchMyTeamRank, useFetchMyTeams} from "../src/features/teams/hook";
import {useFetchMySport, useFetchSports} from "../src/features/sports/hook";
import {Navigation} from "../components/layouts/navigation";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";
import {motion} from "framer-motion";
import {Footer} from "../components/layouts/footer";
import {useFetchMySportMatches} from "../src/features/matches/hook";

const DashBoard: NextPage = () => {
    const {teams} = useFetchMyTeams();
    const {sport} = useFetchMySport();
    const {sports} = useFetchSports();
    const {matches} = useFetchMySportMatches();
    const theme = createTheme();
    const {rank: myRank} = useFetchMyTeamRank();
    const icon=1;

    return(
        <motion.div
            initial={{opacity:0.3}}
            animate={{opacity:1}}
            exit={{opacity:0.3}}
            transition={{duration: 0.5, ease: 'easeInOut'}}
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
                        overflow:"hidden"
                    }}
                >
                    <Container
                        maxWidth={false}
                        disableGutters
                        sx={{
                            paddingTop: 5,
                            paddingBottom: "20px",
                            position: "relative",
                            width: "101vw",
                            height:"fit-content",
                            backgroundColor: "#23398a",
                        }}
                    >
                        <Overview
                            overviewSport={sport?.name}
                            overviewTeam={teams[0]?.name}
                            overviewRank={myRank}
                        />
                    </Container>

                    <Container
                        maxWidth={"xl"}
                        disableGutters
                        sx={{px:1, py:3}}
                    >
                        <Stack
                            direction={"column"}
                            justifyContent={"space-between"}
                            spacing={3}
                        >
                            <Grid container spacing={1.5}>

                                <Grid xs={12} sm={12} lg={12}>
                                    <Schedule matches={matches}/>
                                </Grid>
                                {sports.map((sport) => {
                                    return (
                                        <Grid xs={12} sm={12} lg={12} key={sport.id}>
                                            <SportsListElement
                                                comp={sport.name}
                                                icon={icon}
                                                link={`/sports/${sport.id}`}
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
        </motion.div>
    )
}

export default DashBoard