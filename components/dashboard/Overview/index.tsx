import {
    Avatar,
    Button,
    Container,
    Card,
    Stack,
    SvgIcon,
    Typography,
    SwipeableDrawer,
    Unstable_Grid2 as Grid, Box
} from "@mui/material";
import {
    HiChartBar,
    HiOutlineExclamationTriangle, HiUser
} from "react-icons/hi2";
import {Sport} from "@/src/models/SportModel";
import {Team} from "@/src/models/TeamModel";
import {User} from "@/src/models/UserModel";
import {Fragment, useState} from "react";
import * as React from "react";
import Link from "next/link";
import Rank from "./Rank"
import {useTheme} from "@mui/material/styles";
import {LeagueRankList} from "@/components/game/RankList/LeagueRankList";
import {Game} from "@/src/models/GameModel";


export type OverviewProps = {
    mySport: Sport;
    myGame: Game;
    myTeam: Team;
    myTeamUsers: User[];
    myTeamRank: number;
}

export const Overview = (props: OverviewProps) => {
    const theme = useTheme();

    //teamDrawer
    const [teamDrawerOpen, setTeamDrawerOpen] = useState(false);
    const toggleTeamDrawer = (newOpen: boolean) => () => {
        setTeamDrawerOpen(newOpen);
    };
    //rankDrawer
    const [rankDrawerOpen, setRankDrawerOpen] = useState(false);
    const toggleRankDrawer = (newOpen: boolean) => () => {
        setRankDrawerOpen(newOpen);
    }

    return (
        <Container
            maxWidth={"xl"}
        >
            <Grid container spacing={1}>
                <Grid xs={6.5} sm={6.5} lg={6.5}>
                    <Button
                        disableElevation
                        color={"secondary"}
                        variant={"contained"}
                        component={Link}
                        sx={{
                            width: "100%", height: "180px",
                            backgroundColor: `${theme.palette.secondary.light}66`,
                            border: `1px solid ${theme.palette.secondary.dark}66`,
                            boxShadow: `0px 0px 5px ${theme.palette.primary.dark}33`,
                        }}
                        href={`/sports/${props.mySport.id}`}
                        scroll={false}
                    >
                        <Stack
                            sx={{height: "100%", width: "100%", py: 2}}
                            direction={"column"}
                            justifyContent={"space-between"}
                            alignItems={"flex-start"}
                        >
                            <Avatar
                                alt={props.mySport.name}
                                sx={{
                                    height: "2.5em", width: "2.5em",
                                    backgroundColor: `${theme.palette.text.secondary}`,
                                }}
                                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${props.mySport.iconId}/file`}
                            >
                                {!props.mySport.iconId && <HiOutlineExclamationTriangle fontSize={"30px"}/>}
                            </Avatar>
                            <Stack
                                direction={"column"}
                                justifyContent={"flex-start"}
                                alignItems={"flex-start"}
                            >
                                <Typography fontSize={"14px"} sx={{color: theme.palette.text.primary}}>
                                    あなたの競技
                                </Typography>
                                <Typography fontSize={"14px"} fontWeight={"600"}
                                            sx={{color: theme.palette.text.primary}}>
                                    {props.mySport.name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Button>
                </Grid>
                <Grid xs={5.5} sm={5.5} lg={5.5}>
                    <Button
                        disableElevation
                        color={"secondary"}
                        variant={"contained"}
                        onClick={toggleRankDrawer(true)}
                        sx={{
                            width: "100%", height: "86px",
                            backgroundColor: `${theme.palette.secondary.light}66`,
                            border: `1px solid ${theme.palette.secondary.dark}66`,
                            boxShadow: `0px 0px 5px ${theme.palette.primary.dark}33`,
                            mb:"8px"
                        }}
                    >
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
                                <Typography sx={{fontSize: "14px", color: theme.palette.text.primary}}>
                                    リーグ内順位
                                </Typography>
                                <Rank rank={props.myTeamRank}/>
                            </Stack>
                            <SvgIcon>
                                <HiChartBar color="#99a5d6"/>
                            </SvgIcon>
                        </Stack>
                    </Button>
                    <Button
                        disableElevation
                        color={"secondary"}
                        variant={"contained"}
                        onClick={toggleTeamDrawer(true)}
                        sx={{
                            width: "100%", height: "86px",
                            backgroundColor: `${theme.palette.secondary.light}66`,
                            border: `1px solid ${theme.palette.secondary.dark}66`,
                            boxShadow: `0px 0px 5px ${theme.palette.primary.dark}33`,
                        }}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{width: "100%"}}
                        >
                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"flex-start"}
                            >
                                <Typography sx={{fontSize: "14px", color: theme.palette.text.primary}}>
                                    チーム
                                </Typography>
                                <Typography sx={{fontSize: "18px", color: theme.palette.text.primary}}>
                                    {props.myTeam.name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Button>
                </Grid>
            </Grid>
            {/*teamDrawer*/}
            <SwipeableDrawer
                anchor="bottom"
                open={teamDrawerOpen}
                onClose={toggleTeamDrawer(false)}
                onOpen={toggleTeamDrawer(true)}
                swipeAreaWidth={5}
                disableSwipeToOpen={true}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{elevation: 0, style: {backgroundColor: "transparent"}}}
            >
                <Box
                    sx={{
                        width: '100vw',
                        height: 'auto',
                        overflow: 'scrollable',
                        background: `${theme.palette.secondary.main}FC`,
                        backdropFilter: 'blur(30px)',
                        borderRadius: "15px",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        color: '#E8EBF8',
                        pb: 5,
                        pt: 1.5
                    }}
                    role="Navigation"
                >
                    <Container maxWidth={"xl"}>
                        <Stack spacing={1}>
                            <Stack direction={"column"} spacing={2} pb={2} justifyContent={"center"}
                                   alignItems={"center"}>
                                <Box sx={{
                                    width: 50,
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: `${theme.palette.text.primary}4D`
                                }}></Box>
                                <Typography
                                    color={theme.palette.text.primary}
                                    textAlign={"center"}
                                >
                                    あなたのチームメンバー
                                </Typography>
                            </Stack>

                            {props.myTeamUsers.map(user => {
                                const image = `${process.env.NEXT_PUBLIC_API_URL}/images/${user?.pictureId}/file`
                                return (
                                    <Fragment key={user.id}>
                                        <Card sx={{backgroundColor: `${theme.palette.secondary.dark}80`,}}>
                                            <Stack direction={"row"} px={2} py={1} spacing={3} ml={0.4}
                                                   alignItems={"center"}>
                                                <Avatar
                                                    alt={"unknown"}
                                                    sx={{
                                                        height: "1.5em",
                                                        width: "1.5em",
                                                        backgroundColor: theme.palette.text.secondary,
                                                    }}
                                                    src={image}
                                                >
                                                    {user?.pictureId === null && <HiUser/>}
                                                </Avatar>
                                                <Typography color={theme.palette.text.primary}>
                                                    {user.name}
                                                </Typography>
                                            </Stack>
                                        </Card>
                                    </Fragment>
                                );
                            })}
                        </Stack>
                    </Container>
                </Box>
            </SwipeableDrawer>

            {/*rankDrawer*/}
            <SwipeableDrawer
                anchor="bottom"
                open={rankDrawerOpen}
                onClose={toggleRankDrawer(false)}
                onOpen={toggleRankDrawer(true)}
                swipeAreaWidth={5}
                disableSwipeToOpen={true}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{elevation: 0, style: {backgroundColor: "transparent"}}}
            >
                <Box
                    sx={{
                        width: '100vw',
                        height: 'auto',
                        overflow: 'scrollable',
                        background: `${theme.palette.secondary.main}FC`,
                        backdropFilter: 'blur(30px)',
                        borderRadius: "15px",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        color: '#E8EBF8',
                        pb: 5,
                        pt: 1.5
                    }}
                    role="Navigation"
                >
                    <Container maxWidth={"xl"}>
                        <Stack spacing={1}>
                            <Stack direction={"column"} spacing={2} pb={2} justifyContent={"center"}
                                   alignItems={"center"}>
                                <Box sx={{
                                    width: 50,
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: `${theme.palette.text.primary}4D`
                                }}></Box>
                                <Typography
                                    color={theme.palette.text.primary}
                                    textAlign={"center"}
                                >
                                    あなたのリーグ内順位
                                </Typography>
                                <LeagueRankList
                                    dashboard={true}
                                    myTeamRank={props.myTeamRank}
                                    myTeam={props.myTeam}
                                    gameId={props.myGame.id}
                                />
                            </Stack>


                        </Stack>
                    </Container>
                </Box>
            </SwipeableDrawer>
        </Container>
    );
};

export default Overview;