import {
    Avatar,
    Button,
    Container,
    Divider,
    Stack,
    SvgIcon,
    Typography,
    SwipeableDrawer,
    Unstable_Grid2 as Grid, IconButton, Box, Alert
} from "@mui/material";
import {HiArrowRightCircle, HiXMark} from "react-icons/hi2";
import {RiAwardFill} from "react-icons/ri";
import {Sport} from "../../../src/models/SportModel";
import {Team} from "../../../src/models/TeamModel";
import {User} from "../../../src/models/UserModel";
import {Fragment, useContext, useState} from "react";
import {ImagesContext} from "../../context";
import * as React from "react";
import Link from "next/link";


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
            sx={{paddingTop: "20px"}}
        >
            <Grid container spacing={2}>
                <Grid xs={12} sm={12} lg={12}>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        spacing={3}
                    >
                        <Button
                            component={Link}
                            sx={{width:"100%"}}
                            href={`/sports/${props.mySport.id}`}
                            scroll={false}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={{py:1, width:"100%"}}
                            >
                                <Stack direction={"row"} spacing={3}>
                                    <Avatar
                                        alt={props.mySport.name}
                                        sx={{height: "3.5em", width: "3.5em"}}
                                        src={icon?.attachment}
                                    >

                                    </Avatar>
                                    <Stack
                                        direction={"column"}
                                        justifyContent={"flex-start"}
                                        alignItems={"flex-start"}
                                        spacing={0.5}
                                    >
                                        <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                                            あなたの競技
                                        </Typography>
                                        <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                            {props.mySport.name}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <SvgIcon>
                                    <HiArrowRightCircle color="#FFF"/>
                                </SvgIcon>
                            </Stack>
                        </Button>
                    </Stack>
                </Grid>
                <Grid xs={12} sm={12} lg={12}><Divider/></Grid>
                <Grid xs={6} sm={6} lg={6}>
                    <Box
                        p={1}
                        pr={2}
                        sx={{
                            width:"100%",
                            height: "90%",
                            borderRight: "1px solid #5a68a2"
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
                                    競技内順位
                                </Typography>
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <Typography sx={{color: "#FFF", fontSize: "24px", fontWeight: "bold"}}>
                                        {props.myTeamRank}
                                    </Typography>
                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                        位
                                    </Typography>
                                </Stack>
                            </Stack>
                            <SvgIcon>
                                <RiAwardFill color="#99a5d6"/>
                            </SvgIcon>
                        </Stack>
                    </Box>
                </Grid>
                <Grid xs={6} sm={6} lg={6}>
                    <Button onClick={toggleDrawer(true)} sx={{width:"100%"}}>
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
                                    あなたのチーム
                                </Typography>
                                <Typography sx={{color: "#FFF", fontSize: "24px", fontWeight: "bold"}}>
                                    {props.myTeam.name}
                                </Typography>
                            </Stack>
                            <SvgIcon>
                                <HiArrowRightCircle color="#FFF"/>
                            </SvgIcon>
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
                                    あなたのチームメンバー
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
            </Grid>
        </Container>
    );
};

export default Overview;