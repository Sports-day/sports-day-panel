import * as React from 'react';
import PropTypes from 'prop-types';
import {
    HiOutlineLogout,
    HiCog, HiX,
    HiMenuAlt4,
    HiSparkles,
} from "react-icons/hi";
import {
    HiCalendar
} from "react-icons/hi2";
import {
    FaGithubAlt
} from "react-icons/fa";
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
    Typography, DialogTitle, DialogContent, DialogActions, Dialog,
} from '@mui/material';
import Logo from "public/logo.svg"
import {signOut, useSession} from "next-auth/react";
import {alpha} from '@mui/material/styles';
import Link from "next/link";
import {useState} from "react";
import {DialogProps} from "@mui/material/Dialog";
import {DocsOverall} from "../rules/DocsOverall";
import Cookies from "js-cookie";

type Anchor = 'top';

export const Navigation = () => {
    const [value, setValue] = React.useState('home');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [state, setState] = React.useState({top: false, NotifTop: false});
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
    };
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

                setState({...state, [anchor]: open});
            };

    const menu = (anchor: Anchor) => (
        <>
            <Box
                sx={{
                    backgroundColor: '#23398A',
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
                        pl={3}
                        py={3}
                        sx={{marginRight: "10px", paddingRight:"6px"}}
                    >
                        <Box>
                            <Button component={Link} href={"/"} scroll={false}>
                                <Logo width={20 * 8.45} height={20} fill={'white'}/>
                            </Button>
                        </Box>
                        <IconButton onClick={toggleDrawer(anchor, true)}>
                            <SvgIcon color="primary">
                                <HiX color="#FFF"/>
                            </SvgIcon>
                        </IconButton>
                    </Stack>

                <Stack
                    direction={"column"}
                    justifyContent={"flex-start"}
                    spacing={2}
                    px={2.3}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={2}
                        width={"100%"}
                        px={1}
                    >
                        <Avatar
                            alt={session?.user?.name ?? "unknown"}
                            sx={{
                                height: "4em",
                                width: "4em",
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

                    <Button component={Link} href={"/privacy"}>
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            spacing={2}
                            width={"100%"}
                        >
                            <Typography sx={{color: "#99a5d6", fontSize: "16px"}}>
                                プライバシーポリシー
                            </Typography>
                        </Stack>
                    </Button>

                    <Divider/>

                    <Button component={Link} href={"/about"}>
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            spacing={2}
                            width={"100%"}
                        >
                            <Avatar
                                sx={{
                                    height: "4em",
                                    width: "4em",
                                    backgroundColor: "#FFF",
                                }}
                            >
                                <SvgIcon>
                                    <HiSparkles color="#23398A"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                SPORTSDAYってなに？
                            </Typography>
                        </Stack>
                    </Button>

                    <Divider/>

                    <Button href={"https://github.com/Sports-day"}　target="_blank">
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            spacing={2}
                            width={"100%"}
                        >
                            <Avatar
                                sx={{
                                    height: "4em",
                                    width: "4em",
                                    backgroundColor: "#FFF",
                                }}
                            >
                                <SvgIcon>
                                    <FaGithubAlt color="#23398A"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                GitHub : SPORTSDAY
                            </Typography>
                        </Stack>
                    </Button>

                    { session && session.user.role == "admin" &&
                        <Button component={Link} href={"/admin"} scroll={false}>
                            <Stack
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                spacing={2}
                                width={"100%"}
                            >
                                <Avatar
                                    sx={{
                                        height: "4em",
                                        width: "4em",
                                        backgroundColor: "#FFF",
                                    }}
                                >
                                    <SvgIcon>
                                        <HiCog color="#23398A"/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                    管理ページ
                                </Typography>
                            </Stack>
                        </Button>
                    }

                        <Button
                            onClick={async () => {
                                //  remove cookie
                                Cookies.remove("sports-day.api-access-token")
                                await signOut()
                            }}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                spacing={2}
                                pb={2}
                                width={"100%"}
                            >
                                <Avatar
                                    sx={{
                                        height: "4em",
                                        width: "4em",
                                        backgroundColor: "#FFF",
                                    }}
                                >
                                    <SvgIcon>
                                        <HiOutlineLogout color="#23398A"/>
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
                                <Button component={Link} href={"/"} scroll={false}>
                                    <Logo width={20 * 8.45} height={20} fill={'white'}/>
                                </Button>
                            </Box>
                            <Stack
                                direction={"row"}
                                justifyContent={"flex-end"}
                                alignItems={"center"}
                                spacing={2}
                            >
                                <IconButton onClick={handleClickOpen('paper')} sx={{backgroundColor: "#2F479D"}}>
                                    <SvgIcon>
                                        <HiCalendar color="#FFF"/>
                                    </SvgIcon>
                                </IconButton>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    scroll={scroll}
                                    aria-labelledby="scroll-dialog-title"
                                    aria-describedby="scroll-dialog-description"
                                    sx={{
                                        "& .MuiDialog-container": {
                                            "& .MuiPaper-root": {
                                                width: "100vw",
                                                maxWidth: "lg"
                                            },
                                        },
                                    }}
                                >
                                    <DialogTitle id="scroll-dialog-title" fontSize={"16px"} color={"#99a5d6"}>スケジュール</DialogTitle>
                                    <DialogContent dividers={scroll === 'paper'}>
                                        <DocsOverall/>
                                    </DialogContent>
                                    <DialogActions>
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={2}
                                            sx={{width: "100%"}}
                                        >
                                            <Button sx={{width:"100%", height:"100%"}} onClick={handleClose}>
                                                <SvgIcon sx={{mr:1}}>
                                                    <HiX color={"#E8EBF8"}/>
                                                </SvgIcon>
                                                <Typography color={"#E8EBF8"}>閉じる</Typography>
                                            </Button>
                                        </Stack>
                                    </DialogActions>
                                </Dialog>
                                {(['top'] as const).map((anchor) => (
                                    <React.Fragment key={"top"}>
                                        <IconButton onClick={toggleDrawer(anchor, true)}
                                                    sx={{backgroundColor: "#2F479D"}}>
                                            <SvgIcon>
                                                <HiMenuAlt4 color="#FFF"/>
                                            </SvgIcon>
                                        </IconButton>
                                        <SwipeableDrawer
                                            anchor={anchor}
                                            open={state[anchor]}
                                            onClose={toggleDrawer(anchor, false)}
                                            onOpen={toggleDrawer(anchor, true)}
                                        >
                                            {menu(anchor)}
                                        </SwipeableDrawer>
                                    </React.Fragment>
                                ))}
                            </Stack>

                        </Stack>

                    </Container>
                </AppBar>
            </>
        );
    } else {
        return (
            <>
            </>
        )
    }
};

Navigation.propTypes = {
    onNavOpen: PropTypes.func
};
