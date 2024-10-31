import {Box, Card, CardContent, Grid, Stack, SvgIcon, Typography} from "@mui/material";
import LeftCircleContainer from "@/components/information/layout/leftCircleContainer";
import MatchList from "@/components/information/match/matchList"
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import {Match} from "@/src/models/MatchModel";
import {InfoGameProgressChart} from "@/components/information/infoGameProgressChart";
import Grid2 from "@mui/material/Unstable_Grid2";
import * as React from "react";
import {HiChartBar} from "react-icons/hi2";
import LeagueCardList from "@/components/information/league/leagueCardList";

export default async function Page({params}: { params: { id: string } }) {

    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    const games = await gameFactory().index()
    const filteredGames = games.filter((game) => game.sportId == sport.id)

    const progress = await sportFactory().getProgress(sportId);

    const formattedProgress = Math.trunc(progress * 100)

    const chartSeries = [formattedProgress, 100 - formattedProgress]

    const matchList: Match[] = []
    for (const game of filteredGames) {
        //  get all matches
        const matches = await gameFactory().getGameMatches(game.id)
        //  filter matches that are not finished
        const inProgressMatches = matches.filter((match) => match.status == "standby" || match.status == "in_progress")

        //  sort by start time
        inProgressMatches.sort((a, b) => {
            return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
        })

        //  pick the first match
        if (inProgressMatches[0]) {
            matchList.push(inProgressMatches[0])
        }
    }
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
            <Box sx={{position: 'relative', zIndex: 1, padding: 0}}>
                <Stack
                    direction="row"
                    spacing={4}
                    sx={{
                        justifyContent: "center",
                        margin: 0,
                        marginTop: 12,
                        width: '100%'
                    }}>
                    {/* 左側のエリア */}
                    <Stack spacing={5} sx={{flex: 1}} paddingLeft={3}>
                        <Typography variant="h5" fontWeight={"600"} align={"center"}>
                            全体の順位
                        </Typography>
                        <Box sx={{flexGrow: 1}} width="100%">
                            <Grid2 container alignItems="flex-end" justifyContent="center" columnSpacing={3}
                                   columns={12}
                                   margin={0}>
                                <Grid2 xs={3.8}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: 300,
                                            width: '100%', // 幅を100%に設定
                                            position: 'relative',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: 0,
                                            padding: 1,
                                            zIndex: 2,
                                        }}
                                    >
                                        <Stack spacing={2} direction="column" alignItems={"center"}
                                               justifyContent="center">
                                            <Stack direction="row" alignItems="flex-end" justifyContent="center"
                                                   spacing={0.4} paddingTop={2}>
                                                <Typography variant="h4" component="div" textAlign="center">
                                                    2
                                                </Typography>
                                                <Typography variant="subtitle1" component="div" textAlign="center">
                                                    位
                                                </Typography>

                                            </Stack>

                                            <Stack direction="row" alignItems="center" justifyContent="center"
                                                   spacing={0.4}>
                                                <SvgIcon>
                                                    <HiChartBar color="#99a5d6"/>
                                                </SvgIcon>
                                                <Typography variant="subtitle1" component="div">
                                                    Eリーグ
                                                </Typography>

                                            </Stack>
                                            <Typography variant="h3" component="div" textAlign="center">
                                                C3-N
                                            </Typography>

                                        </Stack>
                                    </Card>
                                </Grid2>
                                <Grid2 xs={3.8}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: 350,
                                            width: '100%', // 幅を100%に設定
                                            position: 'relative',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: 0,
                                            padding: 1,
                                            zIndex: 2,
                                        }}
                                    >
                                        <Stack spacing={2} direction="column" alignItems={"center"}
                                               justifyContent="center">
                                            <Stack direction="row" alignItems="flex-end" justifyContent="center"
                                                   spacing={0} paddingTop={2}>
                                                <Typography variant="h4" component="div" textAlign="center">
                                                    1
                                                </Typography>
                                                <Typography variant="subtitle1" component="div" textAlign="center">
                                                    位
                                                </Typography>

                                            </Stack>

                                            <Stack direction="row" alignItems="center" justifyContent="center"
                                                   spacing={0.4}>
                                                <SvgIcon>
                                                    <HiChartBar color="#99a5d6"/>
                                                </SvgIcon>
                                                <Typography variant="subtitle1" component="div" textAlign="center">
                                                    Cリーグ
                                                </Typography>

                                            </Stack>
                                            <Typography variant="h3" component="div" textAlign="center">
                                                C3-N
                                            </Typography>

                                        </Stack>
                                    </Card>
                                </Grid2>
                                <Grid2 xs={3.8}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: 250,
                                            width: '100%', // 幅を100%に設定
                                            position: 'relative',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: 0,
                                            padding: 1,
                                            zIndex: 2,
                                        }}
                                    >
                                        <Stack spacing={2} direction="column" alignItems={"center"}
                                               justifyContent="center">
                                            <Stack direction="row" alignItems="flex-end" justifyContent="center"
                                                   spacing={0.4} paddingTop={2}>
                                                <Typography variant="h4" component="div" textAlign="center">
                                                    3
                                                </Typography>
                                                <Typography variant="subtitle1" component="div" textAlign="center">
                                                    位
                                                </Typography>

                                            </Stack>

                                            <Stack direction="row" alignItems="center" justifyContent="center"
                                                   spacing={0.4}>
                                                <SvgIcon>
                                                    <HiChartBar color="#99a5d6"/>
                                                </SvgIcon>
                                                <Typography variant="subtitle1" component="div" textAlign="center">
                                                    Aリーグ
                                                </Typography>

                                            </Stack>
                                            <Typography variant="h3" component="div" textAlign="center">
                                                C3-N
                                            </Typography>

                                        </Stack>
                                    </Card>
                                </Grid2>
                            </Grid2>

                        </Box>
                        <Box sx={{flexGrow: 1}}>
                            <Grid2 container alignItems="flex-end" justifyContent="center" spacing={3} columns={12}>
                                <LeagueCardList/>

                            </Grid2>
                        </Box>


                    </Stack>


                    {/* Second Component */}
                    <Grid
                        xs={6}
                        justifyContent="center"
                        alignItems="center"
                        flex={1}
                        sx={{
                            padding: 0
                        }}
                    >
                        <Stack
                            direction="column"
                            width={"100%"}
                            flex={1}
                        >

                            {/* Second Component */}
                            <Box flex={1} sx={{width: '100%'}}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                    width="100%"
                                    position="relative"
                                >
                                    {/* 進行状況カード */}
                                    <Box sx={{width: '100%', maxWidth: 600, mb: 10}}>
                                        <Card sx={{width: '100%', height: 90}}>
                                            <CardContent>
                                                <InfoGameProgressChart chartSeries={chartSeries}/>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                    {/* @ts-expect-error Server Component */}

                                    <MatchList matches={matchList}/>


                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </Stack>
            </Box>
        </div>
    );
};
