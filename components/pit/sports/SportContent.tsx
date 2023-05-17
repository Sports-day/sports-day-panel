import {Sport, sportFactory} from "../../../src/models/SportModel";
import {Button, Link, TableCell, TableRow} from "@mui/material";
import {ConfirmInputDialog} from "../ConfirmInputDialog";
import {useState} from "react";
import {SportForm} from "./SportForm";

export function SportContent(props: { sport: Sport, refresh: VoidFunction }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)


    const deleteSport = async () => {
        await sportFactory().delete(props.sport.id)

        props.refresh()
    }
    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    <Link
                        href={`/admin/sports/${props.sport.id}`}
                    >
                        {props.sport.id}
                    </Link>
                </TableCell>
                <TableCell>{props.sport.name}</TableCell>
                <TableCell>{props.sport.description}</TableCell>
                <TableCell>{props.sport.weight}</TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    {new Date(props.sport.updatedAt).toLocaleString("ja-JP")}
                </TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    <Button
                        onClick={() => setIsEditOpen(true)}
                    >
                        編集
                    </Button>
                    <Button
                        onClick={() => setIsDeleteOpen(true)}
                    >
                        削除
                    </Button>
                </TableCell>
            </TableRow>
            {/*edit*/}
            <SportForm
                isOpen={isEditOpen}
                setClose={() => setIsEditOpen(false)}
                formType={"edit"}
                refresh={props.refresh}
                sport={props.sport}
            />
            {/*delete*/}
            <ConfirmInputDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteSport()}
                confirmKeyword={props.sport.name}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.sport.name}を削除しますか？</p>
            </ConfirmInputDialog>
        </>
    )
}