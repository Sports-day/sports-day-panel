import {AppBar, Toolbar} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export function PitHeader() {

    return (
        <AppBar sx={{
            backgroundColor: "#CCCCCC",
            color: "#000000",
            height: "80px",
            px: "40px",
        }}>
            <Toolbar
                sx={{
                    height: "100%",
                }}
                disableGutters={true}
            >

                <Link href={"/admin"}>
                    <Image
                        src={"/pit.svg"}
                        alt={"Pit Logo"}
                        width={91}
                        height={30}
                    />
                </Link>
            </Toolbar>
        </AppBar>
    )
}