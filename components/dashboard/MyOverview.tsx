import {
    Avatar,
    Button,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    SvgIcon,
    Typography,
    SwipeableDrawer,
    Unstable_Grid2 as Grid, IconButton
} from "@mui/material";
import {HiArrowRightCircle, HiXMark} from "react-icons/hi2";
import * as React from "react";


export const MyOverview = (props:any) => {
   const {overviewSport, overviewTeam, overviewRank} = props;
   const member = ["田中 太郎","中田 太郎","田村 太郎","村田 太郎","瀬川 太郎","川瀬 太郎"];

    const [open, setOpen] = React.useState(false);
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
                                        alt={"競技名"}
                                        sx={{height: "3.5em", width: "3.5em"}}
                                        src={"/public/images/basketball.jpg"}
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
                                            {overviewSport}
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
                                    {overviewTeam}
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
                        swipeAreaWidth={50}
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
                                        <HiXMark color={"99A5D6"}/>
                                    </SvgIcon>
                                </IconButton>
                            </Stack>
                            <List >
                                {member.map((name,index) => {
                                    return (
                                        <ListItem key={name} disablePadding>
                                            <ListItemText primary={member[index]} sx={{py:1}}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
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
                                        {overviewRank}
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

export default MyOverview;