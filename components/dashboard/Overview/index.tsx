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
import {HiArrowRightCircle, HiXMark} from "react-icons/hi2";
import {Sport} from "../../../src/models/SportModel";
import {Team} from "../../../src/models/TeamModel";
import {User} from "../../../src/models/UserModel";
import {useContext, useState} from "react";
import {ImagesContext} from "../../context";


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
            sx={{paddingTop: "50px"}}
        >
            <Grid container spacing={2}>
                <Grid xs={12} sm={12} lg={12}>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        spacing={3}
                    >
                        <Button sx={{width:"100%"}}>
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
                        swipeAreaWidth={0}
                        disableSwipeToOpen={false}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <Container
                            maxWidth={"xl"}
                            sx={{
                                py: 3,
                                px: 3,
                                overflow: "auto"
                            }}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={{width:"100%"}}
                            >
                                <Typography
                                    color={"textSecondary"}
                                >
                                    チームメンバー
                                </Typography>
                                <IconButton onClick={toggleDrawer(false)}>
                                    <SvgIcon>
                                        <HiXMark color={"#99A5D6"}/>
                                    </SvgIcon>
                                </IconButton>
                            </Stack>
                                {props.myTeamUsers.map(user => {
                                    return (
                                        <Box key={user.id}>
                                            <Typography color={"textSecondary"}>
                                                {user.name}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                        </Container>
                    </SwipeableDrawer>
                </Grid>
                <Grid xs={6} sm={6} lg={6}>
                    <Button sx={{width:"100%"}}>
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
                                <HiArrowRightCircle color="#FFF"/>
                            </SvgIcon>
                        </Stack>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Overview;