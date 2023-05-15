import {Group, groupFactory} from "../../src/models/GroupModel";
import {Button, TableCell, TableRow} from "@mui/material";
import {GroupForm} from "./GroupForm";
import {useState} from "react";
import {ConfirmDialog} from "./ConfirmDialog";

export function GroupContent(props: { group: Group, refresh: VoidFunction }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const deleteGroup = async () => {
        await groupFactory().delete(props.group.id)
        props.refresh()
        setIsDeleteOpen(false)
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>{props.group.id}</TableCell>
                <TableCell>{props.group.name}</TableCell>
                <TableCell>{props.group.description}</TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    {new Date(props.group.updatedAt).toLocaleString("ja-JP")}
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
            <GroupForm
                isOpen={isEditOpen}
                setClose={() => setIsEditOpen(false)}
                formType={"edit"}
                refresh={props.refresh}
                group={props.group}
            />
            {/*delete*/}
            <ConfirmDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteGroup()}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.group.name}を削除しますか？</p>
            </ConfirmDialog>
        </>
    )
}