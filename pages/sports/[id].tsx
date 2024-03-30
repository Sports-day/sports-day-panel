import {GetServerSidePropsContext, NextPage} from "next";
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
import {GameProgress} from "../../components/game/game-progress";
import {Navigation} from "../../components/layouts/navigation";
import {HiChevronLeft, HiOutlineClipboardDocumentList, HiXMark} from "react-icons/hi2";
import * as React from "react";
import {GameList} from "../../components/game/GameList"
import {GamesContext, LocationsContext, MatchesContext, TeamsContext} from "../../components/context";
import {Loading} from "../../components/layouts/loading";
import {useState} from "react";
import {DialogProps} from '@mui/material/Dialog';
import {Rules} from "../../components/rules/Rules";
import {motion} from "framer-motion";
import Link from "next/link";
import {useInterval} from "react-use";
import {InformationList} from "../../components/InformationList";
import {useFetchSport, useFetchSportGames} from "../../src/features/sports/hook";
import {useFetchTeams} from "../../src/features/teams/hook";
import {useFetchLocations} from "../../src/features/locations/hook";
import {useFetchImages} from "../../src/features/images/hook";
import {useSession} from "next-auth/react";
import {useFetchMatches} from "../../src/features/matches/hook";

const REFRESH_INTERVAL = 1000 * 60 * 5

type Props = {
    sportId: number
    gameId: number | null
}

const Id: NextPage<Props> = (props: Props) => {
    useSession({
        required: true,
    })
    //  fetch
    const {sport, isFetching: isSportFetching, refresh: refreshSport} = useFetchSport(props.sportId)
    const {games, isFetching: isGameFetching, refresh: refreshGame} = useFetchSportGames(props.sportId, true)
    const {matches, isFetching: isMatchesFetching, refresh: refreshMatches} = useFetchMatches()
    const {teams, isFetching: isTeamFetching, refresh: refreshTeam} = useFetchTeams()
    const {locations, isFetching: isLocationsFetching, refresh: refreshLocations} = useFetchLocations()
    const {images, isFetching: isImagesFetching, refresh: refreshImages} = useFetchImages()
    //  image
    const image = images.find(image => image.id === sport?.iconId)
    //  state
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [focusedGameId, setFocusedGameId] = useState<number | null>(props.gameId ?? null)

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

    if (isFetching) {
        return (
            <>
                <motion.div
                    key={"loading"}
                    initial={{opacity: 0}}
                    animate={{opacity: 0.2}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2, ease: [0, 0.5, 0, 1]}}
                >
                    <Loading/>
                </motion.div>
            </>
        )
    }

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
                                <title>{`SPORTSDAY : ${sport.name}`}</title>
                            </Head>
                            <motion.div
                                key={"sport"}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.8, ease: [0.83, 0, 0.17, 1]}}
                            >
                                <Navigation/>
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
                                    <motion.div
                                        key={"main-visual"}
                                        initial={{y: "-100px"}}
                                        animate={{y: "0px"}}
                                        exit={{opacity: 0, y: "-100px"}}
                                        transition={{duration: 0.7, ease: [0.54, -0.01, 0, 1]}}
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

                                                <Container
                                                    maxWidth={"xl"}
                                                    sx={{paddingTop: 0.1}}
                                                >
                                                    <InformationList/>
                                                </Container>
                                                <Stack
                                                    direction={"row"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    spacing={3}
                                                    sx={{
                                                        pt: 7,
                                                        pb: 3
                                                    }}
                                                >
                                                    <Avatar
                                                        alt={sport.name}
                                                        sx={{height: "3.5em", width: "3.5em"}}
                                                        src={image?.attachment}
                                                    >

                                                    </Avatar>
                                                    <Typography sx={{
                                                        color: "#FFF",
                                                        fontSize: "30px",
                                                        fontWeight: "bold"
                                                    }}>
                                                        {sport.name}
                                                    </Typography>
                                                </Stack>
                                            </motion.div>
                                        </Container>
                                        <Container
                                            maxWidth={false}
                                            sx={{
                                                width: "140vw",
                                                height: "100px",
                                                left: "-20vw",
                                                top: "-150px",
                                                zIndex: "0",
                                                position: "relative",
                                                backgroundColor: "#23398a",
                                                borderTopLeftRadius: "10px",
                                                borderTopRightRadius: "10px",
                                                borderBottomLeftRadius: "50% 50%",
                                                borderBottomRightRadius: "50% 50%",
                                            }}
                                        >
                                        </Container>
                                    </motion.div>

                                    <Container
                                        maxWidth={"xl"}
                                        disableGutters
                                        sx={{px: 1, pb: 0, mt: "-150px"}}
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
                                        <Stack
                                            direction={"column"}
                                        >
                                            <Grid container spacing={1.5}>
                                                <Grid xs={12} sm={12} lg={12}>
                                                    <motion.div
                                                        key={"gameprogress"}
                                                        initial={{opacity: 0, y: "50px"}}
                                                        animate={{opacity: 1, y: "0px"}}
                                                        transition={{
                                                            delay: 0.4,
                                                            duration: 1,
                                                            ease: [0.16, 1, 0.3, 1]
                                                        }}
                                                    >
                                                        <GameProgress sportsId={sport.id}/>
                                                    </motion.div>
                                                </Grid>
                                            </Grid>
                                        </Stack>

                                    </Container>

                                    <motion.div
                                        key={"gamelist"}
                                        initial={{opacity: 0, y: "50px"}}
                                        animate={{opacity: 1, y: "0px"}}
                                        transition={{delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <GameList
                                            games={games}
                                            gameId={focusedGameId}
                                            setGameId={setFocusedGameId}
                                        />
                                    </motion.div>

                                </Box>
                            </motion.div>
                        </LocationsContext.Provider>
                    </TeamsContext.Provider>
                </MatchesContext.Provider>
            </GamesContext.Provider>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    if (!context.query.id) {
        return {
            notFound: true,
        }
    }
    const id = +context.query.id

    if (isNaN(id)) {
        return {
            notFound: true,
        }
    }

    let game = null
    if (context.query.gameId) {
        if (!isNaN(parseInt(context.query.gameId as string))) {
            game = parseInt(context.query.gameId as string)
        }
    }

    return {
        props: {
            sportId: id,
            gameId: game
        }
    }
}

export default Id