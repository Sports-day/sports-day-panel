import React, {useEffect, useRef, useState} from "react";
import styles from "../../styles/Pit.module.scss";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextFieldProps} from "@mui/material";
import {FormType} from "../../types";
import {Group, groupFactory} from "../../src/models/GroupModel";
import {useRouter} from "next/router";

export type GroupFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    formType: FormType
    refresh: VoidFunction
    group?: Group
}

export function GroupForm(props: GroupFormProps) {
    const router = useRouter()
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (props.formType === "create") {
            await groupFactory().create({
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string
            })


        } else {
            const id = props.group?.id
            if(!id) return

            await groupFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    description: descriptionRef.current?.value as string
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
                        {props.formType === "create" ? "グループ作成" : "グループ編集"}
                    </DialogTitle>
                    <DialogContent>
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"グループ名"}
                            inputRef={nameRef}
                            defaultValue={!props.group ? "" : props.group.name}
                            fullWidth
                            required
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/* description */}
                        <TextField
                            type={"text"}
                            name={"description"}
                            id={"description"}
                            label={"説明(任意)"}
                            inputRef={descriptionRef}
                            defaultValue={!props.group ? "" : props.group.description}
                            fullWidth
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