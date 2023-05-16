import {FormType} from "../../../types";
import {Sport, sportFactory} from "../../../src/models/SportModel";
import React, {FormEvent, useRef, useState} from "react";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel, MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps
} from "@mui/material";
import {useFetchImages} from "../../../src/features/images/hook";

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
    //  state
    const [iconIdState, setIconIdState] = useState<string>(props.sport?.iconId?.toString() ?? '')
    //  images
    const {images} = useFetchImages()

    const handleImageIdChange = (e: SelectChangeEvent) => {
        setIconIdState(e.target.value.toString())
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  weight invalid
        if (isNaN(parseInt(wightRef.current?.value as string))) {
            return
        }

        if (props.formType === "create") {
            await sportFactory().create({
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                iconId: iconIdState === '' ? null : +iconIdState,
                weight: wightRef.current?.value as number
            })
        } else {
            const id = props.sport?.id
            if(!id) return

            await sportFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    description: descriptionRef.current?.value as string,
                    iconId: iconIdState === '' ? null : +iconIdState,
                    weight: wightRef.current?.value as number
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
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"競技名"}
                            inputRef={nameRef}
                            defaultValue={!props.sport ? "" : props.sport.name}
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
                            defaultValue={!props.sport ? "" : props.sport.description}
                            fullWidth
                            required
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/* weight */}
                        <TextField
                            type={"text"}
                            name={"weight"}
                            id={"weight"}
                            label={"重み(0~100)"}
                            inputRef={wightRef}
                            defaultValue={!props.sport ? "0" : props.sport.weight}
                            fullWidth
                            required
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/* icon */}
                        <InputLabel id="icon-select">アイコン</InputLabel>
                        <Select
                            labelId={"icon-select"}
                            id={"icon"}
                            label={"アイコン"}
                            value={iconIdState}
                            sx={{
                                width: "300px",
                                mb: '20px'
                            }}
                            onChange={handleImageIdChange}
                        >
                            {
                                images?.map((image) => {
                                    return (
                                        <MenuItem
                                            value={image.id}
                                            key={image.id}
                                        >
                                            {image.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
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