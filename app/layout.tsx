import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {CssBaseline, ThemeProvider} from "@mui/material";
import GoogleAnalytics from "@/components/GoogleAnalytics";
// import {AnimatePresence} from "framer-motion";
import {lightPalette} from "@/components/theme/lightPalette";
import ColorModeProvider from "@/components/theme/colorModeProvider";
import Head from "next/head";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Sports-day',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <Head>
            {/* windows */}
            <meta
                name="msapplication-square70x70logo"
                content="/site-tile-70x70.png"
            />
            <meta
                name="msapplication-square150x150logo"
                content="/site-tile-150x150.png"
            />
            <meta
                name="msapplication-wide310x150logo"
                content="/site-tile-310x150.png"
            />
            <meta
                name="msapplication-square310x310logo"
                content="/site-tile-310x310.png"
            />
            <meta name="msapplication-TileColor" content="#000"/>
            {/* safari */}
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="#000"/>
            <meta name="apple-mobile-web-app-title" content="myapp"/>
            <link
                rel="apple-touch-icon"
                sizes="192x192"
                href="/icon-192x192.png"
            />
            {/* 一般 */}
            <meta name="application-name" content="myapp"/>
            <meta name="theme-color" content="#000"/>
            <meta name="description" content="this is myapp"/>
            <link rel="icon" sizes="192x192" href="/icon-192x192.png"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="theme-color" content="#5f6dc2"/>
        </Head>
        <body className={inter.className}>
        <AppRouterCacheProvider>
            <ColorModeProvider>
                {/*<AnimatePresence mode={"wait"}>*/}
                    <CssBaseline/>
                    {children}
                    <GoogleAnalytics/>
                {/*</AnimatePresence>*/}
            </ColorModeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
