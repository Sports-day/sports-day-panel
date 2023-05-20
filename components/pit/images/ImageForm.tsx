import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    TextField,
    TextFieldProps
} from "@mui/material";
import React, {FormEvent, useRef, useState} from "react";
import {imageFactory} from "../../../src/models/ImageModel";

export type ImageFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
}

export function ImageForm(props: ImageFormProps) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    //  state
    const [imageBase64, setImageBase64] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!imageBase64) {
            alert("画像を選択してください")
            return
        }

        await imageFactory().create({
            name: nameRef.current?.value as string,
            attachment: imageBase64
        })

        props.refresh()
        props.setClose()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const file = files[0]
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.result !== null && reader.result.toString().length >= 16777215) {
                alert("ファイルサイズが大きすぎます。")
                return
            }
            setImageBase64(reader.result as string)

            //  @ts-ignore
            console.log(reader.result.toString().length)
        }
        reader.readAsDataURL(file)
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
                        画像作成
                    </DialogTitle>
                    <DialogContent>
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"画像名"}
                            inputRef={nameRef}
                            fullWidth
                            required
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/*image*/}
                        <InputLabel id="image">画像</InputLabel>
                        <input
                            type={"file"}
                            name={"image"}
                            id={"image"}
                            onChange={handleImageChange}
                        />

                        {imageBase64 !== null &&
                            <Avatar
                                sx={{
                                    width: "100px",
                                    height: "100px",
                                }}
                                src={imageBase64}
                            />
                        }
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
                            作成
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}