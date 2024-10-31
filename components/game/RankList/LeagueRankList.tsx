import {LeagueRankListCard} from "@/components/game/RankList/LeagueRankListCard";
import {useTheme, Box, Card, Stack, Typography} from "@mui/material";
import {Team} from "@/src/models/TeamModel";
import * as React from "react";

export type LeagueRankListProps = {
    dashboard?: boolean,
    myTeamRank?: number,
    myTeam?: Team
}

export const LeagueRankList = (props: LeagueRankListProps) => {
    const theme = useTheme();

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
                                        012.345
                                    </Typography>
                                </Stack>
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
                                            総得点率
                                        </Typography>
                                    </Box>
                                    <Typography fontSize={"14px"} color={theme.palette.text.primary}>
                                        012.345
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
                <Stack sx={{width: "100%"}} direction={"row"} spacing={1}>
                    {/*Ranking List*/}
                    <LeagueRankListCard
                        rank={1}
                        teamName={"Team1"}
                        winRate={100.00}
                        totalRate={100.00}
                    />
                    <LeagueRankListCard
                        rank={2}
                        teamName={"Team2"}
                        winRate={99.00}
                        totalRate={99.00}
                    />
                </Stack>
            </Box>
        </>

    )

}