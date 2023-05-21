import {Card, CardContent, Divider, Stack, Typography}from "@mui/material";
import {useFetchMyGameResults} from "../../../src/features/games/hook";
import {useFetchTeams} from "../../../src/features/teams/hook";
import {GameBestContent} from "./GameBestContent";

export const GameBest = (props:any) => {
    const {value1, value2, value3} = props;
    const {results} = useFetchMyGameResults();
    const {teams} = useFetchTeams();

    const rank = [1,2,3];
    const team = ["チーム1","チーム2","チーム3"];



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

                    <GameBestContent key={team}
                        rank={rank[0]}
                        team={team[0]}
                    />

                </Stack>
            </CardContent>
        </Card>
    );
};