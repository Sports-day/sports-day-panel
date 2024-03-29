import {gameFactory} from "../../../../src/models/GameModel";
import React, {FormEvent, useContext, useRef, useState} from "react";
import {Box, Button, SelectChangeEvent, TextFieldProps, Typography} from "@mui/material";
import {GameEditFields} from "./GameEditFields";
import styles from "../../../../styles/Pit.module.scss";
import {GameContext, TagContext} from "../../../context";
import {ConfirmInputDialog} from "../../ConfirmInputDialog";
import {useRouter} from "next/router";
import {useFetchTags} from "../../../../src/features/tags/hook";

export function GameProfile() {
    const router = useRouter()
    const {data: game, refresh} = useContext(GameContext)
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const wightRef = useRef<TextFieldProps>(null)
    //  state
    const [typeState, setTypeState] = useState<string>(game?.type ?? '')
    const [calculationTypeState, setCalculationTypeState] = useState<string>(game?.calculationType ?? '')
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const [tagIdState, setTagIdState] = useState<string>(game?.tagId?.toString() ?? '-1')

    const {tags} = useFetchTags()

    const handleTagIdChange = (e: SelectChangeEvent) => {
        setTagIdState(e.target.value.toString())
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  weight invalid
        if (isNaN(parseInt(wightRef.current?.value as string))) {
            return
        }

        //  type invalid
        if (typeState !== "tournament" && typeState !== "league") {
            return
        }

        //  calculationType invalid
        if (calculationTypeState !== "total_score" && calculationTypeState !== "diff_score") {
            return
        }

        //  tagId invalid
        if (tagIdState !== '-1' && !tags?.some(tag => tag.id === +tagIdState)) {
            alert('タグが正しく選択されていません。')
            return
        }

        await gameFactory().update(
            game.id,
            {
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                sportId: game.sportId,
                type: typeState,
                calculationType: calculationTypeState,
                weight: wightRef.current?.value as number,
                tagId: tagIdState === '-1' ? null : +tagIdState,
            })

        refresh()
    }

    const handleDelete = async () => {
        await gameFactory().delete(game.id)

        await router.push(`/admin/sports/${game.sportId}`)
    }

    return (
        <>
            <div className={styles.content}>
                <h2>基本情報</h2>

                <form
                    onSubmit={handleSubmit}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
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
                            game={game}
                        />

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
                    confirmKeyword={game.name}
                    confirmColor={"error"}
                >
                    <Typography>
                        本当に削除しますか？
                    </Typography>
                </ConfirmInputDialog>
            </div>
        </>
    )
}

