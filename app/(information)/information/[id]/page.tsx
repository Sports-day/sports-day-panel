import {Box, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import LeftCircleContainer from "@/components/information/layout/leftCircleContainer";
import MatchList from "@/components/information/match/matchList"
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import {Match} from "@/src/models/MatchModel";
import {InfoGameProgressChart} from "@/components/information/infoGameProgressChart";
import Grid2 from "@mui/material/Unstable_Grid2";
import * as React from "react";
import LeagueCardList from "@/components/information/league/leagueCardList";
import Top3LeagueCards from "@/components/information/league/top3LeagueCards";
import AutoRefresh from "@/components/AutoRefresh";

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
            <AutoRefresh/>
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
                                <Top3LeagueCards games={filteredGames}/>
                            </Grid2>

                        </Box>
                        <Box sx={{flexGrow: 1}}>
                            <Grid2 container alignItems="flex-end" justifyContent="center" spacing={3} columns={12}>
                                <LeagueCardList games={filteredGames}/>
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
                                    <Box alignItems="left" sx={{width: '100%', maxWidth: 600}}>
                                        <Typography variant="h5" fontWeight={"600"} align={"left"} paddingBottom={5}>
                                            現在進行中の試合
                                        </Typography>
                                    </Box>


                                    <Box>
                                        {/* @ts-expect-error Server Component */}
                                        <MatchList matches={matchList}/>
                                    </Box>


                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </Stack>
            </Box>
        </div>
    );
};
