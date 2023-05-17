import {Team} from "../../../../src/models/TeamModel";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {GameEntryContent} from "./GameEntryContent";

export function GameEntryList(props: { entries: Team[], gameId: number, refresh: VoidFunction }) {
    const gameEntryComponents = props.entries.map(entry => {
        return (
            <GameEntryContent gameId={props.gameId} entry={entry} refresh={props.refresh} key={entry.id} />
        )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 400,
                    }}
                    aria-label={"game entries table"}
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
                        {gameEntryComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
