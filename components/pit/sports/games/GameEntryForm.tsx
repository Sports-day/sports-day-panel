import {useFetchTeams} from "../../../../src/features/teams/hook";
import {
    Button,
    Checkbox,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React, {useContext} from "react";
import {useFetchClasses} from "../../../../src/features/classes/hooks";
import {Team} from "../../../../src/models/TeamModel";
import {ClassesContext} from "../../context";
import {gameFactory} from "../../../../src/models/GameModel";

export type GameEntryFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
    entryIds: number[]
    gameId: number
}

export function GameEntryForm(props: GameEntryFormProps) {
    const {teams, isFetching, refresh: refreshTeams} = useFetchTeams()
    const {classes, refresh: refreshClasses} = useFetchClasses()
    //  state
    const [filterWord, setFilterWord] = React.useState<string>('')
    const [selectedTeams, setSelectedTeams] = React.useState<number[]>([])

    const handleAddTeam = (teamId: number) => {
        setSelectedTeams([...selectedTeams, teamId])
    }

    const handleRemoveTeam = (teamId: number) => {
        setSelectedTeams(selectedTeams.filter(id => id !== teamId))
    }

    const handleSubmit = async () => {
        await gameFactory().addGameEntries(
            props.gameId,
            selectedTeams
        )

        props.refresh()
        props.setClose()
    }

    const teamComponents = teams
        .filter(team => !props.entryIds.includes(team.id))
        .filter(team => {
            if (filterWord == "") return true
            const classModel = classes?.find(classModel => classModel.id === team.classId)

            return team.id.toString().includes(filterWord)
                || team.name.includes(filterWord)
                || classModel?.name.includes(filterWord)
        })
        .map(team => {
            return (
                <TeamContent
                    key={team.id}
                    team={team}
                    addUser={handleAddTeam}
                    removeUser={handleRemoveTeam}
                />
            )
        })

    return (
        <>
            <ClassesContext.Provider
                value={{
                    data: classes,
                    refresh: refreshClasses
                }}
            >
                <Dialog
                    open={props.isOpen}
                    onClose={props.setClose}
                    maxWidth={"lg"}
                    fullWidth
                >
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>
                            エントリーするチームを選択
                        </DialogTitle>
                        <DialogContent>
                            {/*filter*/}
                            <TextField
                                type={"text"}
                                name={"filter"}
                                label={"検索フィルタ"}
                                variant={"standard"}
                                onChange={(event) => {
                                    setFilterWord(event.target.value)
                                }}
                                sx={{
                                    position: "absolute",
                                    right: "20px",
                                    top: "20px",
                                    width: "200px"
                                }}
                            />

                            {/*table*/}
                            <TableContainer>
                                <Table
                                    sx={{
                                        mt: "80px",
                                    }}
                                    aria-label={"users table"}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding={"checkbox"}>
                                            </TableCell>
                                            <TableCell>
                                                ID
                                            </TableCell>
                                            <TableCell>
                                                名前
                                            </TableCell>
                                            <TableCell>
                                                説明
                                            </TableCell>
                                            <TableCell>
                                                所属クラス
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {teamComponents}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                type={"submit"}
                                variant={"contained"}
                            >
                                追加
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </ClassesContext.Provider>
        </>
    )
}

function TeamContent(props: { team: Team, addUser: (userId: number) => void, removeUser: (userId: number) => void }) {
    const {data: classes} = useContext(ClassesContext)
    const classModel = classes?.find(classModel => classModel.id === props.team.classId)

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell padding={"checkbox"}>
                    <Checkbox
                        color={"primary"}
                        onChange={(event) => {
                            if (event.target.checked) {
                                props.addUser(props.team.id)
                            } else {
                                props.removeUser(props.team.id)
                            }
                        }}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                <TableCell>{props.team.id}</TableCell>
                <TableCell>{props.team.name}</TableCell>
                <TableCell>{props.team.description}</TableCell>
                <TableCell>{classModel?.name}</TableCell>
            </TableRow>
        </>
    )
}