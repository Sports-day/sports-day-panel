import styles from "../../../styles/Pit.module.scss";
import {useFetchUsers} from "../../../src/features/users/hook";
import {useFetchTeams} from "../../../src/features/teams/hook";
import {useFetchClasses} from "../../../src/features/classes/hooks";
import {ClassesContext, TeamsContext, UsersContext} from "../../context";
import {Box, Button, CircularProgress} from "@mui/material";
import { UserList } from "./UserList";
import {UserForm} from "./UserForm";
import {useState} from "react";

export function Users() {
    const {users, isFetching: isFetchingUsers, refresh: refreshUsers} = useFetchUsers()
    const {teams, isFetching: isFetchingTeams, refresh: refreshTeams} = useFetchTeams()
    const {classes, isFetching: isFetchingClasses, refresh: refreshClasses} = useFetchClasses()

    //  state
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <UsersContext.Provider
                value={{
                    data: users,
                    refresh: refreshUsers
                }}
            >
                <TeamsContext.Provider
                    value={{
                        data: teams,
                        refresh: refreshTeams
                    }}
                >
                    <ClassesContext.Provider
                        value={{
                            data: classes,
                            refresh: refreshClasses
                        }}
                    >
                        <div className={styles.content}>

                            <h1>ユーザー</h1>

                            <Button
                                variant="contained"
                                sx={{
                                    position: "absolute",
                                    right: "20px",
                                    top: "20px",
                                }}
                                onClick={() => setIsCreatorOpen(true)}
                            >
                                作成
                            </Button>

                            {isFetchingUsers || isFetchingTeams || isFetchingClasses ?
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
                                    <UserForm
                                        isOpen={isCreatorOpen}
                                        setClose={() => setIsCreatorOpen(false)}
                                        formType={"create"}
                                        refresh={refreshUsers}
                                    />

                                    <UserList />
                                </>
                            }
                        </div>
                    </ClassesContext.Provider>
                </TeamsContext.Provider>
            </UsersContext.Provider>
        </>
    )
}