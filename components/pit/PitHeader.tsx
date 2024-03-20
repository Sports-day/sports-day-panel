import Link from "next/link";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {MenuIcon} from "lucide-react";

export type PitHeaderProps = {
    openSidebarFunction: () => void,
}

export function PitHeader(props: PitHeaderProps) {

    return (

        <AppBar position={"static"}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={() => {
                        props.openSidebarFunction()
                    }}
                >
                    <MenuIcon/>
                </IconButton>

                <Link
                    href={"/"}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{px: 1, py: 1}}
                    >
                        Pit
                    </Typography>
                </Link>

            </Toolbar>
        </AppBar>
    )
}