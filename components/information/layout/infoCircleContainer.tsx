'use client'
import {Box, Container} from "@mui/material";
import Logo from "@/public/logo/logo.svg";
import * as React from "react";
import {useTheme} from '@mui/material/styles';


export type InfoCircleContainerProps = {
    children?: React.ReactNode
    noLogo?: boolean
}

export default function InfoCircleContainer(props: InfoCircleContainerProps) {
    const theme = useTheme();
    return (
        <>
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    paddingBottom: "0px",
                    marginBottom: "40px",
                    position: "relative",
                    zIndex: 1,
                    width: "101vw",
                    height: "fit-content",
                    background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
                }}
            >
                {!props.noLogo &&
                    <Box px={3.5} pt={4} pb={1}>
                        <Logo width={18 * 8.45} height={18} fill={theme.palette.text.primary}/>
                    </Box>
                }

                {props.children}
            </Container>
            <Container
                maxWidth={false}
                sx={{
                    width: "160vw",
                    height: "100px",
                    left: "-30vw",
                    top: "-100px",
                    zIndex: "0",
                    position: "relative",
                    backgroundColor: theme.palette.secondary.dark,
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomLeftRadius: "50% 50%",
                    borderBottomRightRadius: "50% 50%",
                    boxShadow: `0px 0px 15px ${theme.palette.primary.dark}80`
                }}
            >
            </Container>
        </>
    );
}