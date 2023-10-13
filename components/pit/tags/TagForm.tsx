import {FormType} from "../../../types";
import {Tag, tagFactory} from "../../../src/models/TagModel";
import React, {FormEvent, useRef} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextFieldProps} from "@mui/material";

export type TagFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    formType: FormType
    refresh: VoidFunction
    tag?: Tag
}


export function TagForm(props: TagFormProps) {
    const nameRef = useRef<TextFieldProps>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (props.formType === "create") {
            await tagFactory().create({
                name: nameRef.current?.value as string,
                enabled: true
            })
        } else {
            const id = props.tag?.id
            if (!id) return

            await tagFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    // @ts-ignore
                    enabled: props.tag.enabled
                }
            )
        }

        props.refresh()
        props.setClose()
    }

    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.setClose}
                maxWidth={"md"}
                fullWidth
            >
                <form
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>
                        {props.formType === "create" ? "タグ作成" : "タグ編集"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"タグ名"}
                            inputRef={nameRef}
                            defaultValue={!props.tag ? "" : props.tag.name}
                            fullWidth
                            required
                            sx={{
                                my: '20px'
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant={"outlined"}
                            onClick={props.setClose}
                        >
                            キャンセル
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                        >
                            {
                                props.formType == "create" ?
                                    "作成" :
                                    "編集"
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}