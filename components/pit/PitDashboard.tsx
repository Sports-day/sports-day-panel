import {PitHeader} from "./PitHeader";
import {PitSidebar} from "./PitSidebar";
import styles from "../../styles/Pit.module.scss";
import {ReactNode, useState} from "react";
import Head from "next/head";
import {Box, createTheme, CssBaseline, Paper} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";

export function PitDashboard(props: { children: ReactNode }) {
    const theme = createTheme()
    //  sidebar
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>Pit</title>
                <meta name="description" content="Pit Dashboard"/>
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100vh",
                    }}
                >

                    <PitHeader
                        openSidebarFunction={() => {
                            setSidebarOpen(true)
                        }}
                    />
                    <PitSidebar
                        isOpenSidebar={isSidebarOpen}
                        closeSidebarFunction={() => {
                            setSidebarOpen(false)
                        }}
                    />

                    <Box
                        sx={{
                            flexGrow: 1,
                            overflow: "auto",
                            width: "100%",
                            padding: "10px 20px 40px 20px"
                        }}
                    >
                        {props.children}
                    </Box>

                </Box>


            </ThemeProvider>
        </>

    )
}