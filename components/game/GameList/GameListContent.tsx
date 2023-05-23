import {Box} from "@mui/material";
import * as React from "react";
import {useFetchGameMatches} from "../../../src/features/games/hook";
import {GamePointBar} from "./GamePointBar";
import {Game} from "../../../src/models/GameModel";
import {useContext} from "react";
import {MatchesContext} from "../../context";

export const GameListContent = (props: { game: Game }) => {
    const {data: matches} = useContext(MatchesContext)
    const filteredMatches = matches.filter(match => match.gameId == props.game.id)
    const maxLeftScore = Math.max.apply(Math, filteredMatches.map(match => match.leftScore))
    const maxRightScore = Math.max.apply(Math, filteredMatches.map(match => match.rightScore))
    const maxScore = maxLeftScore > maxRightScore ? maxLeftScore : maxRightScore
    const barOffset = (maxScore == 0) ? 1 : (95 / maxScore)

    return (
        <>
            {filteredMatches.map((match) => {
                return (
                    <Box key={match.id}>
                        <GamePointBar
                            leftScore={match.leftScore}
                            leftTeamId={match.leftTeamId}
                            rightScore={match.rightScore}
                            rightTeamId={match.rightTeamId}
                            umpireTeam={match.judge}
                            time={match.startAt}
                            barOffset={barOffset}
                        />
                    </Box>
                )
            })}
        </>
    )
}