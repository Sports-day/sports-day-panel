import {
    Stack,
} from "@mui/material";
import * as React from "react";
import {ScheduleContent} from "./ScheduleContent";
import {Match} from "../../../src/models/MatchModel";

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