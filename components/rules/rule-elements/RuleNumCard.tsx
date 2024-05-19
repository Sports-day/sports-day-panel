import {Stack, Typography, useTheme}from "@mui/material";

export type RuleNumCardProps = {
    title: string;
    content: string;
    sub: string;
}

export const RuleNumCard = (props: RuleNumCardProps) => {
    const theme = useTheme();
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
                border: `1px solid ${theme.palette.text.secondary}`,
                borderRadius: "15px",
                borderBottomLeftRadius: "3px",
                height:"fit-content",
            }}
        >
            <Typography
                color={theme.palette.text.secondary}
                sx={{fontSize: "16px"}}
            >
                {title}
            </Typography>
            <Typography
                color={theme.palette.text.primary}
                fontSize={"24px"}
            >
                {content}
            </Typography>
            <Typography
                color={theme.palette.text.secondary}
            >
                {sub}
            </Typography>
        </Stack>

    )
}