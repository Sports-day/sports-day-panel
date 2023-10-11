import {Card, CardContent,　Stack, Typography}from "@mui/material";
import {GameProgressChart} from "./GameProgressChart";
import {useFetchSportProgress} from "../../../src/features/sports/hook";

export const GameProgress = (props: { sportsId: number }) => {
    const { progress } = useFetchSportProgress(props.sportsId)

    const formattedProgress = Math.trunc(progress * 100)

    const chartSeries = [formattedProgress, 100-formattedProgress]
    const labels = ["完了した競技", "未完了の競技"]

    return (
        <Card
            sx={{
                height: '260px',
                "@media (min-width: 360px) and (max-width: 400px)": {
                    height: "220px"
                }
            }}
        >
            <CardContent>
                <Typography
                    color={"textSecondary"}
                    sx={{pb: "25px"}}
                >
                    競技の進行状況
                </Typography>
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <GameProgressChart
                        labels={labels}
                        chartSeries={chartSeries}
                    />
                </Stack>
            </CardContent>
        </Card>
    );
};