import {
    Box,
    Grid,
    Stack,
    Typography,
    DialogContentText,
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import Coat from "../../public/rules/coat-beachball.svg"
import * as React from "react";

const markdown = `
# 📗ルール
- 先攻後攻は試合開始前にじゃんけんで決める
- サーブはコートの右前の人が打つ。（アンダーサーブのみ）
- ボールに触れる回数は1回の攻撃で3回までとし、同じ人が連続してボールに触れてはならない。
- 相手コートに入れるかブロックアウトで1点。
- ラリーポイント制。時間内に獲得した点数で勝敗を決定する。
- タッチネット、オーバーネットの判定が出た時は相手のチームに１点。
- インかアウトかは真上から見てボールがラインにかかっているかどうかで判断する。
- チームの人数が5人以上の場合、得点が決まりサーブを打つまでの間のみ選手の交代を認める。
- 指定された試合で審判をする（各チーム2人）

# 🥇順位決定法
- 勝ち点制を採用し、勝ちを3点、引き分けを1点、負けを0点とし、合計点で順位を決定する。
- 勝ち点の同じ場合、得失点差で順位を決定する。

# ⚠️注意事項
- 審判の判定に従う。
- 次の試合が当たっているチームは第一体育館二階などで待機するようにすること。
`

export const RuleBeachball = () => {
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
                    <RuleNumCard title={"会場"} content={"第一体育館"} sub={" "}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"試合時間"} content={"12分"} sub={"☀️☔️共通"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"チーム人数"} content={"6 〜 8"} sub={"コート内4人"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"担当審判"} content={"指定審判"} sub={"リーグ表参照"}/>
                </Grid>
                <Grid xs={12} sm={12} lg={6}>
                    <RuleNumCard title={"女子ハンデ"} content={"女子1人あたり2点"} sub={"(試合開始時に加点、上限4点)"}/>
                </Grid>
                <Grid xs={12} sm={12} lg={6}>
                    <RuleNumCard title={"部員ハンデ"} content={"バレー部員2人まで"} sub={"(1チームあたり)"}/>
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