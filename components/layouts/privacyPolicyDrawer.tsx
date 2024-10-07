'use client'
import {Container, Button, AppBar, Box, SwipeableDrawer, } from "@mui/material";
import React from 'react';
import {HiXMark} from "react-icons/hi2";
import PrivacyPolicy from "@/components/layouts/privacyPolicy";
import {ReactNode} from "react";
import {useTheme} from "@mui/material/styles";

export type PrivacyPolicyDrawerProps = {
    children?: ReactNode
    transparent?: boolean
}

export default function PrivacyPolicyDrawer(props: PrivacyPolicyDrawerProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <>
            <AppBar sx={{position:"fixed", zIndex:"999", boxShadow: `0px 0px 15px ${theme.palette.primary.dark}80`}}>
                <Box
                    sx={{
                        width: '100vw', height: 'auto', overflow: 'scrollable', my:1.5
                    }}
                >
                    <Container maxWidth={"xl"}>
                        <Button
                            sx={{width:"100%"}}
                            color="inherit"
                            onClick={toggleDrawer(false)}
                            aria-label="close"
                            startIcon={<HiXMark/>}
                        >
                            閉じる
                        </Button>
                    </Container>
                </Box>
            </AppBar>
            <Box
                sx={{
                    width: '100vw', height: 'auto', overflow: 'scrollable', mt: 10, mb: 4,
                    background: theme.palette.background.paper
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer( false)}
            >
                <PrivacyPolicy/>
            </Box>
        </>
    );

    return (
        <>
            <Button
                color={"secondary"}
                sx={{width:"100%",
                    background: props.transparent ? `${theme.palette.background.paper}FF` : theme.palette.secondary.dark
                }}
                variant="contained"
                disableElevation
                onClick={toggleDrawer(true)}
            >
                {props.children}
            </Button>
            <SwipeableDrawer
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                anchor={"bottom"}
            >
                {DrawerList}
            </SwipeableDrawer>
        </>
    );
};