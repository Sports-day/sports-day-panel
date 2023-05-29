import {Button, TableCell, TableRow} from "@mui/material";
import {useState} from "react";
import {ConfirmInputDialog} from "../ConfirmInputDialog";
import {Information, informationFactory} from "../../../src/models/InformationModel";
import {InformationForm} from "./InformationForm";

export function InformationContent(props: { information: Information, refresh: VoidFunction }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const deleteGroup = async () => {
        await informationFactory().delete(props.information.id)
        props.refresh()
        setIsDeleteOpen(false)
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>{props.information.id}</TableCell>
                <TableCell>{props.information.name}</TableCell>
                <TableCell>{props.information.content}</TableCell>
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
            <InformationForm
                isOpen={isEditOpen}
                setClose={() => setIsEditOpen(false)}
                formType={"edit"}
                refresh={props.refresh}
                information={props.information}
            />
            {/*delete*/}
            <ConfirmInputDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteGroup()}
                confirmText={"削除"}
                confirmKeyword={props.information.name}
                confirmColor={"warning"}
            >
                <p>{props.information.name}を削除しますか？</p>
            </ConfirmInputDialog>
        </>
    )
}