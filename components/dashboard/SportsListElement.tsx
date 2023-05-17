import {Avatar, Button, Card, CardContent, Stack, Typography} from "@mui/material";


export const SportsListElement = (props:any) => {
    const {comp,icon,link} =props;
    return (
        <Card>
            <Button sx={{width:"100%"}} href={link}>
                <CardContent sx={{width:"100%"}}>
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <Avatar
                            alt={comp}
                            sx={{height: "3.5em", width: "3.5em"}}
                            src={icon}
                        >

                        </Avatar>
                        <Typography sx={{color: "#FFF", fontSize: "16px", fontWeight: "bold"}}>
                            {comp}
                        </Typography>
                    </Stack>
                </CardContent>
            </Button>
        </Card>
    )
}