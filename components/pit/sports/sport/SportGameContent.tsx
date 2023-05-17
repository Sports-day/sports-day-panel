import {Game} from "../../../../src/models/GameModel";
import {Link, TableCell, TableRow} from "@mui/material";

export function SportGameContent(props: { game: Game }) {

    return (
        <>
            <TableRow>
                <TableCell>
                    <Link
                        href={`/admin/sports/${props.game.sportId}/games/${props.game.id}`}
                    >
                        {props.game.id}
                    </Link>
                </TableCell>
                <TableCell>
                    {props.game.name}
                </TableCell>
                <TableCell>
                    {props.game.description}
                </TableCell>
                <TableCell>
                    {props.game.type === "tournament" ? "トーナメント" : "リーグ"}
                </TableCell>
                <TableCell>
                    {props.game.calculationType === "total_score" ? "総合得点" : "得失点"}
                </TableCell>
                <TableCell>
                    {props.game.weight}
                </TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    {new Date(props.game.updatedAt).toLocaleString("ja-JP")}
                </TableCell>
            </TableRow>
        </>
    )
}