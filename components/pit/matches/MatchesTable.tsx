import styles from "../../../styles/Pit.module.scss";
import {Match} from "../../../src/models/MatchModel";
import {Team} from "../../../src/models/TeamModel";
import {Sport} from "../../../src/models/SportModel";
import {Game} from "../../../src/models/GameModel";
import {useFetchLocations} from "../../../src/features/locations/hook";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {MatchContent} from "./MatchContent";

export type MatchesTableProps = {
    sports: Sport[]
    games: Game[]
    teams: Team[]
    matches: Match[]
}

export function MatchesTable(props: MatchesTableProps) {
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()

    const matchComponents = props.matches.map(match => {
        return (
            <MatchContent
                sports={props.sports}
                games={props.games}
                teams={props.teams}
                locations={locations}
                match={match}
                key={match.id}
            />
        )
    })
    return (
        <>
            <div className={styles.content} >
                <TableContainer>
                    <Table
                        aria-label={"matches table"}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    ID
                                </TableCell>
                                <TableCell>
                                    スポーツ
                                </TableCell>
                                <TableCell>
                                    ゲーム
                                </TableCell>
                                <TableCell>
                                    場所
                                </TableCell>
                                <TableCell>
                                    チーム(L)
                                </TableCell>
                                <TableCell>
                                    チーム(R)
                                </TableCell>
                                <TableCell>
                                    点数
                                </TableCell>
                                <TableCell>
                                    結果
                                </TableCell>
                                <TableCell>
                                    状態
                                </TableCell>
                                <TableCell>
                                    試合開始時間
                                </TableCell>
                                <TableCell>
                                    審判
                                </TableCell>
                                <TableCell>
                                    メモ
                                </TableCell>
                                <TableCell>
                                    最終更新日時
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matchComponents}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}