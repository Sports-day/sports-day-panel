import {FormType} from "../../../../types";
import {Game, gameFactory} from "../../../../src/models/GameModel";
import React, {FormEvent, useRef, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextFieldProps} from "@mui/material";
import {GameEditFields} from "./GameEditFields";

export type GameFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    formType: FormType
    refresh: VoidFunction
    sportId: number
    game?: Game
}

export function GameForm(props: GameFormProps) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const wightRef = useRef<TextFieldProps>(null)
    //  state
    const [typeState, setTypeState] = useState<string>(props.game?.type ?? '')
    const [calculationTypeState, setCalculationTypeState] = useState<string>(props.game?.calculationType ?? '')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  weight invalid
        if (isNaN(parseInt(wightRef.current?.value as string))) {
            alert("重みは数値で入力してください。(0~100)")
            return
        }

        //  type invalid
        if (typeState !== "tournament" && typeState !== "league") {
            alert("トーナメントもしくはリーグが選択可能です。")
            return
        }

        //  calculationType invalid
        if (calculationTypeState !== "total_score" && calculationTypeState !== "diff_score") {
            alert("合計得点もしくは得失点差が選択可能です。")
            return
        }

        if (props.formType === "create") {
            await gameFactory().create({
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                sportId: props.sportId,
                type: typeState,
                calculationType: calculationTypeState,
                weight: wightRef.current?.value as number
            })
        } else {
            const id = props.game?.id
            if(!id) return

            await gameFactory().update(
                id,
                {
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                sportId: props.sportId,
                type: typeState,
                calculationType: calculationTypeState,
                weight: wightRef.current?.value as number
            })
        }

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
                <form
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>
                        {props.formType === "create" ? "競技作成" : "競技編集"}
                    </DialogTitle>
                    <DialogContent>
                        <GameEditFields
                            nameRef={nameRef}
                            descriptionRef={descriptionRef}
                            wightRef={wightRef}
                            typeState={typeState}
                            setTypeState={setTypeState}
                            calculationTypeState={calculationTypeState}
                            setCalculationTypeState={setCalculationTypeState}
                            game={props.game}
                        />
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
                            {
                                props.formType == "create" ?
                                    "作成" :
                                    "編集"
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )

}