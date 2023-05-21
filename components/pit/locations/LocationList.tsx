import {Location} from "../../../src/models/LocationModel";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { LocationContent } from "./LocationContent";

export function LocationList(props: {locations: Location[], refresh: VoidFunction}) {

    const locationComponents = props.locations.map(location => {
        return (
            <LocationContent location={location} refresh={props.refresh}  key={location.id} />
        )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        width: "600px",
                    }}
                    aria-label={"locations table"}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
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
                        {locationComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}