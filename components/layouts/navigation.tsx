import * as React from 'react';
import PropTypes from 'prop-types';
import {
    HiArrowLeftCircle,
    HiCog6Tooth, HiXMark,
} from "react-icons/hi2";
import {
    AiFillGithub,
    AiOutlineNotification
} from "react-icons/ai";
import {
    Menu,
    MoreHorizontal,
    X,
    ScrollText
} from "lucide-react";
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
import Mark from "public/mark.svg"
import {signOut, useSession} from "next-auth/react";
import { alpha } from '@mui/material/styles';
import Link from "next/link";
import {useState} from "react";
import {DialogProps} from "@mui/material/Dialog";
import {Rules} from "../rules/Rules";
import {DocsOverall} from "../rules/DocsOverall";

type Anchor = 'top';

export const Navigation = () => {
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

                setState({ ...state, [anchor]: open });
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
                                <X color="#FFF"/>
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
                        px={1}
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
                                    height: "3em",
                                    width: "3em",
                                    backgroundColor: "#FFF",
                                }}
                            >
                                <SvgIcon>
                                    <MoreHorizontal color="#23398A"/>
                                </SvgIcon>
                            </Avatar>
                            <Typography sx={{color: "#FFF", fontSize: "16px"}}>
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
                                    <AiFillGithub color="#23398A"/>
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
                                <Button component={Link} href={"/"}　scroll={false}>
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
                                        <ScrollText color="#FFF"/>
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
                                    <DialogTitle id="scroll-dialog-title" fontSize={"16px"} color={"#99a5d6"}>球技大会の進行</DialogTitle>
                                    <DialogContent dividers={scroll === 'paper'}>
                                        <DocsOverall/>
                                    </DialogContent>
                                    <DialogActions>
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={2}
                                            sx={{width:"100%"}}
                                        >
                                            <Button sx={{width:"100%", height:"100%"}} onClick={handleClose}>
                                                <SvgIcon sx={{mr:1}}>
                                                    <HiXMark color={"#E8EBF8"}/>
                                                </SvgIcon>
                                                <Typography color={"#E8EBF8"}>閉じる</Typography>
                                            </Button>
                                        </Stack>
                                    </DialogActions>
                                </Dialog>
                                {(['top'] as const).map((anchor) => (
                                    <React.Fragment key={"top"}>
                                        <IconButton onClick={toggleDrawer(anchor, true)} sx={{backgroundColor: "#2F479D"}}>
                                            <SvgIcon>
                                                <Menu color="#FFF"/>
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
        return(
            <>
            </>
        )
    }
};

Navigation.propTypes = {
    onNavOpen: PropTypes.func
};
