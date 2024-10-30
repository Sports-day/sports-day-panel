'use client'
import {Box, Card, CardContent, Container} from "@mui/material";
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
        <div style={{position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden'}}>
            <Container
                maxWidth={false}
                disableGutters // パディングを取り除く
                sx={{
                    width: '100vw',
                    height: '100vh',
                    padding: 0,
                    margin: 0,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                        padding: 0,
                        margin: 0,
                        justifyContent: 'space-evenly'
                    }}
                >
                    <LeftCircleContainer/>
                </Box>

                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100vw',
                        height: '100%',
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        gap={4}
                        sx={{width: '100%', height: '100%'}}
                    >
                        {/* First Component */}
                        <Box flex={1} sx={{width: '100%'}}>
                            {/* コンテンツ */}
                        </Box>

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
                    </Box>
                </Container>
            </Container>
        </div>
    );
};
