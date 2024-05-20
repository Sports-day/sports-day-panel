import {
    Box,
    Button,
    Stack,
    styled,
    LinearProgress,
    SwipeableDrawer,
    Typography, SvgIcon,
    useTheme, Avatar
} from "@mui/material";
import * as React from "react";
import {MatchDetail} from "@/components/game/GameList/matchDetail";
import {HiUser} from "react-icons/hi2";
import {User} from "@/src/models/UserModel";


export type DiscoverUserProps = {
    user: User
}

export const DiscoverUser = (props: DiscoverUserProps) => {
    const theme = useTheme();
    const [open, toggleDrawer] = React.useState(false);


    return(
        <>
            <Button
                variant={"contained"}
                color={"secondary"}
                sx={{
                    width: "100%",
                    border: `1px solid ${theme.palette.secondary.dark}66`,
                    pt:1.4,
                    pb:1.8,
                    mb:1
                }}
                onClick={() => toggleDrawer(true)}
            >
                <Stack
                    direction={"row"}
                    spacing={3} ml={0.4}
                    alignItems={"center"}
                    justifyContent={"start"}
                    sx={{width:"100%"}}
                >
                    <Avatar
                        alt={"unknown"}
                        sx={{
                            height: "1.5em",
                            width: "1.5em",
                            backgroundColor: theme.palette.text.secondary,
                        }}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${props.user?.pictureId}/file`}
                    >
                        {props.user?.pictureId === null && <HiUser/>}
                    </Avatar>
                    <Typography color={theme.palette.text.primary}>
                        {props.user.name}
                    </Typography>
                </Stack>
            </Button>
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
                PaperProps={{elevation: 0, style: {backgroundColor: "transparent"}}}
            >
                {/*<MatchDetail match={props.match}/>*/}
            </SwipeableDrawer>
        </>
    )
}