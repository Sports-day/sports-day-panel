import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Image} from "../../../src/models/ImageModel";
import { ImageContent } from "./ImageContent";

export function ImageList(props: { images: Image[], refresh: VoidFunction }) {

    const imageComponents = props.images.map(image => {
        return (
            <ImageContent image={image} refresh={props.refresh} key={image.id} />
        )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        width: "600px",
                    }}
                    aria-label={"images table"}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                                名前
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
                        {imageComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}