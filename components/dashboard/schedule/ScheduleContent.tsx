import {Divider, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {HiClock, HiMapPin} from "react-icons/hi2";
import * as React from "react";
import {useFetchTeams} from "../../../src/features/teams/hook";
import {useFetchLocations} from "../../../src/features/locations/hook";

export type ScheduleContentProps = {
    teamId: number;
    time: string;
    locationId: number;
}

export const ScheduleContent = (props:ScheduleContentProps) => {
    const {teamId, time, locationId} = props;
    const {teams} = useFetchTeams();
    const {locations} = useFetchLocations();
    const teamModel = teams.find(team => team.id === teamId);
    const formattedTime = new Date(time).toLocaleTimeString("ja-JP");
    const locationModel = locations.find(location => location.id === locationId)
    return (
        <>
            <Grid xs={12} sm={12} lg={12}><Divider/></Grid>
            <Grid xs={12} sm={6} lg={6}>
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
                        {teamModel?.name.slice(4)}
                    </Typography>
                </Stack>
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
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

