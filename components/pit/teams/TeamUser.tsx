import {User} from "../../../src/models/UserModel"
import {Button, TableCell, TableRow, Link} from "@mui/material";
import {useContext, useState} from "react";
import {ClassesContext} from "../../context";
import {ConfirmDialog} from "../ConfirmDialog";
import {teamFactory} from "../../../src/models/TeamModel";

export type TeamUserProps = {
    teamId: number
    user: User
    refresh: VoidFunction
}

export const TeamUser = (props: TeamUserProps) => {
    //  state
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    //  context
    const {data: classes} = useContext(ClassesContext)
    const classModel = classes?.find(classModel => classModel.id === props.user.classId)

    const deleteTeamUser = async () => {
        await teamFactory().removeTeamUser(
            props.teamId,
            props.user.id,
        )

        props.refresh()
        setIsDeleteOpen(false)
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    <Link
                        href={`/admin/users/${props.user.id}`}
                    >
                        {props.user.id}
                    </Link>
                </TableCell>
                <TableCell>{props.user.studentId}</TableCell>
                <TableCell>

                    <span
                        style={{
                            color: props.user.gender == "male" ? "black" : "red"
                        }}
                    >
                        {props.user.name}
                    </span>
                </TableCell>
                <TableCell>{classModel?.name}</TableCell>
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
            <ConfirmDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteTeamUser()}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.user.name}をチームから削除しますか？</p>
            </ConfirmDialog>
        </>
    )
}