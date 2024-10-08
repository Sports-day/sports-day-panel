import {Box, Container} from "@mui/material";
import Logo from "@/public/logo/logo.svg";
import {InformationList} from "@/components/InformationList";
import * as React from "react";
import {motion} from "framer-motion";
import { useTheme } from '@mui/material/styles';


export type CircleContainerProps = {
    children?: React.ReactNode
    noLogo?: boolean
}

export default function CircleContainer(props: CircleContainerProps) {
    const theme = useTheme();
    return (
        <>
            <motion.div
                key={"overview-background"}
                initial={{opacity:1, y: "-30px"}}
                animate={{opacity:1, y: "0px"}}
                transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}
            >
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
                    background:`linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
                }}
            >
                {!props.noLogo &&
                    <Box px={3.5} pt={4} pb={1}>
                        <Logo width={18 * 8.45} height={18} fill={theme.palette.text.primary}/>
                    </Box>
                }

                <Container
                    maxWidth={"xl"}
                >
                    <Box mb={1} mt={0}>
                        <InformationList/>
                    </Box>
                </Container>
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
                    backgroundColor:theme.palette.secondary.dark,
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomLeftRadius: "50% 50%",
                    borderBottomRightRadius: "50% 50%",
                    boxShadow: `0px 0px 15px ${theme.palette.primary.dark}80`
                }}
            >
            </Container>
            </motion.div>
        </>
    );
}