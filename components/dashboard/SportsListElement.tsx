import {Avatar, Box, Button, Stack, Typography, useTheme} from "@mui/material";
import {Sport} from "@/src/models/SportModel";
import Link from "next/link";
import {HiOutlineExclamationTriangle} from "react-icons/hi2";
import * as React from "react";


export type SportsListElementProps = {
    sport: Sport;
}

export const SportsListElement = (props: SportsListElementProps) => {
    const theme = useTheme();

    return (
        <Button
            variant={"contained"}
            color={"secondary"}
            scroll={false}
            component={Link}
            href={`/sports/${props.sport.id}`}
            sx={{
                width:"100%",
                border: `1px solid ${theme.palette.secondary.dark}66`,
            }}
        >
            <Box sx={{width:"100%"}} py={1}>
                <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={2}
                >
                    <Avatar
                        alt={props.sport.name}
                        sx={{height: "2em", width: "2em",
                            backgroundColor: theme.palette.text.secondary,
                        }}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${props.sport.iconId}/file`}
                    >
                        {!props.sport.iconId && <HiOutlineExclamationTriangle fontSize={"20px"}/>}
                    </Avatar>
                    <Typography color={theme.palette.text.primary}>
                        {props.sport.name}
                    </Typography>
                </Stack>
            </Box>
        </Button>
    )
}