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
import {GameBest} from "../../components/game/GameBest";
import {Navigation} from "../../components/layouts/navigation";
import {HiArrowLeftCircle, HiEllipsisHorizontalCircle, HiXMark} from "react-icons/hi2";
import * as React from "react";
import {createTheme} from "../../components/theme";
import {ThemeProvider} from "@mui/material/styles";
import {useRouter} from "next/router";
import {Footer} from "../../components/layouts/footer";
import {GameList} from "../../components/game/GameList"
import {useFetchSportData} from "../../src/features/unit/sports";
import {GamesContext, LocationsContext, MatchesContext, TeamsContext} from "../../components/context";
import {Loading} from "../../components/layouts/loading";
import {motion} from "framer-motion";
import {AnimatePresence} from "framer-motion";
import {useState} from "react";
import { DialogProps } from '@mui/material/Dialog';
import {Rules} from "../../components/rules/Rules";

type Props = {
    sportId: number
}

const Id: NextPage<Props> = (props: Props) => {
    //  router
    const router = useRouter()
    const theme = createTheme();
    const {
        isFetching,
        image,
        sport,
        games,
        teams,
        matches,
        locations
    } = useFetchSportData(props.sportId)
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if (!isFetching && !sport) {
        return null
    }


    if (isFetching) {
        return (
            <Loading/>
        )
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5, ease: 'easeInOut'}}
            >
            <GamesContext.Provider
                value={{
                    data: games,
                    refresh: () => {
                    }
                }}
            >
                <TeamsContext.Provider
                    value={{
                        data: teams,
                        refresh: () => {}
                    }}
                >
                    <MatchesContext.Provider
                        value={{
                            data: matches,
                            refresh: () => {}
                        }}
                    >
                        <LocationsContext.Provider
                            value={{
                                data: locations,
                                refresh: () => {}
                            }}
                        >

                            <ThemeProvider theme={theme}>
                                <Head>
                                    <title>{`SPORTSDAY : ${sport.name}`}</title>
                                </Head>
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
                                    <Container
                                        maxWidth={false}
                                        disableGutters
                                    >
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={3}
                                            sx={{
                                                paddingTop: 5,
                                                paddingBottom: "0px",
                                                marginBottom:"70px",
                                                position: "relative",
                                                zIndex: 1,
                                                width: "101vw",
                                                height: "fit-content",
                                                backgroundColor: "#23398a",
                                            }}
                                        >
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
                                                <Typography sx={{color: "#FFF", fontSize: "30px", fontWeight: "bold"}}>
                                                    {sport.name}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                    <Container
                                        maxWidth={false}
                                        sx={{
                                            width: "140vw",
                                            height:"100px",
                                            left:"-20vw",
                                            top:"-150px",
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

                                    <Container
                                        maxWidth={"xl"}
                                        disableGutters
                                        sx={{px: 1, pb: 0, mt:"-150px"}}
                                    >

                                        {/*MiddleNavigation*/}
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                        >
                                            <Button onClick={() => router.back()}>
                                                <Stack
                                                    direction={"row"}
                                                    justifyContent={"space-between"}
                                                    alignItems={"flex-start"}
                                                    spacing={1}
                                                    sx={{
                                                        px: 1,
                                                        pt: 3,
                                                        pb:2,
                                                        color: "#23398A",
                                                        "@media (prefers-color-scheme: dark)": {
                                                            color: "#99a5d6"
                                                        }
                                                    }}
                                                >
                                                    <SvgIcon>
                                                        <HiArrowLeftCircle/>
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
                                                        pb:2,
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
                                                        <HiEllipsisHorizontalCircle/>
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
                                                <DialogTitle id="scroll-dialog-title" fontSize={"16px"} color={"#99a5d6"}>{sport.name}のルール</DialogTitle>
                                                <DialogContent dividers={scroll === 'paper'}>
                                                    <Rules sportId={sport.id}/>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        spacing={2}
                                                        sx={{width:"100%"}}
                                                    >
                                                        <Button sx={{width:"100%", height:"100%"}} onClick={handleClose}>
                                                            <SvgIcon sx={{mr:1}}>
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

                                                <Grid xs={12} sm={6} lg={6}>
                                                    <GameBest/>
                                                </Grid>

                                                <Grid xs={12} sm={6} lg={6}>
                                                    <GameProgress/>
                                                </Grid>

                                            </Grid>
                                        </Stack>

                                    </Container>

                                    <GameList sportId={props.sportId}/>

                                </Box>
                                <Footer/>
                            </ThemeProvider>
                        </LocationsContext.Provider>
                    </MatchesContext.Provider>
                </TeamsContext.Provider>
            </GamesContext.Provider>
            </motion.div>
        </AnimatePresence>
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

    return {
        props: {sportId: id}
    }
}

export default Id