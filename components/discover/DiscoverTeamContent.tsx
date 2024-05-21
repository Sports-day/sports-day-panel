import {
    Avatar,
    Box,
    Button,
    Card, Container, Divider, IconButton,
    Stack,
    SvgIcon,
    SwipeableDrawer,
    Typography,
    Unstable_Grid2 as Grid,
    useTheme
} from "@mui/material";
import {HiLocationMarker} from "react-icons/hi";
import {HiXMark, HiClock} from "react-icons/hi2";
import {Fragment} from "react";
import * as React from "react";

import {Image} from "@/src/models/ImageModel"
import {Location} from "@/src/models/LocationModel"
import {User} from "@/src/models/UserModel"
import {MatchSet} from "@/src/features/unit/discover";


export type DiscoverTeamContentProps = {
    matchSet: MatchSet
    images: Image[]
    locations: Location[]
    users: User[]
}

export const DiscoverTeamContent = (props:DiscoverTeamContentProps) => {
    const theme = useTheme();
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
                            <Stack
                                alignItems={"flex-start"}
                                direction={"column"}
                                justifyContent={"flex-start"}
                                spacing={1}
                                py={1}
                                pl={2}
                                sx={{flexGrow:1}}
                            >
                                <Typography color={theme.palette.text.secondary} fontSize={"14px"}>
                                    チーム名
                                </Typography>
                                <Typography fontWeight={"bold"} color={theme.palette.text.primary}>
                                    {props.matchSet.team.name}
                                </Typography>
                            </Stack>
                            <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"flex-start"}
                                pr={2}
                            >
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <Box sx={{pb:"0.3em"}}>
                                        <Avatar
                                            sx={{height: "1em", width: "1em"}}
                                            src={image?.data}
                                        >
                                        </Avatar>
                                    </Box>
                                    <Typography sx={{color: theme.palette.text.secondary, fontSize: "14px", py: "5px"}}>
                                        {props.matchSet.sport.name}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                        <HiLocationMarker color={theme.palette.text.secondary}/>
                                    </SvgIcon>
                                    <Typography sx={{color: theme.palette.text.secondary, fontSize: "14px", py: "5px"}}>
                                        {location?.name}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    alignItems={"flex-end"}
                                    spacing={1}
                                >
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", bottom:"3px"}}>
                                        <HiClock color={theme.palette.text.secondary}/>
                                    </SvgIcon>
                                    <Typography sx={{color: theme.palette.text.secondary, fontSize: "14px", py: "5px"}}>
                                        {formattedTime}
                                    </Typography>
                                </Stack>
                            </Stack>
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
                                color={theme.palette.text.primary}
                                fontWeight={"bold"}
                            >
                                チームメンバー
                            </Typography>
                            <IconButton onClick={() => toggleDrawer(false)}>
                                <SvgIcon>
                                    <HiXMark color={theme.palette.text.primary}/>
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
                                            <Typography color={theme.palette.text.primary} fontSize={"16px"}>
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

