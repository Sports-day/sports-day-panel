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
                    backgroundColor: '#E8EBF8',
                    width: '100vw' , height: '100vh', overflow:'hidden'}}
            >
                <Box sx={{pt:"2px"}}>
                    <Logo width={20*8.45} height={20} fill={'#23398A'}/>
                    <LinearProgress/>
                </Box>
            </Stack>
    )
}