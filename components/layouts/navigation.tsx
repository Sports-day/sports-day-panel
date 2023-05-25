import * as React from 'react';
import PropTypes from 'prop-types';
import {
    HiXMark,
    HiBars2,
    HiArrowLeftCircle,
    HiEllipsisHorizontal,
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
    SvgIcon,
    SwipeableDrawer,
    Button,
    Divider,
    Typography,
} from '@mui/material';
import Logo from "public/logo.svg"
import {signOut, useSession} from "next-auth/react";
import { alpha } from '@mui/material/styles';

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
        <>
            <Box
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: alpha('#23398A', 0.5),
                    width: '100vw' , height: '100vh', overflow:'scrollable'}}
                role="Navigation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <Container maxWidth={"xl"} disableGutters>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        sx={{marginRight: "10px", paddingLeft:"30px",paddingRight:"6px", py: 3}}
                    >
                        <Box>
                            <Button href={"/"}>
                                <Logo width={20 * 8.45} height={20} fill={'white'}/>
                            </Button>
                        </Box>
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
                            src={"/"}
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
                        px={4}
                        py={1}
                        width={"100%"}
                    >
                        <Typography sx={{color: "#99a5d6", fontSize: "24px"}}>
                            SPORTSDAYとは？
                        </Typography>
                        <Typography sx={{color: "#99a5d6", fontSize: "16px", lineHeight:2, wordWrap: "break-word"}}>
                            このアプリは2人の学生が製作し、今回の球技大会に試験的に導入されています。
                        </Typography>
                    </Stack>

                    <Button href={"pages/about"}>
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
                                    height: "3em",
                                    width: "3em",
                                    backgroundColor: "#99a5d6",
                                }}
                            >
                                <SvgIcon>
                                    <HiEllipsisHorizontal color="#23398A"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#99a5d6", fontSize: "16px"}}>
                                詳しく見る
                            </Typography>
                        </Stack>
                    </Button>

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
                                    height: "3em",
                                    width: "3em",
                                    backgroundColor: "#FFF",
                                }}
                            >
                                <SvgIcon>
                                    <GoMarkGithub color="#23398A"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                GitHub : SPORTSDAY
                            </Typography>
                        </Stack>
                    </Button>

                    { session && session.user.role == "admin" &&
                        <Button href={"/admin"}>
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
                                        height: "3em",
                                        width: "3em",
                                        backgroundColor: "#FFF",
                                    }}
                                >
                                    <SvgIcon>
                                        <HiCog6Tooth color="#23398A"/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                    管理ページ
                                </Typography>
                            </Stack>
                        </Button>
                    }

                        <Button onClick={() => signOut()}>
                            <Stack
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                spacing={2}
                                px={3}
                                pb={2}
                                width={"100%"}
                            >
                                <Avatar
                                    sx={{
                                        height: "3em",
                                        width: "3em",
                                        backgroundColor: "#FFF",
                                    }}
                                >
                                    <SvgIcon>
                                        <HiArrowLeftCircle color="#23398A"/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                    ログアウト
                                </Typography>
                            </Stack>
                        </Button>

                    </Stack>
                </Container>
            </Box>
        </>
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
                        backdropFilter: 'blur(6px)',
                        backgroundColor: alpha('#23398A', 0.7),
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
                            <Box py={2} px={2}>
                                <Button href={"/"}>
                                    <Logo width={20 * 8.45} height={20} fill={'white'}/>
                                </Button>
                            </Box>
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
            </>
        )
    }
};

Navigation.propTypes = {
    onNavOpen: PropTypes.func
};
