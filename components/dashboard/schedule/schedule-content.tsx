import {Divider, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {HiClock, HiMapPin} from "react-icons/hi2";
import * as React from "react";

export const ScheduleContent = (props:any) => {
    const {match, time, location} = props;
    return (
        <>
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
                        {match}
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
                            {time}
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
                            {location}
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid xs={12} sm={12} lg={12}><Divider/></Grid>
        </>
    )
}

