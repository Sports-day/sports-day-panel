'use client'
import Head from "next/head";
import {
    Avatar,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {GameProgress} from "@/components/game/game-progress";
import {Navigation} from "@/components/layouts/navigation";
import {HiChevronLeft, HiOutlineClipboardDocumentList, HiXMark} from "react-icons/hi2";
import * as React from "react";
import {GameList} from "@/components/game/GameList"
import {GamesContext, LocationsContext, MatchesContext, TeamsContext} from "@/components/context";
import {Loading} from "@/components/layouts/loading";
import {useState} from "react";
import {DialogProps} from '@mui/material/Dialog';
import {Rules} from "@/components/rules/Rules";
import {motion} from "framer-motion";
import Link from "next/link";
import {useInterval} from "react-use";
import {InformationList} from "@/components/InformationList";
import {useFetchSport, useFetchSportGames} from "@/src/features/sports/hook";
import {useFetchTeams} from "@/src/features/teams/hook";
import {useFetchLocations} from "@/src/features/locations/hook";
import {useFetchImages} from "@/src/features/images/hook";
import {useFetchMatches} from "@/src/features/matches/hook";
import CircleContainer from "@/components/layouts/circleContainer";

const REFRESH_INTERVAL = 1000 * 60 * 5

export default function Page({ params }: { params: { id: string } }) {
    //  fetch
    const {sport, isFetching: isSportFetching, refresh: refreshSport} = useFetchSport(+params.id)
    const {games, isFetching: isGameFetching, refresh: refreshGame} = useFetchSportGames(+params.id, true)
    const {matches, isFetching: isMatchesFetching, refresh: refreshMatches} = useFetchMatches()
    const {teams, isFetching: isTeamFetching, refresh: refreshTeam} = useFetchTeams()
    const {locations, isFetching: isLocationsFetching, refresh: refreshLocations} = useFetchLocations()
    const {images, isFetching: isImagesFetching, refresh: refreshImages} = useFetchImages()
    //  image
    const image = images.find(image => image.id === sport?.iconId)
    //  state
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [focusedGameId, setFocusedGameId] = useState<number | null>(null)

    const isFetching = isSportFetching || isGameFetching || isTeamFetching || isLocationsFetching || isImagesFetching || isMatchesFetching
    const refresh = () => {
        refreshSport()
        refreshGame()
        refreshTeam()
        refreshLocations()
        refreshImages()
        refreshMatches()
    }

    //  set focusedGameId when games is loaded
    if (!isFetching && focusedGameId === null) {
        if (games.length > 0) {
            setFocusedGameId(games[0].id)
        }
    }

    useInterval(
        () => {
            refresh()
        },
        REFRESH_INTERVAL
    )

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // if (isFetching) {
    //     return (
    //         <>
    //             <motion.div
    //                 key={"loading"}
    //                 initial={{opacity: 0}}
    //                 animate={{opacity: 0.2}}
    //                 exit={{opacity: 0}}
    //                 transition={{duration: 0.2, ease: [0, 0.5, 0, 1]}}
    //             >
    //                 <Loading/>
    //             </motion.div>
    //         </>
    //     )
    // }

    if (!sport) {
        return null
    }

    return (
        <>
            <GamesContext.Provider
                value={{
                    data: games,
                    refresh: () => {
                    }
                }}
            >
                <MatchesContext.Provider
                    value={{
                        data: matches,
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
                        <LocationsContext.Provider
                            value={{
                                data: locations,
                                refresh: () => {
                                }
                            }}
                        >

                            <Head>
                                {/* TODO use metadata api instead of Head component*/}
                                <title>{`SPORTSDAY : ${sport.name}`}</title>
                            </Head>
                                <Box
                                    component={"main"}
                                    minHeight={"96vh"}
                                    sx={{
                                        flexGrow: 1,
                                        pb: 5,
                                        overflow: "hidden"
                                    }}
                                >

                                    {/*MainVisual*/}
                                    <CircleContainer>
                                        <Container
                                            maxWidth={"xl"}
                                        >
                                            <Grid container spacing={1}>
                                                <Grid xs={6} sm={6} lg={6}>
                                                    <Box
                                                        px={2}
                                                        py={3}
                                                        mb={1}
                                                        sx={{
                                                            width:"100%",
                                                            height:"180px",
                                                            backgroundColor: "#5f6dc2",
                                                            borderRadius: "10px"
                                                        }}>
                                                        <Stack
                                                            direction={"column"}
                                                            justifyContent={"space-between"}
                                                            alignItems={"flex-start"}
                                                            spacing={3}
                                                            sx={{
                                                                height:"100%"
                                                            }}
                                                        >
                                                            <Avatar
                                                                alt={sport.name}
                                                                sx={{height: "2.5em", width: "2.5em"}}
                                                                src={image?.data}
                                                            >

                                                            </Avatar>
                                                            <Typography sx={{
                                                                color: "#FFF",
                                                                fontSize: "14px",
                                                                fontWeight: "bold"
                                                            }}>
                                                                {sport.name}
                                                            </Typography>
                                                        </Stack>
                                                    </Box>
                                                </Grid>
                                                <Grid xs={6} sm={6} lg={6}>
                                                    <Box pb={"8px"}>
                                                        <GameProgress sportsId={sport.id}/>
                                                    </Box>
                                                    <Button startIcon={<HiOutlineClipboardDocumentList/>} disableElevation variant={"contained"}  sx={{width:"100%", height:"86px"}}>
                                                        <Stack
                                                            direction={"row"}
                                                            justifyContent={"space-between"}
                                                            alignItems={"center"}
                                                            sx={{py:1, width:"100%"}}
                                                        >
                                                            <Typography>
                                                                ルールを見る
                                                            </Typography>
                                                        </Stack>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </CircleContainer>

                                    <Container
                                        maxWidth={"xl"}
                                        disableGutters
                                        sx={{px: 1, pb: 0, mt: "-105px"}}
                                    >

                                        {/*MiddleNavigation*/}
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                        >
                                            <Button component={Link} href={"/"} scroll={false}>
                                                <Stack
                                                    direction={"row"}
                                                    justifyContent={"space-between"}
                                                    alignItems={"flex-start"}
                                                    spacing={1}
                                                    sx={{
                                                        px: 1,
                                                        pt: 3,
                                                        pb: 2,
                                                        color: "#23398A",
                                                        "@media (prefers-color-scheme: dark)": {
                                                            color: "#99a5d6"
                                                        }
                                                    }}
                                                >
                                                    <SvgIcon>
                                                        <HiChevronLeft/>
                                                    </SvgIcon>
                                                    <Typography>
                                                        戻る
                                                    </Typography>
                                                </Stack>
                                            </Button>
                                            <Button onClick={handleClickOpen('paper')}>
                                                <Stack
                                                    direction={"row"}
                                                    justifyContent={"space-between"}
                                                    alignItems={"flex-start"}
                                                    spacing={1}
                                                    sx={{
                                                        px: 1,
                                                        pt: 3,
                                                        pb: 2,
                                                        color: "#23398A",
                                                        "@media (prefers-color-scheme: dark)": {
                                                            color: "#99a5d6"
                                                        }
                                                    }}
                                                >
                                                    <Typography>
                                                        ルールを見る
                                                    </Typography>
                                                    <SvgIcon>
                                                        <HiOutlineClipboardDocumentList/>
                                                    </SvgIcon>
                                                </Stack>
                                            </Button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                scroll={scroll}
                                                aria-labelledby="scroll-dialog-title"
                                                aria-describedby="scroll-dialog-description"
                                                sx={{
                                                    "& .MuiDialog-container": {
                                                        "& .MuiPaper-root": {
                                                            width: "100vw",
                                                            maxWidth: "lg"
                                                        },
                                                    },
                                                }}
                                            >
                                                <DialogTitle id="scroll-dialog-title" fontSize={"16px"}
                                                             color={"#99a5d6"}>{sport.name}のルール</DialogTitle>
                                                <DialogContent dividers={scroll === 'paper'}>
                                                    <Rules ruleId={sport.ruleId}/>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={2}
                                                        sx={{width: "100%"}}
                                                    >
                                                        <Button sx={{width: "100%", height: "100%"}}
                                                                onClick={handleClose}>
                                                            <SvgIcon sx={{mr: 1}}>
                                                                <HiXMark color={"#E8EBF8"}/>
                                                            </SvgIcon>
                                                            <Typography color={"#E8EBF8"}>閉じる</Typography>
                                                        </Button>
                                                    </Stack>
                                                </DialogActions>
                                            </Dialog>
                                        </Stack>

                                        {/*GameProgress, BestTeam*/}


                                    </Container>

                                    <motion.div
                                        key={"gamelist"}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{delay: 0, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <GameList
                                            games={games}
                                            gameId={focusedGameId}
                                            setGameId={setFocusedGameId}
                                        />
                                    </motion.div>

                                </Box>
                        </LocationsContext.Provider>
                    </TeamsContext.Provider>
                </MatchesContext.Provider>
            </GamesContext.Provider>
        </>
    )
}
