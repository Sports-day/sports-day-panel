import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext} from "react";
import {InformationContext} from "../../context";
import { InformationContent } from "./InformationContent";

export function InformationList() {
    const {data: allInformation, refresh} = useContext(InformationContext)
    const groupComponents = allInformation.map(information => {
        return (
            <InformationContent information={information} key={information.id} refresh={refresh}/>
        )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 650,
                    }}
                    aria-label={"information table"}
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
                                内容
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