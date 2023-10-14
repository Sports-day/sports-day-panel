import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {Session} from "next-auth";
import "../styles/globals.css";
import {AnimatePresence} from "framer-motion";
import GoogleAnalytics from "../components/GoogleAnalytics";

export default function MyApp({Component, pageProps, router}: AppProps<{ session: Session; }>) {
    return (
        <SessionProvider session={pageProps.session}>
            <AnimatePresence mode={"wait"}>
                <Component key={router.asPath} {...pageProps} />
                <GoogleAnalytics/>
            </AnimatePresence>
        </SessionProvider>
    )
}