import {Game} from "../../../src/models/GameModel";
import {useFetchGameResultWithoutFetchGame} from "../../../src/features/games/hook";
import {GameBestContent} from "./GameBestContent";
import {useContext} from "react";
import {TeamsContext} from "../../context";

export type GameBestListProps = {
    game: Game,
    visible: boolean
}

export const GameBestList = (props: GameBestListProps) => {
    const {result, isFetching, refresh} = useFetchGameResultWithoutFetchGame(props.game, true)
    const { data: teams } = useContext(TeamsContext)

    //  hide component when not focused
    if (!props.visible) {
        return null
    }

    //  return loading component when fetching
    if (isFetching) {
        //  todo Nayu: replace this component
        return (
            <p>
                Loading...
            </p>
        )
    }

    //  return unavailable component when result is null
    if (!result) {
        //  todo Nayu: replace this component
        return (
            <p>
                503 Service Unavailable
            </p>
        )
    }

    return (
        <>
            {result?.teams.slice(0, 3).map((team) => {
                return (
                    <GameBestContent
                        key={team.teamId}
                        team={teams?.find(t => t.id === team.teamId)?.name ?? "unknown"}
                        rank={team.rank}
                    />
                )
            })}
        </>
    )

}