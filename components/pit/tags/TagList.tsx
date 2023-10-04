import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext} from "react";
import {TagContext} from "../../context";
import {TagContent} from "./TagContent";

export function TagList() {
    const { data: tags, refresh } = useContext(TagContext)

    const tagComponents = tags.map((tag) => {
      return (
          <TagContent tag={tag} key={tag.id} refresh={refresh} />
      )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 650,
                    }}
                    aria-label={"user table"}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                タグ名
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "100px"
                                }}
                            >
                                有効化
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
                        {tagComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
