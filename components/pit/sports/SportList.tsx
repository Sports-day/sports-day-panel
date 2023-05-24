import {SportsContext} from "../../context";
import {useContext} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { SportContent } from "./SportContent";

export function SportList() {
    const {data: sports, refresh} = useContext(SportsContext)
    const sportComponents = sports
        .sort((a, b) => b.weight - a.weight)
        .map(sport => {
        return (
            <SportContent sport={sport} key={sport.id} refresh={refresh}/>
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
                                説明
                            </TableCell>
                            <TableCell>
                                重み
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
                        {sportComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}