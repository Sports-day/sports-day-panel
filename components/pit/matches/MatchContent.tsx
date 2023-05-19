import {Team} from "../../../src/models/TeamModel";
import {Game} from "../../../src/models/GameModel";
import {Sport} from "../../../src/models/SportModel";
import {Match} from "../../../src/models/MatchModel";
import {Location} from "../../../src/models/LocationModel";
import {Link, TableCell, TableRow} from "@mui/material";

export type MatchContentProps = {
    sports: Sport[]
    games: Game[]
    teams: Team[]
    locations: Location[]
    match: Match
}

export function MatchContent(props: MatchContentProps) {
    const sport = props.sports.find(sport => sport.id === props.match.sportId)
    const game = props.games.find(game => game.id === props.match.gameId)
    const location = props.locations.find(location => location.id === props.match.locationId)
    const leftTeam = props.teams.find(team => team.id === props.match.leftTeamId)
    const rightTeam = props.teams.find(team => team.id === props.match.rightTeamId)

    var resultString = ""
    if(props.match.result === "left_win") {
        resultString = "左チーム勝利"
    } else if(props.match.result === "right_win") {
        resultString = "右チーム勝利"
    } else if(props.match.result === "draw") {
        resultString = "引き分け"
    }

    var statusString = ""
    if(props.match.status === "standby") {
        statusString = "開始前"
    } else if(props.match.status === "in_progress") {
        statusString = "試合中"
    } else if(props.match.status === "finished") {
        statusString = "終了"
    } else if(props.match.status === "cancelled") {
        statusString = "中止"
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <Link
                        href={`/admin/matches/${sport?.id}`}
                    >
                        {props.match.id}
                    </Link>
                </TableCell>
                <TableCell>
                    <Link
                        href={`/admin/sports/${sport?.id}`}
                    >
                        {sport?.name}
                    </Link>
                </TableCell>
                <TableCell>
                    <Link
                        href={`/admin/sports/${sport?.id}/games/${game?.id}`}
                    >
                        {game?.name}
                    </Link>
                </TableCell>
                <TableCell>
                    {location?.name}
                </TableCell>
                <TableCell>
                    <Link
                        href={`/admin/teams/${leftTeam?.id}`}
                    >
                        {leftTeam?.name}
                    </Link>
                </TableCell>
                <TableCell>
                    <Link
                        href={`/admin/teams/${rightTeam?.id}`}
                    >
                        {rightTeam?.name}
                    </Link>
                </TableCell>
                <TableCell>
                    {props.match.leftScore} - {props.match.rightScore}
                </TableCell>
                <TableCell>
                    {resultString}
                </TableCell>
                <TableCell>
                    {statusString}
                </TableCell>
                <TableCell>
                    {new Date(props.match.startAt).toLocaleString("ja-JP")}
                </TableCell>
                <TableCell>
                    {props.match.judge}
                </TableCell>
                <TableCell>
                    {props.match.note}
                </TableCell>
                <TableCell>
                    {new Date(props.match.updatedAt).toLocaleString("ja-JP")}
                </TableCell>
            </TableRow>
        </>
    )
}