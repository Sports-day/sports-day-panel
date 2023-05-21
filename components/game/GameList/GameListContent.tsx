import {Box} from "@mui/material";
import * as React from "react";
import {useFetchGameMatches} from "../../../src/features/games/hook";
import {GamePointBar} from "./GamePointBar";

export const GameListContent = (props:any) => {
    const {matches} = useFetchGameMatches(props.game.id)

    return(
        <>
            {matches.map((match)=>{
                return(
                    <Box key={match.id}>
                        <GamePointBar
                            leftScore={match.leftScore}
                            leftTeamId={match.leftTeamId}
                            rightScore={match.rightScore}
                            rightTeamId={match.rightTeamId}
                            umpireTeam={match.judge}
                            time={match.startAt}
                        />
                    </Box>
                )
            })}
        </>
    )
}