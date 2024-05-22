import {
    Box,
    Stack,
    styled,
    LinearProgress,
    Typography,
    useTheme
} from "@mui/material";
import {linearProgressClasses} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import {TeamsContext} from "../../context";

type Props = {
    chartSeries: number[]
}

export const GameProgressChart = (props:Props) => {
    const theme = useTheme();
    const {data: teams} = useContext(TeamsContext);
    const PointBar = styled(LinearProgress)(({}) => ({
        height: 7,
        borderRadius: 3,
        [`&.${linearProgressClasses.colorPrimary}`]: {backgroundColor: theme.palette.secondary.dark,},
        [`& .${linearProgressClasses.bar}`]: {borderRadius: 2, backgroundColor: theme.palette.text.primary,},
    }));

    return(
        <>

                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        alignItems={"space-between"}
                        maxWidth={'xl'}
                        sx={{ width: '100%', height:"100%" }}
                        spacing={1}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"flex-start"}
                            spacing={0}
                            sx={{ width: '100%' }}
                        >
                            <Typography fontSize={"14px"}>
                                進行状況
                            </Typography>
                            <Typography fontSize={"18px"} fontWeight={"600"}>
                                {props.chartSeries[0]} %
                            </Typography>
                        </Stack>
                        <Box>
                            <PointBar
                                variant={"determinate"}
                                value={props.chartSeries[0]}
                            />
                        </Box>
                    </Stack>
        </>
    )
}