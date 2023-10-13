import styles from "../../../styles/Pit.module.scss";
import {useFetchSports} from "../../../src/features/sports/hook";
import {ImagesContext, SportsContext, TagContext} from "../../context";
import {Box, Button, CircularProgress} from "@mui/material";
import {SportForm} from "./SportForm";
import {SportList} from "./SportList";
import {useState} from "react";
import {useFetchImages} from "../../../src/features/images/hook";
import {useFetchTags} from "../../../src/features/tags/hook";

export function Sports() {
    const {sports, refresh: refreshSports, isFetching: isFetchingSports} = useFetchSports()
    const {images, refresh: refreshImages, isFetching: isFetchingImages} = useFetchImages()
    const {tags, refresh: refreshTags, isFetching: isFetchingTags} = useFetchTags()
    // const {games, refresh: refreshGames, isFetching: isFetchingGames} = useFetchGames()

    //  state
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <SportsContext.Provider
                value={{
                    data: sports,
                    refresh: refreshSports
                }}
            >
                <ImagesContext.Provider
                    value={{
                        data: images,
                        refresh: refreshImages
                    }}
                >
                    <TagContext.Provider
                        value={{
                            data: tags,
                            refresh: refreshTags
                        }}
                    >
                        <div className={styles.content}>
                            <h1>競技</h1>

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

                            {isFetchingSports && isFetchingImages ?
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
                                    <SportForm
                                        isOpen={isCreatorOpen}
                                        setClose={() => setIsCreatorOpen(false)}
                                        formType={"create"}
                                        refresh={refreshSports}
                                    />

                                    <SportList/>
                                </>
                            }
                        </div>
                    </TagContext.Provider>
                </ImagesContext.Provider>
            </SportsContext.Provider>
        </>
    )
}