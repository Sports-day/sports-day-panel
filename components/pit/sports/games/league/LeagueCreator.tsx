import {Game, gameFactory} from "../../../../../src/models/GameModel";
import {useFetchLocations} from "../../../../../src/features/locations/hook";
import React, {FormEvent, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {ConfirmInputDialog} from "../../../ConfirmInputDialog";

export type LeagueCreatorProps = {
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
    game: Game
}

export function LeagueCreator(props: LeagueCreatorProps) {
    const {locations} = useFetchLocations()
    //  state
    const [locationId, setLocationId] = useState<string>("-1")
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false)

    const handleLocationChange = (e: SelectChangeEvent) => {
        setLocationId(e.target.value)
    }

    const handleSubmit = async () => {
        //  location validate
        if (locationId !== "-1" && !locations.some(location => location.id === +locationId)) {
            alert("場所が不正です")
            return
        }

        //  delete
        await gameFactory().deleteGameMatches(props.game.id)
        //  generate
        await gameFactory().makeLeagueMatches(
            props.game.id,
            locationId === "-1" ? null : +locationId
        )

        props.refresh()
        props.setClose()
    }


    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.setClose}
                maxWidth={"md"}
                fullWidth
            >
                <DialogTitle>
                    リーグ戦表の作成
                </DialogTitle>
                <DialogContent>
                    <p
                        style={{
                            color: "red"
                        }}
                    >
                        すでに作成している場合、新しく作成すると古いリーグ戦表は削除されます。
                    </p>

                    <InputLabel id="location-select">場所(後から変更できます)</InputLabel>
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

                </DialogContent>
                <DialogActions>
                    <Button
                        variant={"outlined"}
                        onClick={props.setClose}
                    >
                        キャンセル
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() => setIsOpenConfirm(true)}
                    >
                        リーグ作成
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmInputDialog
                open={isOpenConfirm}
                onClose={() => setIsOpenConfirm(false)}
                onConfirm={handleSubmit}
                confirmText={"リーグ表の作成"}
                confirmKeyword={props.game.name}
                confirmColor={"warning"}
            >
                <h3
                    style={{
                        color: "red"
                    }}
                >
                    すでにマッチがある場合、全て削除されます。
                    <br/>
                    本当に実行しますか?
                </h3>
            </ConfirmInputDialog>
        </>
    )
}