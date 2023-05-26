import {useFetchLocations} from "../../../../../src/features/locations/hook";
import {Game} from "../../../../../src/models/GameModel";
import {Match, matchFactory} from "../../../../../src/models/MatchModel";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel, LinearProgress, MenuItem,
    Select, SelectChangeEvent, Table, TableCell, TableContainer, TableHead, TableRow, TextField,
    TextFieldProps,
    Typography
} from "@mui/material";
import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Team} from "../../../../../src/models/TeamModel";
import {EditedMatchTable} from "./EditedMatchTable";
import {Gender, userFactory} from "../../../../../src/models/UserModel";
import {useFetchMatches} from "../../../../../src/features/matches/hook";
import {useFetchTeams} from "../../../../../src/features/teams/hook";

export type CrossGameAutomaticMatchEditorProps = {
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
    games: Game[]
}

export type EditedMatch = {
    id: number
    leftTeamName: string
    rightTeamName: string
    judge: string
    startAt: string
    status: "success" | "not_found_match" | "not_link_yet" | "team_invalid"
}

export function CrossGameAutomaticMatchEditor(props: CrossGameAutomaticMatchEditorProps) {
    //  hook
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()
    const {matches, isFetching: isFetchingMatches} = useFetchMatches()
    const {teams, isFetching: isFetchingTeams} = useFetchTeams()
    //  ref
    const durationMinutesRef = useRef<TextFieldProps>(null)
    const csvDataRef = useRef<TextFieldProps>(null)
    //  state
    const [gamesSelected, setGamesSelected] = useState<number[]>([])
    const [startDateTime, setStartDateTime] = useState<Dayjs | null>(dayjs())
    const [locationId, setLocationId] = useState<string>("-1")
    const [editedMatchesState, setEditedMatchesState] = useState<EditedMatch[]>([])
    const [isDeleteUnlinkedMatch, setIsDeleteUnlinkedMatch] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [isExecuting, setIsExecuting] = useState<boolean>(false)
    //  value
    const filteredGames = props.games.filter(value => gamesSelected.includes(value.id))
    const filteredMatches = matches.filter(value => filteredGames.some(game => game.id === value.gameId))
    const filteredEntries = teams.filter(value => {
        return filteredMatches.some(match => {
            return match.leftTeamId === value.id || match.rightTeamId === value.id
        })
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  validation
        //  exists location
        if (!locations.some(value => value.id === parseInt(locationId))) {
            alert("場所を選択してください")
            return
        }

        //  duration not null
        if (durationMinutesRef.current?.value === undefined) {
            alert("試合間隔を入力してください")
            return
        }

        handleCSVDataChange()

        //  execute
        setIsExecuting(true)
        setProgress(0)

        var index = 0
        for (const match of editedMatchesState) {
            //  original
            const originalMatch = matches.find(value => value.id === match.id)
            if (originalMatch !== undefined) {
                if (match.status == "success") {
                    //  update match
                    await matchFactory().update(match.id, {
                        startAt: match.startAt,
                        locationId: parseInt(locationId),
                        judge: match.judge,
                        //  original data
                        gameId: originalMatch.gameId,
                        sportId: originalMatch.sportId,
                        leftTeamId: originalMatch.leftTeamId,
                        rightTeamId: originalMatch.rightTeamId,
                        leftScore: originalMatch.leftScore,
                        rightScore: originalMatch.rightScore,
                        result: originalMatch.result,
                        status: originalMatch.status,
                        note: originalMatch.note,
                    })
                }
                else if (match.status == "not_link_yet" && isDeleteUnlinkedMatch) {
                    //  delete match
                    await matchFactory().delete(match.id)
                }
            }

            //  increment progress
            index++
            setProgress((index) / editedMatchesState.length * 100)

            //  delay for api server load
            await timeout(500);
        }


        setIsExecuting(false)
        //  refresh
        props.refresh()
        props.setClose()
    }

    const handleCSVDataChange = () => {
        if (csvDataRef.current?.value === undefined) {
            return
        }

        const csvData = csvDataRef.current.value as string
        const rows = csvData.split("\n")
        let currentDay = dayjs(startDateTime)

        const editedMatches: EditedMatch[] = []

        for (const row of rows) {
            const data = row.split(",")
            const leftTeamName = data[0]
            const rightTeamName = data[1]
            const judge = data[2]

            //  team
            const leftTeam = filteredEntries.find(value => value.name === leftTeamName)
            const rightTeam = filteredEntries.find(value => value.name === rightTeamName)

            //  if team not found
            if (leftTeam === undefined || rightTeam === undefined) {
                //  failed
                editedMatches.push({
                    id: -1,
                    leftTeamName: leftTeamName,
                    rightTeamName: rightTeamName,
                    judge: judge,
                    startAt: "",
                    status: "team_invalid"
                })
                continue
            }

            //  find match by team name
            const match = filteredMatches.find(value => {
                return (leftTeam.id === value.leftTeamId && rightTeam.id === value.rightTeamId)
                    || (leftTeam.id === value.rightTeamId && rightTeam.id === value.leftTeamId)
            })

            if (match === undefined) {
                //  failed
                editedMatches.push({
                    id: -1,
                    leftTeamName: leftTeamName,
                    rightTeamName: rightTeamName,
                    judge: judge,
                    startAt: "",
                    status: "not_found_match"
                })
                continue
            }

            //  success
            editedMatches.push({
                id: match.id,
                leftTeamName: leftTeamName,
                rightTeamName: rightTeamName,
                judge: judge,
                startAt: currentDay.format("YYYY-MM-DDTHH:mm:ss.SSS"),
                status: "success"
            })

            //  increment
            currentDay = currentDay.add(Number(durationMinutesRef.current?.value), "minute")
        }

        //  add matches not exist in csv
        const notExistMatches = filteredMatches.filter(value => {
            return !editedMatches.some(value1 => value1.id === value.id)
        }).map(match => {
            const leftTeam = filteredEntries.find(team => team.id === match.leftTeamId)
            const rightTeam = filteredEntries.find(team => team.id === match.rightTeamId)

            return {
                id: match.id,
                leftTeamName: leftTeam?.name,
                rightTeamName: rightTeam?.name,
                judge: match.judge,
                startAt: match.startAt,
                status: "not_link_yet"
            } as EditedMatch
        })

        const results = editedMatches.concat(notExistMatches)

        setEditedMatchesState(results)
    }

    const handleLocationChange = (e: SelectChangeEvent) => {
        setLocationId(e.target.value)
    }

    const handleGamesSelectChange = (event: SelectChangeEvent<typeof gamesSelected>) => {
        const {
            target: { value },
        } = event;

        setGamesSelected(value as number[]);

        handleCSVDataChange()
    }

    if (isFetchingLocations || isFetchingMatches || isFetchingTeams) {
        return null
    }

    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.setClose}
                maxWidth={"lg"}
                fullWidth
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>
                        <Typography>
                            リーグ・トーナメント間試合一括編集機能
                        </Typography>
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >

                        <InputLabel id="game-select">リーグ・トーナメント選択</InputLabel>
                        <Select
                            labelId={"game-select"}
                            id={"game"}
                            label={"リーグ・トーナメント選択"}
                            value={gamesSelected}
                            sx={{
                                width: "300px",
                                mb: '20px'
                            }}
                            onChange={handleGamesSelectChange}
                            multiple
                        >
                            {
                                props.games
                                    .sort((a, b) => b.weight - a.weight)
                                    .map(game => {
                                    return (
                                        <MenuItem
                                            key={game.id}
                                            value={game.id}
                                        >
                                            {game.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label={"1試合目開始時刻"}
                                value={startDateTime}
                                onChange={(newValue) => {
                                    setStartDateTime(newValue)
                                    //  calculate
                                    handleCSVDataChange()
                                }}
                                sx={{
                                    my: '20px',
                                    width: "300px",
                                }}
                            />
                        </LocalizationProvider>

                        <TextField
                            type={"text"}
                            name={"duration_time"}
                            id={"duration_time"}
                            label={"試合間隔(分)"}
                            inputRef={durationMinutesRef}
                            defaultValue={"1"}
                            fullWidth
                            required
                            onChange={() => handleCSVDataChange()}
                            sx={{
                                mb: '20px',
                                width: "300px",
                            }}
                        />

                        <InputLabel id="location-select">開催場所</InputLabel>
                        <Select
                            labelId={"location-select"}
                            id={"location"}
                            label={"開催場所"}
                            value={locationId}
                            sx={{
                                width: "300px",
                                mb: '20px'
                            }}
                            onChange={handleLocationChange}
                        >
                            <MenuItem
                                value={"-1"}
                                sx={{
                                    color: "red"
                                }}
                            >
                                未選択
                            </MenuItem>
                            {
                                locations.map(location => {
                                    return (
                                        <MenuItem
                                            key={location.id}
                                            value={location.id}
                                        >
                                            {location.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

                        <div>
                            <InputLabel id="delete_unlinked_match_label">未リンクの試合を削除する</InputLabel>
                            <Checkbox
                                id={"delete_unlinked_match"}
                                checked={isDeleteUnlinkedMatch}
                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    setIsDeleteUnlinkedMatch(event.target.checked)
                                }
                                size="small"
                            />
                        </div>


                        <TextField
                            type={"text"}
                            name={"csv_data"}
                            id={"csv_data"}
                            label={"CSVデータ"}
                            inputRef={csvDataRef}
                            multiline
                            rows={10}
                            fullWidth
                            required
                            sx={{
                                mb: '20px',
                                width: "600px",
                            }}
                            onChange={() => handleCSVDataChange()}
                        />


                        <EditedMatchTable
                            editedMatches={editedMatchesState}
                            entries={filteredEntries}
                        />

                        {isExecuting &&
                            <LinearProgress variant="determinate" value={progress}/>
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant={"outlined"}
                            onClick={props.setClose}
                        >
                            キャンセル
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                        >
                            一括編集
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}