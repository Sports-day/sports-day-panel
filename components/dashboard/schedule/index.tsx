import {
    Box,
    Button, Card,
    CardContent, Container, Divider, IconButton,
    Stack,
    SvgIcon, SwipeableDrawer,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {HiTable, HiChevronRight} from "react-icons/hi";
import * as React from "react";
import {ScheduleContent} from "./ScheduleContent";
import {Match} from "../../../src/models/MatchModel";
import Link from "next/link";
import {HiXMark} from "react-icons/hi2";
import {Fragment} from "react";

export type ScheduleProps = {
    sportId: number
    gameId: number
    matches: Match[]
    myTeamId: number
}

export const Schedule = (props: ScheduleProps) => {

    return (
        <Card sx={{height: "fit-content"}}>
            <CardContent sx={{width: "100%"}}>
                <Stack
                    spacing={0}
                >
                    <Button
                        component={Link}
                        href={`/sports/${props.sportId}?gameId=${props.gameId}`}
                        sx={{margin: 0, padding: 0, width: "100%"}}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{width: "100%", marginBottom: 2}}
                        >
                            <Typography
                                color={"textSecondary"}
                            >
                                試合スケジュール
                            </Typography>
                            <Box sx={{position: "relative", top: "8px"}}>
                                <SvgIcon fontSize={"small"} sx={{position: "relative", bottom: "3px"}}>
                                    <HiTable color="#99a5d6"/>
                                </SvgIcon>
                                <SvgIcon fontSize={"small"} sx={{position: "relative", bottom: "3px"}}>
                                    <HiChevronRight color="#99a5d6"/>
                                </SvgIcon>
                            </Box>
                        </Stack>
                    </Button>
                    <Grid container spacing={1}>

                        {props.matches
                            .sort((a, b) => a.startAt.localeCompare(b.startAt))
                            .map((match: Match) => {
                                return (
                                    <>
                                        <ScheduleContent
                                            key={match.id}
                                            match={match}
                                            myTeamId={props.myTeamId}
                                        />

                                    </>
                                );
                            })}

                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Schedule;