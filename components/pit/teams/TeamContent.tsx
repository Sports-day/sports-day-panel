import {TableCell, TableRow, Link, Button} from "@mui/material";
import {Team, teamFactory} from "../../../src/models/TeamModel";
import {useContext, useState} from "react";
import {ClassesContext} from "../../context";
import {ConfirmInputDialog} from "../ConfirmInputDialog";

export function TeamContent(props: { team: Team, refresh: VoidFunction }) {
    const {data: classes} = useContext(ClassesContext)
    const classModel = classes?.find(value => value.id === props.team.classId)

    //  state
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const deleteTeam = async () => {
        await teamFactory().delete(props.team.id)

        props.refresh()
    }

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
                <TableCell
                    sx={{
                        width: "150px"
                    }}
                >
                    <Button
                        onClick={() => setIsDeleteOpen(true)}
                    >
                        削除
                    </Button>
                </TableCell>
            </TableRow>

            {/*delete*/}
            <ConfirmInputDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteTeam()}
                confirmText={"削除"}
                confirmKeyword={props.team.name}
                confirmColor={"warning"}
            >
                <p>{props.team.name}を削除しますか？</p>
            </ConfirmInputDialog>
        </>
    )
}