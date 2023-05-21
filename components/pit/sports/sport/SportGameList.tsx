import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Game} from "../../../../src/models/GameModel";
import {SportGameContent} from "./SportGameContent";

export function SportGameList(props: { games: Game[] }) {
    const sportGameComponents = props.games.map(game => {
        return (
            <SportGameContent game={game} key={game.id} />
        )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 650,
                    }}
                    aria-label={"sports games table"}
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
                                大会形式
                            </TableCell>
                            <TableCell>
                                採点方式
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sportGameComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}