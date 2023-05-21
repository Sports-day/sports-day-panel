import styles from "../../../styles/Pit.module.scss";
import {useFetchImages} from "../../../src/features/images/hook";
import {useState} from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import {ImageList} from "./ImageList";
import { ImageForm } from "./ImageForm";

export function Images() {
    const {images, isFetching, refresh} = useFetchImages()
    //  state
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <div className={styles.content}>
                <h1>画像</h1>
                <p>競技のアイコン等に使用できます。</p>

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

                <ImageForm
                    isOpen={isCreatorOpen}
                    setClose={() => setIsCreatorOpen(false)}
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
                        <ImageList images={images} refresh={refresh}/>
                    </>
                }
            </div>
        </>
    )
}