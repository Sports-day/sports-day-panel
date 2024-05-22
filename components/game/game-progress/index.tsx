import {Box, Stack, Typography}from "@mui/material";
import {GameProgressChart} from "./GameProgressChart";
import {useFetchSportProgress} from "../../../src/features/sports/hook";

export const GameProgress = (props: { sportsId: number }) => {
    const { progress } = useFetchSportProgress(props.sportsId)

    const formattedProgress = Math.trunc(progress * 100)

    const chartSeries = [formattedProgress, 100-formattedProgress]

    return (
        <Box
            sx={{
                width:"100%",
            }}>
                    <GameProgressChart
                        chartSeries={chartSeries}
                    />
        </Box>
    );
};