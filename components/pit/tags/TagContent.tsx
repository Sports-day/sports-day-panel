import {Tag, tagFactory} from "../../../src/models/TagModel";
import {Button, Switch, TableCell, TableRow} from "@mui/material";
import {ConfirmInputDialog} from "../ConfirmInputDialog";
import {ChangeEvent, useState} from "react";
import {TagForm} from "./TagForm";

export function TagContent(
    props: {
        tag: Tag,
        refresh: VoidFunction
    }
) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    //  state
    const [enabled, setEnabled] = useState(props.tag.enabled)

    const deleteTag = async () => {
        await tagFactory().delete(props.tag.id)

        props.refresh()
    }

    const updateEnabledState = async (event:ChangeEvent<HTMLInputElement>) => {
        //  update state
        setEnabled(event.target.checked);

        //  update tag
        await tagFactory().update(props.tag.id, {
            name: props.tag.name,
            enabled: event.target.checked,
        })

        //  refresh
        props.refresh()
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>{props.tag.name}</TableCell>
                <TableCell
                    sx={{
                        width: "100px"
                    }}
                >
                    <Switch
                        checked={enabled}
                        onChange={updateEnabledState}
                        name="enabled"
                        color="primary"
                    />
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
            <TagForm
                isOpen={isEditOpen}
                setClose={() => setIsEditOpen(false)}
                formType={"edit"}
                refresh={props.refresh}
                tag={props.tag}
            />
            {/*delete*/}
            <ConfirmInputDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteTag()}
                confirmKeyword={props.tag.name}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.tag.name}を削除しますか？</p>
            </ConfirmInputDialog>
        </>
    )
}