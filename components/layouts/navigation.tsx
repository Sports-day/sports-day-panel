import * as React from 'react';
import PropTypes from 'prop-types';
import {
    HiXMark,
    HiBars2,
    HiArrowLeftCircle,
    HiCog6Tooth,
} from "react-icons/hi2";
import {
    GoMarkGithub,
} from "react-icons/go";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Stack,
    SvgIcon, Toolbar,
    SwipeableDrawer,
    Button,
    Divider,
    Typography,
} from '@mui/material';
import Logo from "public/logo.svg"
import {signOut, useSession} from "next-auth/react";

type Anchor = 'top';

export const Navigation = () => {
    const [state, setState] = React.useState({top: false});

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: '100vw' , height: '100vh', overflow:'hidden'}}
            role="Navigation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Container maxWidth={"xl"} disableGutters>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{marginRight: "10px", padding:"8px 5px 40px"}}
                >
                    <Toolbar>
                        <Logo width={20*8.45} height={20} fill={'white'}/>
                    </Toolbar>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <SvgIcon color="primary">
                            <HiXMark color="#FFF"/>
                        </SvgIcon>
                    </IconButton>
                </Stack>

                <Stack
                    direction={"column"}
                    justifyContent={"flex-start"}
                    spacing={2}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={2}
                        px={3}
                        width={"100%"}
                    >
                        <Avatar
                            alt={session?.user?.name ?? "unknown"}
                            sx={{
                                height: "3.5em",
                                width: "3.5em",
                                backgroundColor: "#5664e3",
                            }}
                            src={"/public/images/basketball.jpg"}
                        >
                        </Avatar>
                        <Typography sx={{color: "#99a5d6", fontSize: "16px"}}>
                            {session?.user?.name ?? "unknown"}
                        </Typography>
                    </Stack>

                    <Divider/>

                    <Stack
                        direction={"column"}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        spacing={1}
                        px={5}
                        width={"100%"}
                    >
                        <Typography sx={{color: "#99a5d6", fontSize: "32px"}}>
                            Project info
                        </Typography>
                        <Typography sx={{color: "#99a5d6", fontSize: "16px", wordWrap: "break-word"}}>
                            description
                        </Typography>
                    </Stack>

                    <Divider/>

                    <Button href={"https://github.com/orgs/Sports-day/repositories"}　target="_blank">
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            spacing={2}
                            px={3}
                            width={"100%"}
                        >
                            <Avatar
                                sx={{
                                    height: "3.5em",
                                    width: "3.5em",
                                    backgroundColor: "#5664e3",
                                }}
                            >
                                <SvgIcon>
                                    <GoMarkGithub color="#FFF"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#99a5d6", fontSize: "16px"}}>
                                GitHub : SPORTSDAY
                            </Typography>
                        </Stack>
                    </Button>

                    <Button>
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            spacing={2}
                            px={3}
                            width={"100%"}
                        >
                            <Avatar
                                sx={{
                                    height: "3.5em",
                                    width: "3.5em",
                                    backgroundColor: "#5664e3",
                                }}
                            >
                                <SvgIcon>
                                    <HiCog6Tooth color="#FFF"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#99a5d6", fontSize: "16px"}}>
                                管理ページ
                            </Typography>
                        </Stack>
                    </Button>

                    <Button onClick={() => signOut()}>
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            spacing={2}
                            px={3}
                            width={"100%"}
                        >
                            <Avatar
                                sx={{
                                    height: "3.5em",
                                    width: "3.5em",
                                    backgroundColor: "#5664e3",
                                }}
                            >
                                <SvgIcon>
                                    <HiArrowLeftCircle color="#FFF"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#99a5d6", fontSize: "16px"}}>
                                ログアウト
                            </Typography>
                        </Stack>
                    </Button>

                </Stack>
            </Container>
        </Box>
    );

    const {data: session} = useSession();

    if (session) {
        return (
            <>
                <AppBar
                    component="nav"
                    elevation={0}
                    sx={{
                        height: "80px",
                        backgroundColor: "#23398a"
                    }}
                >
                    <Container
                        maxWidth={"xl"}
                        disableGutters
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{marginRight: "10px", padding: "8px 5px"}}
                        >

                            <Toolbar>
                                <Logo width={20 * 8.45} height={20} fill={'white'}/>
                            </Toolbar>
                            {(['top'] as const).map((anchor) => (
                                <React.Fragment key={"top"}>
                                    <IconButton onClick={toggleDrawer(anchor, true)}>
                                        <SvgIcon>
                                            <HiBars2 color="#FFF"/>
                                        </SvgIcon>
                                    </IconButton>
                                    <SwipeableDrawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                        onOpen={toggleDrawer(anchor, true)}
                                    >
                                        {list(anchor)}
                                    </SwipeableDrawer>
                                </React.Fragment>
                            ))}

                        </Stack>

                    </Container>
                </AppBar>
            </>
        );
    } else {
        return(
            <>
                a
            </>
        )
    }
};

Navigation.propTypes = {
    onNavOpen: PropTypes.func
};
