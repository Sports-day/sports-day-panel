import React from 'react';
import {Card, Stack, SvgIcon, Typography} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import {HiChartBar} from "react-icons/hi2";

interface LeagueCardProps {
    league: string;
    team: string;
    index: number;
}

export default function LeagueCard(props: LeagueCardProps) {
    return (
        <Card
            variant="outlined"
            sx={{
                height: 80,
                width: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                zIndex: 2,
            }}
        >
            <Grid2
                container
                spacing={0}
                width="100%"
                height="100%"
            >
                <Grid2 xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Stack direction="row" alignItems="flex-end" justifyContent="center"
                           spacing={0.4}>
                        <Typography variant="h5" component="div" textAlign="center">
                            2
                        </Typography>
                        <Typography variant="subtitle1" component="div" textAlign="center">
                            位
                        </Typography>

                    </Stack>
                </Grid2>
                <Grid2 xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Stack direction="row" alignItems="center" justifyContent="center"
                           spacing={0.4}>
                        <SvgIcon>
                            <HiChartBar color="#99a5d6"/>
                        </SvgIcon>
                        <Typography variant="subtitle1" component="div" textAlign="center">
                            {props.league}
                        </Typography>

                    </Stack>

                </Grid2>
                <Grid2 xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h4" component="div" textAlign="center">
                        {props.team ?? "未登録"}
                    </Typography>
                </Grid2>
            </Grid2>
        </Card>

    );
};