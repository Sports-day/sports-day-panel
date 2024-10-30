import {Avatar, Button, Grid, Stack, Typography} from "@mui/material";
import React, {ReactNode} from "react";
import NextLink from "next/link";

type SportCardProps = {
    img?: string;
    children?: ReactNode;
    link?: string;
}

export const SportCard: React.FC<SportCardProps> = ({img, children, link}) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
                color={"secondary"}
                variant={"contained"}
                sx={{width: "100%"}}
                href={link}
                component={NextLink}
            >
                <Stack
                    direction={"column"}
                    my={0.5}
                    width={"100%"}
                    justifyContent={"flex-start"}
                    alignItems="center"
                    spacing={2}
                    padding={2}
                >
                    {img && <Avatar
                        sx={{mr: 1.5, height: "1.5em", width: "1.5em"}}
                        src={img}
                    >
                    </Avatar>}
                    <Typography fontSize={"inherit"} color={"text.primary"}>
                        {children}
                    </Typography>
                </Stack>
            </Button>
        </Grid>
    )
}