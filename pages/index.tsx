import type {NextPage} from 'next'
import {signIn, signOut, useSession} from "next-auth/react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import styles from 'styles/Auth.module.css'

const inter = Inter({ subsets: ['latin'] })


const Home: NextPage = () => {
    const {data: session} = useSession()

    if (session) {
        //  ログイン済み
        return (
            <>
                Signed in as {session.user?.name} <br/>
                {session.user?.email} <br/>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    } else {
        //  ログイン待ち
        return (
            <>
                <Head>
                    <title>SPORTSDAY : Login</title>
                    <meta name="description" content="SPORTSDAY Login page" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Head>
                    <title>SPORTSDAY : Login</title>
                    <meta name="description" content="SPORTSDAY Login page" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main}>
                    <div className={styles.catch}>
                        <h1 className={inter.className}>みんなの</h1>
                        <h1 className={inter.className}>球技大会、</h1>
                        <h1 className={inter.className}>あなたの</h1>
                        <Image
                            src="/logo.svg"
                            alt="SPORTSDAY Logo"
                            className={styles.authLogo}
                            width={304}
                            height={36}
                            priority
                        />
                    </div>
                    <div className={styles.authButton}>
                        <a className={inter.className} onClick={() => signIn("azure-ad", {callbackUrl: "/"})}>
                            <Image
                                src="/ms.svg"
                                alt="Microsoft Logo"
                                className={styles.msLogo}
                                width={20}
                                height={20}
                                priority
                            />
                            KOSENアカウントではじめよう</a>
                    </div>
                </main>
            </>
        )
    }
}

export default Home
