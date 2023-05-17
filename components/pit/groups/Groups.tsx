import {useFetchGroups} from "../../../src/features/groups/hook";
import {GroupList} from "./GroupList";
import styles from "../../../styles/Pit.module.scss";
import {GroupForm} from "./GroupForm";
import {Button} from "@mui/material";
import {useState} from "react";
import {GroupsContext} from "../context";

export function Groups() {
    const {groups, refresh: refreshGroup} = useFetchGroups()
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <GroupsContext.Provider value={{data: groups, refresh: refreshGroup}}>
                <div className={styles.content}>

                    <h1>グループ</h1>
                    <p>グループを使ってクラスを管理できます。</p>

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

                    <GroupForm isOpen={isCreatorOpen} setClose={() => setIsCreatorOpen(false)} formType={"create"}
                               refresh={refreshGroup}/>
                    <GroupList/>
                </div>
            </GroupsContext.Provider>
        </>
    )
}