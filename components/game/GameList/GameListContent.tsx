import {Stack} from "@mui/material";
import * as React from "react";
import {GamePointBar} from "./GamePointBar";
import {Game} from "@/src/models/GameModel";
import {useContext} from "react";
import {MatchesContext} from "../../context";

export type GameListContentProps = {
    game: Game
    myTeamId?: number
}

export const GameListContent = (props: GameListContentProps) => {
    const { data: matches } = useContext(MatchesContext)
    const filteredMatches = matches.filter(match => match.gameId == props.game.id)
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
                                myTeamId={props.myTeamId}
                                otherUser={false}
                            />
                    </>
                )
            })}
        </Stack>
    )
}