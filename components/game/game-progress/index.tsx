import {Card, CardContent,　Stack, Typography}from "@mui/material";
import {GameProgressChart} from "./GameProgressChart";
import {useFetchSportProgress} from "../../../src/features/sports/hook";

export const GameProgress = (props: { sportsId: number }) => {
    const { progress } = useFetchSportProgress(props.sportsId)

    const formattedProgress = Math.trunc(progress * 200)

    const chartSeries = [formattedProgress, 100-formattedProgress]
    const labels = ["完了した競技", "未完了の競技"]

    return (
        <Card
            sx={{
                height: '110px'
            }}
        >
            <CardContent>
                <Typography
                    color={"textSecondary"}
                    sx={{pb: "0px"}}
                >
                    進行度
                </Typography>
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <GameProgressChart
                        chartSeries={chartSeries}
                    />
                </Stack>
            </CardContent>
        </Card>
    );
};