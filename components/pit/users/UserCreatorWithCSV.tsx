import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select, SelectChangeEvent,
    TextField, TextFieldProps
} from "@mui/material";
import React, {FormEvent, useContext, useRef, useState} from "react";
import {ClassesContext} from "../../context";
import {userFactory, Gender} from "../../../src/models/UserModel";


export type Props = {
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
}

type UserData = {
    name: string
    studentId: string
    gender: string
}

export function UserCreatorWithCSV(props: Props) {
    //  ref
    const dataRef = useRef<TextFieldProps>(null)
    //  state
    const [classState, setClassState] = useState<string>('-1')
    const [progress, setProgress] = useState<number>(0)
    const [isExecuting, setIsExecuting] = useState<boolean>(false)

    const {data: classes} = useContext(ClassesContext)

    const handleClassChange = (e: SelectChangeEvent) => {
        setClassState(e.target.value.toString())
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  class not selected
        if (classState === "-1") {
            alert("クラスを選択してください。")
            return
        }

        //  class id not exist
        if (!classes.some(class_ => class_.id === +classState)) {
            alert("クラスが存在しません。")
            return
        }

        //  parse csv
        const csv = dataRef.current?.value as string
        const lines = csv.split("\n")
        const users: UserData[] = []

        for (const line of lines) {
            const elements = line.split(",")

            //  invalid csv
            if (elements.length !== 3) {
                alert("CSVデータが不正です。")
                return
            }

            //  gender
            if (!["male", "female"].includes(elements[2])) {
                alert("性別はmaleかfemaleで指定してください。")
                return
            }

            users.push({
                name: elements[1],
                studentId: elements[0],
                gender: elements[2]
            })
        }

        //  execute
        setIsExecuting(true)
        setProgress(0)

        var index = 0
        for (const user of users) {
            await userFactory().create({
                name: user.name,
                studentId: user.studentId,
                gender: user.gender as Gender,
                classId: +classState
            })

            //  increment progress
            index++
            setProgress((index) / users.length * 100)

            //  deley for api server load
            await timeout(500);
        }


        setIsExecuting(false)

        //  refresh
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
                        ユーザー一括作成
                    </DialogTitle>
                    <DialogContent>
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"data"}
                            id={"data"}
                            label={"CSVデータ"}
                            inputRef={dataRef}
                            fullWidth
                            required
                            multiline
                            sx={{
                                my: '20px'
                            }}
                        />
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
                            <MenuItem
                                value={"-1"}
                                sx={{
                                    color: "red"
                                }}
                            >
                                未選択
                            </MenuItem>
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

                        {isExecuting &&
                            <LinearProgress variant="determinate" value={progress}/>
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

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}