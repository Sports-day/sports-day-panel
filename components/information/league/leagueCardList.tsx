import React from 'react';
import LeagueCard from "@/components/information/league/leagueCard";
import Grid2 from "@mui/material/Unstable_Grid2";

type LeagueCardData = {
    league: string;
    team: string;
    index: number;
};

const LeagueCardList: React.FC = () => {
    // カードのデータを配列で管理
    const cardData: LeagueCardData[] = [
        {league: 'Aリーグ', team: 'E3-A', index: 4},
        {league: 'Bリーグ', team: 'E3-B', index: 5},
        {league: 'Cリーグ', team: 'E3-C', index: 6},
        {league: 'Dリーグ', team: 'E3-D', index: 7},
        {league: 'Eリーグ', team: 'E3-E', index: 8},
        {league: 'Fリーグ', team: 'E3-F', index: 9},
    ];

    return (
        <Grid2 container spacing={2} columns={12} margin={2}>
            {cardData.map((card, index) => (
                <Grid2 xs={6} key={index}>
                    <LeagueCard
                        league={card.league}
                        team={card.team}
                        index={index}
                    />
                </Grid2>
            ))}
        </Grid2>
    );
};

export default LeagueCardList;
