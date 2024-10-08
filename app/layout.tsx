import type {Metadata, Viewport} from 'next'
import {Inter} from 'next/font/google'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {CssBaseline} from "@mui/material";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ColorModeProvider from "@/components/theme/colorModeProvider";
import Head from "next/head";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Sports-day',
    description: "SPORTSDAY Management App",
    manifest: '/manifest.json',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    const initialMode = typeof window !== 'undefined' && localStorage.getItem('color-mode') === 'dark' ? 'dark' : 'light';


    return (
        <html lang="en">
        <Head>
            {/* windows */}
            <meta
                name="msapplication-square70x70logo"
                content="@/public/site-tile-70x70.png"
            />
            <meta
                name="msapplication-square150x150logo"
                content="@/public/site-tile-150x150.png"
            />
            <meta
                name="msapplication-wide310x150logo"
                content="@/public/site-tile-310x150.png"
            />
            <meta
                name="msapplication-square310x310logo"
                content="@/public/site-tile-310x310.png"
            />
            <meta name="msapplication-TileColor" content="#000"/>
            {/* safari */}
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
            <meta name="apple-mobile-web-app-title" content="Sportsday"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
            <link
                rel="apple-touch-icon"
                sizes="192x192"
                href="@/public/icon-192x192.png"
            />
            {/* 一般 */}
            <meta name="application-name" content="myapp"/>
            <meta name="description" content="this is myapp"/>
            <link rel="icon" sizes="192x192" href="@/public/icon-192x192.png"/>
            <link rel="icon" href="@/public/favicon.ico"/>
            <link rel="manifest" href="@/public/manifest.json"/>
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
