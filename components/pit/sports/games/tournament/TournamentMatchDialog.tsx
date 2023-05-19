import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Typography} from "@mui/material";
import React, {FormEvent} from "react";
import {gameFactory} from "../../../../../src/models/GameModel";
import {Match} from "../../../../../src/models/MatchModel";

export type TournamentMatchDialogProps = {
    open: boolean
    setClose: VoidFunction
    refresh: VoidFunction
    matchId: number
    matches: Match[]
}

export function TournamentMatchDialog(props: TournamentMatchDialogProps) {
    const match = props.matches.find(match => match.id === props.matchId)
    const availableCreateChild = !match ? false : match.children.length < 2

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!match?.gameId) {
            return
        }

        //  make node
        await gameFactory().makeTournamentTree(
            match?.gameId,
            props.matchId
        )

        props.refresh()
        props.setClose()
    }


    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.setClose}
                maxWidth={"md"}
                fullWidth
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>
                        マッチ詳細
                    </DialogTitle>
                    <DialogContent>
                        <Link
                            href={`/admins/matches/${props.matchId}`}
                        >
                            <Typography>
                                マッチ画面に飛ぶ
                            </Typography>
                        </Link>

                    </DialogContent>
                    <DialogActions>
                        {availableCreateChild &&
                            <Button
                                type={"submit"}
                                variant={"contained"}
                            >
                                子ノード作成
                            </Button>
                        }
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}