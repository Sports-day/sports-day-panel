import styles from "../../../../styles/Pit.module.scss";
import {Sport, sportFactory} from "../../../../src/models/SportModel";
import {SportIcon} from "./SportIcon";
import {
    Avatar,
    Box, Button,
    SelectChangeEvent,
    TextFieldProps,
} from "@mui/material";
import React, {FormEvent, useContext, useRef, useState} from "react";
import {SportEditFields} from "../SportEditFields";
import {ImagesContext} from "../../../context";

export function SportProfile(props: { sport: Sport, refresh: VoidFunction }) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const wightRef = useRef<TextFieldProps>(null)
    const ruleIdRef = useRef<TextFieldProps>(null)
    //  state
    const [iconIdState, setIconIdState] = useState<string>(props.sport?.iconId?.toString() ?? '-1')
    //  images
    const {data: images} = useContext(ImagesContext)

    const handleImageIdChange = (e: SelectChangeEvent) => {
        setIconIdState(e.target.value.toString())
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  weight invalid
        if (isNaN(parseInt(wightRef.current?.value as string))) {
            alert('重みは0~100の整数で入力してください。')
            return
        }

        //  ruleId invalid
        if (isNaN(parseInt(ruleIdRef.current?.value as string))) {
            alert("ルールIdは数値で入力してください。")
            return
        }

        //  iconId invalid
        if (iconIdState !== '-1' && !images?.some(image => image.id === +iconIdState)) {
            alert('アイコンが正しく選択されていません。')
            return
        }


        const id = props.sport?.id
        if (!id) return

        await sportFactory().update(
            id,
            {
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                iconId: iconIdState === '-1' ? null : +iconIdState,
                weight: wightRef.current?.value as number,
                ruleId: ruleIdRef.current?.value as number,
            }
        )

        props.refresh()
    }

    return (
        <>
            <div className={styles.content}>
                <h2>基本情報</h2>
                <div className={styles.sportProfile}>
                    <div className={styles.sportIcon}>
                        {props.sport.iconId ?
                            <SportIcon iconId={props.sport.iconId}/>
                            :
                            <Avatar
                                sx={{
                                    width: "200px",
                                    height: "200px",
                                }}
                            />
                        }
                    </div>
                    <div className={styles.sportInfo}>
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <SportEditFields
                                    nameRef={nameRef}
                                    descriptionRef={descriptionRef}
                                    wightRef={wightRef}
                                    ruleIdRef={ruleIdRef}
                                    iconIdState={iconIdState}
                                    handleImageIdChange={handleImageIdChange}
                                    images={images}
                                    sport={props.sport}
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
                </div>
            </div>
        </>
    )
}