'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import {
    HiArrowRightOnRectangle,
    HiHome, HiMagnifyingGlass, HiNewspaper, HiSparkles, HiUser, HiXMark
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
import {useTheme} from "@mui/material/styles";

type Anchor = 'bottom';

export const Navigation = () => {
    const theme = useTheme()
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
                    background:`${theme.palette.secondary.main}FC`,
                    backdropFilter: 'blur(30px)',
                    borderRadius: "15px",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    color: '#E8EBF8',
                    pb:5,
                    pt:1.5
                }}
                role="Navigation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <Container maxWidth={"xl"}>
                    <Stack spacing={1}>
                        <Stack direction={"column"} spacing={2} pb={2} justifyContent={"center"} alignItems={"center"}>
                            <Box sx={{
                                width:50,
                                height:6,
                                borderRadius:3,
                                backgroundColor:`${theme.palette.text.primary}4D`
                            }}></Box>
                            <Logo width={16 * 8.45} height={16} fill={theme.palette.text.primary}/>
                        </Stack>
                        <Card sx={{backgroundColor: `${theme.palette.secondary.dark}80`,}}>
                            <CardContent>
                                <Stack direction={"row"} spacing={3} ml={0.4} alignItems={"center"}>
                                    <Avatar
                                        alt={"unknown"}
                                        sx={{
                                            height: "1.5em",
                                            width: "1.5em",
                                            backgroundColor: "#5664e3",
                                        }}
                                        // src={`${process.env.NEXT_PUBLIC_API_URL}/images/${user?.pictureId}/file`}
                                    >
                                        <HiUser/>
                                    </Avatar>
                                    <Typography sx={{color: theme.palette.text.secondary, fontSize: "16px"}}>
                                        {user?.name ?? "unknown"} さん
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Button
                            color={"secondary"}
                            sx={{background:theme.palette.secondary.dark}}
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
                                        <HiArrowRightOnRectangle color={`${theme.palette.text.primary}99`}/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>
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
                                        <HiLibrary color={`${theme.palette.text.primary}99`}/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>
                                    プライバシーポリシー
                                </Typography>
                            </Stack>
                        </PrivacyPolicyDrawer>
                        <Button
                            color={"secondary"}
                            sx={{background:theme.palette.secondary.dark}}
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
                                        <FaGithubAlt color={`${theme.palette.text.primary}99`}/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>
                                    GitHub
                                </Typography>
                            </Stack>
                        </Button>
                        <Button
                            color={"secondary"}
                            sx={{background:theme.palette.secondary.dark}}
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
                                        <HiSparkles color={`${theme.palette.text.primary}99`}/>
                                    </SvgIcon>
                                </Avatar>
                                <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>
                                    SPORTSDAYについて知る
                                </Typography>
                            </Stack>
                        </Button>
                        {/*<Button*/}
                        {/*    color={"secondary"}*/}
                        {/*    sx={{*/}
                        {/*        background:theme.palette.secondary.dark,*/}
                        {/*        border:`1px solid ${theme.palette.warning.main}`*/}
                        {/*}}*/}
                        {/*    fullWidth disableElevation*/}
                        {/*    variant={"contained"}*/}
                        {/*    component={Link}*/}
                        {/*    href={"https://forms.office.com/Pages/ResponsePage.aspx?id=XYP-cpVeEkWK4KezivJfyNfX7_ygdxFHiwRmiJgWek1URUZOQ1JYTkpHWThPQVlQT1JBWFhWQllKVC4u"}*/}
                        {/*>*/}
                        {/*    <Stack*/}
                        {/*        direction={"row"}*/}
                        {/*        justifyContent={"flex-start"}*/}
                        {/*        alignItems={"center"}*/}
                        {/*        spacing={2}*/}
                        {/*        py={0.5}*/}
                        {/*        width={"100%"}*/}
                        {/*    >*/}
                        {/*        <Avatar*/}
                        {/*            sx={{*/}
                        {/*                height: "2em",*/}
                        {/*                width: "2em",*/}
                        {/*                backgroundColor: "inherit",*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <SvgIcon>*/}
                        {/*                <HiClipboard color={`${theme.palette.text.primary}99`}/>*/}
                        {/*            </SvgIcon>*/}
                        {/*        </Avatar>*/}
                        {/*        <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>*/}
                        {/*            SPORTSDAY使用感アンケート*/}
                        {/*        </Typography>*/}
                        {/*    </Stack>*/}
                        {/*</Button>*/}
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
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    sx={{
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "100vw",
                                maxWidth: "lg",
                                background: theme.palette.background.paper
                            },
                        },
                    }}
                >
                    <DialogTitle id="scroll-dialog-title" fontSize={"16px"} color={theme.palette.text.primary}>スケジュール</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DocsOverall/>
                    </DialogContent>
                    <DialogActions sx={{mb:3}}>
                        <Stack
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={2}
                            sx={{width: "100%", height:"40px"}}
                        >
                            <Button sx={{width: "100%", height: "100%"}} onClick={handleClose}>
                                <SvgIcon sx={{mr: 1}}>
                                    <HiXMark color={theme.palette.text.primary}/>
                                </SvgIcon>
                                <Typography color={theme.palette.text.primary}>閉じる</Typography>
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
                        pb:2,
                        justifyContent: "center",
                        alignContent: "center",
                        borderRadius: "10px",
                        borderBottomRightRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        background:`linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                        boxShadow: `0px 0px 15px ${theme.palette.primary.dark}80`
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
                                <HiHome color={theme.palette.text.primary}/>
                            </SvgIcon>
                        </Button>
                        <Button component={Link} sx={{width: "100%"}} href={"/discover"}>
                            <SvgIcon sx={{mr: 1}}>
                                <HiMagnifyingGlass color={theme.palette.text.primary}/>
                            </SvgIcon>
                        </Button>
                        <Button sx={{width: "100%"}} onClick={handleClickOpen('paper')}>
                            <SvgIcon sx={{mr: 1}}>
                                <HiNewspaper color={theme.palette.text.primary}/>
                            </SvgIcon>
                        </Button>
                        {(['bottom'] as const).map((anchor) => (
                            <React.Fragment key={"top"}>
                                <Button sx={{width: "100%"}} onClick={toggleDrawer(anchor, true)}>
                                    <Avatar
                                        alt={"unknown"}
                                        sx={{
                                            height: "1.3em",
                                            width: "1.3em",
                                            backgroundColor: "#5664e3",
                                            boxShadow: "0px 0px 4px #7f8cd6"
                                        }}
                                        // src={`${process.env.NEXT_PUBLIC_API_URL}/images/${user?.pictureId}/file`}
                                    >
                                        <HiUser/>
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
