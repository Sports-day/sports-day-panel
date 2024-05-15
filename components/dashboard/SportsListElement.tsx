import {Avatar, Box, Button, Stack, Typography} from "@mui/material";
import {useContext} from "react";
import {ImagesContext} from "../context";
import {Sport} from "@/src/models/SportModel";
import Link from "next/link";


export type SportsListElementProps = {
    sport: Sport;
}

export const SportsListElement = (props: SportsListElementProps) => {
    const {data: images} = useContext(ImagesContext)
    const image = images?.find(image => image.id === props.sport.iconId)

    return (
            <Button
                disableElevation
                variant={"contained"}
                color={"secondary"}
                sx={{width:"100%", borderBottomLeftRadius:"2px"}}
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
                            sx={{height: "1.8em", width: "1.8em"}}
                            src={image?.data}
                        >

                        </Avatar>
                        <Typography>
                            {props.sport.name}
                        </Typography>
                    </Stack>
                </Box>
            </Button>
    )
}