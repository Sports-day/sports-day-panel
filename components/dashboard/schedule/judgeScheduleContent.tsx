import {
    Box,
    Button,
    Stack,
    SvgIcon,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import {LocationsContext, TeamsContext} from "../../context";
import {Match} from "@/src/models/MatchModel";
import {
    HiClock,
    HiMapPin,
} from "react-icons/hi2";
import {useTheme} from "@mui/material/styles";
import {MatchDetail} from "@/components/game/GameList/matchDetail";

export type ScheduleContentProps = {
    match: Match;
    myTeamId: number;
}

export const ScheduleContent = (props: ScheduleContentProps) => {
    const theme = useTheme();
    //  context
    const {data: locations} = useContext(LocationsContext)
    const {data: teams} = useContext(TeamsContext)

    const [open, toggleDrawer] = React.useState(false);

    //  team is null
    if (!props.match.leftTeamId || !props.match.rightTeamId) return null;
    //  get left team
    const leftTeamModel = teams.find(team => team.id === props.match.leftTeamId);
    // get right team
    const rightTeamModel = teams.find(team => team.id === props.match.rightTeamId);
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
                        direction={"column"}
                        spacing={1}
                        justifyContent={"center"}
                        alignItems={"start"}
                        sx={{height: "60px", flexGrow:1}}
                    >
                        <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                        >
                            <Typography fontSize={"14px"} color={theme.palette.text.primary}>
                                {rightTeamModel?.name}
                            </Typography>
                            <Box
                                sx={{
                                    px: 0.8,
                                    height:"16px",
                                    borderRadius: "5px",
                                    backgroundColor: theme.palette.text.secondary,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Typography color={theme.palette.background.default} fontSize={"10px"} fontWeight={"600"}>
                                    VS
                                </Typography>
                            </Box>
                        </Stack>
                        <Typography fontSize={"14px"} color={theme.palette.text.primary}>
                            {leftTeamModel?.name}
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
                <MatchDetail match={props.match} dashboard={true}/>
            </SwipeableDrawer>
        </>
    )
}

