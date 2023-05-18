import {UsersContext} from "../../context";
import {useContext} from "react";
import {UserContent} from "./UserContent";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export function UserList() {
    const {data: users, refresh} = useContext(UsersContext)
    const userComponents = users.map(user => {
        return (
            <UserContent user={user} key={user.id} refresh={refresh}/>
        )
    })


    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 650,
                    }}
                    aria-label={"user table"}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                名前
                            </TableCell>
                            <TableCell>
                                学籍番号
                            </TableCell>
                            <TableCell>
                                所属クラス
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "200px"
                                }}
                            >
                                最終更新日時
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "200px"
                                }}
                            >
                                アクション
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}