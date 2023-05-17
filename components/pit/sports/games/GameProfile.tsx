import {Game, gameFactory} from "../../../../src/models/GameModel";
import React, {FormEvent, useRef, useState} from "react";
import {Box, Button, TextFieldProps} from "@mui/material";
import {GameEditFields} from "./GameEditFields";
import styles from "../../../../styles/Pit.module.scss";

export function GameProfile(props: { game: Game, refresh: VoidFunction }) {
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

        await gameFactory().update(
            props.game.id,
            {
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                sportId: props.game.sportId,
                type: typeState,
                calculationType: calculationTypeState,
                weight: wightRef.current?.value as number
            })

        props.refresh()
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
                            calculationTypeState={calculationTypeState}
                            setCalculationTypeState={setCalculationTypeState}
                            game={props.game}
                        />
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            sx={{
                                width: "80px",
                                my: "20px"
                            }}
                        >
                            保存
                        </Button>
                    </Box>
                </form>
            </div>

        </>
    )
}

