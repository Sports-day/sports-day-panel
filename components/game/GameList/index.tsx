import {Container, Divider, Stack, Typography} from "@mui/material";
import * as React from "react";
import {GameListContent} from "./GameListContent";
import {useContext} from "react";
import {GamesContext} from "../../context";

export type GameListProps = {
    sportId: number
}

export const GameList = (props: GameListProps) => {
    const {data: games} = useContext(GamesContext)

    return(
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                paddingTop: "0px",
                position:"relative",
                bottom:"-40px"
            }}
        >
            <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={3}
                minHeight={"50vh"}
                sx={{
                    position: "relative",
                    width: "101vw",
                    height:"fit-content",
                    backgroundColor: "#23398a",
                }}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={3}
                    width={"100vw"}
                >
                    <Stack
                        width={"100%"}
                        maxWidth={"xl"}
                        sx={{px:2, pb:3, pt:3}}
                        spacing={2}
                    >
                        <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                            対戦一覧
                        </Typography>

                        {games.map((game) => {
                            return (
                                <GameListContent key={game.id} game={game}/>
                            );
                        })}

                    </Stack>
                    <Divider/>
                    <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                        対戦が終了すると項目が追加されます
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    )
}