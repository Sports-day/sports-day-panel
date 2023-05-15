import {TableCell, TableRow, Link} from "@mui/material";
import { useFetchClass } from "../../../src/features/classes/hooks";
import {Team} from "../../../src/models/TeamModel";

export function TeamContent(props: { team: Team}) {
    const {classModel} = useFetchClass(props.team.classId)

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
                <TableCell>{classModel?.name}</TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    {new Date(props.team.updatedAt).toLocaleString("ja-JP")}
                </TableCell>
            </TableRow>
        </>
    )
}