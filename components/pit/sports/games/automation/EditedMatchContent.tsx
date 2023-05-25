import {EditedMatch} from "./AutomaticMatchEditor";
import {TableCell, TableRow} from "@mui/material";
import React from "react";
import {Team} from "../../../../../src/models/TeamModel";

export type EditedMatchContentProps = {
    editedMatch: EditedMatch
    entries: Team[]
}

export function EditedMatchContent(props: EditedMatchContentProps) {

    let status = ""
    if (props.editedMatch.status === "success") {
        status = "✅"
    } else if (props.editedMatch.status === "not_link_yet") {
        status = "⚠️未リンク"
    } else if (props.editedMatch.status === "not_found_match") {
        status = "❌見つかりませんでした"
    } else if (props.editedMatch.status === "team_invalid") {
        status = "❌チームが無効です"
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    {props.editedMatch.id}
                </TableCell>
                <TableCell>
                    {props.editedMatch.leftTeamName}
                </TableCell>
                <TableCell>
                    {props.editedMatch.rightTeamName}
                </TableCell>
                <TableCell>
                    {props.editedMatch.judge}
                </TableCell>
                <TableCell>
                    {new Date(props.editedMatch.startAt).toLocaleString("ja-JP")}
                </TableCell>
                <TableCell>
                    {status}
                </TableCell>
            </TableRow>
        </>
    )
}