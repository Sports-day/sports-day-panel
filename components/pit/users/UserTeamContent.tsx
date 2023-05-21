import {Team} from "../../../src/models/TeamModel";
import {Button, Link, TableCell, TableRow} from "@mui/material";

export function UserTeamContent(props: { team: Team }) {
    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    <Link
                        href={`/admin/teams/${props.team.id}`}
                    >
                        {props.team.id}
                    </Link>
                </TableCell>
                <TableCell>{props.team.name}</TableCell>
                <TableCell>{props.team.description}</TableCell>
            </TableRow>
        </>
    )
}