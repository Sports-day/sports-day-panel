import {
    Stack,
    Typography,
    IconButton
} from "@mui/material";
import {
    Megaphone
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
            spacing={3}
            pl={2}
            pr={2}
            py={2}
            mt={1.5}
            sx={{
                backgroundColor: "#192d7a",
                borderRadius: "25px",
                borderBottomLeftRadius: "3px",
                height:"fit-content",
            }}
        >
            <IconButton
                sx={{backgroundColor: "#d3962a"}}
            >
                <Megaphone color={"#fff"}/>
            </IconButton>
            <Stack
                direction={"column"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                spacing={1}
            >
                <Typography
                    color={"#99a5d6"}
                    sx={{fontSize: "10px"}}
                    lineHeight={"1.2em"}
                >
                    お知らせ
                </Typography>
                <Typography
                    color={"#E8EBF8"}
                    sx={{fontSize: "14px"}}
                    lineHeight={"1.2em"}
                >
                    {props.infoContent}
                </Typography>
            </Stack>
        </Stack>
    )
}