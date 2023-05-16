import PropTypes from "prop-types";
import {Card, CardContent,　Stack, Typography}from "@mui/material";
import {Chart} from "../chart";
import { alpha, useTheme } from '@mui/material/styles';

const useChartOptions = (labels: any) => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent'
        },
        colors: [
            "#ffffff",
            "#435bbc"
        ],
        dataLabels: {
            enabled: false
        },
        labels,
        legend: {
            show: false
        },
        plotOptions: {
            pie: {
                expandOnClick: false
            }
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        stroke: {
            width: 0
        },
        theme: {
            mode: theme.palette.mode
        },
        tooltip: {
            fillSeriesColor: false
        }
    };
};

export const GameProgress = (props: any) => {
    const { chartSeries, labels, sx } = props;
    const chartOptions = useChartOptions(labels);

    return (
        <Card
            sx={{
                height: '260px'
            }}
        >
            <CardContent>
                <Typography
                    color={"textSecondary"}
                    sx={{pb: "30px"}}
                >
                    競技の進行状況
                </Typography>
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="donut"
                        sx={{
                            width: "220px",
                            "@media (min-width: 360px) and (max-width: 400px)": {
                                width: "200px"
                            }
                        }}
                    />
                    <Typography
                        color={"textPrimary"}
                        sx={{
                            position: "relative",
                            top: "-110px",
                            fontSize: "30px",
                            "@media (min-width: 360px) and (max-width: 400px)": {
                                top: "-102px"
                            }
                        }}
                    >
                        {chartSeries[0]}%
                    </Typography>
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