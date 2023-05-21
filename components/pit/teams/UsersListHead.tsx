import {ReactNode, useContext, useState} from "react";
import {ClassesContext, UsersContext} from "../../context";
import {User} from "../../../src/models/UserModel";
import styles from "../../../styles/Pit.module.scss";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";


export function UsersListHead(props: { children: ReactNode }) {
    return (
        <>
            {/*table*/}
            <TableContainer>
                <Table
                    sx={{
                        mt: "80px",
                    }}
                    aria-label={"users table"}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell padding={"checkbox"}>
                            </TableCell>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                学籍番号
                            </TableCell>
                            <TableCell>
                                名前
                            </TableCell>
                            <TableCell>
                                所属クラス
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.children}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}