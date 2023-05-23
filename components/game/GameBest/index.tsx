import {Card, CardContent, Stack, Typography}from "@mui/material";
import {GameBestContent} from "./GameBestContent";
import {Sport} from "../../../src/models/SportModel";
import {useFetchSportBest3} from "../../../src/features/sports/hook";

export const GameBest = () => {
    const { bestTeams, isFetching } = useFetchSportBest3()

    return(
        <Card sx={{
            height: "260px",
            "@media (min-width: 360px) and (max-width: 400px)": {
                height: "220px"
            }
        }}>
            <CardContent>
                <Stack
                    spacing={2}
                >
                    <Typography
                        color={"textSecondary"}
                        sx={{pb: "10px", fontSize: "16px"}}
                    >
                        競技内ベスト3
                    </Typography>

                    {bestTeams.map((team) => {
                        return (
                            <GameBestContent
                                key={team.team.id}
                                team={team.team.name}
                                rank={team.rank}
                            />
                        );
                    })}

                </Stack>
            </CardContent>
        </Card>
    );
};