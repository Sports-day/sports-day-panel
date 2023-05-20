import {
    Box,
    Button, Card,
    CardContent,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {
    HiOutlineTableCells,
    HiOutlineArrowRight,
} from "react-icons/hi2";
import * as React from "react";
import {ScheduleContent} from "./ScheduleContent";


export const Schedule = (props:any) => {
    const {matches} = props;

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

                        {matches.map((match:any) => {
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