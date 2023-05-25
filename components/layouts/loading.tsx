import {alpha} from "@mui/material/styles";
import {Box, Stack, LinearProgress} from "@mui/material";
import Logo from "public/logo.svg"
import * as React from "react";

export const Loading = () => {
    return(
            <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
                sx={{
                    width: '100vw' ,
                    height: '100vh',
                    overflow:'hidden'
                }}
            >
                <Box sx={{pt:"2px"}}>
                    <Logo width={20*8.45} height={20} fill={'#5664e3'}/>
                    {/*<Box sx={{pt:2}}>*/}
                    {/*    <LinearProgress/>*/}
                    {/*</Box>*/}
                </Box>
            </Stack>
    )
}