import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Stack,
    SvgIcon,
    SwipeableDrawer,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import * as React from "react";
import {Fragment, useContext} from "react";
import {LocationsContext, TeamsContext, UsersContext} from "../../context";
import {Match} from "../../../src/models/MatchModel";
import {HiClock, HiMapPin, HiXMark} from "react-icons/hi2";
import {useTheme} from "@mui/material/styles";

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
    //  get team
    const opponentTeamId = props.match.leftTeamId === props.myTeamId ? props.match.rightTeamId : props.match.leftTeamId
    const teamModel = teams.find(team => team.id === opponentTeamId)
    //  get time and location
    const formattedTime = new Date(props.match.startAt).toLocaleTimeString("ja-JP", {
        hour: '2-digit',
        minute: '2-digit'
    });
    const locationModel = locations.find(location => location.id === props.match.locationId)

    return (
        <>
            <Button variant={"contained"} color={"secondary"} disableElevation onClick={() => toggleDrawer(true)} sx={{width: "100%"}}>
                <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{width:"100%", height:"100%"}}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                >
                    <Stack
                        direction={"row"}
                        spacing={1}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        sx={{height:"60px", flexGrow:1,}}
                    >
                        <Box
                            sx={{
                                py:0,
                                px:0.8,
                                borderRadius: "5px",
                                backgroundColor: theme.palette.text.secondary,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Typography color={theme.palette.background.default} fontSize={"10px"}>
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
                        sx={{height:"100%"}}
                    >
                        <Stack
                            direction={"row"}
                            alignItems={"flex-end"}
                            spacing={1}
                        >
                            <SvgIcon fontSize={"small"}>
                                <HiClock color={theme.palette.text.secondary}/>
                            </SvgIcon>
                            <Typography sx={{color: theme.palette.text.secondary, fontSize: "14px"}}>
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
                            <Typography sx={{color: theme.palette.text.secondary, fontSize: "14px"}}>
                                {locationModel?.name}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Button>
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
                                .filter(user => user.teamIds.includes(opponentTeamId))
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
    )
}

