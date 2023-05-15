import React, {useContext, useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, InputLabel, MenuItem,
    Select, SelectChangeEvent,
    TextField,
    TextFieldProps
} from "@mui/material";
import {FormType} from "../../../types";
import {Class, classFactory} from "../../../src/models/ClassModel";
import {GroupsContext} from "../context";

export type ClassFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    formType: FormType
    refresh: VoidFunction
    class?: Class
}

export function ClassForm(props: ClassFormProps) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    //  state
    const [groupState, setGroupState] = useState<string>(props.class?.groupId.toString() ?? '')
    //  get groups
    const {data: groups} = useContext(GroupsContext)

    const handleGroupChange = (e: SelectChangeEvent) => {
        setGroupState(e.target.value.toString())
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        //  group id not exist
        if (!groups.some(group => group.id === +groupState)) {
            return
        }

        if (props.formType === "create") {
            await classFactory().create({
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                groupId: +groupState
            })


        } else {
            const id = props.class?.id
            if(!id) return

            await classFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    description: descriptionRef.current?.value as string,
                    groupId: +groupState
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
                        {props.formType === "create" ? "クラス作成" : "クラス編集"}
                    </DialogTitle>
                    <DialogContent>
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"グループ名"}
                            inputRef={nameRef}
                            defaultValue={!props.class ? "" : props.class.name}
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
                            defaultValue={!props.class ? "" : props.class.description}
                            fullWidth
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/* group */}
                        <InputLabel id="group-select">グループ</InputLabel>
                        <Select
                            labelId={"group-select"}
                            id={"group"}
                            label={"グループ"}
                            value={groupState}
                            sx={{
                                width: "300px"
                            }}
                            onChange={handleGroupChange}
                            required
                        >
                            {
                                groups?.map((group) => {
                                    return (
                                        <MenuItem
                                            value={group.id}
                                            key={group.id}
                                        >
                                            {group.name}
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