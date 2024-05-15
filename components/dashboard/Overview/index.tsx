import {
    Avatar,
    Button,
    Container,
    Divider,
    Stack,
    SvgIcon,
    Typography,
    SwipeableDrawer,
    Unstable_Grid2 as Grid, IconButton, Box
} from "@mui/material";
import {HiXMark, HiChevronRight, HiChartBar} from "react-icons/hi2";
import {Sport} from "@/src/models/SportModel";
import {Team} from "@/src/models/TeamModel";
import {User} from "@/src/models/UserModel";
import {Fragment, useContext, useState} from "react";
import {ImagesContext} from "../../context";
import * as React from "react";
import Link from "next/link";
import Rank from "./Rank"


export type OverviewProps = {
    mySport: Sport;
    myTeam: Team;
    myTeamUsers: User[];
    myTeamRank: number;
}

export const Overview = (props: OverviewProps) => {
    //  image
    const {data: images} = useContext(ImagesContext)
    const icon = images.find(image => image.id === props.mySport.iconId)

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return(
        <Container
            maxWidth={"xl"}
        >
            <Grid container spacing={1}>
                <Grid xs={6} sm={6} lg={6}>
                    <Box
                        px={2}
                        py={1.5}
                        pr={2}
                        sx={{
                            width:"100%",
                            height: "70px",
                            backgroundColor: "#5f6dc2",
                            borderRadius: "12px"
                        }}>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{width:"100%"}}
                        >
                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"flex-start"}
                            >
                                <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                    リーグ内順位
                                </Typography>
                                <Rank rank={props.myTeamRank}/>
                            </Stack>
                            <SvgIcon>
                                <HiChartBar color="#99a5d6"/>
                            </SvgIcon>
                        </Stack>
                    </Box>
                </Grid>
                <Grid xs={6} sm={6} lg={6}>
                    <Button disableElevation variant={"contained"} onClick={toggleDrawer(true)} sx={{width:"100%", height:"70px"}}>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{width:"100%"}}
                        >
                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"flex-start"}
                            >
                                <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                    チーム
                                </Typography>
                                <Typography sx={{color: "#FFF", fontSize: "18px", fontWeight: "bold"}}>
                                    {props.myTeam.name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Button>
                    <SwipeableDrawer
                        anchor="bottom"
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        swipeAreaWidth={5}
                        disableSwipeToOpen={true}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <Container
                            maxWidth={"xl"}
                            sx={{
                                pt: 1,
                                pb: 5,
                                px: 3,
                                overflow: "scrollable"
                            }}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={{width:"100%"}}
                                py={1}
                            >
                                <Typography
                                    color={"#E8EBF8"}
                                    fontWeight={"bold"}
                                >
                                    チームメンバー
                                </Typography>
                                <IconButton onClick={toggleDrawer(false)}>
                                    <SvgIcon>
                                        <HiXMark color={"#E8EBF8"}/>
                                    </SvgIcon>
                                </IconButton>
                            </Stack>
                            <Stack
                                direction={"column"}
                                justifyContent={"flex-start"}
                                alignItems={"flex-start"}
                                spacing={2}
                                pt={2}
                            >
                                {props.myTeamUsers.map(user => {
                                    return (
                                        <Fragment key={user.id}>
                                            <Box sx={{width:"100%"}}>
                                                <Divider/>
                                            </Box>
                                            <Typography color={"#99a5d6"} fontSize={"16px"}>
                                                {user.name}
                                            </Typography>
                                        </Fragment>
                                    );
                                })}
                            </Stack>
                        </Container>
                    </SwipeableDrawer>
                </Grid>
                <Grid xs={12} sm={12} lg={12}>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        spacing={3}
                    >
                        <Button
                            disableElevation
                            variant={"contained"}
                            component={Link}
                            sx={{width:"100%", height:"70px"}}
                            href={`/sports/${props.mySport.id}`}
                            scroll={false}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={{py:1, width:"100%"}}
                            >
                                <Stack direction={"row"} spacing={3} sx={{width:"100%"}}>
                                    <Stack
                                        direction={"column"}
                                        justifyContent={"flex-start"}
                                        alignItems={"flex-start"}
                                        spacing={0}
                                    >
                                        <Typography fontSize={"14px"} sx={{color: "#99a5d6"}}>
                                            あなたの競技
                                        </Typography>
                                        <Typography fontSize={"14px"} sx={{color: "#eff0f8"}} fontWeight={"600"}>
                                            {props.mySport.name}
                                        </Typography>
                                    </Stack>
                                    <Stack sx={{flexGrow:1}} justifyContent={"center"} alignItems={"flex-end"}>
                                        <Avatar
                                            alt={props.mySport.name}
                                            sx={{height: "2em", width: "2em"}}
                                            src={icon?.data}
                                        >
                                        </Avatar>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Overview;