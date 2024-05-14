'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import {
    HiArrowRightOnRectangle,
    HiHome, HiMagnifyingGlass, HiNewspaper, HiSparkles, HiXMark
} from "react-icons/hi2";
import {
    FaGithubAlt
} from "react-icons/fa";
import {
    Avatar,
    Box,
    CardContent,
    Container,
    Stack,
    SvgIcon,
    SwipeableDrawer,
    Button,
    Typography, DialogTitle, DialogContent, DialogActions, Dialog,
    BottomNavigation, Card,
} from '@mui/material';
import Logo from "@/public/logo/logo.svg"
import Link from "next/link";
import {useState} from "react";
import {DialogProps} from "@mui/material/Dialog";
import {DocsOverall} from "../rules/DocsOverall";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {useFetchUserinfo} from "@/src/features/userinfo/hook";
import PrivacyPolicyDrawer from "@/components/layouts/privacyPolicyDrawer";
import {HiLibrary} from "react-icons/hi";
type Anchor = 'bottom';

export const Navigation = () => {
    const router = useRouter()
    const {user} = useFetchUserinfo()

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
                    width: '100vw',
                    height: 'auto',
                    overflow: 'scrollable',
                    background:"rgba(62,78,179,0.8)",
                    backdropFilter: 'blur(30px)',
                    borderRadius: "10px",
                    color: '#E8EBF8',
                    pb:5,
                    pt:4
                }}
                role="Navigation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <Container maxWidth={"xl"}>
                    <Stack spacing={1}>
                        <Stack direction={"row"} spacing={1} pb={2} justifyContent={"center"}>
                            <Logo width={16 * 8.45} height={16} fill={"#eff0f8"}/>
                        </Stack>
                        <Card sx={{backgroundColor: "#5360b2",}}>
                            <CardContent>
                                <Stack direction={"row"} spacing={1} ml={0.4} alignItems={"center"}>
                                    <Avatar
                                        alt={"unknown"}
                                        sx={{
                                            height: "1.5em",
                                            width: "1.5em",
                                            backgroundColor: "#5664e3",
                                        }}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${user?.pictureId}/file`}
                                    >
                                    </Avatar>
                                    <Typography sx={{color: "#eff0f8", fontSize: "16px"}}>
                                        {user?.name ?? "unknown"} さん
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Button
                            fullWidth disableElevation
                            variant={"contained"}
                            onClick={() => {
                                //  remove cookie
                                Cookies.remove("access_token")
                                //  redirect with next
                                router.push("/login")
                            }}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                spacing={2}
                                py={0.5}
                                width={"100%"}
                            >
                                <Avatar
                                    sx={{
                                        height: "2em",
                                        width: "2em",
                                        backgroundColor: "inherit",
                                    }}
                                >
                                    <SvgIcon>
                                        <HiArrowRightOnRectangle color="#eff0f8"/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: "#FFF", fontSize: "14px"}}>
                                    ログアウト
                                </Typography>
                            </Stack>
                        </Button>
                        <PrivacyPolicyDrawer>
                            <Stack
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                spacing={2}
                                py={0.5}
                                width={"100%"}
                            >
                                <Avatar
                                    sx={{
                                        height: "2em",
                                        width: "2em",
                                        backgroundColor: "inherit",
                                    }}
                                >
                                    <SvgIcon>
                                        <HiLibrary color="#eff0f8"/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: "#FFF", fontSize: "14px"}}>
                                    プライバシーポリシー
                                </Typography>
                            </Stack>
                        </PrivacyPolicyDrawer>
                        <Button
                            fullWidth disableElevation
                            variant={"contained"}
                            href={"https://github.com/Sports-day"}
                            target="_blank"
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                spacing={2}
                                py={0.5}
                                width={"100%"}
                            >
                                <Avatar
                                    sx={{
                                        height: "2em",
                                        width: "2em",
                                        backgroundColor: "inherit",
                                    }}
                                >
                                    <SvgIcon>
                                        <FaGithubAlt color="#eff0f8"/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: "#FFF", fontSize: "14px"}}>
                                    GitHub
                                </Typography>
                            </Stack>
                        </Button>
                        <Button
                            fullWidth disableElevation
                            variant={"contained"}
                            component={Link}
                            href={"/about"}
                        >
                            <Stack
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                spacing={2}
                                py={0.5}
                                width={"100%"}
                            >
                                <Avatar
                                    sx={{
                                        height: "2em",
                                        width: "2em",
                                        backgroundColor: "inherit",
                                    }}
                                >
                                    <SvgIcon>
                                        <HiSparkles color="#eff0f8"/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: "#FFF", fontSize: "14px"}}>
                                    SPORTSDAYについて知る
                                </Typography>
                            </Stack>
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </>
    );


    return (
        <>
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
                            <Button sx={{width: "100%", height: "100%"}} onClick={handleClose}>
                                <SvgIcon sx={{mr: 1}}>
                                    <HiXMark color={"#E8EBF8"}/>
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
                    bottom: 0, left: 0, right: 0,
                    zIndex: "128"
                }}
            >
                <BottomNavigation
                    sx={{
                        height: "80px",
                        width: "100%",
                        justifyContent: "center",
                        alignContent: "center",
                        borderRadius: "10px",
                        borderBottomRightRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        background:"rgba(62,78,179,0.9)",
                        backdropFilter: 'blur(6px)',
                        boxShadow: "0px 0px 10px #7f8cd6"
                    }}
                >
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            maxWidth: "xl",
                            display: "flex",
                        }}
                    >
                        <Button component={Link} sx={{width: "100%"}} href={"/"}>
                            <SvgIcon sx={{mr: 1}}>
                                <HiHome color={"#E8EBF8"}/>
                            </SvgIcon>
                        </Button>
                        <Button component={Link} sx={{width: "100%"}} href={"/discover"}>
                            <SvgIcon sx={{mr: 1}}>
                                <HiMagnifyingGlass color={"#E8EBF8"}/>
                            </SvgIcon>
                        </Button>
                        <Button sx={{width: "100%"}} onClick={handleClickOpen('paper')}>
                            <SvgIcon sx={{mr: 1}}>
                                <HiNewspaper color={"#E8EBF8"}/>
                            </SvgIcon>
                        </Button>
                        {(['bottom'] as const).map((anchor) => (
                            <React.Fragment key={"top"}>
                                <Button sx={{width: "100%"}} onClick={toggleDrawer(anchor, true)}>
                                    {/*<SvgIcon sx={{mr: 1}}>*/}
                                    {/*    <HiEllipsisHorizontal color={"#E8EBF8"}/>*/}
                                    {/*</SvgIcon>*/}
                                    <Avatar
                                        alt={"unknown"}
                                        sx={{
                                            height: "1.3em",
                                            width: "1.3em",
                                            backgroundColor: "#5664e3",
                                            boxShadow: "0px 0px 4px #7f8cd6"
                                        }}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${user?.pictureId}/file`}
                                    >
                                    </Avatar>
                                </Button>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                    PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
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
}

Navigation.propTypes = {
    onNavOpen: PropTypes.func
};
