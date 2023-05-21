import styles from "../../../styles/Pit.module.scss";
import {TeamProfile} from "./TeamProfile";
import {useRouter} from "next/router";
import {useFetchTeam} from "../../../src/features/teams/hook";
import {Box, CircularProgress} from "@mui/material";
import {TeamUsers} from "./TeamUsers";

export const TeamPanel = (props: { id: number }) => {
    //  router
    const router = useRouter()
    //  fetch
    const {team, refresh, isFetching} = useFetchTeam(props.id)

    if (!isFetching && !team) {
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
                        {/*// @ts-ignore*/}
                        <TeamProfile team={team} refresh={refresh} />

                        {/*// @ts-ignore*/}
                        <TeamUsers team={team} refresh={refresh} />
                    </>
                }
            </div>
        </>
    )
}