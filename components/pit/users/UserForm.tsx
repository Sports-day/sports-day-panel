import {FormType} from "../../../types";
import {User, userFactory} from "../../../src/models/UserModel";
import React, {FormEvent, useContext, useRef, useState} from "react";
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
import {ClassesContext} from "../../context";

export type UserFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    formType: FormType
    refresh: VoidFunction
    user?: User
}

export function UserForm(props: UserFormProps) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const studentIdRef = useRef<TextFieldProps>(null)
    //  state
    const [classState, setClassState] = useState<string>(props.user?.classId.toString() ?? '')
    const [genderState, setGenderState] = useState<string>(props.user?.gender.toString() ?? '')
    //  context
    const {data: classes} = useContext(ClassesContext)


    const handleClassChange = (e: SelectChangeEvent) => {
        setClassState(e.target.value.toString())
    }

    const handleGenderChange = (e: SelectChangeEvent) => {
        setGenderState(e.target.value.toString())
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  class id not exist
        if (!classes.some(class_ => class_.id === +classState)) {
            return
        }

        //  gender invalid
        if (genderState !== "male" && genderState !== "female") {
            return
        }

        if (props.formType === "create") {
            await userFactory().create({
                name: nameRef.current?.value as string,
                studentId: studentIdRef.current?.value as string,
                classId: +classState,
                gender: genderState
            })
        } else {
            const id = props.user?.id
            if(!id) return

            await userFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    studentId: studentIdRef.current?.value as string,
                    classId: +classState,
                    gender: genderState
                })
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
                        {props.formType === "create" ? "ユーザー作成" : "ユーザー編集"}
                    </DialogTitle>
                    <DialogContent>
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"ユーザー名"}
                            inputRef={nameRef}
                            defaultValue={!props.user ? "" : props.user.name}
                            fullWidth
                            required
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/* studentId */}
                        <TextField
                            type={"text"}
                            name={"studentId"}
                            id={"studentId"}
                            label={"学籍番号"}
                            inputRef={studentIdRef}
                            defaultValue={!props.user ? "" : props.user.studentId}
                            fullWidth
                            required
                            sx={{
                                my: '20px'
                            }}
                        />
                        {/* gender */}
                        <InputLabel id="gender-select">性別</InputLabel>
                        <Select
                            labelId={"gender-select"}
                            id={"gender"}
                            label={"性別"}
                            value={genderState}
                            sx={{
                                width: "200px",
                                mb: '20px'
                            }}
                            onChange={handleGenderChange}
                            required
                        >
                            <MenuItem
                                value={"male"}
                            >
                                男性
                            </MenuItem>
                            <MenuItem
                                value={"female"}
                            >
                                女性
                            </MenuItem>
                        </Select>
                        {/* class */}
                        <InputLabel id="class-select">所属クラス</InputLabel>
                        <Select
                            labelId={"class-select"}
                            id={"class"}
                            label={"所属クラス"}
                            value={classState}
                            sx={{
                                width: "300px",
                                mb: '20px'

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