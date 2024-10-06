import {
    Box,
    Button,
    Stack,
    Container,
    SwipeableDrawer,
    Typography,
    useTheme, Avatar, Card
} from "@mui/material";
import * as React from "react";
import {HiOutlineExclamationTriangle, HiUser} from "react-icons/hi2";
import {User} from "@/src/models/UserModel";
import {Game} from "@/src/models/GameModel";
import {Team} from "@/src/models/TeamModel";
import {Match} from "@/src/models/MatchModel";
import {UserMatchList} from "@/components/match/userMatchList";
import {useFetchSports} from "@/src/features/sports/hook";
import {useFetchImages} from "@/src/features/images/hook";


export type DiscoverUserProps = {
    user: User
    games: Game[]
    teams: Team[]
    matches: Match[]
}

export const DiscoverUser = (props: DiscoverUserProps) => {
    const theme = useTheme();
    const [open, toggleDrawer] = React.useState(false);
    // Find the team that the user belongs to
    const userTeam = props.teams.find(team => team.userIds.includes(props.user.id));
    const userMatches = props.matches.filter(match => match.leftTeamId === userTeam?.id || match.rightTeamId === userTeam?.id);
    const userMatchSportIds = userMatches.map(match => match.sportId);
    const {sports, isFetching: isFetchingSports} = useFetchSports();
    const userMatchSports = sports.filter(sport => userMatchSportIds.includes(sport.id));
    const userMatchSport = userMatchSports[0];
    const {images, isFetching: isFetchingImages} = useFetchImages();
    const icon = images.find(image => image.id === userMatchSport?.iconId)

    return(
        <>
            <Button
                variant={"contained"}
                color={"secondary"}
                sx={{
                    width: "100%",
                    border: `1px solid ${theme.palette.secondary.dark}66`,
                    pt:1.4,
                    pb:1.8,
                    mb:1
                }}
                onClick={() => toggleDrawer(true)}
            >
                <Stack
                    direction={"row"}
                    spacing={3} ml={0.4}
                    alignItems={"center"}
                    justifyContent={"start"}
                    sx={{width:"100%"}}
                >
                    <Avatar
                        alt={"unknown"}
                        sx={{
                            height: "1.5em",
                            width: "1.5em",
                            backgroundColor: theme.palette.text.secondary,
                        }}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${props.user?.pictureId}/file`}
                    >
                        {props.user?.pictureId === null && <HiUser/>}
                    </Avatar>
                    <Typography color={theme.palette.text.primary}>
                        {props.user.name}
                    </Typography>

                </Stack>
            </Button>
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
                PaperProps={{elevation: 0, style: {backgroundColor: "transparent"}}}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',
                        background: `${theme.palette.secondary.main}FC`,
                        backdropFilter: 'blur(30px)',
                        borderRadius: "15px",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        color: '#E8EBF8',
                        pb: 5,
                        pt: 1.5
                    }}
                >
                    <Container maxWidth={"xl"}>
                        <Stack spacing={1}>
                            <Stack direction={"column"} spacing={2} justifyContent={"center"}
                                   alignItems={"center"}>
                                <Box sx={{
                                    width: 50,
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: `${theme.palette.text.primary}4D`
                                }}></Box>
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
                                            // src={`${process.env.NEXT_PUBLIC_API_URL}/images/${props.user?.pictureId}/file`}
                                        >
                                            {/*{props.user?.pictureId === null && <HiUser/>}*/}
                                            <HiUser/>
                                        </Avatar>
                                        <Typography color={theme.palette.text.primary}>
                                            {props.user.name} さん
                                        </Typography>
                                    </Stack>
                                </Card>
                            </Stack>
                            <Card
                                sx={{backgroundColor: `${theme.palette.secondary.dark}FF`,
                                    py:2, px: 2}}>
                                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                    <Avatar
                                        alt={userMatchSport?.name}
                                        sx={{
                                            height: "2em", width: "2em",
                                            backgroundColor: `${theme.palette.text.secondary}`,
                                        }}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${userMatchSport?.iconId}/file`}
                                    >
                                        {!userMatchSport?.iconId && <HiOutlineExclamationTriangle fontSize={"30px"}/>}
                                    </Avatar>
                                    <Stack>
                                        <Typography fontSize={"14px"} sx={{color: theme.palette.text.primary}}>
                                            {props.user.name}の競技
                                        </Typography>
                                        {userMatchSports.map((sport, index) => (
                                            <Typography fontSize={"14px"} fontWeight={"600"}　key={index}>
                                                {sport.name}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Card>
                            <UserMatchList userId={props.user?.id}/>
                        </Stack>
                    </Container>
                </Box>
            </SwipeableDrawer>
        </>
    )
}