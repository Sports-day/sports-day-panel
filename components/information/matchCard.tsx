import {Box, Card, CardContent, Typography} from "@mui/material";
import * as React from "react";
import {gameFactory} from "@/src/models/GameModel";
import {Match} from "@/src/models/MatchModel";
import {locationFactory} from "@/src/models/LocationModel";
import {teamFactory} from "@/src/models/TeamModel";
import {HiMapPin} from "react-icons/hi2";

type MatchCardProps = {
    match: Match
}

export default async function MatchCard(props: MatchCardProps) {

    const game = await gameFactory().show(props.match.gameId)
    const location = props.match.locationId == null ? undefined : await locationFactory().show(props.match.locationId)
    const leftTeam = props.match.leftTeamId == null ? undefined : await teamFactory().show(props.match.leftTeamId)
    const rightTeam = props.match.rightTeamId == null ? undefined : await teamFactory().show(props.match.rightTeamId)
    const judgeTeam = props.match.judgeTeamId == null ? undefined : await teamFactory().show(props.match.judgeTeamId)

    const date = new Date(props.match.startAt)
    const formattedDate = `${date.getHours()}時${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}分`

    return (
        <>
            <Box sx={{width: '100%', maxWidth: 600, mb: 3}}>
                <Box sx={{position: 'relative', width: '100%', maxWidth: 600}}>
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
                <Box sx={{width: '100%', maxWidth: 600}}>
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
                            }}
                        >
                            <Typography variant="subtitle1" component="div" sx={{mr: 5, mb: -2}}>
                                {game.name}
                            </Typography>
                            <Typography variant="h4" component="div" sx={{ml: 5, mb: -2, lineHeight: '10'}}>
                                {leftTeam?.name ?? "未登録"}
                            </Typography>
                            <Box sx={{mx: 2, mb: -2, lineHeight: '10'}}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    vs
                                </Typography>
                            </Box>
                            <Typography variant="h4" component="div" sx={{mb: -2, lineHeight: '10'}}>
                                {rightTeam?.name ?? "未登録"}
                            </Typography>
                            <Box display="flex" flexDirection="column" alignItems="flex-end">
                                <Typography variant="subtitle1" component="div" sx={{ml: 9}}>
                                    {formattedDate}
                                </Typography>
                                <Typography variant="subtitle1" component="div" sx={{ml: 7, mb: -2}}>
                                    icon={<HiMapPin/>}
                                    {location?.name ?? "未登録"}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    );
}
