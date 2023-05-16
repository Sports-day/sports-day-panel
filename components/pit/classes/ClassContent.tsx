import {Button, TableCell, TableRow} from "@mui/material";
import {useContext, useState} from "react";
import {Class, classFactory} from "../../../src/models/ClassModel";
import {ClassForm} from "./ClassForm";
import {GroupsContext} from "../context";
import {ConfirmInputDialog} from "../ConfirmInputDialog";

export function ClassContent(props: { class: Class, refresh: VoidFunction }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const {data: groups} = useContext(GroupsContext)
    const group = groups?.find(group => group.id === props.class.groupId)

    const deleteClass = async () => {
        await classFactory().delete(props.class.id)
        props.refresh()
        setIsDeleteOpen(false)
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>{props.class.id}</TableCell>
                <TableCell>{props.class.name}</TableCell>
                <TableCell>{props.class.description}</TableCell>
                <TableCell>{group?.name}</TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    {new Date(props.class.updatedAt).toLocaleString("ja-JP")}
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
            <ClassForm
                isOpen={isEditOpen}
                setClose={() => setIsEditOpen(false)}
                formType={"edit"}
                refresh={props.refresh}
                class={props.class}
            />
            {/*delete*/}
            <ConfirmInputDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteClass()}
                confirmText={"削除"}
                confirmKeyword={props.class.name}
                confirmColor={"warning"}
            >
                <p>{props.class.name}を削除しますか？</p>
            </ConfirmInputDialog>
        </>
    )
}