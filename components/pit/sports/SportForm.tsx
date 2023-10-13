import {FormType} from "../../../types";
import {Sport, sportFactory} from "../../../src/models/SportModel";
import React, {FormEvent, useContext, useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SelectChangeEvent,
    TextFieldProps
} from "@mui/material";
import {SportEditFields} from "./SportEditFields";
import {ImagesContext, TagContext} from "../../context";

export type SportFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    formType: FormType
    refresh: VoidFunction
    sport?: Sport
}

export function SportForm(props: SportFormProps) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const wightRef = useRef<TextFieldProps>(null)
    const ruleIdRef = useRef<TextFieldProps>(null)
    //  state
    const [iconIdState, setIconIdState] = useState<string>(props.sport?.iconId?.toString() ?? '-1')
    const [tagIdState, setTagIdState] = useState<string>(props.sport?.tagId?.toString() ?? '-1')

    //  images
    const {data: images} = useContext(ImagesContext)
    const {data: tags } = useContext(TagContext)

    const handleImageIdChange = (e: SelectChangeEvent) => {
        setIconIdState(e.target.value.toString())
    }

    const handleTagIdChange = (e: SelectChangeEvent) => {
        setTagIdState(e.target.value.toString())
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  weight invalid
        if (isNaN(parseInt(wightRef.current?.value as string))) {
            alert("重みは数値で入力してください。(0~100)")
            return
        }

        //  ruleId invalid
        if (isNaN(parseInt(ruleIdRef.current?.value as string))) {
            alert("ルールIdは数値で入力してください。")
            return
        }

        //  iconId invalid
        if (iconIdState !== '-1' && !images?.some(image => image.id === +iconIdState)) {
            alert('アイコンが正しく選択されていません。')
            return
        }

        //  tagId invalid
        if (tagIdState !== '-1' && !tags?.some(tag => tag.id === +tagIdState)) {
            alert('タグが正しく選択されていません。')
            return
        }

        if (props.formType === "create") {
            await sportFactory().create({
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                iconId: iconIdState === '-1' ? null : +iconIdState,
                weight: wightRef.current?.value as number,
                ruleId: ruleIdRef.current?.value as number,
                tagId: tagIdState === '-1' ? null : +tagIdState,
            })
        } else {
            const id = props.sport?.id
            if (!id) return

            await sportFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    description: descriptionRef.current?.value as string,
                    iconId: iconIdState === '' ? null : +iconIdState,
                    weight: wightRef.current?.value as number,
                    ruleId: ruleIdRef.current?.value as number,
                    tagId: tagIdState === '-1' ? null : +tagIdState,
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
                        {props.formType === "create" ? "競技作成" : "競技編集"}
                    </DialogTitle>
                    <DialogContent>

                        <SportEditFields
                            nameRef={nameRef}
                            descriptionRef={descriptionRef}
                            wightRef={wightRef}
                            ruleIdRef={ruleIdRef}
                            iconIdState={iconIdState}
                            tagIdState={tagIdState}
                            handleImageIdChange={handleImageIdChange}
                            handleTagIdChange={handleTagIdChange}
                            images={images}
                            tags={tags}
                            sport={props.sport}
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