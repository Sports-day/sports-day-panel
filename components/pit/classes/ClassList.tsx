import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ClassContent} from "./ClassContent";
import {useContext} from "react";
import {ClassesContext} from "../context";

export function ClassList() {
    const {data: classes, refresh} = useContext(ClassesContext)
    const classComponents = classes.map(classModel => {
        return (
            <ClassContent class={classModel} key={classModel.id} refresh={refresh}/>
        )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 650,
                    }}
                    aria-label={"classes table"}
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
                                説明(任意)
                            </TableCell>
                            <TableCell>
                                所属グループ
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
                        {classComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}