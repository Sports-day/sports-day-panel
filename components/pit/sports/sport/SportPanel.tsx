import styles from "../../../../styles/Pit.module.scss";
import {Box, CircularProgress, Divider} from "@mui/material";
import {useRouter} from "next/router";
import {useFetchSport} from "../../../../src/features/sports/hook";
import {SportProfile} from "./SportProfile";
import {SportGames} from "./SportGames";


export function SportPanel(props: { id: number }) {
    //  router
    const router = useRouter()
    //  fetch
    const {sport, refresh, isFetching} = useFetchSport(props.id)


    if (!isFetching && !sport) {
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
                        <h1>{sport?.name}</h1>

                        {/*// @ts-ignore*/}
                        <SportProfile sport={sport} refresh={refresh} />

                        <Divider light />

                        {/*// @ts-ignore*/}
                        <SportGames sport={sport} refresh={refresh} />
                    </>
                }
            </div>
        </>
    )
}