import {useContext} from "react";
import {MicrosoftAccountsContext} from "../context";
import {MicrosoftAccountContent} from "./MicrosoftAccountContent";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export function MicrosoftAccountList() {
    const {data: microsoftAccounts, refresh} = useContext(MicrosoftAccountsContext)
    const microsoftAccountComponents = microsoftAccounts.map(microsoftAccount => {
        return (
            <MicrosoftAccountContent
                microsoftAccount={microsoftAccount}
                refresh={refresh}
                key={microsoftAccount.id}
            />
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
                                メールアカウント名
                            </TableCell>
                            <TableCell>
                                ロール
                            </TableCell>
                            <TableCell>
                                紐付けユーザー
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "200px"
                                }}
                            >
                                最終ログイン日時
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
                        {microsoftAccountComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}