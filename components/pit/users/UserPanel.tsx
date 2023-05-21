import {useRouter} from "next/router";
import {useFetchUser} from "../../../src/features/users/hook";
import styles from "../../../styles/Pit.module.scss";
import {Box, CircularProgress} from "@mui/material";
import {UserTeams} from "./UserTeams";

export function UserPanel(props: { id: number }) {
    //  router
    const router = useRouter()
    //  fetch
    const {user, isFetching} = useFetchUser(props.id)

    if (!isFetching && !user) {
        //  404
        router.push("/404").then()
        return null
    }

    return (
        <>
            <div className={styles.content}>
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
                        <h1>{user?.name}</h1>

                        {/*// @ts-ignore*/}
                        <UserTeams user={user}/>
                    </>
                }
            </div>
        </>
    )
}