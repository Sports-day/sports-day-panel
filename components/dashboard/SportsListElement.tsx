import {Avatar, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {useFetchImage} from "../../src/features/images/hook";
import {useContext} from "react";
import {ImagesContext} from "../context";
import {Sport} from "../../src/models/SportModel";
import Link from "next/link";


export type SportsListElementProps = {
    sport: Sport;
}

export const SportsListElement = (props: SportsListElementProps) => {
    const {data: images} = useContext(ImagesContext)
    const image = images?.find(image => image.id === props.sport.iconId)

    return (
        <Card>
            <Button component={Link} sx={{width:"100%"}} href={`/sports/${props.sport.id}`} scroll={false}>
                <CardContent sx={{width:"100%"}}>
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <Avatar
                            alt={props.sport.name}
                            sx={{height: "3.5em", width: "3.5em"}}
                            src={image?.attachment}
                        >

                        </Avatar>
                        <Typography sx={{color: "#FFF", fontSize: "16px", fontWeight: "bold"}}>
                            {props.sport.name}
                        </Typography>
                    </Stack>
                </CardContent>
            </Button>
        </Card>
    )
}