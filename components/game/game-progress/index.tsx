import PropTypes from "prop-types";
import {Card, CardContent,　Stack, Typography}from "@mui/material";
import {GameProgressChart} from "./GameProgressChart";
import {useContext} from "react";
import {MatchesContext} from "../../context";

export const GameProgress = () => {
    const {data: matches} = useContext(MatchesContext)

    let total = matches.length
    let finished = matches.filter(match => match.status == "finished").length
    const result = Math.round((finished / total) * 100)

    const chartSeries = [result, 100-result]
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