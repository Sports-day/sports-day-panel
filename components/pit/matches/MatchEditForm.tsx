import styles from "../../../styles/Pit.module.scss";
import {Match, matchFactory, MatchResult, MatchStatus} from "../../../src/models/MatchModel";
import {useFetchSport} from "../../../src/features/sports/hook";
import {useFetchGame, useFetchGameEntries} from "../../../src/features/games/hook";
import {useFetchLocations} from "../../../src/features/locations/hook";
import {
    Box, Button,
    CircularProgress, Divider,
    InputLabel, Link,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps, Typography
} from "@mui/material";
import React, {FormEvent, useRef, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ConfirmInputDialog} from "../ConfirmInputDialog";
import { useRouter } from "next/router";

export function MatchEditForm(props: { match: Match, refresh: VoidFunction }) {
    const router = useRouter()
    //  refs
    const leftTeamScoreRef = useRef<TextFieldProps>(null)
    const rightTeamScoreRef = useRef<TextFieldProps>(null)
    const noteRef = useRef<TextFieldProps>(null)
    const judgeRef = useRef<TextFieldProps>(null)
    //  state
    const [startAt, setStartAt] = useState<Dayjs | null>(dayjs(props.match.startAt))
    const [leftTeam, setLeftTeam] = useState<string>(props.match.leftTeamId?.toString() ?? "-1")
    const [rightTeam, setRightTeam] = useState<string>(props.match.rightTeamId?.toString() ?? "-1")
    const [result, setResult] = useState<string>(props.match.result ?? "")
    const [status, setStatus] = useState<string>(props.match.status ?? "")
    const [locationId, setLocationId] = useState<string>(props.match.locationId?.toString() ?? "-1")
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)

    //  fetch
    const {sport, isFetching: isFetchingSport} = useFetchSport(props.match.sportId)
    const {game, isFetching: isFetchingGame} = useFetchGame(props.match.gameId)
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()
    const {teams: entries, isFetching: isFetchingEntries} = useFetchGameEntries(props.match.gameId)

    //  value
    const leftTeamModel = entries.find(entry => entry.id === +leftTeam)
    const rightTeamModel = entries.find(entry => entry.id === +rightTeam)


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  score validate
        if (isNaN(parseInt(leftTeamScoreRef.current?.value as string))) {
            alert("左チームのスコアが不正です")
            return
        }
        if (isNaN(parseInt(rightTeamScoreRef.current?.value as string))) {
            alert("右チームのスコアが不正です")
            return
        }

        //  start at
        if (startAt === null) {
            alert("開始時間が不正です")
            return
        }

        //  team validate
        if (leftTeam !== "-1" && !entries.some(entry => entry.id === +leftTeam)) {
            alert("左チームが不正です")
            return
        }
        if (rightTeam !== "-1" && !entries.some(entry => entry.id === +rightTeam)) {
            alert("右チームが不正です")
            return
        }

        //  result validate
        if (!["left_win", "right_win", "draw"].includes(result)) {
            alert("結果が不正です")
            return
        }

        //  status validate
        if (!["standby", "in_progress", "finished", "cancelled"].includes(status)) {
            alert("ステータスが不正です")
            return
        }

        //  location validate
        if (locationId !== "-1" && !locations.some(location => location.id === +locationId)) {
            alert("場所が不正です")
            return
        }

        const startAtString = startAt.format("YYYY-MM-DDTHH:mm:ss.SSS")

        await matchFactory().update(
            props.match.id,
            {
                locationId: locationId === "-1" ? null : +locationId,
                gameId: props.match.gameId,
                sportId: props.match.sportId,
                startAt: startAtString,
                leftTeamId: leftTeam === "-1" ? null : +leftTeam,
                rightTeamId: rightTeam === "-1" ? null : +rightTeam,
                leftScore: parseInt(leftTeamScoreRef.current?.value as string),
                rightScore: parseInt(rightTeamScoreRef.current?.value as string),
                result: result as MatchResult,
                status: status as MatchStatus,
                note: noteRef.current?.value as string,
                judge: judgeRef.current?.value as string,
            }
        )

        props.refresh()
    }

    const handleDelete = async () => {
        await matchFactory().delete(props.match.id)

        await router.back()
    }

    const handleLeftTeamChange = (event: SelectChangeEvent) => {
        setLeftTeam(event.target.value as string)
    }

    const handleRightTeamChange = (event: SelectChangeEvent) => {
        setRightTeam(event.target.value as string)
    }

    const handleResultChange = (event: SelectChangeEvent) => {
        setResult(event.target.value as string)
    }

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string)
    }

    const handleLocationChange = (event: SelectChangeEvent) => {
        setLocationId(event.target.value as string)
    }


    return (
        <>
            {isFetchingSport || isFetchingGame || isFetchingLocations || isFetchingEntries ?
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
                    <form onSubmit={handleSubmit}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div className={styles.matchFormView}>
                                <div className={styles.matchEntity}>
                                    <h2>左チーム</h2>

                                    {/* team */}
                                    <InputLabel id="left-team-select">チーム</InputLabel>
                                    <Select
                                        labelId={"left-team-select"}
                                        id={"left-team"}
                                        label={"チーム"}
                                        value={leftTeam}
                                        sx={{
                                            width: "300px",
                                            mb: '20px'
                                        }}
                                        onChange={handleLeftTeamChange}
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
                                            entries?.map((team) => {
                                                return (
                                                    <MenuItem
                                                        value={team.id}
                                                        key={team.id}
                                                    >
                                                        {team.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>

                                    {/* score */}
                                    <TextField
                                        type={"text"}
                                        name={"left-team-score"}
                                        id={"left-team-score"}
                                        label={"スコア"}
                                        inputRef={leftTeamScoreRef}
                                        defaultValue={props.match.leftScore}
                                        fullWidth
                                        required
                                        sx={{
                                            mb: '20px',
                                            width: "300px",
                                        }}
                                    />
                                </div>

                                <div className={styles.vs}>
                                    V
                                    <br/>
                                    S
                                </div>

                                <div className={styles.matchEntity}>
                                    <h2>右チーム</h2>
                                    {/* team */}
                                    <InputLabel id="right-team-select">チーム</InputLabel>
                                    <Select
                                        labelId={"right-team-select"}
                                        id={"right-team"}
                                        label={"チーム"}
                                        value={rightTeam}
                                        sx={{
                                            width: "300px",
                                            mb: '20px'
                                        }}
                                        onChange={handleRightTeamChange}
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
                                            entries?.map((team) => {
                                                return (
                                                    <MenuItem
                                                        value={team.id}
                                                        key={team.id}
                                                    >
                                                        {team.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>

                                    {/* score */}
                                    <TextField
                                        type={"text"}
                                        name={"right-team-score"}
                                        id={"right-team-score"}
                                        label={"スコア"}
                                        inputRef={rightTeamScoreRef}
                                        defaultValue={props.match.rightScore}
                                        fullWidth
                                        required
                                        sx={{
                                            mb: '20px',
                                            width: "300px",
                                        }}
                                    />
                                </div>
                            </div>

                            <Divider light/>

                            <h2>基本情報</h2>

                            <Typography>
                                競技:
                                <Link
                                    href={`/admin/sports/${sport?.id}`}
                                    sx={{
                                        ml: "5px",
                                    }}
                                >
                                    {sport?.name}
                                </Link>
                            </Typography>
                            <Typography>
                                リーグ・トーナメント:
                                <Link
                                    href={`/admin/sports/${game?.sportId}/games/${game?.id}`}
                                    sx={{
                                        ml: "5px",
                                    }}
                                >
                                    {game?.name}
                                </Link>
                            </Typography>

                            <InputLabel id="location-select">場所</InputLabel>
                            <Select
                                labelId={"location-select"}
                                id={"location"}
                                label={"場所"}
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
                                    locations?.map((location) => {
                                        return (
                                            <MenuItem
                                                value={location.id}
                                                key={location.id}
                                            >
                                                {location.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label={"開始日時"}
                                    value={startAt}
                                    onChange={(newValue) => {
                                        setStartAt(newValue)
                                    }}
                                    sx={{
                                        mb: '20px',
                                        width: "300px",
                                    }}
                                />
                            </LocalizationProvider>

                            <InputLabel id="result-select">結果</InputLabel>
                            <Select
                                labelId={"result-select"}
                                id={"result"}
                                label={"結果"}
                                value={result}
                                sx={{
                                    width: "300px",
                                    mb: '20px'
                                }}
                                onChange={handleResultChange}
                            >
                                <MenuItem
                                    value={"left_win"}
                                >
                                    {leftTeamModel?.name ?? ""} (左)チーム勝ち
                                </MenuItem>
                                <MenuItem
                                    value={"right_win"}
                                >
                                    {rightTeamModel?.name ?? ""} (右)チーム勝ち
                                </MenuItem>
                                <MenuItem
                                    value={"draw"}
                                >
                                    引き分け
                                </MenuItem>
                            </Select>

                            <InputLabel id="status-select">ステータス</InputLabel>
                            <Select
                                labelId={"status-select"}
                                id={"status"}
                                label={"状態"}
                                value={status}
                                sx={{
                                    width: "300px",
                                    mb: '20px'
                                }}
                                onChange={handleStatusChange}
                            >
                                <MenuItem
                                    value={"standby"}
                                >
                                    試合前
                                </MenuItem>
                                <MenuItem
                                    value={"in_progress"}
                                >
                                    試合中
                                </MenuItem>
                                <MenuItem
                                    value={"finished"}
                                >
                                    試合終了
                                </MenuItem>
                                <MenuItem
                                    value={"cancelled"}
                                >
                                    試合中止
                                </MenuItem>
                            </Select>

                            <TextField
                                type={"text"}
                                name={"judge"}
                                id={"judge"}
                                label={"審判"}
                                inputRef={judgeRef}
                                defaultValue={props.match.judge}
                                fullWidth
                                sx={{
                                    width: "500px",
                                    mb: '20px'
                                }}
                            />

                            <TextField
                                type={"text"}
                                name={"note"}
                                id={"note"}
                                label={"備考"}
                                inputRef={noteRef}
                                defaultValue={props.match.note}
                                multiline
                                fullWidth
                                sx={{
                                    width: "500px",
                                    mb: '20px'
                                }}
                            />

                            <p
                                style={{
                                    color: "#a9a9a9"
                                }}
                            >
                                最終更新: { new Date(props.match.startAt).toLocaleString("ja-JP") }
                            </p>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    mb: "20px"
                                }}
                            >
                                <Button
                                    type={"submit"}
                                    variant={"contained"}
                                    sx={{
                                        width: "80px"
                                    }}
                                >
                                    保存
                                </Button>


                                <Button
                                    onClick={() => setIsDeleteOpen(true)}
                                    color={"error"}
                                    variant={"contained"}
                                    sx={{
                                        width: "80px",
                                        ml: "10px"
                                    }}
                                >
                                    削除
                                </Button>
                            </Box>
                        </Box>
                    </form>

                    <ConfirmInputDialog
                        open={isDeleteOpen}
                        onClose={() => setIsDeleteOpen(false)}
                        onConfirm={handleDelete}
                        confirmText={"削除"}
                        confirmKeyword={props.match.id.toString()}
                        confirmColor={"error"}
                    >
                        <Typography>
                            本当に削除しますか？
                        </Typography>
                    </ConfirmInputDialog>
                </>
            }
        </>
    )
}