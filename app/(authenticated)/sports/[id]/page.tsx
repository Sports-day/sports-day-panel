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
    DialogTitle, LinearProgress,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid,
    useTheme
} from "@mui/material";
import {GameProgress} from "@/components/game/game-progress";
import {
    HiOutlineClipboardDocumentList,
    HiOutlineExclamationTriangle,
    HiTableCells,
    HiUsers,
    HiXMark
} from "react-icons/hi2";
import * as React from "react";
import {GameList} from "@/components/game/GameList"
import {GamesContext, LocationsContext, MatchesContext, TeamsContext} from "@/components/context";
import {useState} from "react";
import {DialogProps} from '@mui/material/Dialog';
import {Rules} from "@/components/rules/Rules";
import {useInterval} from "react-use";
import {useFetchSport, useFetchSportGames} from "@/src/features/sports/hook";
import {useFetchTeams} from "@/src/features/teams/hook";
import {useFetchLocations} from "@/src/features/locations/hook";
import {useFetchMatches} from "@/src/features/matches/hook";
import {useFetchUserinfo} from "@/src/features/userinfo/hook";
import CircleContainer from "@/components/layouts/circleContainer";
import {motion} from "framer-motion";

const REFRESH_INTERVAL = 1000 * 60 * 5

export default function Page({ params }: { params: { id: string } }) {
    const theme = useTheme()
    //  fetch
    const {sport, isFetching: isSportFetching, refresh: refreshSport} = useFetchSport(+params.id)
    const {games, isFetching: isGameFetching, refresh: refreshGame} = useFetchSportGames(+params.id, true)
    const {matches, isFetching: isMatchesFetching, refresh: refreshMatches} = useFetchMatches()
    const {teams, isFetching: isTeamFetching, refresh: refreshTeam} = useFetchTeams()
    const {locations, isFetching: isLocationsFetching, refresh: refreshLocations} = useFetchLocations()
    const {user, isFetching: isUserFetching} = useFetchUserinfo()
    const myTeams = teams.filter(team => team.userIds.includes(Number(user?.id)))
    const myGames = games.filter(game => myTeams.some(team => team.enteredGameIds.includes(game.id)))
    myGames.sort((a, b) => b.weight - a.weight)
    const myGame = myGames[0]
    const myTeam = myTeams.find(team => team.enteredGameIds.includes(myGame?.id))
    //  state
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [focusedGameId, setFocusedGameId] = useState<number | null>(null)

    const isFetching = isSportFetching || isGameFetching || isTeamFetching || isLocationsFetching || isMatchesFetching || isUserFetching
    const refresh = () => {
        refreshSport()
        refreshGame()
        refreshTeam()
        refreshLocations()
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

    {isFetching && (
        <motion.div
            key={"loading"}
            initial={{opacity: 0, y:-150}}
            animate={{opacity: 0.5, y:0}}
            exit={{opacity: 0}}
            transition={{duration: 1, ease: [0, 0.5, 0, 1]}}
        >
            <CircleContainer>
                <Container maxWidth={"xl"}>
                    <Box py={7} px={2}>
                        <LinearProgress />
                    </Box>
                </Container>
            </CircleContainer>
        </motion.div>
    )}

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
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={3}
                                            py={2}
                                            sx={{
                                                height:"100%"
                                            }}
                                        >
                                            <Avatar
                                                alt={sport.name}
                                                sx={{height: "2.5em", width: "2.5em"}}
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${sport.iconId}/file`}
                                            >
                                                {!sport.iconId && <HiOutlineExclamationTriangle fontSize={"30px"}/>}
                                            </Avatar>
                                            <Typography sx={{
                                                color: theme.palette.text.primary,
                                                fontSize: "20px",
                                                fontWeight: "bold"
                                            }}>
                                                {sport.name}
                                            </Typography>
                                        </Stack>
                                        <Grid container spacing={1}>
                                            {myTeam &&
                                                <>
                                                    <Grid xs={5.5} sm={5.5} lg={5.5}>
                                                        <Box
                                                            px={2}
                                                            py={2}
                                                            pr={2}
                                                            sx={{
                                                                width: "100%",
                                                                height:"86px",
                                                                borderRadius: "12px",
                                                                backgroundColor: `${theme.palette.secondary.light}33`,
                                                                border: `1px solid ${theme.palette.secondary.dark}66`,
                                                            }}>
                                                            <Stack
                                                                direction={"row"}
                                                                justifyContent={"space-between"}
                                                                alignItems={"center"}
                                                                sx={{width: "100%", height: "100%"}}
                                                            >
                                                                <Stack
                                                                    direction={"column"}
                                                                    justifyContent={"center"}
                                                                    alignItems={"flex-start"}
                                                                >
                                                                    <Typography sx={{fontSize: "14px"}}>
                                                                        あなたのチーム
                                                                    </Typography>
                                                                    <Typography>
                                                                        {myTeam?.name}
                                                                    </Typography>
                                                                </Stack>
                                                                <SvgIcon>
                                                                    <HiUsers color="#99a5d6"/>
                                                                </SvgIcon>
                                                            </Stack>
                                                        </Box>
                                                    </Grid>
                                                    <Grid xs={6.5} sm={6.5} lg={6.5}>
                                                        <Box
                                                            px={2}
                                                            py={2}
                                                            pr={2}
                                                            sx={{
                                                                width: "100%",
                                                                height:"86px",
                                                                borderRadius: "12px",
                                                                backgroundColor: `${theme.palette.secondary.light}33`,
                                                                border: `1px solid ${theme.palette.secondary.dark}66`,
                                                            }}>
                                                            <Stack
                                                                direction={"row"}
                                                                justifyContent={"space-between"}
                                                                alignItems={"center"}
                                                                sx={{width: "100%", height: "100%"}}
                                                            >
                                                                <Stack
                                                                    direction={"column"}
                                                                    justifyContent={"center"}
                                                                    alignItems={"flex-start"}
                                                                >
                                                                    <Typography fontSize={"14px"}>
                                                                        あなたのリーグ
                                                                    </Typography>
                                                                    <Typography>
                                                                        {myGame?.name}
                                                                    </Typography>
                                                                </Stack>
                                                                <SvgIcon>
                                                                    <HiTableCells color="#99a5d6"/>
                                                                </SvgIcon>
                                                            </Stack>
                                                        </Box>
                                                    </Grid>
                                                </>
                                            }
                                            <Grid xs={6.5} sm={6.5} lg={6.5}>
                                                <Box
                                                    px={2}
                                                    py={1.5}
                                                    pr={2}
                                                    sx={{
                                                        width: "100%",
                                                        height:"75px",
                                                        borderRadius: "12px",
                                                        backgroundColor: `${theme.palette.secondary.light}33`,
                                                        border: `1px solid ${theme.palette.secondary.dark}66`,
                                                    }}>
                                                    <GameProgress sportsId={sport.id}/>
                                                </Box>
                                            </Grid>
                                            <Grid xs={5.5} sm={5.5} lg={5.5}>
                                                <Button
                                                    variant={"contained"}
                                                    color={"secondary"}
                                                    sx={{
                                                        width: "100%", height: "75px",
                                                        backgroundColor: `${theme.palette.secondary.light}66`,
                                                        border: `1px solid ${theme.palette.secondary.dark}66`,
                                                    }}
                                                    onClick={handleClickOpen('paper')}
                                                >
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"space-between"}
                                                        alignItems={"center"}
                                                        spacing={1}
                                                        sx={{
                                                            color: theme.palette.text.primary,
                                                            width:"100%"
                                                        }}
                                                    >
                                                        <Typography fontSize={"14px"}>
                                                            ルールを見る
                                                        </Typography>
                                                        <SvgIcon>
                                                            <HiOutlineClipboardDocumentList/>
                                                        </SvgIcon>
                                                    </Stack>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </CircleContainer>

                                <Dialog
                                    fullScreen
                                    open={open}
                                    onClose={handleClose}
                                    scroll={scroll}
                                    aria-labelledby="scroll-dialog-title"
                                    aria-describedby="scroll-dialog-description"
                                    sx={{
                                        "& .MuiDialog-container": {
                                            "& .MuiPaper-root": {
                                                width: "100vw",
                                                maxWidth: "lg",
                                                background: theme.palette.background.paper,
                                            },
                                        },
                                    }}
                                >
                                    <DialogTitle id="scroll-dialog-title" fontSize={"16px"}
                                                 color={theme.palette.text.primary}>{sport.name}のルール</DialogTitle>
                                    <DialogContent dividers={scroll === 'paper'}>
                                        <Rules ruleId={sport.ruleId}/>
                                    </DialogContent>
                                    <DialogActions sx={{mb:3}}>
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={2}
                                            sx={{width: "100%", height:"40px"}}
                                        >
                                            <Button sx={{width: "100%"}}
                                                    onClick={handleClose}>
                                                <SvgIcon sx={{mr: 1}}>
                                                    <HiXMark color={theme.palette.text.primary}/>
                                                </SvgIcon>
                                                <Typography color={theme.palette.text.primary}>閉じる</Typography>
                                            </Button>
                                        </Stack>
                                    </DialogActions>
                                </Dialog>

                                <Container
                                    maxWidth={"xl"}
                                    sx={{px: 2, py: 3,mb:5, mt: "-100px"}}
                                >
                                    <GameList
                                        games={games}
                                        gameId={focusedGameId}
                                        setGameId={setFocusedGameId}
                                        myTeamId={myTeam?.id}
                                    />
                                </Container>

                            </Box>
                        </LocationsContext.Provider>
                    </TeamsContext.Provider>
                </MatchesContext.Provider>
            </GamesContext.Provider>
        </>
    )
}
