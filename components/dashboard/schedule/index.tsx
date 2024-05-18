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
                <Stack
                    spacing={1}
                >

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
                </Stack>
    );
};

export default Schedule;