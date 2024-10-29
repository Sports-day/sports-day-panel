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
***
### ⚠️注意事項

安全で楽しい大会になるよう、下記のことに気をつけましょう。
#### （１）体調管理（熱中症、感染症対策）について
##### 熱中症による事故を発生させないよう気をつけましょう
- 熱中症は命の危険があり，治ったとしても後遺症が残ることがある非常に危険性の高
いものです。したがって競技等よりも熱中症対策を最優先してください。
- 立ちくらみ，めまい，筋肉痛，手や足がつる，汗を大量にかく，生あくびが出るな
どは熱中症の初期症状が疑われます。さらに症状が進むと頭痛，倦怠感，虚脱感，判
断力や集中力の低下などが起こります。少しでも体調の異変を感じたら，試合途中で
もただちに活動を終え２ｍ以上距離を取り、マスクを外し、声を出さずに休養してく
ださい。
- また、近くの教職員に体調不良を伝えてください。自分だけでなく，周りの人も様
子に変化がないか注意してください。
- 喉が渇いていなくてもこまめに水分および塩分を補給し，休息もこまめにとってく
ださい
##### 感染症予防のため、以下の注意事項を遵守してください
- 競技中のマスク着用は競技者の判断とする。
- 試合前後の手洗い、消毒を徹底すること。
- 観戦時や屋内で会話をする際、人との距離を十分に保てない場合はマスクを着用すること。
- 更衣室内が密にならないよう、混雑を避けるようにすること。

#### (2)服装及び貴重品管理について
- 体育授業の服装（体操服またはジャージ）で参加すること。クラス T シャツでの参加を認めるが、運動に適さない服装の場合は参加を認めない。
- 体育館内では、記名した室内シューズで競技参加を行うこと。裸足・外履きでの体育館への立ち入りは厳禁とする。（外履きを入れる袋は各自で持参）
- 競技の安全性を高めるため、腕時計や装飾品は材質を問わず一切身に着けないこと。
- 貴重品は必ず貴重品袋に入れ、担任の先生に保管してもらう。また、ロッカーは必ず施錠すること。
#### （３） 競技上の注意について
- 各自準備運動をしておき、けがの予防に努めること。
- 自分が参加する試合の開始時刻を把握しておき、1 つ前の試合の間に集合すること。
- 開始時刻までにメンバーが揃わなかった場合、相手チームの不戦勝とする。
- 審判の仕事を怠った場合は勝ち点を 0 にする等のペナルティを与える。
- 欠席者のためにチームが組めなくなった場合は審判に申請し、受理されれば試合は放棄せずメンバー表を手書きで書き換えて出場すること。
- 競技責任者及び審判の指示に従うこと。暴言や暴行があった場合は即刻退場とする。
- 試合以外にも審判の担当が当たっている場合は遅れずに会場へ行くこと。審判の仕事で不明な点があった場合は会場ごとの競技担当者（学生会役員）に聞くこと。
- ルール違反が発覚した場合、勝ち点 0 などのペナルティをつける場合がある。
#### （４） その他の注意について
- 熱中症対策のため、適宜帽子等を着用し、各自で水分・塩分補給を行うこと。
- 体育館フロアでの飲食は原則禁止とする。
- 大会中は校内から出ないこと。
- 在校生以外の参加があったチームは失格とする。
- 緊急事態が発生した場合、直ちに試合を終了し、本部の指示に従うこと。
- 所属しているチーム以外の試合に出場することを禁止する。
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
                        08:50
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        出欠確認と開会式
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={theme.palette.text.secondary}/></Box>
                            <Typography fontSize={"14px"} color={theme.palette.text.secondary}>各教室</Typography>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
                        09:00
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        着替えが済んでいない学生は着替え
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={theme.palette.text.secondary}/></Box>
                            <Typography fontSize={"14px"} color={theme.palette.text.secondary}>
                                男子：各教室
                            </Typography>
                        </Stack>
                        <Stack direction={"row"}>
                            <Box pt={0.2}><HiMapPin size={16} color={theme.palette.text.secondary}/></Box>
                            <Typography fontSize={"14px"} color={theme.palette.text.secondary}>
                                女子：女子更衣室, １階物理実験室
                            </Typography>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
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
                    <TimelineOppositeContent color={theme.palette.text.secondary}>
                        15:30
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
                color={theme.palette.text.primary}
                lineHeight={"27px"}
            >
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </DialogContentText>

        </Stack>
    )
}