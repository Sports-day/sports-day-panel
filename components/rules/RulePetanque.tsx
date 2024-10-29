import {
    Stack,
    Typography,
    DialogContentText, Button,
    useTheme
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import * as React from "react";

const markdown = `
***
### ⚠️注意事項
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
            <RuleNumCard title={"☀️晴天時の会場"} content={""} sub={"オープンラボ 1、2、第 1 体育館-武道場間、図書館-武道場間"}/>
            <RuleNumCard title={"☔️雨天時の会場"} content={""} sub={"オープンラボ 1、2"}/>
            <RuleNumCard title={"担当審判"} content={""} sub={"学生会執行部・参加チーム（１試合当たり１～２人）"}/>
            <RuleNumCard title={"出場人数"} content={"3人または6人"}/>
            <RuleNumCard title={"試合形式"} content={"予選リーグ + 決勝トーナメント"}/>
            <RuleNumCard title={"試合時間"} content={""} sub={"[予選リーグ] 晴天時：12 分・雨天時：6 分 [決勝リーグ] 晴天時：15 分・雨天時：10 分"}/>
            <RuleNumCard title={"採点方法"} content={""} sub={"試合終了時の得点が多いチームが勝利とする。同点の場合は引き分けとする。"}/>
            <RuleNumCard title={"順位決定法"} content={"リーグ戦では勝ち点制"} sub={"勝ち3点・引き分け1点・負け0点　として合計点で順位を決定し、勝ち点が同じ場合、得失点差で順位を決定する。"}/>
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