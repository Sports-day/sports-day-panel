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
            <PitSidebarContent
                name={"ユーザー"}
                url={"/admin/users"}
            />
            <PitSidebarContent
                name={"競技"}
                url={"/admin/sports"}
            />
            <PitSidebarContent
                name={"マッチ"}
                url={"/admin/matches"}
            />
            <PitSidebarContent
                name={"ロケーション"}
                url={"/admin/locations"}
            />
            <PitSidebarContent
                name={"Microsoftアカウント"}
                url={"/admin/microsoft-accounts"}
            />
        </div>
    )
}