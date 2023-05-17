import styles from "../../../styles/Pit.module.scss";
import {useFetchMicrosoftAccounts} from "../../../src/features/microsoft-account/hooks";
import {ClassesContext, MicrosoftAccountsContext, UsersContext} from "../context";
import {MicrosoftAccountList} from "./MicrosoftAccountList";
import {useFetchUsers} from "../../../src/features/users/hook";
import {useFetchClasses} from "../../../src/features/classes/hooks";
import {Box, CircularProgress} from "@mui/material";

export function MicrosoftAccounts() {
    const {microsoftAccounts, isFetching: isFetchingMicrosoftAccounts, refresh: refreshMicrosoftAccounts} = useFetchMicrosoftAccounts()
    const {users, isFetching: isFetchingUsers, refresh: refreshUsers} = useFetchUsers()
    const {classes, isFetching: isFetchingClasses, refresh: refreshClasses} = useFetchClasses()

    return (
        <>
            <MicrosoftAccountsContext.Provider
                value={{
                    data: microsoftAccounts,
                    refresh: refreshMicrosoftAccounts
                }}
            >
                <UsersContext.Provider
                    value={{
                        data: users,
                        refresh: refreshUsers
                    }}
                >
                    <ClassesContext.Provider
                        value={{
                            data: classes,
                            refresh: refreshClasses
                        }}
                    >
                    <div className={styles.content}>

                        <h1>Microsoftアカウント</h1>
                        <p>紐付けされているMicrosoftアカウントを管理できます。</p>

                        {isFetchingMicrosoftAccounts || isFetchingUsers || isFetchingClasses ?
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
                                <MicrosoftAccountList/>
                            </>
                        }
                    </div>
                    </ClassesContext.Provider>
                </UsersContext.Provider>
            </MicrosoftAccountsContext.Provider>
        </>
    )
}