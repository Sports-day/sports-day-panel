import type {Metadata} from 'next'
import {Navigation} from "@/components/layouts/navigation";

export const metadata: Metadata = {
    title: 'Sports-day',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navigation/>
            {children}
        </>
    )
}
