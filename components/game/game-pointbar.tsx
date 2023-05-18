import {
    Box,
    Stack,
    styled,
    LinearProgress,
    Typography, SvgIcon,
} from "@mui/material";
import {linearProgressClasses} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {createTheme} from "../theme";
import {HiClock} from "react-icons/hi2";
import {MdOutlineSportsScore} from "react-icons/md";

const theme = createTheme();

const PointBar = styled(LinearProgress)(({ theme }) => ({
    height: 4.5,
    borderRadius: 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {backgroundColor: '#435BBC',},
    [`& .${linearProgressClasses.bar}`]: {borderRadius: 2, backgroundColor: '#ffc900',},
}));

export const GamePointBar = (props: any) => {
    const {leftScore, rightScore, leftTeam, rightTeam} = props;
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
                        spacing={0.5}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"flex-end"}
                            spacing={0}
                        >
                            <Typography sx={{color: "#FFF", fontSize: "16px", fontWeight: "bold"}}>
                                10
                            </Typography>
                            <Stack direction={"row"}>
                                <SvgIcon fontSize={"small"} sx={{position:"relative", top:"2px"}}>
                                    <HiClock color="#99a5d6"/>
                                </SvgIcon>
                                <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                    10:00
                                </Typography>
                            </Stack>
                            <Typography sx={{color: "#FFF", fontSize: "14px"}}>
                                E1
                            </Typography>
                        </Stack>
                        <Box>
                            <ThemeProvider theme={{direction:"rtl"}}>
                                <PointBar
                                    variant={"determinate"}
                                    value={leftScore}
                                />
                            </ThemeProvider>
                        </Box>
                    </Stack>
                    <Typography sx={{color: "#99a5d6", fontSize: "10px", px:0.5, position:"relative", top:"8px"}}>VS</Typography>
                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        alignItems={"space-between"}
                        maxWidth={'xl'}
                        sx={{ width: '100%' }}
                        spacing={0.5}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"flex-end"}
                            spacing={0}
                        >
                            <Typography sx={{color: "#FFF", fontSize: "14px"}}>
                                M1
                            </Typography>
                            <Stack direction={"row"}>
                                <SvgIcon fontSize={"small"} sx={{position:"relative", top:"2px"}}>
                                    <MdOutlineSportsScore color="#99a5d6"/>
                                </SvgIcon>
                                <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                    C1
                                </Typography>
                            </Stack>
                            <Typography sx={{color: "#FFF", fontSize: "16px", fontWeight: "bold"}}>
                                10
                            </Typography>
                        </Stack>
                        <Box>
                            <PointBar
                                variant={"determinate"}
                                value={leftScore}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default GamePointBar