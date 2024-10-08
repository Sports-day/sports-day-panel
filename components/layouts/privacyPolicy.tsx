import {Stack, Divider, Typography, Card, Container} from "@mui/material";
import WiderLogo from "@/components/layouts/logo/widerlogo";

const PrivacyPolicy = () => {
    return (
        <Container maxWidth={"xl"}>
            <Stack spacing={2}>
                <Typography variant={"h6"} fontWeight={"600"} textAlign={"center"}>プライバシーポリシー</Typography>
                <Divider/>
                <Typography variant={"h6"}>どのような情報を収集しますか？</Typography>
                <Typography>当サイトを利用すると、以下の情報が収集されることがあります。</Typography>
                <Card variant={"outlined"} sx={{p:2}}>
                    <Stack spacing={1}>
                        <Typography fontWeight={"600"}>基本的なアカウント情報</Typography>
                        <Divider/>
                        <Typography>当サイトを利用するためには、Microsoftアカウントの基本的な情報（名前・メールアドレス）を取得します。また、参加する競技やチーム・リーグ・トーナメント・得点状況といった大会進行にしたがって必要な情報は、SPORTSDAY Adminを用いて登録されます。これらの情報は他のSPORTSDAYユーザーに公開されます。</Typography>
                    </Stack>
                </Card>
                <Card variant={"outlined"} sx={{p:2}}>
                    <Stack spacing={1}>
                        <Typography fontWeight={"600"}>Cookie</Typography>
                        <Divider/>
                        <Typography>当サイトを利用すると、お使いのブラウザのCookieを利用します。CookieはSPORTSDAYの利用に伴う情報のみが保存・利用されます。Cookieが許可されていなければ、SPORTSDAYが正常に動作しない可能性があります。</Typography>
                    </Stack>
                </Card>
                <Card variant={"outlined"} sx={{p:2}}>
                    <Stack spacing={1}>
                        <Typography fontWeight={"600"}>その他のデータ</Typography>
                        <Divider/>
                        <Typography>アンケートや基本的な使用状況（アクセス数）は、SPORTSDAYの管理者（大会運営者）が閲覧することがあります。</Typography>
                    </Stack>
                </Card>
                <Divider/>
                <Typography variant={"h6"}>情報は何に使用されますか？</Typography>
                <Typography>収集した情報は次のように使用されることがあります。</Typography>
                <Card variant={"outlined"} sx={{p:2}}>
                    <Stack spacing={1}>
                        <Typography fontWeight={"600"}>SPORTSDAYのコア機能の提供</Typography>
                        <Divider/>
                        <Typography>基本的なアカウント情報は大会実施期間に限り、他のユーザーに競技一覧や進行状況として見ることで、大会の現況を把握することができるようにするために使用されます。また、大会運営者が大会前にリーグ・トーナメント・試合時間の調整を行う際や、大会進行時に競技の得点を入力する際に、ユーザーまたはチームを識別するために最低限の情報を表示することがあります。</Typography>
                    </Stack>
                </Card>
                <Card variant={"outlined"} sx={{p:2}}>
                    <Stack spacing={1}>
                        <Typography fontWeight={"600"}>ログイン状態の識別</Typography>
                        <Divider/>
                        <Typography>Cookieは、主にSPORTSDAYにログインしているかどうかを識別するために利用されます。</Typography>
                    </Stack>
                </Card>
                <Card variant={"outlined"} sx={{p:2}}>
                    <Stack spacing={1}>
                        <Typography fontWeight={"600"}>SPORTSDAYの改善</Typography>
                        <Divider/>
                        <Typography>当サイトでは、一部でアクセス解析ツールであるGoogle Analyticsを使用しており、そのためにCookieを利用することがあります。アンケートの回答結果やアクセス数などの情報は、SPORTSDAYの開発者や運営者が今後のシステム改善のためだけに閲覧することがあります。</Typography>
                    </Stack>
                </Card>
                <Divider/>
                <Typography variant={"h6"}>情報をどのように保護しますか？</Typography>
                <Typography>SPORTSDAY開発者は、ユーザーが入力・送信する際や自身の情報にアクセスする際に個人情報を安全に保つため、さまざまなセキュリティ上の対策を実施しています。アプリケーションとユーザーの間の通信はSSL/TLSによって保護されます。また、ログイン処理はMicrosoft Entra IDが提供するOpenID Connectを用いており、SPORTSDAY開発者はパスワードなどの情報を一切収集することができません。</Typography>
                <Divider/>
                <Typography variant={"h6"}>データの保持はどのように行われますか？</Typography>
                <Typography>SPORTSDAY開発者は誠意を持って次のように努めます：大会を通して収集されたアンケート結果以外のデータは、大会期間（大会当日の前後約1ヶ月）のみサーバーに保持されます。大会期間を過ぎると直ちに削除され、サーバーのストレージを完全にクリーンな状態にして安全に処理します。</Typography>
                <Divider/>
                <Typography variant={"h6"}>何らかの情報を外部に提供していますか？</Typography>
                <Typography>SPORTSDAY開発者は、個人を特定できるいかなる情報を外部へ提供・流出することはありません。ただし、アンケート結果から得られた評価など、実際の大会で得られたデータのうち個人の特定が不可能な情報のみをSPORTSDAYのプロモーションや発表のために利用する場合があります。</Typography>
                <Divider/>
                <Typography variant={"h6"}>プライバシーポリシーの変更について</Typography>
                <Typography>プライバシーポリシーの変更があった場合、このページに変更を掲載します。</Typography>
                <Typography>最終更新：2024年10月8日</Typography>
                <Stack direction={"row"} spacing={0.5}>
                    <Typography fontWeight={"600"} color={"#99a5d6"}>(C)2024</Typography>
                    <WiderLogo/>
                </Stack>
            </Stack>
        </Container>
    );
};

export default PrivacyPolicy;
