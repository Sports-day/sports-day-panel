import styles from "../../../styles/Pit.module.scss";
import { TagContext } from "../../context";
import {useFetchTags} from "../../../src/features/tags/hook";
import {Box, Button, CircularProgress} from "@mui/material";
import {useState} from "react";
import {TagList} from "./TagList";
import {TagForm} from "./TagForm";

export function Tags() {
    const {tags, refresh: refreshTags, isFetching: isFetchingTags} = useFetchTags()

    //  state
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <TagContext.Provider
                value={{
                    data: tags,
                    refresh: refreshTags
                }}
            >
                <div className={styles.content}>
                    <h1>タグ</h1>

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

                    {isFetchingTags ?
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
                            <TagForm
                                isOpen={isCreatorOpen}
                                setClose={() => setIsCreatorOpen(false)}
                                formType={"create"}
                                refresh={refreshTags}
                            />

                            <TagList/>
                        </>
                    }
                </div>
            </TagContext.Provider>
        </>
    )
}