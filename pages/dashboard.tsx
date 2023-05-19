import {NextPage} from "next";
import Head from "next/head";
import {
    Box,
    Container,
    Stack,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import * as React from "react";
import Overview from "../components/dashboard/overview";
import Schedule from "../components/dashboard/schedule";
import {SportsListElement} from "../components/dashboard/SportsListElement";
import {useFetchMyTeams} from "../src/features/teams/hook";
import {useFetchMySport, useFetchSports} from "../src/features/sports/hook";
import {Navigation} from "../components/layouts/navigation";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";
import {motion, HTMLMotionProps} from "framer-motion";
import Link from "next/link";
import {Footer} from "../components/layouts/footer";
import {useFetchMySportMatches} from "../src/features/matches/hook";

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>


const DashBoard: NextPage = () => {
    const {teams} = useFetchMyTeams();
    const {sport} = useFetchMySport();
    const {sports} = useFetchSports();
    const {matches} = useFetchMySportMatches();
    const theme = createTheme();
    //my overview
    const myRank = "順位";

    //my schedule
    const [team1,team2,team3]=["X1-1","X1-2","X1-3"];
    const [time1,time2,time3]=["10:00","11:00","12:00"];
    const [location1,location2,location3]=["場所1","場所2","場所3"];

    const icon=1;

    const onTheRight={x:'100%'}
    const inTheCenter = {x:'0'}
    const onTheLeft = {x:'-100%'}

    const transition = {duration: 0.6, ease: 'easeInOut'}

    return(
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration: 0.3, ease: 'easeInOut'}}
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
                        py: 5,
                        overflow:"hidden"
                    }}
                >
                    <Container
                        maxWidth={false}
                        disableGutters
                        sx={{
                            paddingTop: "0px",
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