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
import {useFetchMySportMatches} from "../../src/features/matches/hook";


export const Schedule = (props:any) => {
    const {matches} = useFetchMySportMatches();
    const {
        scTeam1, scTeam2, scTeam3,
        scTime1, scTime2, scTime3,
        scLocation1, scLocation2, scLocation3
    } = props;

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

                        <Grid xs={12} sm={6} lg={6}>
                            <Stack
                                alignItems={"center"}
                                direction={"row"}
                                justifyContent={"flex-start"}
                                spacing={1}
                                py={1.5}
                            >
                                <Typography color={"textSecondary"} fontSize={"14px"}>
                                    VS
                                </Typography>
                                <Typography fontSize={"24px"} fontWeight={"bold"}>
                                    {scTeam1}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6}>
                                <Stack
                                    direction={"column"}
                                    justifyContent={"center"}
                                    alignItems={"flex-start"}
                                >
                                    <Stack
                                        direction={"row"}
                                        alignItems={"flex-end"}
                                        spacing={1}
                                    >
                                        <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                            <HiClock color="#99a5d6"/>
                                        </SvgIcon>
                                        <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                            {scTime1}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction={"row"}
                                        alignItems={"flex-end"}
                                        spacing={1}
                                    >
                                        <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                            <HiMapPin color="#99a5d6"/>
                                        </SvgIcon>
                                        <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                            {scLocation1}
                                        </Typography>
                                    </Stack>
                                </Stack>
                        </Grid>

                        <Grid xs={12} sm={12} lg={12}><Divider/></Grid>

                        <Grid xs={12} sm={6} lg={6}>
                            <Stack
                                alignItems={"center"}
                                direction={"row"}
                                justifyContent={"flex-start"}
                                spacing={1}
                                py={1.5}
                            >
                                <Typography color={"textSecondary"} fontSize={"14px"}>
                                    VS
                                </Typography>
                                <Typography fontSize={"24px"} fontWeight={"bold"}>
                                    {scTeam2}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6}>
                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"flex-start"}
                            >
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                        <HiClock color="#99a5d6"/>
                                    </SvgIcon>
                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                        {scTime2}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                        <HiMapPin color="#99a5d6"/>
                                    </SvgIcon>
                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                        {scLocation2}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>

                        <Grid xs={12} sm={12} lg={12}><Divider/></Grid>

                        <Grid xs={12} sm={6} lg={6}>
                            <Stack
                                alignItems={"center"}
                                direction={"row"}
                                justifyContent={"flex-start"}
                                spacing={1}
                                py={1.5}
                            >
                                <Typography color={"textSecondary"} fontSize={"14px"}>
                                    VS
                                </Typography>
                                <Typography fontSize={"24px"} fontWeight={"bold"}>
                                    {scTeam3}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6}>
                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"flex-start"}
                            >
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                        <HiClock color="#99a5d6"/>
                                    </SvgIcon>
                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                        {scTime3}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                        <HiMapPin color="#99a5d6"/>
                                    </SvgIcon>
                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                        {scLocation3}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>

                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Schedule;