import {Divider, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {HiClock, HiMapPin} from "react-icons/hi2";
import * as React from "react";
import {useContext} from "react";
import {LocationsContext, TeamsContext} from "../../context";
import {Match} from "../../../src/models/MatchModel";

export type ScheduleContentProps = {
    match: Match;
    myTeamId: number;
}

export const ScheduleContent = (props: ScheduleContentProps) => {
    //  context
    const {data: locations} = useContext(LocationsContext)
    const {data: teams} = useContext(TeamsContext)

    //  team is null
    if (!props.match.leftTeamId || !props.match.rightTeamId) return null;
    //  get team
    const opponentTeamId = props.match.leftTeamId === props.myTeamId ? props.match.rightTeamId : props.match.leftTeamId
    const teamModel = teams.find(team => team.id === opponentTeamId)
    //  get time and location
    const formattedTime = new Date(props.match.startAt).toLocaleTimeString("ja-JP", {hour: '2-digit', minute:'2-digit'});
    const locationModel = locations.find(location => location.id === props.match.locationId)

    return (
        <>
            <Grid xs={12} sm={12} lg={12}><Divider/></Grid>
            <Grid xs={12} sm={5} lg={6}>
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
                    <Typography fontSize={"24px"} fontWeight={"bold"}>
                        {teamModel?.name}
                    </Typography>
                </Stack>
            </Grid>
            <Grid xs={12} sm={7} lg={6}>
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
                        <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
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
                        <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                            <HiMapPin color="#99a5d6"/>
                        </SvgIcon>
                        <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                            {locationModel?.name}
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
        </>
    )
}

