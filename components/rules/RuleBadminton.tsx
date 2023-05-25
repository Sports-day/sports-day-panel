import {
    Box,
    Grid,
    Stack,
    Typography,
    DialogContentText,
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import Coat from "../../public/rules/coat-badminton.svg"
import * as React from "react";

const markdown = `
# 📗ルール
- 基本的にはバドミントンのルールに準ずるが以下の点で異なる。
- サーブは２回ずつで交代とする。
- どちらかに2点点数が入った時点で、両チームともに、メンバーを交代する。（試合時間に応じて変更の可能性あり）
- 交代順は自由だが特定の学生が多く出場することを避け、運動量を減らすことで熱中症予防に努めること。
- 試合は時間制で行い、分間で多く点数を取った方が勝ちとする。
- 最終的な得点の多かった方のチームを勝利とする。
- ポイントの数え方は1点ずつとする。
- サーブは下から打つこと。

# 🥇順位決定法
- 勝ち点制を採用し、勝ちを3点、引き分けを1点、負けを0点とし、合計点で順位を決定する。
- 勝ち点の同じ場合、総得点数で順位を決定する。

# ⚠️注意事項
- 審判の判定に従う。
`

export const RuleBadminton = () => {
    return(
        <Stack
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={2}
            py={2}
            sx={{width:"100%"}}
        >
            <Typography color={"#E8EBF8"}>フィールド図</Typography>
            <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={2}
                pb={2}
                sx={{width:"100%"}}
            >
                <Box sx={{width:"100%", maxWidth:"350px"}}>
                    <Coat width={"98%"} fill={'#99a5d6'}/>
                </Box>
            </Stack>
            <Grid container>
                <Grid xs={12} sm={12} lg={12}>
                    <RuleNumCard title={"会場"} content={"第二体育館"} sub={"１階"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"試合時間"} content={"8分"} sub={"☀️晴天時"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"試合時間"} content={"6分"} sub={"☔️雨天時"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"チーム人数"} content={"3 〜 4"} sub={"ダブルス"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"担当審判"} content={"敗者審判"} sub={"-"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"特点板係"} content={"指定チーム"} sub={"リーグ表参照"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"部員ハンデ"} content={"バド部1人まで"} sub={"(1チームあたり)"}/>
                </Grid>
                <Grid xs={12} sm={12} lg={12}>
                    <RuleNumCard title={"女子ハンデ"} content={"女子1人あたり2点"} sub={"(試合開始時に加点、上限6点)"}/>
                </Grid>
            </Grid>
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