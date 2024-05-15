import {
    Box,
    Stack,
    styled,
    LinearProgress,
    Typography
} from "@mui/material";
import {linearProgressClasses} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import {TeamsContext} from "../../context";

const PointBar = styled(LinearProgress)(({}) => ({
    height: 7,
    borderRadius: 3,
    [`&.${linearProgressClasses.colorPrimary}`]: {backgroundColor: '#4a5abb',},
    [`& .${linearProgressClasses.bar}`]: {borderRadius: 2, backgroundColor: '#FFCB00',},
}));

type Props = {
    chartSeries: number[]
}

export const GameProgressChart = (props:Props) => {
    const {data: teams} = useContext(TeamsContext);

    return(
        <>
            <Stack
                direction={"column"}
                spacing={1}
                sx={{width: "100%", height:"fit-content"}}

            >
                <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"space-between"}
                    spacing={0}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        alignItems={"space-between"}
                        maxWidth={'xl'}
                        sx={{ width: '100%' }}
                        spacing={0}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-end"}
                            alignItems={"flex-end"}
                            spacing={0}
                        >
                            <Typography color={"secondary"} sx={{fontSize: "20px", position: "relative", top: "-5px"}}>
                                {props.chartSeries[0]} %
                            </Typography>
                        </Stack>
                        <Box sx={{position: "relative", top: "0px"}}>
                            <PointBar
                                variant={"determinate"}
                                value={props.chartSeries[0]}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}