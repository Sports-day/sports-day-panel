import styles from "../../../styles/Pit.module.scss";
import {Button} from "@mui/material";
import {useState} from "react";
import {useFetchAllInformation} from "../../../src/features/information/hook";
import {InformationContext} from "../../context";
import {InformationForm} from "./InformationForm";
import { InformationList } from "./InformationList";

export function InformationComponent() {
    const {allInformation, isFetching, refresh} = useFetchAllInformation()
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <InformationContext.Provider value={{data: allInformation, refresh: refresh}}>
                <div className={styles.content}>

                    <h1>インフォメーション</h1>
                    <p>基本ページに通知として表示できます</p>

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

                    <InformationForm
                        isOpen={isCreatorOpen}
                        setClose={() => setIsCreatorOpen(false)}
                        formType={"create"}
                        refresh={refresh}
                    />
                    <InformationList />
                </div>
            </InformationContext.Provider>
        </>
    )
}