import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import {Team} from "../../../src/models/TeamModel";
import {TeamContent} from "./TeamContent";

export function TeamList(props: { teams: Team[], refresh: VoidFunction }) {
    const teamComponents = props.teams
        .sort((a, b) => a.id - b.id)
        .map(team => {
            return (
                <TeamContent team={team} refresh={props.refresh} key={team.id}/>
            )
        })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 650,
                    }}
                    aria-label={"teams table"}
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
                                    width: "150px"
                                }}
                            >
                                アクション
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}