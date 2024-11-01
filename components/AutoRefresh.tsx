'use client'

import {useRouter} from "next/navigation";
import {useInterval} from "react-use";

export default function AutoRefresh() {
    const router = useRouter()
    const REFRESH_INTERVAL = 1000 * 60 * 5
    useInterval(
        () => {
            console.log("refresh")
            router.refresh()
        },
        REFRESH_INTERVAL
    )
    return null
}