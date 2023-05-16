import {FormType} from "../../../types";
import {Group, groupFactory} from "../../../src/models/GroupModel";
import React, {useContext, useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, InputLabel, MenuItem, Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps
} from "@mui/material";
import {useFetchClasses} from "../../../src/features/classes/hooks";
import {teamFactory} from "../../../src/models/TeamModel";

export type TeamCreateFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
}

export function TeamCreateForm(props: TeamCreateFormProps) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    //  context
    const {classes} = useFetchClasses()
    const [classState, setClassState] = useState<string>('')

    const handleClassChange = (e: SelectChangeEvent) => {
        setClassState(e.target.value.toString())
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!classes.some(classModel => classModel.id === +classState)) {
            return
        }

        await teamFactory().create({
            name: nameRef.current?.value as string,
            description: descriptionRef.current?.value as string,
            classId: +classState
        })

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
                        Team作成
                    </DialogTitle>
                    <DialogContent>
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"チーム名"}
                            inputRef={nameRef}
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
                            fullWidth
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/* class */}
                        <InputLabel id="class-select">クラス</InputLabel>
                        <Select
                            labelId={"class-select"}
                            id={"class"}
                            label={"クラス"}
                            value={classState}
                            sx={{
                                width: "300px"
                            }}
                            onChange={handleClassChange}
                            required
                        >
                            {
                                classes?.map((classModel) => {
                                    return (
                                        <MenuItem
                                            value={classModel.id}
                                            key={classModel.id}
                                        >
                                            {classModel.name}
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
                            作成
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}