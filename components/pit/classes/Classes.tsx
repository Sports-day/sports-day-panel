import {useFetchClasses} from "../../../src/features/classes/hooks";
import {useState} from "react";
import styles from "../../../styles/Pit.module.scss";
import {Button} from "@mui/material";
import {ClassesContext, GroupsContext} from "../../context";
import {ClassList} from "./ClassList";
import {useFetchGroups} from "../../../src/features/groups/hook";
import {ClassForm} from "./ClassForm";

export function Classes() {
    const {classes, refresh: refreshClasses} = useFetchClasses()
    const {groups, refresh: refreshGroups} = useFetchGroups()
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)


    return (
        <>
            <ClassesContext.Provider value={{data: classes, refresh: refreshClasses}}>
                <GroupsContext.Provider value={{data: groups, refresh: refreshGroups}}>
                <div className={styles.content}>

                    <h1>クラス</h1>
                    <p>クラスを使ってチームやユーザーを管理できます。</p>

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

                    <ClassForm
                        isOpen={isCreatorOpen}
                        setClose={() => setIsCreatorOpen(false)}
                        formType={"create"}
                        refresh={refreshClasses}
                    />
                    <ClassList/>
                </div>
                </GroupsContext.Provider>
            </ClassesContext.Provider>
        </>
    )
}