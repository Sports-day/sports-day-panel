import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {Session} from "next-auth";
import "../styles/globals.css";
import {AnimatePresence} from "framer-motion";
import {useRouter} from "next/router"

export default function MyApp({Component, pageProps, router}: AppProps<{ session: Session; }>) {
    return (
        <AnimatePresence mode={"wait"}>
            <SessionProvider session={pageProps.session}>
                <Component key={router.asPath} {...pageProps} />
            </SessionProvider>
        </AnimatePresence>
    )
}