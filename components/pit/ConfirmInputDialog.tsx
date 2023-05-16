import React, {useRef} from "react";
import {Button, Dialog, DialogActions, DialogContent, TextField, TextFieldProps} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";
import styles from "../../styles/Pit.module.scss";

type ConfirmDialogProps = {
    open: boolean
    onClose: VoidFunction
    onConfirm: VoidFunction
    confirmText: string
    confirmKeyword: string
    confirmColor: OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
    >
    children: React.ReactNode
}

export function ConfirmInputDialog(props: ConfirmDialogProps) {
    const keywordRef = useRef<TextFieldProps>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (keywordRef.current?.value !== props.confirmKeyword) return
        props.onConfirm()
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth={"sm"}
            fullWidth
        >
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {props.children}
                    <br/>
                    &quot;<span className={styles.confirmInputDialog}>{props.confirmKeyword}</span>&quot;と入力してください。

                    <TextField
                        type={"text"}
                        name={"keyword"}
                        id={"keyword"}
                        label={"確認キーワード"}
                        inputRef={keywordRef}
                        fullWidth
                        required
                        sx={{
                            my: '20px'
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={"outlined"}
                        onClick={props.onClose}
                    >
                        キャンセル
                    </Button>
                    <Button
                        variant={"contained"}
                        type={"submit"}
                        color={props.confirmColor}
                    >
                        {props.confirmText}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}