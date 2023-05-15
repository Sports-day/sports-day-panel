import styles from "../../styles/Pit.module.scss";
import {PitSidebarContent} from "./PitSidebarContent";

export function PitSidebar() {
    return (
        <div className={styles.sidebar}>
            <PitSidebarContent
                name={"グループ"}
                url={"/admin/groups"}
            />
            <PitSidebarContent
                name={"クラス"}
                url={"/admin/classes"}
            />
            <PitSidebarContent
                name={"チーム"}
                url={"/admin/teams"}
            />
        </div>
    )
}