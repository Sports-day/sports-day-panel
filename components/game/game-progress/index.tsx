import {Card, CardContent,　Stack, Typography}from "@mui/material";
import {GameProgressChart} from "./GameProgressChart";
import {useContext} from "react";
import {MatchesContext} from "../../context";

export const GameProgress = () => {
    const {data: matches} = useContext(MatchesContext)

    let total = matches.length
    let finished = matches.filter(match => match.status == "finished").length
    const calculatedResult = Math.round((finished / total) * 100)
    const result = isNaN(calculatedResult) ? 0 : calculatedResult

    const chartSeries = [result, 100-result]

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
            </CardContent>
        </Card>
    );
};