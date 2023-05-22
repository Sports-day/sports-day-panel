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
import {HiClock} from "react-icons/hi2";
import {MdOutlineSportsScore} from "react-icons/md";
import {useFetchTeams} from "../../../src/features/teams/hook";

const PointBar = styled(LinearProgress)(({}) => ({
    height: 4.5,
    borderRadius: 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {backgroundColor: '#435BBC',},
    [`& .${linearProgressClasses.bar}`]: {borderRadius: 2, backgroundColor: '#ffc900',},
}));

export const GamePointBar = (props: any) => {
    const {teams} = useFetchTeams();
    const {leftScore, rightScore, leftTeamId, rightTeamId, umpireTeam, time, barOffset} = props;
    const leftTeam = teams.find(team => team.id === leftTeamId);
    const rightTeam = teams.find(team => team.id === rightTeamId);
    const formattedTime = new Date(time).toLocaleTimeString("ja-JP");
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
                                {leftScore}
                            </Typography>
                            <Stack direction={"row"}>
                                <SvgIcon fontSize={"small"} sx={{position:"relative", top:"2px"}}>
                                    <HiClock color="#99a5d6"/>
                                </SvgIcon>
                                <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                    {formattedTime}
                                </Typography>
                            </Stack>
                            <Typography sx={{color: "#FFF", fontSize: "14px"}}>
                                {leftTeam?.name.slice(4)}
                            </Typography>
                        </Stack>
                        <Box>
                            <ThemeProvider theme={{direction:"rtl"}}>
                                <PointBar
                                    variant={"determinate"}
                                    value={leftScore * barOffset}
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
                                {rightTeam?.name.slice(4)}
                            </Typography>
                            <Stack direction={"row"}>
                                <SvgIcon fontSize={"small"} sx={{position:"relative", top:"2px"}}>
                                    <MdOutlineSportsScore color="#99a5d6"/>
                                </SvgIcon>
                                <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                    {umpireTeam}
                                </Typography>
                            </Stack>
                            <Typography sx={{color: "#FFF", fontSize: "16px", fontWeight: "bold"}}>
                                {rightScore}
                            </Typography>
                        </Stack>
                        <Box>
                            <PointBar
                                variant={"determinate"}
                                value={rightScore * barOffset}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}