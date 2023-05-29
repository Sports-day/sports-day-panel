import {
    Stack,
    Typography
} from "@mui/material";
import {
    Info
} from "lucide-react";

export type NotificationProps = {
    infoName: string;
    infoContent: string;
}

export const Notification = (props: NotificationProps) => {
    return (
        <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing={2.5}
            px={2}
            py={1.3}
            sx={{
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                borderBottomLeftRadius: "3px",
                height:"fit-content",
            }}
        >
            <Info color={"#23398a"}/>
            <Stack
                direction={"column"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                spacing={0}
            >
                <Typography
                    color={"#23398A"}
                    sx={{fontSize: "14px"}}
                >
                    {props.infoContent}
                </Typography>
            </Stack>
        </Stack>
    )
}