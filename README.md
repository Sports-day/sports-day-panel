![panel_banner](https://github.com/Sports-day/sports-day-panel/assets/58895178/817eb8e1-25d1-4dd6-bbca-684ff3b8dcc2)
# sports-day-panel

球技大会の進行に使用する、運営・学生向けアプリケーション「SPORTSDAY」のフロントエンド用リポジトリです。Affinity Designerを使用してUIデザインを行い、NextJSとMUI, FramerMotionを用いて実装されています。

<p align="center">
  <img src="https://github.com/Sports-day/sports-day-panel/assets/58895178/19bf3c6f-7cad-4f3f-94a5-95bea81dde5e" width="800"> </br>
  SPORTSDAY Panel (2023年10月)
</p>

Sports-day-panelは、Microsoftアカウントによりログインした学生のデータをSportsDayAPIから取得し、各競技の進行状況の他、次の試合のスケジュールやチームメンバー、自分のチームの順位などを表示します。
特定の運営ユーザーは管理画面を使用し、試合結果の入力などの大会進行に必要なデータを入力することができます。

<p align="center">
  <img src="https://github.com/Sports-day/sports-day-panel/assets/58895178/fd4fe6d6-42c3-482e-89d2-a0609ec70e89" width="800"> </br>
  SPORTSDAY Formは2024年5月末の球技大会に向けて開発中です。
</p>


## Develop

### Git branch

``main``: プロダクション用ブランチ

開発時は、``main``ブランチからブランチを切ってください。

### Git commit

#### Template

```
<type>: <subject>
```

#### Type

- **feat**: 新機能
- **change**: 修正・削除
- **fix**: バグフィックス
- **docs**: ドキュメントに関する変更
- **style**: フォーマット等の変更
- **refactor**: リファクタに関する変更
- **debug**: デバック用のコード

## LICENSE
Apache-2.0
Copyright Sports-day
