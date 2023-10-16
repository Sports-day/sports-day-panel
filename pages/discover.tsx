import {NextPage} from "next";
import Head from "next/head";
import {
    Avatar,
    Box,
    Container,
    Stack, SvgIcon, Typography,
    Unstable_Grid2 as Grid,
    Card, CardContent,
    Button,
    SwipeableDrawer,
    IconButton, Divider
} from "@mui/material";
import * as React from "react";
import {Fragment, useContext} from "react";
import {Navigation} from "../components/layouts/navigation";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";
import {useFetchDashboard} from "../src/features/unit/dashboard";
import {useFetchTeamSetsInMyClass} from "../src/features/unit/discover";
import {Loading} from "../components/layouts/loading";
import {motion} from "framer-motion";
import {HiClock, HiLocationMarker, HiSearch} from "react-icons/hi";
import {useFetchLocations} from "../src/features/locations/hook";
import {useFetchImages} from "../src/features/images/hook";
import {UsersContext} from "../components/context";
import {DiscoverTeamContent} from "../components/discover/DiscoverTeamContent";
import {OtherInfo} from "../components/dashboard/Overview/OtherInfo";


const Discover: NextPage = () => {
    //  Unit Hook
    const {
        isFetching,
        isSuccessful,
        myClass,
        users,
        matchSets
    } = useFetchTeamSetsInMyClass()

    const {images, isFetching: isFetchingImages} = useFetchImages()
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()
    const theme = createTheme();

    return (
        <>
            {(isFetching || isFetchingLocations || isFetchingImages) && (
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
            {!(isFetching || isFetchingLocations || isFetchingImages) && (
                <ThemeProvider theme={theme}>
                    <Head>
                        <title>SPORTSDAY : Discover</title>
                    </Head>
                    <motion.div
                        key={"discover"}
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
                                overflow: "hidden",
                                pb: 9
                            }}
                        >
                            <motion.div
                                key={"title-background"}
                                initial={{y: "-100px"}}
                                animate={{y: "0px"}}
                                exit={{opacity: 0, y:"-100px"}}
                                transition={{duration: 0.6, ease: [0.54, -0.01, 0, 1]}}
                            >
                                <Container
                                    maxWidth={false}
                                    disableGutters
                                    sx={{
                                        paddingTop: 0,
                                        paddingBottom: "0px",
                                        marginBottom: "70px",
                                        position: "relative",
                                        zIndex: 1,
                                        width: "101vw",
                                        height: "fit-content",
                                        backgroundColor: "#23398a",
                                    }}
                                >
                                    <motion.div
                                        key={"mainvisual-content"}
                                        initial={{opacity: 0, y: "50px"}}
                                        animate={{opacity: 1, y: "0px"}}
                                        transition={{
                                            delay: 0.3,
                                            duration: 1,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                    >
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={3}
                                            sx={{
                                                pt: 5,
                                                pb: 0,
                                                pr:　3
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    height: "4em",
                                                    width: "4em",
                                                    backgroundColor: "#FFF",
                                                }}
                                            >
                                                <SvgIcon>
                                                    <HiSearch color="#23398A"/>
                                                </SvgIcon>
                                            </Avatar>
                                            <Typography sx={{
                                                color: "#FFF",
                                                fontSize: "30px",
                                                fontWeight: "bold"
                                            }}>
                                                探す
                                            </Typography>
                                        </Stack>
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
                                key={"discover-content"}
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
                                        <Typography sx={{px:2}} fontSize={"18px"}>
                                            同じクラスの試合一覧
                                        </Typography>
                                        {isSuccessful && (
                                            <Grid container spacing={1.5}>
                                                {matchSets
                                                    .map((matchSet, index) => {
                                                        return (
                                                            <>
                                                                <DiscoverTeamContent
                                                                    matchSet={matchSet}
                                                                    images={images}
                                                                    locations={locations}
                                                                    users={users}
                                                                    key={index}
                                                                />
                                                            </>
                                                        );
                                                    })}
                                            </Grid>
                                        )}
                                        {!isSuccessful && (
                                            <OtherInfo infoName={""}
                                                       infoContent={"ブラウズ機能はご利用いただけません。"}
                                                       infoSubContent={"どの競技にも参加していないため、同じクラスの試合はご覧いただけません。競技に参加する予定にも関わらずこのメッセージが表示されている場合は、お近くのスタッフにお伝えください。"}/>
                                        )}
                                    </Stack>
                                </Container>
                            </motion.div>
                        </Box>
                    </motion.div>
                </ThemeProvider>
            )}
        </>
    )
}

export default Discover