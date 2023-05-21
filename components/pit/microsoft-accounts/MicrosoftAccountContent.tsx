import {MicrosoftAccount, microsoftAccountFactory} from "../../../src/models/MicrosoftAccountModel";
import {Button, Link, TableCell, TableRow} from "@mui/material";
import {ConfirmDialog} from "../ConfirmDialog";
import {useContext, useState} from "react";
import {UsersContext} from "../../context";
import {MicrosoftAccountEditForm} from "./MicrosoftAccountEditForm";

export type MicrosoftAccountContent = {
    microsoftAccount: MicrosoftAccount
    refresh: VoidFunction
}

export function MicrosoftAccountContent(props: MicrosoftAccountContent) {
    //  context
    const {data: users} = useContext(UsersContext)
    //  state
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    //  linked User
    const linkedUser = users.find(user => user.id === props.microsoftAccount.userId)

    const deleteMicrosoftAccount = async () => {
        await microsoftAccountFactory().delete(props.microsoftAccount.id)

        props.refresh()
        setIsDeleteOpen(false)
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>{props.microsoftAccount.id}</TableCell>
                <TableCell>{props.microsoftAccount.name}</TableCell>
                <TableCell>{props.microsoftAccount.mailAccountName}</TableCell>
                <TableCell>{props.microsoftAccount.role}</TableCell>
                <TableCell>
                    {linkedUser &&
                        <Link
                            href={`/admin/users/${linkedUser.id}`}
                        >
                            {linkedUser.name}
                        </Link>
                    }
                </TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    {new Date(props.microsoftAccount.lastLogin).toLocaleString("ja-JP")}
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
            <MicrosoftAccountEditForm
                isOpen={isEditOpen}
                setClose={() => setIsEditOpen(false)}
                refresh={props.refresh}
                microsoftAccount={props.microsoftAccount}
            />
            {/*delete*/}
            <ConfirmDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteMicrosoftAccount()}
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <p>{props.microsoftAccount.name}を削除しますか？</p>
            </ConfirmDialog>
        </>
    )
}