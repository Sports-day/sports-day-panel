import {useContext} from "react";
import {MatchesContext} from "../context";
import {GamePointBar} from "@/components/game/GameList/GamePointBar";
import {Stack} from "@mui/material";
import {useFetchTeams} from "@/src/features/teams/hook";

export type UserMatchListProps = {
    userId: number
}

export const UserMatchList = (props: UserMatchListProps) => {
    const { data: matches } = useContext(MatchesContext)
    const {teams, isFetching: isTeamFetching, refresh: refreshTeam} = useFetchTeams()
    const userTeam = teams.find(team => team.userIds.includes(props.userId))
    const filteredMatches = matches.filter(match => match.leftTeamId === userTeam?.id || match.rightTeamId === userTeam?.id || match.judgeTeamId === userTeam?.id)
    const maxLeftScore = Math.max.apply(Math, filteredMatches.map(match => match.leftScore))
    const maxRightScore = Math.max.apply(Math, filteredMatches.map(match => match.rightScore))
    const maxScore = maxLeftScore > maxRightScore ? maxLeftScore : maxRightScore
    const barOffset = (maxScore == 0) ? 1 : (95 / maxScore)

    return (
        <Stack spacing={1}>
            {filteredMatches
                .sort((a, b) => a.startAt.localeCompare(b.startAt))
                .map((match) => {
                    return (
                        <>
                            <GamePointBar
                                key={match.id}
                                leftScore={match.leftScore}
                                rightScore={match.rightScore}
                                leftTeamId={match.leftTeamId}
                                rightTeamId={match.rightTeamId}
                                umpireTeam={match.judgeTeamId?.toString() ?? ""}
                                time={match.startAt}
                                barOffset={barOffset}
                                match={match}
                                myTeamId={userTeam?.id}
                                otherUser={true}
                            />
                        </>
                    )
                }
            )}
        </Stack>
    )
}