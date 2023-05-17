import {Team} from "../../../../src/models/TeamModel";
import {Button, Link, TableCell, TableRow} from "@mui/material";
import {ConfirmDialog} from "../../ConfirmDialog";
import {useState} from "react";
import {gameFactory} from "../../../../src/models/GameModel";

export function GameEntryContent(props: { gameId: number, entry: Team, refresh: VoidFunction}) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const deleteEntry = async () => {
        await gameFactory().removeGameEntry(
            props.gameId,
            props.entry.id
        )

        props.refresh()
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    <Link
                            href={`/admin/teams/${props.entry.id}`}
                    >
                        {props.entry.id}
                    </Link>
                </TableCell>
                <TableCell>{props.entry.name}</TableCell>
                <TableCell>{props.entry.description}</TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    <Button
                        onClick={() => setIsDeleteOpen(true)}
                    >
                        削除
                    </Button>
                </TableCell>
            </TableRow>
            {/*delete*/}
            <ConfirmDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteEntry()}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.entry.name}を削除しますか？</p>
            </ConfirmDialog>
        </>
    )
}