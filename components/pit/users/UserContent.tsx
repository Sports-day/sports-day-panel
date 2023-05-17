import {User, userFactory} from "../../../src/models/UserModel";
import {Button, Link, TableCell, TableRow} from "@mui/material";
import {ConfirmDialog} from "../ConfirmDialog";
import {useContext, useState} from "react";
import {ClassesContext} from "../context";
import { UserForm } from "./UserForm";

export function UserContent(props: {user: User, refresh: VoidFunction}) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    //  context
    const {data: classes} = useContext(ClassesContext)
    const classModel = classes?.find(classModel => classModel.id === props.user.classId)

    const deleteUser = async () => {
        await userFactory().delete(props.user.id)
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
                <TableCell>
                    <span
                        style={{
                            color: props.user.gender == "male" ? "black" : "red"
                        }}
                    >
                        {props.user.name}
                    </span>
                </TableCell>
                <TableCell>{props.user.studentId}</TableCell>
                <TableCell>
                    {classModel &&
                        <Link
                            href={`/admin/classes/${classModel.id}`}
                        >
                            {classModel.name}
                        </Link>
                    }
                </TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    {new Date(props.user.updatedAt).toLocaleString("ja-JP")}
                </TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    <Button
                        onClick={() => setIsEditOpen(true)}
                    >
                        編集
                    </Button>
                    <Button
                        onClick={() => setIsDeleteOpen(true)}
                    >
                        削除
                    </Button>
                </TableCell>
            </TableRow>
            {/*edit*/}
            <UserForm
                isOpen={isEditOpen}
                setClose={() => setIsEditOpen(false)}
                formType={"edit"}
                refresh={props.refresh}
                user={props.user}
            />
            {/*delete*/}
            <ConfirmDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteUser()}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.user.name}を削除しますか？</p>
            </ConfirmDialog>
        </>
    )
}