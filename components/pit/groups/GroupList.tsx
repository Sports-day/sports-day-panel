import {GroupContent} from "./GroupContent";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext} from "react";
import {GroupsContext} from "../../context";

export function GroupList() {
    const {data: groups, refresh} = useContext(GroupsContext)
    const groupComponents = groups.map(group => {
        return (
            <GroupContent group={group} key={group.id} refresh={refresh}/>
        )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 650,
                    }}
                    aria-label={"groups table"}
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
                        {groupComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}