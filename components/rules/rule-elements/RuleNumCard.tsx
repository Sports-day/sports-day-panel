import {Card, CardContent, Stack, Typography}from "@mui/material";

export type RuleNumCardProps = {
    title: string;
    content: string;
    sub: string;
}

export const RuleNumCard = (props: RuleNumCardProps) => {
    const {title, content, sub} = props;
    return (
        <Stack
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            spacing={1}
            px={1.5}
            py={1.5}
            mr={1}
            mb={1}
            sx={{
                border: "1px solid #99a5d6",
                borderRadius: "15px",
                borderBottomLeftRadius: "3px",
                height:"fit-content",
            }}
        >
            <Typography
                color={"textSecondary"}
                sx={{fontSize: "16px"}}
            >
                {title}
            </Typography>
            <Typography
                color={"textPrimary"}
                fontSize={"24px"}
            >
                {content}
            </Typography>
            <Typography
                color={"textSecondary"}
            >
                {sub}
            </Typography>
        </Stack>

    )
}