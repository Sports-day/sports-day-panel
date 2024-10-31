'use client'
import {LeagueRankListCard} from "@/components/game/RankList/LeagueRankListCard";
import {useTheme, Box, Card, Stack, Typography} from "@mui/material";
import {Team} from "@/src/models/TeamModel";
import * as React from "react";
import {useState} from "react";
import {useAsync} from "react-use";
import {gameFactory, LeagueResult} from "@/src/models/GameModel";

export type LeagueRankListProps = {
    dashboard?: boolean,
    myTeamRank?: number,
    myTeam?: Team,
    gameId?: number,
}

export const LeagueRankList = (props: LeagueRankListProps) => {
    const theme = useTheme();

    const [teams, setTeams] = useState<Team[]>([]);
    const [leagueResult, setLeagueResult] = useState<LeagueResult>({teams: [], createdAt: "", finished: false, gameId: 0});
    useAsync(async () => {
        if (!props.gameId) {
            return;
        }

        try {
            setTeams(await gameFactory().getGameEntries(props.gameId))
            setLeagueResult(await gameFactory().getLeagueResult(props.gameId))
        } catch (e) {
            setLeagueResult({teams: [], createdAt: "", finished: false, gameId: 0});
            setTeams([])
        }
    })

    return (
        <>
            {/*Show myTeam Rank if "dashboard" is true*/}
            {props.dashboard &&
                <Stack width={"100%"}>
                    <Card
                        sx={{
                            background: `${theme.palette.secondary.dark}80`,
                        }}
                    >
                        <Stack
                            direction={"row"}
                            spacing={3}
                            width={"100%"}
                            alignItems={"center"}
                            justifyContent={"start"}
                            m={2}
                        >
                            <Typography
                                fontSize={"30px"}
                                color={theme.palette.text.secondary}
                            >
                                #{props.myTeamRank}
                            </Typography>
                            <Typography
                                fontSize={"20px"}
                                color={theme.palette.text.primary}
                            >
                                {props.myTeam?.name}
                            </Typography>
                            <Stack
                                direction={"column"}
                                pl={2}
                            >
                                <Stack
                                    direction={"row"}
                                    spacing={1}
                                    alignItems={"center"}
                                >
                                    <Box
                                        sx={{
                                            px: 0.8,
                                            height:"16px",
                                            borderRadius: "5px",
                                            backgroundColor: theme.palette.text.secondary,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography color={theme.palette.background.default} fontSize={"10px"} fontWeight={"600"}>
                                            勝ち点率
                                        </Typography>
                                    </Box>
                                    <Typography fontSize={"14px"} color={theme.palette.text.primary}>
                                        {leagueResult.teams.find(team => team.teamId === props.myTeam?.id)?.score.toFixed(3) ?? "---.---"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                </Stack>
            }

            <Box
                width={"100%"}
                sx={{
                    overflow: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    }
                }}
            >
                <Stack sx={{width: "100%"}} direction={"row"} spacing={0.5}>
                    {/*Ranking List*/}
                    {
                        leagueResult.teams.map((teamResult) => {
                            const team = teams.find(value => value.id === teamResult.teamId)
                            return (
                                <LeagueRankListCard
                                    key={teamResult.teamId}
                                    rank={teamResult.rank}
                                    teamName={team?.name ?? "不明"}
                                    teamId={teamResult.teamId}
                                    winRate={teamResult.score}
                                />
                            )
                        })
                    }
                </Stack>
            </Box>
        </>

    )

}