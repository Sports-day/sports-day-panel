import {
    Stack,
    DialogContentText,
    useTheme
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import * as React from "react";

const markdown = `
### 📗ルール
- 必ず 1 試合中に 1 人 1 回はコートに入ってプレーする。
- 基本的にはバドミントンのルールに準ずるが以下の点で異なる。
- どちらかに 2 点点数が入った時点で、両チームともに、メンバーを交代する。（試合時間に応じて変更の可能性あり）
- 交代順は自由だが特定の学生が多く出場することを避け、運動量を減らすことで熱中症予防に努めること。
- 試合は時間制で行い、8 分間で多く点数を取った方が勝ちとする。
- 最終的な得点の多かった方のチームを勝利とする。
- ポイントの数え方は 1 点ずつとする。
- サーブは下から打つこと。
***
### ⚠️注意事項
- 審判の判定に従う。
`

export const RuleBadminton = () => {
    const theme = useTheme();
    return(
        <Stack
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={1}
            py={2}
            sx={{width:"100%"}}
        >
            <RuleNumCard title={"会場"} content={"第二体育館"}/>
            <RuleNumCard title={"出場人数"} content={"3~4人"} sub={"ダブルス"}/>
            <RuleNumCard title={"試合時間"} content={"8分"}/>
            <RuleNumCard title={"順位決定法"} content={"勝ち点制"} sub={"勝ち3点・引き分け1点・負け0点　として合計点で順位を決定し、勝ち点が同じ場合、総得点順で順位を決定する。"}/>
            <RuleNumCard title={"部員ハンデ"} content={"1チームに1人まで"}/>
            <RuleNumCard title={"女子ハンデ"} content={"試合前に1人につき2点加算"} sub={"上限は6点"}/>
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