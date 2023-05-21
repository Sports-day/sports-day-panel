import {Image, imageFactory} from "../../../src/models/ImageModel";
import {Avatar, Button, TableCell, TableRow} from "@mui/material";
import {useState} from "react";
import {ConfirmDialog} from "../ConfirmDialog";


export function ImageContent(props: { image: Image, refresh: VoidFunction }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const deleteImage = async () => {
        await imageFactory().delete(props.image.id)

        props.refresh()
        setIsDeleteOpen(false)
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    {/*image*/}
                    <Avatar
                        sx={{
                            width: "40px",
                            height: "40px",
                        }}
                        src={props.image.attachment}
                    />
                </TableCell>
                <TableCell>{props.image.name}</TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    {new Date(props.image.createdAt).toLocaleString("ja-JP")}
                </TableCell>
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
                onConfirm={() => deleteImage()}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.image.name}を削除しますか？</p>
            </ConfirmDialog>
        </>
    )
}