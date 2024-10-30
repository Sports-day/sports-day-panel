'use client'
import {Box, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import LeftCircleContainer from "@/components/information/layout/leftCircleContainer";
import {GameProgressChart} from "@/components/game/game-progress/GameProgressChart";
import MatchList from "@/components/information/matchList"
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import {Match} from "@/src/models/MatchModel";

export default async function Page({params}: { params: { id: string } }) {

    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    const games = await gameFactory().index()
    const filteredGames = games.filter((game) => game.sportId == sport.id)

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

                        {/* Second Component */}
                        <Box flex={1} sx={{width: '100%'}}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                height="100%"
                                width="100%"
                                position="relative"
                            >
                                {/* 進行状況カード */}
                                <Box sx={{width: '100%', maxWidth: 600, mb: 10, marginTop: 8}}>
                                    <Card sx={{width: '100%', height: 90}}>
                                        <CardContent>
                                            <GameProgressChart chartSeries={[10]}/>
                                        </CardContent>
                                    </Card>
                                </Box>
                                {/* @ts-expect-error Server Component */}

                                <MatchList matches={matchList}/>


                            </Box>
                        </Box>
                        </Stack>
                    </Grid>
                </Grid>
                </Box>
        </div>
    );
};
