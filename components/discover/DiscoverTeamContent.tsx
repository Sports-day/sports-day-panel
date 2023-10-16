import {
    Avatar,
    Box,
    Button,
    Card, Container, Divider, IconButton,
    Stack,
    SvgIcon,
    SwipeableDrawer,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {HiLocationMarker} from "react-icons/hi";
import {HiXMark, HiClock} from "react-icons/hi2";
import {Fragment} from "react";
import * as React from "react";

import {Image} from "../../src/models/ImageModel"
import {Location} from "../../src/models/LocationModel"
import {User} from "../../src/models/UserModel"
import {MatchSet} from "../../src/features/unit/discover";


export type DiscoverTeamContentProps = {
    matchSet: MatchSet
    images: Image[]
    locations: Location[]
    users: User[]
}

export const DiscoverTeamContent = (props:DiscoverTeamContentProps) => {
    const [open, toggleDrawer] = React.useState(false);
    const image = props.images.find((v) => v.id === props.matchSet.sport.iconId)
    const location = props.locations.find((v) => v.id === props.matchSet.match.locationId)
    const formattedTime = new Date(props.matchSet.match.startAt).toLocaleTimeString("ja-JP", {
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <>
            <Grid xs={12} sm={12} lg={12}>
                <Card>
                    <Button sx={{width:"100%"}} onClick={() => toggleDrawer(true)}>
                        <Grid xs={12} sm={5} lg={6}>
                            <Stack
                                alignItems={"flex-start"}
                                direction={"column"}
                                justifyContent={"flex-start"}
                                spacing={1}
                                py={1}
                                px={1}
                            >
                                <Typography color={"textSecondary"} fontSize={"14px"}>
                                    チーム名
                                </Typography>
                                <Typography fontSize={"24px"} fontWeight={"bold"} color={"white"}>
                                    {props.matchSet.team.name}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={7} lg={6}>
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
                                    <Box sx={{pb:"0.3em"}}>
                                        <Avatar
                                            sx={{height: "1.5em", width: "1.5em"}}
                                            src={image?.attachment}
                                        >
                                        </Avatar>
                                    </Box>
                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                        {props.matchSet.sport.name}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                        <HiLocationMarker color="#99a5d6"/>
                                    </SvgIcon>
                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                        {location?.name}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                        <HiClock color="#99a5d6"/>
                                    </SvgIcon>
                                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                                        {formattedTime}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Button>
                </Card>
            </Grid>
            <>
                <SwipeableDrawer
                    anchor="bottom"
                    open={open}
                    onClose={() => toggleDrawer(false)}
                    onOpen={() => toggleDrawer(true)}
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
                            sx={{width: "100%"}}
                            py={1}
                        >
                            <Typography
                                color={"#E8EBF8"}
                                fontWeight={"bold"}
                            >
                                チームメンバー
                            </Typography>
                            <IconButton onClick={() => toggleDrawer(false)}>
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
                            {props.users
                                .filter(user => user.teamIds.includes(props.matchSet.team.id))
                                .map(user => {
                                    return (
                                        <Fragment key={user.id}>
                                            <Box sx={{width: "100%"}}>
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
            </>
        </>
    )
}

