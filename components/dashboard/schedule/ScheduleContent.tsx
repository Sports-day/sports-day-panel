import {
    Avatar,
    Box,
    Button, Card, Chip,
    Container,
    Stack,
    SvgIcon,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import * as React from "react";
import {Fragment, useContext} from "react";
import {LocationsContext, TeamsContext, UsersContext} from "../../context";
import {Match} from "@/src/models/MatchModel";
import {
    HiArrowRight,
    HiClock,
    HiFlag,
    HiMapPin,
    HiUser,
    HiUsers,
} from "react-icons/hi2";
import {useTheme} from "@mui/material/styles";
import Link from "next/link";

export type ScheduleContentProps = {
    match: Match;
    myTeamId: number;
}

export const ScheduleContent = (props: ScheduleContentProps) => {
    const theme = useTheme();
    //  context
    const {data: locations} = useContext(LocationsContext)
    const {data: teams} = useContext(TeamsContext)
    const {data: users} = useContext(UsersContext)

    const [open, toggleDrawer] = React.useState(false);

    //  team is null
    if (!props.match.leftTeamId || !props.match.rightTeamId) return null;
    // get my team
    const myTeamModel = teams.find(team => team.id === props.myTeamId)
    //  get team
    const opponentTeamId = props.match.leftTeamId === props.myTeamId ? props.match.rightTeamId : props.match.leftTeamId
    const teamModel = teams.find(team => team.id === opponentTeamId)
    //  get left team
    const leftTeamModel = teams.find(team => team.id === props.match.leftTeamId);
    // get right team
    const rightTeamModel = teams.find(team => team.id === props.match.rightTeamId);
    // Get judge team
    const judgeTeam = teams.find(team => team.id === props.match.judgeTeamId);
    //  get time and location
    const formattedTime = new Date(props.match.startAt).toLocaleTimeString("ja-JP", {
        hour: '2-digit',
        minute: '2-digit'
    });
    const locationModel = locations.find(location => location.id === props.match.locationId)

    return (
        <>
            <Button
                variant={"contained"}
                color={"secondary"}
                onClick={() => toggleDrawer(true)}
                sx={{
                    width: "100%",
                    border: `1px solid ${theme.palette.secondary.dark}66`,
                }}
            >
                <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{width: "100%", height: "100%"}}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                >
                    <Stack
                        direction={"row"}
                        spacing={1}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        sx={{height: "60px", flexGrow: 1,}}
                    >
                        <Box
                            sx={{
                                py: 0,
                                px: 0.8,
                                borderRadius: "5px",
                                backgroundColor: theme.palette.text.secondary,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Typography color={theme.palette.background.default} fontSize={"10px"} fontWeight={"600"}>
                                VS
                            </Typography>
                        </Box>
                        <Typography fontSize={"20px"} color={theme.palette.text.primary}>
                            {teamModel?.name}
                        </Typography>
                    </Stack>

                    <Stack
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"flex-start"}
                        pr={0.5}
                        py={0.5}
                        spacing={1}
                        sx={{height: "100%"}}
                    >
                        <Stack
                            direction={"row"}
                            alignItems={"flex-end"}
                            spacing={1}
                        >
                            <SvgIcon fontSize={"small"}>
                                <HiClock color={theme.palette.text.secondary}/>
                            </SvgIcon>
                            <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>
                                {formattedTime}
                            </Typography>
                        </Stack>
                        <Stack
                            direction={"row"}
                            alignItems={"flex-end"}
                            spacing={1}
                        >
                            <SvgIcon fontSize={"small"}>
                                <HiMapPin color={theme.palette.text.secondary}/>
                            </SvgIcon>
                            <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>
                                {locationModel?.name}
                            </Typography>
                        </Stack>
                    </Stack>
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
                                    fontWeight={"bold"}
                                    textAlign={"center"}
                                >
                                    試合の詳細
                                </Typography>
                            </Stack>
                            <Card sx={{backgroundColor: `${theme.palette.secondary.dark}80`, py:1, px:1}}>
                                <Stack
                                    direction={"row"}
                                    spacing={1}
                                    sx={{width: "100%", height: "100%"}}
                                    alignItems={"flex-start"}
                                >
                                    <Stack
                                        sx={{width: "100%"}}
                                        direction={"row"}
                                        spacing={1}
                                        justifyContent={"space-around"}
                                        alignItems={"center"}
                                    >
                                        <Typography fontSize={"20px"} color={theme.palette.text.primary}>
                                            {leftTeamModel?.name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                pt: 0,
                                                px: 0.8,
                                                borderRadius: "5px",
                                                backgroundColor: theme.palette.text.secondary,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Typography color={theme.palette.background.default} fontSize={"10px"} fontWeight={"600"}>
                                                VS
                                            </Typography>
                                        </Box>
                                        <Typography fontSize={"20px"} color={theme.palette.text.primary}>
                                            {rightTeamModel?.name}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Box sx={{overflow:"auto", pt:1}}>
                                    <Stack sx={{width:"100%"}} direction={"row"} spacing={0.2} pl={2}>
                                        <Chip
                                            label={`審判：${judgeTeam?.name}`}
                                            avatar={<Avatar><HiFlag/></Avatar>}
                                            color={"secondary"}
                                        />
                                        <Chip
                                            label={`場所：${locationModel?.name}`}
                                            avatar={<Avatar><HiMapPin/></Avatar>}
                                            color={"secondary"}
                                        />
                                        <Chip
                                            label={`開始時刻：${formattedTime}`}
                                            avatar={<Avatar><HiClock/></Avatar>}
                                            color={"secondary"}
                                        />
                                    </Stack>
                                </Box>
                            </Card>
                            <Typography
                                color={theme.palette.text.primary}
                                fontWeight={"bold"}
                                textAlign={"center"}
                                pt={2}
                            >
                                {teamModel?.name}のメンバー
                            </Typography>
                            {users
                                .filter(user => user.teamIds.includes(opponentTeamId))
                                .map(user => {
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
                            <Box pt={2}>
                                <Button
                                    color={"secondary"}
                                    sx={{background:theme.palette.secondary.dark}}
                                    fullWidth disableElevation
                                    variant={"contained"}
                                    component={Link}
                                    href={`/sports/${props.match.sportId}`}
                                >
                                    <Stack
                                        direction={"row"}
                                        justifyContent={"flex-start"}
                                        alignItems={"center"}
                                        spacing={2}
                                        py={0.5}
                                        width={"100%"}
                                    >
                                        <Avatar
                                            sx={{
                                                height: "2em",
                                                width: "2em",
                                                backgroundColor: "inherit",
                                            }}
                                        >
                                            <SvgIcon>
                                                <HiArrowRight color={`${theme.palette.text.primary}99`}/>
                                            </SvgIcon>
                                        </Avatar>
                                        <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>
                                            競技ページに行く
                                        </Typography>
                                    </Stack>
                                </Button>
                            </Box>
                    </Stack>
                </Container>
                </Box>
            </SwipeableDrawer>
        </>
    )
}

