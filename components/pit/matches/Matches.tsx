import {Box, CircularProgress} from "@mui/material";
import {MatchesTable} from "./MatchesTable";
import {useFetchMatches} from "../../../src/features/matches/hook";
import {useFetchGames} from "../../../src/features/games/hook";
import {useFetchTeams} from "../../../src/features/teams/hook";
import {useFetchSport, useFetchSports} from "../../../src/features/sports/hook";

export function Matches() {
    const {sports, isFetching: isFetchingSports} = useFetchSports()
    const {games, isFetching: isFetchingGames} = useFetchGames()
    const {teams, isFetching: isFetchingTeams} = useFetchTeams()
    const {matches, isFetching: isFetchingMatches} = useFetchMatches()

    return (
        <>
            <h1>マッチ</h1>

            { isFetchingSports || isFetchingGames || isFetchingTeams || isFetchingMatches ?
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: "100px",
                    }}
                >
                    <CircularProgress/>
                </Box>
                :
                <>
                    <MatchesTable
                        sports={sports}
                        games={games}
                        teams={teams}
                        matches={matches}
                    />
                </>
            }
        </>
    )
}