'use client'
import * as React from "react";
import {useTheme} from '@mui/material/styles';
import Logo from "@/public/logo/logo.svg";
import {Box, Container} from "@mui/material";


export type LeftCircleContainerProps = {
    children?: React.ReactNode
    noLogo?: boolean
}

export default function LeftCircleContainer(props: LeftCircleContainerProps) {
    const theme = useTheme();
    return (
        <>
            <Container
                maxWidth={false}
                sx={{
                    width: "200vw",  // より大きなサイズに
                    height: "400vh", // より大きなサイズに
                    position: "fixed",
                    left: "-150vw",  // 左側に大きくずらす
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 0,
                    backgroundColor: theme.palette.secondary.dark,
                    borderRadius: "50%",  // 完全な円に戻す
                    boxShadow: `0px 0px 15px ${theme.palette.primary.dark}80`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                {!props.noLogo &&
                    <Box
                        sx={{
                            position: "absolute",
                            top: "39%",
                            left: "78%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Logo width={18 * 8.45} height={18} fill={theme.palette.text.primary}/>
                    </Box>
                }

                {props.children}
            </Container>

        </>
    );
}