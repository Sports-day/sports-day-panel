import {
    Box,
    Grid,
    Stack,
    Typography,
    DialogContentText,
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import Coat from "../../public/rules/coat-kickbase.svg"
import * as React from "react";

const markdown = `
# 女子ハンデ
- 女子が3人以上のチームが攻撃の回は３アウト交代とする
- 女子が本塁に帰ってきた場合は得点を2点とする
- 3回の空振り制限の対象外とする
- 女子が蹴ったボールをピッチャーが捕るのは禁止とする

# 📗ルール
基本はソフトボールのルールに遵守するが以下の点で異なる。
- ボールはサッカーボールを使用しピッチャーはマウンド方ボールを転がす
- 塁は本塁、1塁、2塁、3塁とし、走り抜けを認める
- 2アウト交代制とする
- ピッチャーの転がしたボールの有効、無効は審判が判定する
また、以下の行為を禁止とする
- タッチアウト(ランナーにボールを当てること)
- 盗塁(ボールが蹴られる前に出塁者が走り出すこと)

# 🥇採点方法
- 試合終了時の得点が多いチームが勝利とする
- 試合終了時に得点が同じ場合は、代表者のじゃんけんで勝敗を決める
- 勝ち点は、勝ち→3、引き分け→1、負け→0
- リーグ内で勝ち点が同点の場合は得失点差で勝敗を決める

# ⚠️注意事項
- 試合開始前、終了後の消毒を徹底する
- 試合間の時間でボールの消毒を行う
- 審判の判定に従う。
`

export const RuleFutsal = () => {
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
                    <RuleNumCard title={"会場"} content={"グラウンド"} sub={" "}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"試合時間"} content={"20分"} sub={"-"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"出場人数"} content={"9 〜 11"} sub={"人"}/>
                </Grid>
                <Grid xs={12} sm={12} lg={6}>
                    <RuleNumCard title={"担当審判"} content={"学生会役員・参加チーム"} sub={"1試合あたり2人"}/>
                </Grid>
                <Grid xs={12} sm={12} lg={6}>
                    <RuleNumCard title={"試合形式"} content={"予選リーグ ＋ 決勝トーナメント"} sub={""}/>
                </Grid>
                <Grid xs={12} sm={12} lg={6}>
                    <RuleNumCard title={"女子ハンデ"} content={"下に記載"} sub={""}/>
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