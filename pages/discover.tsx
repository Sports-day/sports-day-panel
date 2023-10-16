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
import {HiXMark} from "react-icons/hi2";
import {OtherInfo} from "../components/dashboard/Overview/OtherInfo";
import {SportsListElement} from "../components/dashboard/SportsListElement";
import Link from "next/link";
import {useFetchLocations} from "../src/features/locations/hook";
import {useFetchImages} from "../src/features/images/hook";
import {UsersContext} from "../components/context";


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
    const [open, toggleDrawer] = React.useState(false);
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
                                overflow: "hidden"
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
                                        <Grid container spacing={1.5}>
                                            {matchSets
                                                .map((matchSet, index) => {
                                                    matchSet.match;
                                                    matchSet.sport;
                                                    matchSet.team;
                                                    const image = images.find((v) => v.id === matchSet.sport.iconId)
                                                    const location = locations.find((v) => v.id === matchSet.match.locationId)
                                                    return (
                                                        <>
                                                            <Grid xs={12} sm={12} lg={12} key={index}>
                                                                <Card>
                                                                    <Button sx={{width:"100%"}} onClick={() => toggleDrawer(true)}>
                                                                        <Grid xs={12} sm={5} lg={6}>
                                                                            <Stack
                                                                                alignItems={"flex-start"}
                                                                                direction={"column"}
                                                                                justifyContent={"flex-start"}
                                                                                spacing={1}
                                                                                py={1}
                                                                                px={1}
                                                                            >
                                                                                <Typography color={"textSecondary"} fontSize={"14px"}>
                                                                                    チーム名
                                                                                </Typography>
                                                                                <Typography fontSize={"24px"} fontWeight={"bold"} color={"white"}>
                                                                                    {matchSet.team.name}
                                                                                </Typography>
                                                                            </Stack>
                                                                        </Grid>
                                                                        <Grid xs={12} sm={7} lg={6}>
                                                                            <Stack
                                                                                direction={"column"}
                                                                                justifyContent={"center"}
                                                                                alignItems={"flex-start"}
                                                                            >
                                                                                <Stack
                                                                                    direction={"row"}
                                                                                    alignItems={"flex-end"}
                                                                                    spacing={1}
                                                                                >
                                                                                    <Box sx={{pb:"0.3em"}}>
                                                                                        <Avatar
                                                                                            sx={{height: "1.5em", width: "1.5em"}}
                                                                                            src={image?.attachment}
                                                                                        >
                                                                                        </Avatar>
                                                                                    </Box>
                                                                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                                                                        {matchSet.sport.name}
                                                                                    </Typography>
                                                                                </Stack>
                                                                                <Stack
                                                                                    direction={"row"}
                                                                                    alignItems={"flex-end"}
                                                                                    spacing={1}
                                                                                >
                                                                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                                                                        <HiLocationMarker color="#99a5d6"/>
                                                                                    </SvgIcon>
                                                                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                                                                        {location?.name}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Stack>
                                                                        </Grid>
                                                                    </Button>
                                                                </Card>
                                                            </Grid>
                                                            <>
                                                                <SwipeableDrawer
                                                                    anchor="bottom"
                                                                    open={open}
                                                                    onClose={() => toggleDrawer(false)}
                                                                    onOpen={() => toggleDrawer(true)}
                                                                    swipeAreaWidth={5}
                                                                    disableSwipeToOpen={true}
                                                                    ModalProps={{
                                                                        keepMounted: true,
                                                                    }}
                                                                >
                                                                    <Container
                                                                        maxWidth={"xl"}
                                                                        sx={{
                                                                            pt: 1,
                                                                            pb: 5,
                                                                            px: 3,
                                                                            overflow: "scrollable"
                                                                        }}
                                                                    >
                                                                        <Stack
                                                                            direction={"row"}
                                                                            justifyContent={"space-between"}
                                                                            alignItems={"center"}
                                                                            sx={{width: "100%"}}
                                                                            py={1}
                                                                        >
                                                                            <Typography
                                                                                color={"#E8EBF8"}
                                                                                fontWeight={"bold"}
                                                                            >
                                                                                チームメンバー
                                                                            </Typography>
                                                                            <IconButton onClick={() => toggleDrawer(false)}>
                                                                                <SvgIcon>
                                                                                    <HiXMark color={"#E8EBF8"}/>
                                                                                </SvgIcon>
                                                                            </IconButton>
                                                                        </Stack>
                                                                        <Stack
                                                                            direction={"column"}
                                                                            justifyContent={"flex-start"}
                                                                            alignItems={"flex-start"}
                                                                            spacing={2}
                                                                            pt={2}
                                                                        >
                                                                            {users
                                                                                .filter(user => user.teamIds.includes(matchSet.team.id))
                                                                                .map(user => {
                                                                                    return (
                                                                                        <Fragment key={user.id}>
                                                                                            <Box sx={{width: "100%"}}>
                                                                                                <Divider/>
                                                                                            </Box>
                                                                                            <Typography color={"#99a5d6"} fontSize={"16px"}>
                                                                                                {user.name}
                                                                                            </Typography>
                                                                                        </Fragment>
                                                                                    );
                                                                                })}
                                                                        </Stack>
                                                                    </Container>
                                                                </SwipeableDrawer>
                                                            </>
                                                        </>
                                                    );
                                                })}
                                        </Grid>
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