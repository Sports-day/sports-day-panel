import styles from "../../styles/Pit.module.scss";
import Link from "next/link";

export type PitSidebarContentProps = {
    name: string
    url: string
}

export const PitSidebarContent = (props: PitSidebarContentProps) => {
    return (
        <>

            <div className={styles.sidebarContent}>
                <Link
                    href={props.url}
                    className={styles.sidebarContentLink}
                >
                    {props.name}
                </Link>
            </div>
        </>
    )
}