import {FormEvent, useRef} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextFieldProps} from "@mui/material";
import {FormType} from "../../../types";
import {Information, informationFactory} from "../../../src/models/InformationModel";

export type InformationFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    formType: FormType
    refresh: VoidFunction
    information?: Information
}

export function InformationForm(props: InformationFormProps) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const contentRef = useRef<TextFieldProps>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (props.formType === "create") {
            await informationFactory().create({
                name: nameRef.current?.value as string,
                content: contentRef.current?.value as string
            })


        } else {
            const id = props.information?.id
            if(!id) return

            await informationFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    content: contentRef.current?.value as string
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
                        {props.formType === "create" ? "インフォーメーション作成" : "インフォーメーション編集"}
                    </DialogTitle>
                    <DialogContent>
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"名前(これは表示されません)"}
                            inputRef={nameRef}
                            defaultValue={!props.information ? "" : props.information.name}
                            fullWidth
                            required
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/* content */}
                        <TextField
                            type={"text"}
                            name={"content"}
                            id={"content"}
                            label={"内容"}
                            inputRef={contentRef}
                            defaultValue={!props.information ? "" : props.information.content}
                            fullWidth
                            multiline
                            required
                            rows={5}
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