import {Box, Stack, Typography}from "@mui/material";
import {GameProgressChart} from "./GameProgressChart";
import {useFetchSportProgress} from "../../../src/features/sports/hook";

export const GameProgress = (props: { sportsId: number }) => {
    const { progress } = useFetchSportProgress(props.sportsId)

    const formattedProgress = Math.trunc(progress * 100)

    const chartSeries = [formattedProgress, 100-formattedProgress]

    return (
        <Box
            px={2}
            py={1.5}
            pr={2}
            sx={{
                width:"100%",
                height: "86px",
                backgroundColor: "#5f6dc2",
                borderRadius: "12px"
            }}>
                <Typography
                    color={"#eff0f8"}
                    sx={{pb: "0px"}}
                >
                    競技の進行状況
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
        </Box>
    );
};