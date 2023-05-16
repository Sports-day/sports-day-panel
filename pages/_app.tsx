import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";
import {Session} from "next-auth";
import {Navigation} from "../components/layouts/navigation";

export default function MyApp({
                                  Component,
                                  pageProps,
                              }: AppProps<{
    session: Session;
}>) {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <SessionProvider session={pageProps.session}>
                <Navigation/>
                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider>
    )
}