import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {Button, Card, CardActions, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import {Chart} from "../chart";
import {alpha, useTheme} from '@mui/material/styles';

const useChartOptions = () => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent',
            stacked: false
        },
        colors: ["#FFC900", alpha("#FFC900", 0.5)],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
            type: 'solid'
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '10px',
                borderRadius: 0
            }
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 2
        },
        theme: {
            mode: theme.palette.mode
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
                show: true
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true
            },
            categories: [
                'data1',
                'data2',
                'data3',
                'data4',
                'data5',
                'data6',
                'data7',
                'data8',
                'data9',
                'data10',
                'data11',
                'data12'
            ],
            labels: {
                show: false
            }
        },
        yaxis: {
            labels: {
                formatter: (value: any) => (value > 0 ? `${value}` : `${value}`),
                offsetX: -5,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        }
    };
};

export const GamePointBar = (props: any) => {
    const { chartSeries, sx } = props;
    const chartOptions: any = useChartOptions();

    return (
        <Card
            sx={sx}
        >
            <CardContent>
                <Chart
                    height="300px"
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    width="100%"
                />
            </CardContent>
        </Card>
    );
};

GamePointBar.protoTypes = {
    chartSeries: PropTypes.array.isRequired,
    sx: PropTypes.object
};
