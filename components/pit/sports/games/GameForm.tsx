import {FormType} from "../../../../types";
import {Game, gameFactory} from "../../../../src/models/GameModel";
import React, {FormEvent, useContext, useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SelectChangeEvent,
    TextFieldProps
} from "@mui/material";
import {GameEditFields} from "./GameEditFields";
import {useRouter} from "next/router";
import {TagContext} from "../../../context";
import {useFetchTags} from "../../../../src/features/tags/hook";

export type GameFormProps = {
    isOpen: boolean
    setClose: VoidFunction
    formType: FormType
    refresh: VoidFunction
    sportId: number
    game?: Game
}

export function GameForm(props: GameFormProps) {
    const router = useRouter()
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const wightRef = useRef<TextFieldProps>(null)
    //  state
    const [typeState, setTypeState] = useState<string>(props.game?.type ?? '')
    const [calculationTypeState, setCalculationTypeState] = useState<string>(props.game?.calculationType ?? '')
    const [tagIdState, setTagIdState] = useState<string>(props.game?.tagId?.toString() ?? '-1')

    const {tags} = useFetchTags()

    const handleTagIdChange = (e: SelectChangeEvent) => {
        setTagIdState(e.target.value.toString())
    }

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

        //  tagId invalid
        if (tagIdState !== '-1' && !tags?.some(tag => tag.id === +tagIdState)) {
            alert('タグが正しく選択されていません。')
            return
        }

        if (props.formType === "create") {
            const result = await gameFactory().create({
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                sportId: props.sportId,
                type: typeState,
                calculationType: calculationTypeState,
                weight: wightRef.current?.value as number,
                tagId: tagIdState === '-1' ? null : +tagIdState,
            })

            //  redirect to game profile
            await router.push(`/admin/sports/${props.sportId}/games/${result.id}`)
        } else {
            const id = props.game?.id
            if (!id) return

            await gameFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    description: descriptionRef.current?.value as string,
                    sportId: props.sportId,
                    type: typeState,
                    calculationType: calculationTypeState,
                    weight: wightRef.current?.value as number,
                    tagId: tagIdState === '-1' ? null : +tagIdState,
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
                        {props.formType === "create" ? "リーグ・トーナメント作成" : "リーグ・トーナメント編集"}
                    </DialogTitle>
                    <DialogContent>
                        <GameEditFields
                            nameRef={nameRef}
                            descriptionRef={descriptionRef}
                            wightRef={wightRef}
                            typeState={typeState}
                            setTypeState={setTypeState}
                            tagIdState={tagIdState}
                            calculationTypeState={calculationTypeState}
                            setCalculationTypeState={setCalculationTypeState}
                            handleTagIdChange={handleTagIdChange}
                            tags={tags}
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