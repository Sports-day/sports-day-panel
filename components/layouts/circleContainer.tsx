import {Box, Container, Stack} from "@mui/material";
import Logo from "@/public/logo/logo.svg";
import {InformationList} from "@/components/InformationList";
import Overview from "@/components/dashboard/Overview";
import {OtherInfo} from "@/components/dashboard/Overview/OtherInfo";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import children = ReactMarkdown.propTypes.children;
import {motion} from "framer-motion";

export type CircleContainerProps = {
    children?: React.ReactNode
}

export default function CircleContainer(props: CircleContainerProps) {
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
                    background:"linear-gradient(#5B6AC1, #3E4EB3)"
                }}
            >
                <Box px={3} pt={4} pb={1}>
                    <Logo width={18 * 8.45} height={18} fill={"white"}/>
                </Box>

                <Container
                    maxWidth={"xl"}
                >
                    <InformationList/>
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
                    background:"#3E4EB3",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomLeftRadius: "50% 50%",
                    borderBottomRightRadius: "50% 50%",
                    boxShadow: "0px 0px 20px 0px rgba(62,78,179,0.5)"
                }}
            >
            </Container>
            </motion.div>
        </>
    );
}