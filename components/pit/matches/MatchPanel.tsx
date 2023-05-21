import styles from "../../../styles/Pit.module.scss";
import {useRouter} from "next/router";
import {useFetchMatch} from "../../../src/features/matches/hook";
import {Box, CircularProgress} from "@mui/material";
import {MatchEditForm} from "./MatchEditForm";

export function MatchPanel(props: { id: number }) {
    //  router
    const router = useRouter()
    //  fetch
    const {match, refresh: refreshMatch, isFetching: isFetchingMatch} = useFetchMatch(props.id)


    if (!isFetchingMatch && !match) {
        //  404
        router.push("/404").then()
        return null
    }

    return (
        <>
            <div className={styles.content}>
                {isFetchingMatch ?
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
                        <h1>マッチ</h1>

                        {/*// @ts-ignore*/}
                        <MatchEditForm match={match} refresh={refreshMatch} />
                    </>
                }

            </div>
        </>
    )
}