import styles from "../../../../styles/Pit.module.scss";
import {Sport, sportFactory} from "../../../../src/models/SportModel";
import {SportIcon} from "./SportIcon";
import {
    Avatar,
    Box, Button, CircularProgress, Divider,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps,
    Typography
} from "@mui/material";
import React, {FormEvent, useRef, useState} from "react";
import {useFetchImages} from "../../../../src/features/images/hook";
import {SportEditFields} from "../SportEditFields";

export function SportProfile(props: { sport: Sport, refresh: VoidFunction }) {
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const wightRef = useRef<TextFieldProps>(null)
    //  state
    const [iconIdState, setIconIdState] = useState<string>(props.sport?.iconId?.toString() ?? '-1')
    //  images
    const {images, isFetching} = useFetchImages()

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
                weight: wightRef.current?.value as number
            }
        )

        props.refresh()
    }

    return (
        <>
            <div className={styles.content}>
                <h2>基本情報</h2>
                {isFetching ?
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
                    </>
                }
            </div>
        </>
    )
}