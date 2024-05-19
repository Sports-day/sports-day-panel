import {Avatar, Box, Button, Stack, Typography, useTheme} from "@mui/material";
import {useContext} from "react";
import {ImagesContext} from "../context";
import {Sport} from "@/src/models/SportModel";
import Link from "next/link";
import {HiOutlineExclamationTriangle} from "react-icons/hi2";
import * as React from "react";


export type SportsListElementProps = {
    sport: Sport;
}

export const SportsListElement = (props: SportsListElementProps) => {
    const theme = useTheme();
    const {data: images} = useContext(ImagesContext)
    const image = images?.find(image => image.id === props.sport.iconId)

    return (
            <Button
                disableElevation
                variant={"contained"}
                color={"secondary"}
                sx={{width:"100%"}}
                scroll={false}
                component={Link}
                href={`/sports/${props.sport.id}`}
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
                                backgroundColor: theme.palette.text.disabled,
                            }}
                            src={image?.data}
                        >
                            {!image?.data && <HiOutlineExclamationTriangle fontSize={"20px"}/>}
                        </Avatar>
                        <Typography color={theme.palette.text.primary}>
                            {props.sport.name}
                        </Typography>
                    </Stack>
                </Box>
            </Button>
    )
}