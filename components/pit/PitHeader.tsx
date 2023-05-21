import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Pit.module.scss";

export function PitHeader() {

    return (
        <header>
            <Link href={"/admin"} className={styles.logo}>
                <Image
                    src={"/pit.svg"}
                    alt={"Pit Logo"}
                    width={91}
                    height={30}
                />
            </Link>
        </header>
    )
}