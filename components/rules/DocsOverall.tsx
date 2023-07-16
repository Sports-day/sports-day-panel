import {
    Box,
    Stack,
    Typography,
    DialogContentText
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
import { timelineContentClasses } from "@mui/lab/TimelineContent";
import {
    MapPin
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import * as React from "react";

const markdown = `
# 運営体制
- 運営：高専太郎
- 結果集計：高専太郎
- 巡回・状況把握：高専太郎
- 取材：高専太郎
- 緊急対応：高専太郎

# ⚠️注意事項
安全で楽しい大会になるよう、下記のことに気をつけましょう。
熱中症は命の危険があり，治ったとしても後遺症が残ることがある非常に危険性の高いものです。したがって競技等よりも熱中症対策を最優先してください。
- 立ちくらみ，めまい，筋肉痛，手や足がつる，汗を大量にかく，生あくびが出るなどは熱中症の初期症状が疑われます。さらに症状が進むと頭痛，倦怠感，虚脱感，判断力や集中力の低下などが起こります。少しでも体調の異変を感じたら，試合途中でもただちに活動を終え２ｍ以上距離を取り、マスクを外し、声を出さずに休養してください。
- また、近くの教職員に体調不良を伝えてください。自分だけでなく，周りの人も様子に変化がないか注意してください。
- 喉が渇いていなくてもこまめに水分および塩分を補給し，休息もこまめにとってください
`

export const DocsOverall = () => {
    return(
        <Stack
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={2}
            py={2}
            sx={{width:"100%"}}
        >
            <Typography color={"#E8EBF8"}>タイムテーブル</Typography>
                <Timeline sx={{
                    [`& .${timelineContentClasses.root}`]: {
                        flex: 30,
                        width: "100%",
                    },
                }}>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            08:50
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            出席確認・放送による開会式
                            <Stack direction={"row"}>
                                <Box pt={0.2}><MapPin size={16} color={"#99a5d6"}/></Box>
                                <Typography fontSize={"14px"} color={"#99a5d6"}>各教室</Typography>
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            09:00
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            着替えが済んでいない学生は着替える
                            <Stack direction={"row"}>
                                <Box pt={0.2}><MapPin size={16} color={"#99a5d6"}/></Box>
                                <Typography fontSize={"14px"} color={"#99a5d6"}>男: 各教室 | 女: 女子更衣室, 1階物理実験室</Typography>
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            09:30
                            〜
                            15:20
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>競技 （昼食は各自）</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            15:30
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            放送による閉会式
                            <Stack direction={"row"}>
                                <Box pt={0.2}><MapPin size={16} color={"#99a5d6"}/></Box>
                                <Typography fontSize={"14px"} color={"#99a5d6"}>各教室</Typography>
                            </Stack>　
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            15:50
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                           解散
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
                color={"#E8EBF8"}
                lineHeight={"27px"}
            >
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </DialogContentText>
        </Stack>
    )
}