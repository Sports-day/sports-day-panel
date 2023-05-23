import React, {RefObject} from "react";
import {InputLabel, MenuItem, Select, SelectChangeEvent, TextField, TextFieldProps} from "@mui/material";
import {Game} from "../../../../src/models/GameModel";

export type GameEditFieldsProps = {
    nameRef: RefObject<TextFieldProps>
    descriptionRef: RefObject<TextFieldProps>
    wightRef: RefObject<TextFieldProps>
    typeState: string
    setTypeState: (type: string) => void
    calculationTypeState: string
    setCalculationTypeState: (type: string) => void
    game?: Game
}

export function GameEditFields(props: GameEditFieldsProps) {
    const handleGameTypeChange = (e: SelectChangeEvent) => {
        props.setTypeState(e.target.value.toString())
    }

    const handleCalculationTypeChange = (e: SelectChangeEvent) => {
        props.setCalculationTypeState(e.target.value.toString())
    }

    return (
        <>

            {/* name */}
            <TextField
                type={"text"}
                name={"name"}
                id={"name"}
                label={"大会(トーナメント・リーグ)名"}
                inputRef={props.nameRef}
                defaultValue={!props.game ? "" : props.game.name}
                fullWidth
                required
                sx={{
                    my: '20px'
                }}
            />
            {/* description */}
            <TextField
                type={"text"}
                name={"description"}
                id={"description"}
                label={"説明(任意)"}
                inputRef={props.descriptionRef}
                defaultValue={!props.game ? "" : props.game.description}
                fullWidth
                sx={{
                    my: '20px'
                }}
            />
            {/* weight */}
            <TextField
                type={"text"}
                name={"weight"}
                id={"weight"}
                label={"重み(0~100)"}
                inputRef={props.wightRef}
                defaultValue={!props.game ? "0" : props.game.weight}
                fullWidth
                required
                sx={{
                    my: '20px'
                }}
            />
            {/* game type */}
            <InputLabel id="game-type-select">大会形式</InputLabel>
            <Select
                labelId={"game-type-select"}
                id={"game-type"}
                label={"大会形式"}
                value={props.typeState}
                sx={{
                    width: "300px",
                    mb: '20px'
                }}
                onChange={handleGameTypeChange}
            >
                <MenuItem
                    value={"tournament"}
                >
                    トーナメント
                </MenuItem>
                <MenuItem
                    value={"league"}
                >
                    リーグ
                </MenuItem>
            </Select>
            {/* calculation type */}
            <InputLabel id="calculation-type-select">採点方式</InputLabel>
            <Select
                labelId={"calculation-type-select"}
                id={"calculation-type"}
                label={"採点方式"}
                value={props.calculationTypeState}
                sx={{
                    width: "300px",
                    mb: '20px'
                }}
                onChange={handleCalculationTypeChange}
            >
                <MenuItem
                    value={"total_score"}
                >
                    総合得点
                </MenuItem>
                <MenuItem
                    value={"diff_score"}
                >
                    得失点
                </MenuItem>
            </Select>
        </>
    )
}