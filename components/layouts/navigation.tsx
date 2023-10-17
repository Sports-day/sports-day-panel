import * as React from 'react';
import PropTypes from 'prop-types';
import {
    HiOutlineLogout,
    HiCog, HiX,
    HiMenuAlt4,
    HiSparkles,
    HiHome,
    HiSearch
} from "react-icons/hi";
import {
    HiCalendar,
    HiClipboardDocument
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
    BottomNavigation, BottomNavigationAction, Paper,
    useScrollTrigger, Fade
} from '@mui/material';
import Logo from "public/logo.svg"
import {signOut, useSession} from "next-auth/react";
import {alpha} from '@mui/material/styles';
import Link from "next/link";
import {useState} from "react";
import {DialogProps} from "@mui/material/Dialog";
import {DocsOverall} from "../rules/DocsOverall";
import Cookies from "js-cookie";

type Anchor = 'bottom';

export const Navigation = () => {
    const [value, setValue] = React.useState('home');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [state, setState] = React.useState({bottom: false, NotifBottom: false});
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
                    width: '100vw' , height: 'auto', overflow:'scrollable', mt:4, mb:0.5}}
                role="Navigation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <Container maxWidth={"xl"} disableGutters>

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
                        px={0.5}
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

                    <Divider/>

                    <Button component={Link} href={"/privacy"}>
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
                                    backgroundColor: "#99a5d6",
                                }}
                            >
                                <SvgIcon>
                                    <HiClipboardDocument color="#23398A"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#99a5d6", fontSize: "16px"}}>
                                プライバシーポリシーと知的財産情報
                            </Typography>
                        </Stack>
                    </Button>

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

                    </Stack>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        pl={3}
                        py={3}
                        sx={{marginRight: "28px", paddingRight:"6px"}}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{color: "#99a5d6"}}
                            spacing={1}
                        >
                            <Typography sx={{pr:"5px"}}>(C) 2023</Typography>
                            <Box sx={{pt:0.3}}>
                                <Logo width={14*8.45} height={14} fill={'#99a5d6'}/>
                            </Box>
                            <Typography>TEAM</Typography>
                        </Stack>
                        <IconButton onClick={toggleDrawer(anchor, true)}>
                            <SvgIcon color="primary">
                                <HiX color="#FFF"/>
                            </SvgIcon>
                        </IconButton>
                    </Stack>
                </Container>
            </Box>
        </>
    );

    const {data: session} = useSession();

    if (session) {
        return (
            <>
                    <Box
                        component="nav"
                        sx={{
                            height: "70px",
                            backdropFilter: 'blur(6px)',
                            backgroundColor: '#23398A'
                        }}
                    >
                        <Container
                            maxWidth={"xl"}
                            disableGutters
                        >
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            sx={{marginRight: "10px", padding: "8px 5px"}}
                        >
                            <Box py={2} px={2}>
                                <Button component={Link} href={"/"} scroll={false}>
                                    <Logo width={20 * 8.45} height={20} fill={'#ffffff'}/>
                                </Button>
                            </Box>
                        </Stack>
                        </Container>
                    </Box>

                <Stack
                    direction={"row"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    spacing={2}
                >
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
                </Stack>

                <Box
                    sx={{
                        position: "fixed",
                        bottom:0, left:0, right:0,
                        zIndex:"128",
                        m:1,
                    }}
                >
                        <BottomNavigation
                            sx={{
                                height: "80px",
                                width: "100%",
                                justifyContent: "center",
                                alignContent: "center",
                                backdropFilter: 'blur(6px)',
                                borderRadius: "35px",
                                backgroundColor: alpha('#23398A', 0.9),
                                boxShadow: "0px 0px 50px #112057"
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    maxWidth: "xl",
                                    display:"flex",
                                }}
                            >
                                <Button component={Link} sx={{width:"100%"}} href={"/"}>
                                    <SvgIcon sx={{mr:1}}>
                                        <HiHome color={"#E8EBF8"}/>
                                    </SvgIcon>
                                </Button>
                                <Button component={Link} sx={{width:"100%"}} href={"/discover"}>
                                    <SvgIcon sx={{mr:1}}>
                                        <HiSearch color={"#E8EBF8"}/>
                                    </SvgIcon>
                                </Button>
                                <Button sx={{width:"100%"}} onClick={handleClickOpen('paper')}>
                                    <SvgIcon sx={{mr:1}}>
                                        <HiCalendar color={"#E8EBF8"}/>
                                    </SvgIcon>
                                </Button>
                                {(['bottom'] as const).map((anchor) => (
                                    <React.Fragment key={"top"}>
                                        <Button sx={{width:"100%"}} onClick={toggleDrawer(anchor, true)}>
                                            <SvgIcon sx={{mr:1}}>
                                                <HiMenuAlt4 color={"#E8EBF8"}/>
                                            </SvgIcon>
                                        </Button>
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
                            </Box>
                        </BottomNavigation>

                </Box>
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
