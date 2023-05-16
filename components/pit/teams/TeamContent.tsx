import {TableCell, TableRow, Link} from "@mui/material";
import {Team} from "../../../src/models/TeamModel";
import {useContext} from "react";
import {ClassesContext} from "../context";

export function TeamContent(props: { team: Team}) {
    const {data: classes} = useContext(ClassesContext)
    const classModel = classes?.find(value => value.id === props.team.classId)

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