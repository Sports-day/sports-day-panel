import {
    Box,
    Button, Card,
    CardContent,
    Divider,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {
    HiOutlineTableCells,
    HiOutlineArrowRight,
    HiMapPin,
    HiClock

} from "react-icons/hi2";
import * as React from "react";
import {useFetchMySportMatches, useFetchMatch, useFetchMatches} from "../../../src/features/matches/hook";
import {ScheduleContent} from "./schedule-content";
import {useFetchGame} from "../../../src/features/games/hook";
import {useFetchTeams} from "../../../src/features/teams/hook";


export const Schedule = (props:any) => {
    const {matches} = useFetchMySportMatches()

    return(
        <Card sx={{height: "fit-content"}}>
            <CardContent>
                <Stack
                    spacing={0}
                >
                    <Button sx={{width:"100%"}}>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{width:"100%"}}
                        >
                            <Typography
                                color={"textSecondary"}
                            >
                                あなたの試合
                            </Typography>
                            <Box sx={{position:"relative", top:"8px"}}>
                                <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                    <HiOutlineTableCells color="#99a5d6"/>
                                </SvgIcon>
                                <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                    <HiOutlineArrowRight color="#99a5d6"/>
                                </SvgIcon>
                            </Box>
                        </Stack>
                    </Button>
                    <Grid container spacing={1}>

                        {matches.map((match) => {
                            return(
                                <ScheduleContent
                                    key={match.id}
                                    match={match.id}
                                    time={match.startAt}
                                    location={match.locationId}
                                />

                            );
                        })}

                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Schedule;