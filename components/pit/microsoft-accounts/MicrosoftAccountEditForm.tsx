import {MicrosoftAccount, microsoftAccountFactory} from "../../../src/models/MicrosoftAccountModel";
import React, {useContext, useState} from "react";
import {ClassesContext, UsersContext} from "../../context";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent, DialogTitle, InputLabel, MenuItem, Select,
    SelectChangeEvent,
    TableCell,
    TableRow, TextField, Typography
} from "@mui/material";
import {User} from "../../../src/models/UserModel";
import {UsersListHead} from "../teams/UsersListHead";

export type MicrosoftAccountEditFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
    microsoftAccount: MicrosoftAccount
}

export function MicrosoftAccountEditForm(props: MicrosoftAccountEditFormProps) {
    //  Role
    const [roleState, setRoleState] = useState<string>(props.microsoftAccount.role.toString() ?? '')
    //  Linked User
    const [linkedUser, setLinkedUser] = useState<number>(props.microsoftAccount.userId ?? -1)

    //  context
    const {data: users} = useContext(UsersContext)
    const {data: classes} = useContext(ClassesContext)
    //  state
    const [filterWord, setFilterWord] = useState("")
    const [isOpenSelectUser, setIsOpenSelectUser] = useState(false)

    const linkedUserModel = users.find(user => user.id === props.microsoftAccount.userId)

    const userComponents = users
        .filter(user => {
            if (filterWord == "") return true
            const classModel = classes?.find(classModel => classModel.id === user.classId)

            return user.name.includes(filterWord)
                || user.id.toString().includes(filterWord)
                || user.studentId.toString().includes(filterWord)
                || classModel?.name.includes(filterWord)
        }).map(user => {
            return (
                <User
                    key={user.id}
                    user={user}
                    onClick={() => {
                        setLinkedUser(user.id)
                        setIsOpenSelectUser(false)
                    }}
                />
            )
        })

    const handleRoleChange = (e: SelectChangeEvent) => {
        setRoleState(e.target.value.toString())
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        //  not selected
        if (linkedUser === -1) {
            alert("ユーザーを選択してください。")
            return
        }

        //  linked user id not exist
        if (!users.some(user => user.id === +linkedUser)) {
            alert("ユーザーが存在しません。")
            return
        }

        //  role
        await microsoftAccountFactory().setRole(
            props.microsoftAccount.id,
            roleState
        )

        //  link User
        await microsoftAccountFactory().linkUser(
            props.microsoftAccount.id,
            linkedUser
        )

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
                <form onSubmit={handleSubmit}>
                    <DialogTitle>
                        {props.microsoftAccount.name}の編集
                    </DialogTitle>

                    <DialogContent>
                        {/* role */}
                        <InputLabel id="role-select">ロール</InputLabel>
                        <Select
                            labelId={"role-select"}
                            id={"role"}
                            label={"ロール"}
                            value={roleState}
                            sx={{
                                width: "300px"
                            }}
                            onChange={handleRoleChange}
                            required
                        >
                            <MenuItem
                                value={"ADMIN"}
                            >
                                ADMIN
                            </MenuItem>
                            <MenuItem
                                value={"USER"}
                            >
                                USER
                            </MenuItem>
                        </Select>

                        {/* linked user */}
                        <Typography
                            sx={{
                                mt: "40px"
                            }}
                        >
                            紐付けされたユーザー: {linkedUserModel?.name ?? "なし"}
                        </Typography>
                        <Button
                            variant={"contained"}
                            onClick={() => setIsOpenSelectUser(true)}
                            sx={{
                                mt: "10px"
                            }}
                        >
                            紐付けユーザーを変更
                        </Button>

                    </DialogContent>

                    <DialogActions>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                        >
                            保存
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* select user dialog */}
            <Dialog
                open={isOpenSelectUser}
                onClose={() => setIsOpenSelectUser(false)}
                maxWidth={"lg"}
                fullWidth
            >
                <DialogTitle>
                    ユーザーを選択
                </DialogTitle>
                <DialogContent>
                    {/*filter*/}
                    <TextField
                        type={"text"}
                        name={"filter"}
                        label={"検索フィルタ"}
                        variant={"standard"}
                        onChange={(event) => {
                            setFilterWord(event.target.value)
                        }}
                        sx={{
                            position: "absolute",
                            right: "20px",
                            top: "20px",
                            width: "200px"
                        }}
                    />
                    <UsersListHead>
                        {userComponents}
                    </UsersListHead>
                </DialogContent>
            </Dialog>
        </>
    )


}

function User(props: { user: User, onClick: VoidFunction }) {
    const {data: classes} = useContext(ClassesContext)
    const classModel = classes?.find(classModel => classModel.id === props.user.classId)

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                onClick={props.onClick}
            >
                <TableCell></TableCell>
                <TableCell>{props.user.id}</TableCell>
                <TableCell>{props.user.studentId}</TableCell>
                <TableCell>

                    <span
                        style={{
                            color: props.user.gender == "male" ? "black" : "red"
                        }}
                    >
                        {props.user.name}
                    </span>
                </TableCell>
                <TableCell>{classModel?.name}</TableCell>
            </TableRow>
        </>
    )
}