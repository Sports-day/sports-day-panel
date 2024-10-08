import {useFetchAllInformation} from "../src/features/information/hook";
import {Notification} from "./layouts/notification";
import * as React from "react";
import {OtherInfo} from "@/components/dashboard/Overview/OtherInfo";

export const InformationList = () => {
    const { allInformation } = useFetchAllInformation()

    const components = allInformation.map((information) => {
        return (
            // <Notification
            //     key={information.id}
            //     infoName={information.name}
            //     infoContent={information.content}
            // />
            <OtherInfo
                infoName={""}
                infoContent={information.name}
                infoSubContent={information.content}
                key={information.id}
            />
        )
    })

    return (
        <>
            {components}
        </>
    )
}
