'use client'
import React, {useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {Game, gameFactory, LeagueResult, LeagueTeamResult} from "@/src/models/GameModel";
import {Team, teamFactory} from "@/src/models/TeamModel";
import {useAsync} from "react-use";
import LeagueCard from "@/components/information/league/leagueCard";

export type LeagueCardListProps = {
    games: Game[]
}

type ExtendedLeagueTeamResult = {
    game: Game,
    team: Team
    teamResult: LeagueTeamResult
}

export default function LeagueCardList(props: LeagueCardListProps) {
    const [results, setResults] = useState<ExtendedLeagueTeamResult[]>([])

    useAsync(async () => {
        const teams = await teamFactory().index()

        const leagueResults: LeagueResult[] = []
        for (const game of props.games) {
            const leagueResult = await gameFactory().getLeagueResult(game.id)
            leagueResults.push(leagueResult)
        }

        const extendedLeagueResults: ExtendedLeagueTeamResult[] = []
        for (const leagueResult of leagueResults) {
            leagueResult.teams.forEach((value) => {
                const team = teams.find(v => v.id == value.teamId)
                const game = props.games.find(v => v.id == leagueResult.gameId)

                if (!team || !game) {
                    return
                }

                extendedLeagueResults.push({
                    game: game,
                    team: team,
                    teamResult: value
                })
            })
        }

        //  sort
        extendedLeagueResults.sort((a, b) =>
            b.teamResult.score - a.teamResult.score
        )

        setResults(extendedLeagueResults.slice(3, 10))
    })


    return (
        <Grid2 container spacing={2} columns={12} margin={2}>
            {results.map((value, index) => (
                <Grid2 xs={6} key={index} direction="row">
                    <LeagueCard
                        league={value.game.name}
                        team={value.team.name}
                        rank={index + 4}
                    />
                </Grid2>
            ))}
        </Grid2>
    );
};

