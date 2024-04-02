import {
    BottomNavigation, Typography, Box, Stack, Button
} from '@mui/material';
// import Logo from "public/logo.svg"
import * as React from "react";
import Link from "next/link";

export const Footer = () => {
    return(
        <BottomNavigation
            sx={{height:"80px", color:"#23398A"}}
        >
            <Button component={Link} href={"/about"}　scroll={true}>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{color: "#99a5d6"}}
                    spacing={1}
                >
                    <Typography>(C) 2023</Typography>
                    <Box sx={{pt:"5px"}}>
                        {/*<Logo width={14*8.45} height={14} fill={'#99a5d6'}/>*/}
                    </Box>
                    <Typography>TEAM</Typography>
                </Stack>
            </Button>
        </BottomNavigation>
    )
}