import {
    Box,
    Stack,
    styled,
    LinearProgress,
    Typography, SvgIcon
} from "@mui/material";
import {linearProgressClasses} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {HiClock} from "react-icons/hi2";
import {MdOutlineSportsScore} from "react-icons/md";
import {useContext} from "react";
import {TeamsContext} from "../../context";

const PointBar = styled(LinearProgress)(({}) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {backgroundColor: '#435BBC',},
    [`& .${linearProgressClasses.bar}`]: {borderRadius: 2, backgroundColor: '#ffffff',},
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
                pb={3}
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
                        spacing={-1}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-end"}
                            alignItems={"flex-end"}
                            spacing={0}
                        >
                            <Typography sx={{color: "#FFF", fontSize: "30px", position: "relative", top: "-25px"}}>
                                {100} %
                            </Typography>
                        </Stack>
                        <Box>
                            <PointBar
                                variant={"determinate"}
                                value={100}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}