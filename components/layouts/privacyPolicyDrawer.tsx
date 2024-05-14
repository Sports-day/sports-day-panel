'use client'
import {Container, Button, AppBar, Box, SwipeableDrawer, } from "@mui/material";
import React from 'react';
import {HiXMark} from "react-icons/hi2";
import PrivacyPolicy from "@/components/layouts/privacyPolicy";

const PrivacyPolicyDrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <>
            <AppBar sx={{position:"fixed", zIndex:"999"}}>
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
                    width: '100vw', height: 'auto', overflow: 'scrollable', mt: 10, mb: 4
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
                variant="contained"
                color="primary"
                sx={{py:2, width:"100%"}}
                disableElevation
                onClick={toggleDrawer(true)}
            >
                プライバシーポリシー
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

export default PrivacyPolicyDrawer;
