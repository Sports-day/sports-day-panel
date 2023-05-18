import styles from "../../../../../styles/Pit.module.scss";
import {EntriesContext, GameContext} from "../../../../context";
import {useContext} from "react";
import {useFetchGameMatches, useFetchGameResult} from "../../../../../src/features/games/hook";
import {
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Link
} from "@mui/material";
import {styled} from "@mui/system";
import {Team} from "../../../../../src/models/TeamModel";
import {Match} from "../../../../../src/models/MatchModel";
import {Game, LeagueResult} from "../../../../../src/models/GameModel";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    border: "1px solid #000",
    textAlign: "center",
    width: "150px",
    minWidth: "150px",
    height: "60px",
    minHeight: "60px",
    padding: "0px",
    margin: "0px"
}));

export function LeagueTable() {
    const {data: game} = useContext(GameContext)
    const {data: entries} = useContext(EntriesContext)
    const {matches, isFetching: isFetchingMatches} = useFetchGameMatches(game.id)
    const {result, isFetching: isFetchingResult} = useFetchGameResult(game.id)

    return (
        <>
            {isFetchingMatches || isFetchingResult ?
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
                    <h3>
                        状態: {(result as LeagueResult)?.finished ? "終了" : "進行中"}
                    </h3>
                    <TableContainer
                        sx={{
                            mt: "60px",
                        }}
                    >
                        <Table>
                            {makeLeagueTable(game, entries, matches, result as LeagueResult)}
                        </Table>
                    </TableContainer>
                </>
            }
        </>
    )
}


type MatchCellData = {
    isSlash: boolean
    isReverse: boolean
    leftTeam: Team | undefined
    rightTeam: Team | undefined
    match: Match | undefined
}

function makeLeagueTable(game: Game, entries: Team[], matches: Match[], result: LeagueResult) {
    const nodes = []
    const bodyNode = []

    const entryCount = entries.length
    //  cell data
    let cellData: MatchCellData[][] = []

    //  init
    for (let i = 0; i < entryCount; i++) {
        cellData[i] = []
        for (let j = 0; j < entryCount; j++) {
            const match = matches.find(m => {
                return (m.leftTeamId === entries[i].id && m.rightTeamId === entries[j].id)
                    || (m.rightTeamId === entries[i].id && m.leftTeamId === entries[j].id)
            })
            const cell = {
                isSlash: i === j || match === undefined,
                isReverse: match?.leftTeamId !== entries[i].id,
                leftTeam: entries[i],
                rightTeam: entries[j],
                match: match
            } as MatchCellData

            cellData[i][j] = cell
        }
    }

    //  create node
    nodes.push(
        <>
            <TableHead>
                <TableRow>
                    <SlashCell/>
                    {entries.map((entry) => {
                        return (
                            <StyledTableCell key={`head-${entry.id}`}>
                                <Link
                                    href={`/admin/teams/${entry.id}`}
                                >
                                    {entry.name}
                                </Link>
                            </StyledTableCell>
                        )
                    })}
                    <StyledTableCell>
                        <Typography>
                            勝ち点
                        </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                        <Typography>
                            勝ち数
                        </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                        <Typography>
                            負け数
                        </Typography>
                    </StyledTableCell>
                    {game.calculationType === "diff_score" ?
                        <>
                            <StyledTableCell>
                                <Typography>
                                    得失点
                                </Typography>
                            </StyledTableCell>
                        </>
                        :
                        <>
                            <StyledTableCell>
                                <Typography>
                                    総合得点
                                </Typography>
                            </StyledTableCell>
                        </>
                    }
                    <StyledTableCell>
                        <Typography>
                            順位(要検証！同順なし！ごめん！)
                        </Typography>
                    </StyledTableCell>
                </TableRow>
            </TableHead>
        </>
    )

    for (let i = 0; i < entryCount; i++) {
        const childNodes = []
        for (let j = 0; j < entryCount; j++) {
            const data = cellData[i][j]
            if (data.isSlash) {
                childNodes.push(
                    <SlashCell key={`slash-${i}-${j}`}/>
                )
            } else {
                childNodes.push(
                    <StyledTableCell key={`match-${i}-${j}`}>
                        <Link
                            href={`/admin/matches/${data.match?.id}`}
                        >
                            {data.isReverse ?
                                <>
                                {data.match?.rightScore} 対 {data.match?.leftScore}
                                </>
                                :
                                <>
                                {data.match?.leftScore} 対 {data.match?.rightScore}
                                </>
                            }
                        </Link>
                    </StyledTableCell>
                )
            }
        }

        const teamResult = result.teams.find(team => team.teamId === entries[i].id)

        bodyNode.push(
            <>
                <TableRow key={`body-${i}`}>
                    <StyledTableCell key={`body-entry-${entries[i].id}`}>
                        <Link
                            href={`/admin/teams/${entries[i].id}`}
                        >
                            {entries[i].name}
                        </Link>
                    </StyledTableCell>
                    {childNodes}
                    <StyledTableCell>
                        <Typography>
                            {teamResult?.score}
                        </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                        <Typography>
                            {teamResult?.win}
                        </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                        <Typography>
                            {teamResult?.lose}
                        </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                        <Typography>
                            {game.calculationType === "diff_score" ?
                                teamResult?.goalDiff :
                                teamResult?.goal
                            }
                        </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                        <Typography>
                            {teamResult?.rank}
                        </Typography>
                    </StyledTableCell>
                </TableRow>
            </>
        )
    }

    nodes.push(
        <>
            <TableBody>
                {bodyNode}
            </TableBody>
        </>
    )

    return nodes
}

function SlashCell() {
    return (
        <StyledTableCell>
            <hr className={styles.slashCell}/>
        </StyledTableCell>
    )
}