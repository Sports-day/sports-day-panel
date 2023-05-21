import styles from "../../../../../styles/Pit.module.scss"
import {useContext, useState} from "react";
import {EntriesContext, GameContext} from "../../../../context";
import {useFetchGameMatches} from "../../../../../src/features/games/hook";
import {Box, Button, CircularProgress} from "@mui/material";
import {gameFactory} from "../../../../../src/models/GameModel";
import {Match} from "../../../../../src/models/MatchModel";
import {RawNodeDatum, Tree} from "react-d3-tree";
import {TreeNodeDatum} from "react-d3-tree/lib/types/types/common";
import {Team} from "../../../../../src/models/TeamModel";
import {HierarchyPointNode} from "d3-hierarchy";
import {TournamentMatchDialog} from "./TournamentMatchDialog";

export function TournamentController() {
    const {data: game, refresh} = useContext(GameContext)
    const {data: teams} = useContext(EntriesContext)
    const {matches, isFetching: isFetchingMatches, refresh: refreshMatches} = useFetchGameMatches(game.id)
    // const {result, isFetching: isFetchingResult} = useFetchGameResult(game.id)
    //  state
    const [isOpenNodeDetail, setIsOpenNodeDetail] = useState<boolean>(false)
    const [selectedMatchId, setSelectedMatchId] = useState<number>(0)

    //  tree
    const treeData = makeTreeData(matches, teams)

    const createRootMatch = async () => {
        //  create
        await gameFactory().makeTournamentTree(game.id, null)

        refresh()
    }

    //  node click
    const handleMatchClick = (node: HierarchyPointNode<TreeNodeDatum>) => {
        // @ts-ignore
        const nodeData = node.data
        const attributes = nodeData.attributes
        if (!attributes) {
            return
        }

        const id = parseInt(attributes.id as string)

        if (!id || isNaN(id)) {
            return
        }

        setSelectedMatchId(id)
        setIsOpenNodeDetail(true)
    }

    const updateTree = async () => {
        await gameFactory().updateTournamentTree(game.id)

        refresh()
    }

    return (
        <>
            <div className={styles.content}>
                <h2>トーナメント表</h2>

                <Button
                    variant="contained"
                    sx={{
                        position: "absolute",
                        right: "20px",
                        top: "60px",
                    }}
                    onClick={updateTree}
                >
                    ツリー状態更新
                </Button>

                {matches.length <= 0 &&
                    <Button
                        variant="contained"
                        sx={{
                            position: "absolute",
                            right: "20px",
                            top: "20px",
                        }}
                        onClick={createRootMatch}
                    >
                        作成
                    </Button>
                }

                {isFetchingMatches ?
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
                    <div
                        id="treeWrapper"
                        className={styles.tournamentTree}
                    >
                        <Tree
                            data={treeData}
                            onNodeClick={(node) => handleMatchClick(node)}
                        />
                    </div>
                }

                <TournamentMatchDialog
                    open={isOpenNodeDetail}
                    setClose={() => setIsOpenNodeDetail(false)}
                    refresh={() => {
                        refresh()
                        refreshMatches()
                    }}
                    matchId={selectedMatchId}
                    matches={matches}
                />
            </div>
        </>
    )
}

export function makeTreeData(matches: Match[], entries: Team[]): RawNodeDatum {
    //  find root match
    const rootMatch = matches.find(match => match.parents.length <= 0)
    if (!rootMatch) {
        return {} as RawNodeDatum
    }

    //  make node function
    const makeNode = (match: Match): RawNodeDatum => {
        const node: RawNodeDatum = {
            name: `${entries.find(entry => entry.id === match.leftTeamId)?.name ?? "未設定"} vs ${entries.find(entry => entry.id === match.rightTeamId)?.name ?? "未設定"}`,
            attributes: {
                id: match.id,
                status: match.status.toUpperCase(),
                result: match.result.toUpperCase(),
                score: `${match.leftScore} - ${match.rightScore}`
            }
        }

        //  make children
        if (match.children.length > 0) {
            const children = match.children.map(childId => {
                const child = matches.find(match => match.id === childId)
                if (!child) {
                    return undefined
                }
                return makeNode(child)
            }).filter(node => node !== undefined)

            if (children.length > 0) {
                node.children = children as RawNodeDatum[]

                console.log("make children")
            }
        }

        return node
    }

    //  make tree
    return makeNode(rootMatch)
}
