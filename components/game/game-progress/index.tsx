import PropTypes from "prop-types";
import {Card, CardContent,　Stack, Typography}from "@mui/material";
import {GameProgressChart} from "./GameProgressChart";

export const GameProgress = (props: any) => {
    const { chartSeries, labels } = props;
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

GameProgress.propTypes = {
    chartSeries: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    sx: PropTypes.object
};