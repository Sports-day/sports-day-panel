import {PitHeader} from "./PitHeader";
import {PitSidebar} from "./PitSidebar";
import styles from "../../styles/Pit.module.scss";
import {ReactNode} from "react";

export function PitDashboard(props: {children: ReactNode}) {
    return (
        <>
            <div className={styles.pit}>
                <PitHeader/>
                <div className={styles.dashboard}>
                    <PitSidebar/>
                    <div className={styles.container}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}