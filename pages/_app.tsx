import type {AppProps} from 'next/app'
import "../styles/globals.css";
import {AnimatePresence} from "framer-motion";

export const runtime = 'edge';

export default function MyApp({Component, pageProps, router}: AppProps<{}>) {
    return (
        <AnimatePresence mode={"wait"}>
            <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
    )
}