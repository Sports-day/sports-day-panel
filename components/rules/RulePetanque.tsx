import {
    Grid,
    Stack,
    Typography,
    DialogContentText, Button,
    useTheme
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import * as React from "react";

const markdown = `

# 🥇採点方法
- 試合終了時の得点が多いチームが勝利とする
- 勝ち点は、勝ち→3、引き分け→1、負け→0
- リーグ内で勝ち点が同点の場合は得失点差で勝敗を決める

# ⚠️注意事項
- 試合前と終了後の消毒を徹底する。
- 試合後のボールの回収は審判が行う。
- 試合間に器具の消毒を行う。
- 出場選手は事前にルールの確認をしてから参加する。
- 審判の指示に従う。
`

export const RulePetanque = () => {
    const theme = useTheme();
    return(
        <Stack
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={2}
            py={2}
            sx={{width:"100%"}}
        >
            <Typography color={theme.palette.text.primary}>フィールド図はありません</Typography>
            <Grid container>
                <Grid xs={12} sm={12} lg={12}>
                    <RuleNumCard title={"会場"} content={"第一体育館と武道場の間"} sub={"️☀️晴天時"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"試合時間"} content={"6分"} sub={"-"}/>
                </Grid>
                <Grid xs={6} sm={6} lg={3}>
                    <RuleNumCard title={"出場人数"} content={"3 or6"} sub={"人"}/>
                </Grid>
                <Grid xs={12} sm={12} lg={6}>
                    <RuleNumCard title={"担当審判"} content={"学生会執行部と参加チーム"} sub={"1試合あたり1~2人"}/>
                </Grid>
                <Grid xs={12} sm={12} lg={6}>
                    <RuleNumCard title={"女子ハンデ"} content={"なし"} sub={""}/>
                </Grid>
            </Grid>
            <Button
                href={"https://fjpb.web.fc2.com/fjpb/petanque/game.htm"}
                target="_blank"
                sx={{
                    width: "100%",
                    height: "fit-content",
                    padding: "20px",
                    backgroundColor: "#fff",
                    border: "1px solid #fff",
                    borderRadius: "15px",
                    borderBottomLeftRadius: "3px"}}
            >
                <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={2}
                >
                    <Typography sx={{color: theme.palette.text.primary, fontSize: "16px"}}>
                        ルールはこちら
                    </Typography>
                </Stack>
            </Button>
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