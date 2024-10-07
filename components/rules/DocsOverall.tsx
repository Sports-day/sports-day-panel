import {
    Box,
    Stack,
    Typography,
    DialogContentText,
    useTheme
} from "@mui/material";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from "@mui/lab";
import {timelineContentClasses} from "@mui/lab/TimelineContent";
import {
    HiMapPin,
} from "react-icons/hi2"
import ReactMarkdown from "react-markdown";
import * as React from "react";

const markdown = `
# 会場
- ビーチバレー：第1体育館
- バスケットボール：第2体育館
- ドッジボール：野球場
- サッカー：グラウンド 芝生一面

# ⚠️注意事項

- 楽しむこと。
- 各自準備運動をしておき、けがの予防に努めること。
- 試合開始 10 分前には各競技場所に集合すること。
- 開始時刻までにメンバーが揃わなかった場合、その場にいるメンバーで始め、遅れてきた人は途中参加とする。
- 体育館への土足での進入および体育館での飲食は厳禁とする。
- 親睦を深めることが重要である。怪我人を出すほど競技に熱中しないこと。
- エントリー外の選手の出場は禁止とする。
- 審判の指示に従うこと。

# 営業時間
- 生協売店（ポプリ）：09時30分　〜　17時00分
- 生協食堂：11時30分　〜　13時30分
- 学寮食堂：11時30分　〜　13時30分

`

export const DocsOverall = () => {
    const theme = useTheme();
    return (
        <Stack
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={2}
            py={2}
            sx={{width: "100%"}}
        >
            <Typography color={theme.palette.text.primary}>タイムテーブル</Typography>
            <Timeline sx={{
                [`& .${timelineContentClasses.root}`]: {
                    flex: 30,
                    width: "100%",
                },
            }}>
                <TimelineItem>
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
                        09:05
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        出欠確認
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={theme.palette.text.secondary}/></Box>
                            <Typography fontSize={"14px"} color={theme.palette.text.secondary}>各教室</Typography>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
                        09:15
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        開会式（放送）
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={theme.palette.text.secondary}/></Box>
                            <Typography fontSize={"14px"} color={theme.palette.text.secondary}>
                                各教室
                            </Typography>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
                        09:30
                        〜
                        15:40
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>競技</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
                        15:50
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        出欠確認
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={theme.palette.text.secondary}/></Box>
                            <Typography fontSize={"14px"} color={theme.palette.text.secondary}>各教室</Typography>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
                        15:55
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        閉会式
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={theme.palette.text.secondary}/></Box>
                            <Typography fontSize={"14px"} color={theme.palette.text.secondary}>各教室</Typography>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
                        16:10
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                    </TimelineSeparator>
                    <TimelineContent>
                        解散
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
            <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
                color={theme.palette.text.primary}
                lineHeight={"27px"}
            >
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </DialogContentText>

        </Stack>
    )
}