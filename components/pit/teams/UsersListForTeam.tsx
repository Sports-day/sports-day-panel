import styles from "../../../styles/Pit.module.scss";
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    TextFieldProps
} from "@mui/material";
import {User} from "../../../src/models/UserModel";
import {useContext, useRef, useState} from "react";
import {ClassesContext, UsersContext} from "../../context";
import {UsersListHead} from "./UsersListHead";

export type UsersListForTeamProps = {
    ignoreUsers: User[]
    selectedUsers: number[]
    setSelectedUsers: (users: number[]) => void
}

export function UsersListForTeam(props: UsersListForTeamProps) {
    const {data: users} = useContext(UsersContext)
    const {data: classes} = useContext(ClassesContext)
    //  state
    const [filterWord, setFilterWord] = useState("")


    const addUser = (userId: number) => {
        props.setSelectedUsers([...props.selectedUsers, userId])
    }

    const removeUser = (userId: number) => {
        props.setSelectedUsers(props.selectedUsers.filter(id => id !== userId))
    }


    const ignoreUserIds = props.ignoreUsers.map(user => user.id)
    const userComponents = users
        .filter(user => !ignoreUserIds.includes(user.id))
        .filter(user => {
            if (filterWord == "") return true
            const classModel = classes?.find(classModel => classModel.id === user.classId)

            return filterWord.split("\n").some(uWord => {
                const word = uWord
                    .replace("◎", "")
                    .replace("　", "")
                    .replace(" ", "")
                return user.name.includes(word)
                    || user.id.toString().includes(word)
                    || user.studentId.toString().includes(word)
                    || classModel?.name.includes(word)
            })
        }).map(user => {
            return (
                <User
                    user={user}
                    addUser={addUser}
                    removeUser={removeUser}
                    key={user.id}
                />
            )
        })

    return (
        <>
            <div className={styles.content}>
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
                    multiline
                    rows={2}
                />

                {/*table*/}
                <UsersListHead>
                    {userComponents}
                </UsersListHead>
            </div>

        </>
    )
}


function User(props: { user: User, addUser: (user: number) => void, removeUser: (user: number) => void }) {
    const {data: classes} = useContext(ClassesContext)
    const classModel = classes?.find(classModel => classModel.id === props.user.classId)

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell padding={"checkbox"}>
                    <Checkbox
                        color={"primary"}
                        onChange={(event) => {
                            if (event.target.checked) {
                                props.addUser(props.user.id)
                            } else {
                                props.removeUser(props.user.id)
                            }
                        }}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
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