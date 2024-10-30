'use client'
import {
    Box,
    Stack,
    styled,
    LinearProgress,
    Typography,
    useTheme,
    Container,
    Card,
    CardContent, CardActions, Button, Grid
} from "@mui/material";
import {linearProgressClasses} from "@mui/material";
import {useContext} from "react";
import {TeamsContext} from "@/components/context";

type Props = {
    chartSeries: number[]
}
import LeftCircleContainer from "@/components/layouts/leftCircleContainer";
import {left} from "@popperjs/core";
import ReactMarkdown from "react-markdown";
import children = ReactMarkdown.propTypes.children;

const Game = (props: Props) => {
    const theme = useTheme();
    const {data: teams} = useContext(TeamsContext);

    const PointBar = styled(LinearProgress)(({}) => ({
        height: 15,
        borderRadius: 15,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.secondary.dark,
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 2,
            backgroundColor: theme.palette.text.primary,
        },
    }));

    return (
        <Stack
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"space-between"}
            maxWidth={'xl'}
            sx={{width: '100%', height: "100%"}}
            spacing={1}
        >
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                spacing={0}
                sx={{width: '100%'}}
            >
                <Typography fontSize={"14px"}>
                    進行状況
                </Typography>
                <Typography fontSize={"18px"} fontWeight={"600"}>
                    {props.chartSeries[0]} %
                </Typography>
            </Stack>
            <Box>
                <PointBar
                    variant={"determinate"}
                    value={props.chartSeries[0]}
                />
            </Box>
        </Stack>
    );
};
type PositionedCardProps = {
    top?: number | string;
    left?: number | string;
    children: React.ReactNode;
};

const PositionedCard = ({top = 0, left = 0, children}: PositionedCardProps) => (
    <Card variant={"outlined"}
          sx={{
              position: "absolute",
              top: top,
              left: left,
              minWidth: 230,
              height: 370,
              zIndex: 2, // LeftCircleContainer の上に表示
          }}
    >
        {children}
    </Card>
);


export default function Page({params}: { params: { id: string } }) {
    return (
        <div style={{position: 'relative'}}>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            >
                <LeftCircleContainer/>
            </Box>


            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Grid
                    spacing={4}
                    sx={{
                        justifyContent: "space-around",
                    }}
                    container
                >
                    {/* First Component */}
                    {/* 左側のエリア */}
                    <Grid
                        xs={6}
                        sx={{
                            paddingTop: "120px",
                        }}
                    >
                        {/* 左側の図形の上にカードを追加 */}
                        <Grid
                            spacing={1}
                            sx={{
                                paddingX: "20px"

                            }}
                            container
                        >
                            <Grid xs={4}>
                                <CardContent>
                                    <Box display="flex" flexDirection="row" alignItems="center">
                                        <Typography variant="h5" component="div" sx={{mb: 4, ml: 10.5}}>
                                            2
                                        </Typography>
                                        <Typography variant="subtitle1" component="div"
                                                    sx={{mb: 4, position: 'relative', top: 2}}>
                                            位
                                        </Typography>

                                    </Box>
                                    <Typography variant="h6" sx={{ml: 8, mb: 1}}>Dリーグ</Typography>
                                    <Typography variant="h2" sx={{ml: 4, mb: -2}}>M3-C</Typography>
                                </CardContent>
                            </Grid>

                            <Grid xs={4}>
                                <CardContent>
                                    <Box display="flex" flexDirection="row" alignItems="center">
                                        <Typography variant="h5" component="div" sx={{mb: 4, ml: 10.5}}>
                                            1
                                        </Typography>
                                        <Typography variant="subtitle1" component="div"
                                                    sx={{mb: 4, position: 'relative', top: 2}}>
                                            位
                                        </Typography>

                                    </Box>
                                    <Typography variant="h6" sx={{ml: 8, mb: 1}}>Aリーグ</Typography>
                                    <Typography variant="h2" sx={{ml: 4, mb: -2}}>C5-B</Typography>
                                </CardContent>
                            </Grid>

                            <Grid xs={4}>
                                <CardContent>
                                    <Box display="flex" flexDirection="row" alignItems="center">
                                        <Typography variant="h5" component="div" sx={{mb: 4, ml: 10.5}}>
                                            3
                                        </Typography>
                                        <Typography variant="subtitle1" component="div"
                                                    sx={{mb: 4, position: 'relative', top: 2}}>
                                            位
                                        </Typography>

                                    </Box>
                                    <Typography variant="h6" sx={{ml: 8, mb: 1}}>Aリーグ</Typography>
                                    <Typography variant="h2" sx={{ml: 4, mb: -2}}>E1-A</Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Second Component */}
                    <Grid
                        xs={6}
                        sx={{
                            paddingX: "60px"
                        }}
                    >
                        <Stack
                            direction="column"
                            width={"100%"}
                        >
                            {/* 進行状況カード */}
                            <Box sx={{width: '100%', mb: 10, marginTop: 8}}>
                                <Card sx={{width: '100%', height: 90}}>
                                    <CardContent>
                                        <Game chartSeries={[50]}/> {/* 進行状況を50%で表示 */}
                                    </CardContent>
                                </Card>
                            </Box>

                            <Box sx={{position: 'relative', width: '100%'}}>
                                {/* 後ろのカード */}
                                <Card variant="outlined" sx={{
                                    height: 90,
                                    width: '100%',
                                    position: 'absolute',
                                    top: 6,
                                    right: -6,
                                    zIndex: 1 // メインカードの下に置く
                                }}/>
                            </Box>
                            {/* メインカード */}
                            <Box sx={{width: '100%'}}>
                                <Card variant="outlined" sx={{
                                    height: 90,
                                    width: '100%',
                                    position: 'relative', // 前面に表示
                                    zIndex: 2
                                }}>
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '75px',
                                        }}>
                                        <Typography variant="subtitle1" component="div"
                                                    sx={{mr: 5, mb: -2, lineHeight: '10'}}>
                                            Aリーグ
                                        </Typography>
                                        <Typography variant="h4" component="div" sx={{ml: 5, mb: -2, lineHeight: '10'}}>
                                            E2-A
                                        </Typography>
                                        <Box sx={{mx: 2, mb: -2, lineHeight: '10'}}>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                vs
                                            </Typography>
                                        </Box>
                                        <Typography variant="h4" component="div" sx={{mb: -2, lineHeight: '10'}}>
                                            E5-B
                                        </Typography>
                                        <Box display="flex" flexDirection="column" alignItems="flex-end">
                                            <Typography variant="subtitle1" component="div" sx={{ml: 9}}>
                                                16:00～16:30
                                            </Typography>
                                            <Typography variant="subtitle1" component="div" sx={{ml: 7, mb: -2}}>
                                                第一体育館
                                            </Typography>

                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};
