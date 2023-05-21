import {Location, locationFactory} from "../../../src/models/LocationModel";
import {useState} from "react";
import {Button, TableCell, TableRow} from "@mui/material";
import {ConfirmDialog} from "../ConfirmDialog";
import {LocationForm} from "./LocationForm";


export function LocationContent(props: { location: Location, refresh: VoidFunction }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const deleteLocation = async () => {
        await locationFactory().delete(props.location.id)

        props.refresh()
        setIsDeleteOpen(false)
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>{props.location.id}</TableCell>
                <TableCell>{props.location.name}</TableCell>
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
            <LocationForm
                isOpen={isEditOpen}
                setClose={() => setIsEditOpen(false)}
                formType={"edit"}
                refresh={props.refresh}
                location={props.location}
            />
            {/*delete*/}
            <ConfirmDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteLocation()}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.location.name}を削除しますか？</p>
            </ConfirmDialog>
        </>
    )
}