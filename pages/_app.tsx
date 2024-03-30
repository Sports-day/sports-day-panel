import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {Session} from "next-auth";
import "../styles/globals.css";
import {AnimatePresence} from "framer-motion";
import GoogleAnalytics from "../components/GoogleAnalytics";
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";

export default function MyApp({Component, pageProps, router}: AppProps<{ session: Session; }>) {
    const theme = createTheme()
    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={theme}>
                <AnimatePresence mode={"wait"}>
                    <CssBaseline/>
                    <Component key={router.asPath} {...pageProps} />
                    <GoogleAnalytics/>
                </AnimatePresence>
            </ThemeProvider>
        </SessionProvider>
    )
}