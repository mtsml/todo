# Todo
スマートフォン向けのシンプルなTodoアプリ。

### 機能
- データ操作
    - タスクの作成・更新・削除
    - リストの作成・更新・削除
- UI
    - スワイプでのリスト切り替え
    - スワイプでのタスク・リスト編集画面クローズ
    - 長押しによるタスク順序の変更

### 起動方法

```sh
npm install
npm start
```

### ディレクトリ構成
```
./
├─ public/          # 静的ファイル
└─ src/
   ├─ api/          # API: BEへの接続を管理する
   ├─ components/   # コンポーネント
   ├─ hooks/        # Hooks
   ├─ store/        # グローバルstate: Recoilはこの中に隠蔽する
   └─ util/         # 汎用関数・定数
```

### パッケージ
`package.json`を参照。

雛形は`create-react-app`より作成。以下のパッケージを追加でインストールしている。

- recoil: グローバルstate管理のため
- mdb-react-ui-kit: Bootstrapと一部コンポーネントを利用するため
- @supabase/supabase-js: Supabaseへの接続のため

### データ構造
Supabaseが提供するPostgreSQLを用いてデータを管理する。

#### task
|カラム名|データ型|制約|説明|
|---|---|---|---|
|id|serial|PK|タスクID|
|title|varchar|NOT NULL|タイトル|
|detail|varchar||メモ|
|completed|boolean|NOT NULL|タスクが完了しているか|
|list_id|int|FK(list.id)|リストID|
|sort_no|int|NOT NULL|並び順|
|created_at|timestamptz|NOT NULL|作成日|
|updated_at|timestamptz|NOT NULL|更新日|

#### list
|カラム名|データ型|制約|説明|
|---|---|---|---|
|id|serial|PK|リストID|
|title|varchar|NOT NULL|タイトル|
|created_at|timestamptz|NOT NULL|作成日|
|updated_at|timestamptz|NOT NULL|更新日|
