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
            <Button
                variant={"contained"}
                color={"secondary"}
                sx={{
                    width: "100%",
                    border: `1px solid ${theme.palette.secondary.dark}66`,
                }}
                onClick={() => toggleDrawer(true)}
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
                <MatchDetail match={props.match} dashboard={true}/>
            </SwipeableDrawer>
        </>
    )
}

