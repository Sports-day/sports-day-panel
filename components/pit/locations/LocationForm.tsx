import {Location, locationFactory} from "../../../src/models/LocationModel";
import {FormType} from "../../../types";
import React, {useRef} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextFieldProps} from "@mui/material";

export type LocationFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
    formType: FormType
    location?: Location
}

export function LocationForm(props: LocationFormProps) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (props.formType === "create") {
            await locationFactory().create({
                name: nameRef.current?.value as string
            })


        } else {
            const id = props.location?.id
            if(!id) return

            await locationFactory().update(
                id,
                {
                    name: nameRef.current?.value as string
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
                        {props.formType === "create" ? "ロケーション作成" : "ロケーション編集"}
                    </DialogTitle>
                    <DialogContent>
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"ロケーション名"}
                            inputRef={nameRef}
                            defaultValue={!props.location ? "" : props.location.name}
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