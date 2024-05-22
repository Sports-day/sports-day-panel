import {Navigation} from "@/components/layouts/navigation";

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
