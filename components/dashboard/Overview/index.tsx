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
import {
    HiXMark,
    HiChartBar,
    HiOutlineExclamationTriangle
} from "react-icons/hi2";
import {Sport} from "@/src/models/SportModel";
import {Team} from "@/src/models/TeamModel";
import {User} from "@/src/models/UserModel";
import {Fragment, useContext, useState} from "react";
import {ImagesContext} from "../../context";
import * as React from "react";
import Link from "next/link";
import Rank from "./Rank"
import {useTheme} from "@mui/material/styles";


export type OverviewProps = {
    mySport: Sport;
    myTeam: Team;
    myTeamUsers: User[];
    myTeamRank: number;
}

export const Overview = (props: OverviewProps) => {
    const theme = useTheme();

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
                <Grid xs={6.5} sm={6.5} lg={6.5}>
                        <Button
                            color={"secondary"}
                            variant={"contained"}
                            component={Link}
                            sx={{width:"100%", height:"180px",
                                backgroundColor: `${theme.palette.secondary.light}66`,
                                border: `1px solid ${theme.palette.secondary.dark}66`,
                            }}
                            href={`/sports/${props.mySport.id}`}
                            scroll={false}
                        >
                            <Stack
                                sx={{height:"100%",width:"100%", py:2}}
                                direction={"column"}
                                justifyContent={"space-between"}
                                alignItems={"flex-start"}
                            >
                                <Avatar
                                    alt={props.mySport.name}
                                    sx={{height: "2.5em", width: "2.5em",
                                        backgroundColor: `${theme.palette.text.disabled}`,
                                    }}
                                    src={icon?.data}
                                >
                                    {!icon?.data && <HiOutlineExclamationTriangle fontSize={"30px"}/>}
                                </Avatar>
                                <Stack
                                    direction={"column"}
                                    justifyContent={"flex-start"}
                                    alignItems={"flex-start"}
                                >
                                    <Typography fontSize={"14px"} sx={{color:theme.palette.text.primary}}>
                                        あなたの競技
                                    </Typography>
                                    <Typography fontSize={"14px"} fontWeight={"600"} sx={{color:theme.palette.text.primary}}>
                                        {props.mySport.name}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Button>
                </Grid>
                <Grid xs={5.5} sm={5.5} lg={5.5}>
                    <Box
                        px={2}
                        py={1.5}
                        mb={"8px"}
                        pr={2}
                        sx={{
                            width:"100%",
                            height: "86px",
                            borderRadius: "12px",
                            backgroundColor: `${theme.palette.secondary.light}33`,
                            border: `1px solid ${theme.palette.secondary.dark}66`,
                        }}>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{width:"100%", height:"100%"}}
                        >
                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"flex-start"}
                            >
                                <Typography sx={{fontSize: "14px"}}>
                                    リーグ内順位
                                </Typography>
                                <Rank rank={props.myTeamRank}/>
                            </Stack>
                            <SvgIcon>
                                <HiChartBar color="#99a5d6"/>
                            </SvgIcon>
                        </Stack>
                    </Box>
                    <Button
                        color={"secondary"}
                        variant={"contained"}
                        onClick={toggleDrawer(true)}
                        sx={{
                            width:"100%", height:"86px",
                            backgroundColor: `${theme.palette.secondary.light}66`,
                            border: `1px solid ${theme.palette.secondary.dark}66`,
                        }}
                    >
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
                                <Typography sx={{fontSize: "14px", color:theme.palette.text.primary}}>
                                    チーム
                                </Typography>
                                <Typography sx={{fontSize: "18px", color:theme.palette.text.primary}}>
                                    {props.myTeam.name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Button>
                </Grid>
                <Grid xs={5.5} sm={5.5} lg={5.5}>
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
                                    color={theme.palette.text.primary}
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
                                spacing={1}
                                pt={2}
                            >
                                {props.myTeamUsers.map(user => {
                                    return (
                                        <Fragment key={user.id}>
                                            <Box
                                                px={2}
                                                py={1.5}
                                                pr={2}
                                                sx={{
                                                    width:"100%",
                                                    borderRadius: "12px",
                                                    backgroundColor: `${theme.palette.secondary.light}33`,
                                                    border: `1px solid ${theme.palette.secondary.dark}66`,
                                                }}>
                                                <Typography color={theme.palette.text.primary} fontSize={"16px"}>
                                                    {user.name}
                                                </Typography>
                                            </Box>
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