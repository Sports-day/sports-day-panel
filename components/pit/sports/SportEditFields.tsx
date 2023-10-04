import {InputLabel, MenuItem, Select, SelectChangeEvent, TextField, TextFieldProps} from "@mui/material";
import React, {RefObject} from "react";
import {Sport} from "../../../src/models/SportModel";
import {Image} from "../../../src/models/ImageModel";
import {Tag} from "../../../src/models/TagModel";

export type SportEditFieldsProps = {
    nameRef: RefObject<TextFieldProps>
    descriptionRef: RefObject<TextFieldProps>
    wightRef: RefObject<TextFieldProps>
    ruleIdRef: RefObject<TextFieldProps>
    iconIdState: string
    tagIdState: string
    handleImageIdChange: (e: SelectChangeEvent) => void
    handleTagIdChange: (e: SelectChangeEvent) => void
    images: Image[]
    tags: Tag[]
    sport?: Sport
}

export function SportEditFields(props: SportEditFieldsProps) {


    return (
        <>
            {/* name */}
            <TextField
                type={"text"}
                name={"name"}
                id={"name"}
                label={"競技名"}
                inputRef={props.nameRef}
                defaultValue={!props.sport ? "" : props.sport.name}
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
                defaultValue={!props.sport ? "" : props.sport.description}
                fullWidth
                required
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
                defaultValue={!props.sport ? "0" : props.sport.weight}
                fullWidth
                required
                sx={{
                    my: '20px'
                }}
            />
            {/* rule */}
            <TextField
                type={"text"}
                name={"rule"}
                id={"rule"}
                label={"ルール番号"}
                inputRef={props.ruleIdRef}
                defaultValue={!props.sport ? "0" : props.sport.ruleId}
                fullWidth
                required
                sx={{
                    my: '20px'
                }}
            />
            {/* icon */}
            <InputLabel id="icon-select">アイコン</InputLabel>
            <Select
                labelId={"icon-select"}
                id={"icon"}
                label={"アイコン"}
                value={props.iconIdState}
                sx={{
                    width: "300px",
                    mb: '20px'
                }}
                onChange={props.handleImageIdChange}
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
                    props.images?.map((image) => {
                        return (
                            <MenuItem
                                value={image.id}
                                key={image.id}
                            >
                                {image.name}
                            </MenuItem>
                        )
                    })
                }
            </Select>
            {/* tag */}
            <InputLabel id="tag-select">タグ</InputLabel>
            <Select
                labelId={"tag-select"}
                id={"tag"}
                label={"タグ"}
                value={props.tagIdState}
                sx={{
                    width: "300px",
                    mb: '20px'
                }}
                onChange={props.handleTagIdChange}
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
                    props.tags?.map((tag) => {
                        return (
                            <MenuItem
                                value={tag.id}
                                key={tag.id}
                            >
                                {tag.name}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </>
    )
}