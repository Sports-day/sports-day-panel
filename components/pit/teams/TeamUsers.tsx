import styles from "../../../styles/Pit.module.scss";
import {Team} from "../../../src/models/TeamModel";
import {useFetchUsers} from "../../../src/features/users/hook";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useFetchClasses} from "../../../src/features/classes/hooks";
import {ClassesContext, UsersContext} from "../context";
import {TeamUser} from "./TeamUser";
import {TeamUserForm} from "./TeamUserForm";
import {useState} from "react";

export type TeamUsersProps = {
    team: Team
    refresh: VoidFunction
}

export const TeamUsers = (props: TeamUsersProps) => {
    const {users, refresh: refreshUsers} = useFetchUsers()
    const {classes, refresh: refreshClasses} = useFetchClasses()
    //  state
    const [isUserAppend, setIsUserAppend] = useState(false)

    const teamUsers = users.filter(user => user.teamIds.includes(props.team.id))
    const teamUserComponents = teamUsers.map(user => {
            return (
                <TeamUser teamId={props.team.id} user={user} refresh={props.refresh} key={user.id}/>
            )
        })

    return (
        <>
            <div className={styles.content}>
                <ClassesContext.Provider value={{data: classes, refresh: refreshClasses}}>
                    <UsersContext.Provider value={{data: users, refresh: refreshUsers}}>
                        <h1>メンバー</h1>

                        <TableContainer>
                            <Table
                                sx={{
                                    minWidth: 650,
                                }}
                                aria-label={"classes table"}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            ID
                                        </TableCell>
                                        <TableCell>
                                            学籍番号
                                        </TableCell>
                                        <TableCell>
                                            名前
                                        </TableCell>
                                        <TableCell>
                                            所属クラス
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: "150px"
                                            }}
                                        >
                                            アクション
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teamUserComponents}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button
                            variant="contained"
                            sx={{
                                position: "absolute",
                                right: "20px",
                                top: "20px",
                            }}
                            onClick={() => setIsUserAppend(true)}
                        >
                            追加
                        </Button>

                        <TeamUserForm
                            team={props.team}
                            teamUsers={teamUsers}
                            isOpen={isUserAppend}
                            setClose={() => setIsUserAppend(false)}
                            refresh={props.refresh}
                        />
                    </UsersContext.Provider>
                </ClassesContext.Provider>
            </div>
        </>
    )
}