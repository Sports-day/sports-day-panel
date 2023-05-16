import React, {useContext, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {UsersListForTeam} from "./UsersListForTeam";
import { User } from "../../../src/models/UserModel";
import {Team, teamFactory} from "../../../src/models/TeamModel";

export type TeamUserFormProps = {
    team: Team
    teamUsers: User[]
    isOpen: boolean
    setClose: VoidFunction
    refresh: VoidFunction
}

export const TeamUserForm = (props: TeamUserFormProps) => {
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await teamFactory().addTeamUsers(
            props.team.id,
            selectedUsers
        )

        props.refresh()
        props.setClose()
    }

    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.setClose}
                maxWidth={"lg"}
                fullWidth
            >
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <UsersListForTeam
                            ignoreUsers={props.teamUsers}
                            selectedUsers={selectedUsers}
                            setSelectedUsers={setSelectedUsers}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                        >
                            追加
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}