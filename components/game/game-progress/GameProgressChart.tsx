import PropTypes from "prop-types";
import {Card, CardContent,　Stack, Typography}from "@mui/material";
import {Chart} from "../../chart";
import {useTheme} from "@mui/material/styles";

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

export const GameProgressChart = (props:any) => {
    const {chartSeries, labels} = props;
    const chartOptions = useChartOptions(labels);

    return(
        <>
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
        </>
    )
}