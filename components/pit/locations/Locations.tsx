import styles from "../../../styles/Pit.module.scss";
import {useFetchLocations} from "../../../src/features/locations/hook";
import {Box, Button, CircularProgress} from "@mui/material";
import {useState} from "react";
import { LocationForm } from "./LocationForm";
import { LocationList } from "./LocationList";

export function Locations() {
    const {locations, isFetching, refresh} = useFetchLocations()
    //  state
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <div className={styles.content}>
                <h1>ロケーション</h1>
                <p>マッチの開催場所等で指定できます</p>

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

                <LocationForm
                    isOpen={isCreatorOpen}
                    setClose={() => setIsCreatorOpen(false)}
                    formType={"create"}
                    refresh={refresh}
                />

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
                        <LocationList locations={locations} refresh={refresh}/>
                    </>
                }

            </div>
        </>
    )
}