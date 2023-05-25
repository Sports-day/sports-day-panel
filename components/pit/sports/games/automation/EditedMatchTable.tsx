import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {EditedMatch} from "./AutomaticMatchEditor";
import {EditedMatchContent} from "./EditedMatchContent";
import {Team} from "../../../../../src/models/TeamModel";

export type EditedMatchTableProps = {
    editedMatches: EditedMatch[]
    entries: Team[]
}

export function EditedMatchTable(props: EditedMatchTableProps) {

    const editedMatchComponents = props.editedMatches
        .sort((a, b) => a.startAt.localeCompare(b.startAt))
        .map((editedMatch, index) => {
            return (
                <EditedMatchContent editedMatch={editedMatch} entries={props.entries} key={index}/>
            )
        })

    return (
        <>
            <TableContainer>
                <Table
                    aria-label="matchs edited table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                チーム(L)
                            </TableCell>
                            <TableCell>
                                チーム(R)
                            </TableCell>
                            <TableCell>
                                審判
                            </TableCell>
                            <TableCell>
                                試合開始時間
                            </TableCell>
                            <TableCell>
                                状態
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editedMatchComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}