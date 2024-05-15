import {
    Box,
    Stack,
    Typography,
    DialogContentText,
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
# 運営体制
- 運営： ${process.env.NEXT_PUBLIC_OPERATION_PERSON}
- 結果集計：${process.env.NEXT_PUBLIC_RESULT_PERSON}
- 巡回・状況把握： ${process.env.NEXT_PUBLIC_PATROL_PERSON}
- 取材： ${process.env.NEXT_PUBLIC_INTERVIEW_PERSON}
- 緊急対応： ${process.env.NEXT_PUBLIC_EMERGENCY_PERSON}

# ⚠️注意事項
安全で楽しい大会になるよう、下記のことに気をつけましょう。

◇熱中症は命の危険があり，治ったとしても後遺症が残ることがある非常に危険性の高いものです。したがって競技等よりも熱中症対策を最優先してください。
- 立ちくらみ，めまい，筋肉痛，手や足がつる，汗を大量にかく，生あくびが出るなどは熱中症の初期症状が疑われます。さらに症状が進むと頭痛，倦怠感，虚脱感，判断力や集中力の低下などが起こります。少しでも体調の異変を感じたら，試合途中でもただちに活動を終え２ｍ以上距離を取り、マスクを外し、声を出さずに休養してください。
- また、近くの教職員に体調不良を伝えてください。自分だけでなく，周りの人も様子に変化がないか注意してください。
- 喉が渇いていなくてもこまめに水分および塩分を補給し，休息もこまめにとってください

◇新型コロナウイルス感染防止対策のため、以下の注意事項を遵守してください
- 競技中のマスク着用は競技者の判断とする。
- 試合前後の手洗い、消毒を徹底すること。
- 観戦時や屋内で会話をする際、人との距離を十分に保てない場合はマスクを着用すること。
- 更衣室内が密にならないよう、混雑を避けるようにすること。
`

export const DocsOverall = () => {
    return (
        <Stack
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={2}
            py={2}
            sx={{width: "100%"}}
        >
            <Typography color={"primary.main"}>タイムテーブル</Typography>
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
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        開会式
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={"#5f6dc2"}/></Box>
                            <Typography fontSize={"14px"} color={"#5f6dc2"}>各教室</Typography>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        09:00
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        着替え
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={"#5f6dc2"}/></Box>
                            <Typography fontSize={"14px"}
                                        color={"#5f6dc2"}>男子は各教室、女子は女子更衣室と1階物理実験室</Typography>
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
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>競技</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        15:30
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        閉会式
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={"#5f6dc2"}/></Box>
                            <Typography fontSize={"14px"} color={"#5f6dc2"}>各教室</Typography>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        15:50
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
                color={"#2f3c8c"}
                lineHeight={"27px"}
            >
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </DialogContentText>

        </Stack>
    )
}