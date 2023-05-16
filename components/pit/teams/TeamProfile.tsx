import styles from "../../../styles/Pit.module.scss";
import {Team, teamFactory} from "../../../src/models/TeamModel";
import React, {FormEvent, useRef, useState} from "react";
import {
    Box,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps
} from "@mui/material";
import {useFetchClasses} from "../../../src/features/classes/hooks";

export type TeamProfileProps = {
    team: Team
    refresh: VoidFunction
}

export const TeamProfile = (props: TeamProfileProps) => {
    const team = props.team
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    //  context
    const {classes} = useFetchClasses()
    const [classState, setClassState] = useState<string>(props.team?.classId.toString() ?? '')

    const handleClassChange = (e: SelectChangeEvent) => {
        setClassState(e.target.value.toString())
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!classes.some(classModel => classModel.id === +classState)) {
            return
        }

        await teamFactory().update(
            props.team.id,
            {
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                classId: +classState
            }
        )

        props.refresh()
    }

    return (
        <>
            <div className={styles.content}>
                <h1>基本情報</h1>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* name */}
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"チーム名"}
                            inputRef={nameRef}
                            defaultValue={props.team.name}
                            fullWidth
                            required
                            sx={{
                                my: '20px',
                                width: "400px"
                            }}
                        />
                        {/* description */}
                        <TextField
                            type={"text"}
                            name={"description"}
                            id={"description"}
                            label={"説明(任意)"}
                            inputRef={descriptionRef}
                            defaultValue={props.team.description}
                            fullWidth
                            sx={{
                                my: '20px',
                                width: "500px"
                            }}
                        />
                        {/* class */}
                        <InputLabel id="class-select">クラス</InputLabel>
                        <Select
                            labelId={"class-select"}
                            id={"class"}
                            label={"クラス"}
                            value={classState}
                            sx={{
                                width: "300px"
                            }}
                            onChange={handleClassChange}
                            required
                        >
                            {
                                classes?.map((classModel) => {
                                    return (
                                        <MenuItem
                                            value={classModel.id}
                                            key={classModel.id}
                                        >
                                            {classModel.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

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

                        <Divider light/>
                    </Box>
                </form>
            </div>
        </>
    )
}

