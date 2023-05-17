import styles from "../../../../../styles/Pit.module.scss";
import {GameContext} from "../../../context";
import {useContext} from "react";
import {useFetchGameMatches} from "../../../../../src/features/games/hook";
import {Box, CircularProgress, TableCell, TableContainer , TableRow} from "@mui/material";
import {styled} from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: "1px solid #000"
}));

export function LeagueTable() {
    const {data: game} = useContext(GameContext)
    const {matches, isFetching} = useFetchGameMatches(game.id)

    return (
        <>
            {isFetching ?
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: "100px",
                    }}
                >
                    <CircularProgress/>
                </Box>
                :
                <>
                    <div className={styles.content}>
                        <TableContainer
                            aria-label="league table"
                        >

                        </TableContainer>
                    </div>
                </>
            }
        </>
    )
}

function makeLeagueTable() {
    const nodes = []


}