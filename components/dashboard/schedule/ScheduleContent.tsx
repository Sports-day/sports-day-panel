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
import {HiClock, HiLocationMarker} from "react-icons/hi";
import * as React from "react";
import {Fragment, useContext} from "react";
import {LocationsContext, TeamsContext, UsersContext} from "../../context";
import {Match} from "../../../src/models/MatchModel";
import {HiXMark} from "react-icons/hi2";
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
                <Grid container spacing={0}>
                    <Grid xs={6} sm={6} lg={6}>
                        <Stack
                            alignItems={"center"}
                            direction={"row"}
                            justifyContent={"flex-start"}
                            spacing={1}
                            py={1.5}
                        >
                            <Typography color={"textSecondary"} fontSize={"14px"}>
                                VS
                            </Typography>
                            <Typography fontSize={"24px"} fontWeight={"bold"} color={theme.palette.text.primary}>
                                {teamModel?.name}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={6} sm={7} lg={6}>
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
                                <SvgIcon fontSize={"small"} sx={{position: "relative", bottom: "3px"}}>
                                    <HiClock color="#99a5d6"/>
                                </SvgIcon>
                                <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                    {formattedTime}
                                </Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"flex-end"}
                                spacing={1}
                            >
                                <SvgIcon fontSize={"small"} sx={{position: "relative", bottom: "3px"}}>
                                    <HiLocationMarker color="#99a5d6"/>
                                </SvgIcon>
                                <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                    {locationModel?.name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
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

