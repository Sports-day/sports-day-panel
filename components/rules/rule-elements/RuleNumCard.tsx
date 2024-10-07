import {Divider, Stack, Typography, useTheme} from "@mui/material";

export type RuleNumCardProps = {
    title: string;
    content: string;
    sub?: string;
}

export const RuleNumCard = (props: RuleNumCardProps) => {
    const theme = useTheme();
    const {title, content, sub} = props;
    return (
        <Stack sx={{py:2, px:3, my:1, width:"100%",
            background: `${theme.palette.text.disabled}20`,
            boxShadow: `0px 2px 15px ${theme.palette.text.disabled}25`,
            border:`1px solid ${theme.palette.text.disabled}20`,
            borderRadius:"16px"
        }}>
            <Stack spacing={0.5}>
                <Stack direction={"row"} spacing={1} width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography fontSize={"14px"}>{title}</Typography>
                    <Typography fontWeight={"600"}>{content}</Typography>
                </Stack>
                {sub &&
                    <>
                        <Divider/>
                        <Typography fontSize={"14px"} pt={1}>{sub}</Typography>
                    </>
                }
            </Stack>
        </Stack>

    )
}