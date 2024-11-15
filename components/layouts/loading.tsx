import {Box, Stack} from "@mui/material";
import * as React from "react";

export const Loading = () => {
    return(
        <>
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
                    {/*<Logo width={30} height={30} fill={'#5664e3'}/>*/}
                </Box>
            </Stack>
        </>
    )
}