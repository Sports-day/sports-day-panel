import {Card, CardContent, Stack, Typography}from "@mui/material";
import {Game} from "../../../src/models/GameModel";
import {GameBestList} from "./GameBestList";

export type GameBestProps = {
    games: Game[]
    gameId: number | null
}

export const GameBest = (props: GameBestProps) => {
    const components = props.games.map((game) => {
        return (
            <GameBestList
                key={game.id}
                game={game}
                visible={game.id === props.gameId}
            />
        )
    })

    return(
        <Card sx={{
            height: "260px",
            "@media (min-width: 360px) and (max-width: 400px)": {
                height: "220px"
            }
        }}>
            <CardContent>
                <Stack
                    direction={"column"}
                    justifyContent={"space-between"}
                    alignItems={"space-between"}
                    spacing={2}
                >
                    <Typography
                        color={"textSecondary"}
                        sx={{fontSize: "16px"}}
                    >
                        競技内ベスト3
                    </Typography>

                    {components}

                </Stack>
            </CardContent>
        </Card>
    );
};