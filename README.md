# josyo-site — サークルサイト 取扱説明書

サークルの公式サイトです。**[Astro](https://astro.build) で作り、GitHub Pages で無料公開**しています。
この README は、サイトを引き継いで運用する後任者向けの取説です。プログラミングが初めてでも、この通りに進めれば更新・公開できます。

- **公開 URL**: https://piku-2.github.io/josyo-site/
- **ソースコード**: https://github.com/piku-2/josyo-site

---

## 1. 仕組み（まず全体像）

```
develop ブランチで編集・確認        ← 普段の作業はここ
        │
        ▼
完成したら main ブランチに反映（push）
        │
        ▼
GitHub Actions が自動でビルド & 公開   ← ここは全自動。何もしなくてよい
        │
        ▼
https://piku-2.github.io/josyo-site/ が更新される（数分後）
```

ポイントは2つ:

1. **普段の作業は `develop` ブランチでやる**（→「5. ブランチの使い方」）。
2. **`main` ブランチに push したものが、自動で本番サイトに公開される**。
   つまり `main` は「公開してOKな完成版だけ」を置く場所です。公開作業を手でやる必要はありません。

---

## 2. 最初の準備（一度だけ）

引き継いだ人が自分のパソコンで初めて作業するときの手順です。

### 2-1. 必要なソフト

| ソフト | 用途 | 入手先 |
| :-- | :-- | :-- |
| **Node.js（22.12 以上）** | サイトを作るのに必要 | https://nodejs.org/ |
| **Git** | コードの管理・アップロード | https://git-scm.com/ |
| エディタ（VS Code 推奨） | 編集用 | https://code.visualstudio.com/ |

> ⚠️ Node.js は **22.12 以上**が必須です（古いとビルドが失敗します）。
> バージョン確認: ターミナルで `node --version`

### 2-2. プロジェクトを自分のPCに持ってくる

ターミナル（コマンドプロンプト / PowerShell / Mac のターミナル）で:

```sh
git clone https://github.com/piku-2/josyo-site.git
cd josyo-site
npm install
```

`npm install` は必要な部品をダウンロードする作業です（初回のみ時間がかかります）。

---

## 3. 内容を編集する

### 3-1. 編集するファイル

サイトの中身は基本的に **`src/pages/index.astro`** の1ファイルだけです。

- ファイルの**上半分**（`const sections = [...]`）= 各セクションの**文章**
- ファイルの**下半分**（`<style>` の中）= **見た目（色・文字サイズなど）**

例えば文章を変えるなら、ここを書き換えます:

```js
const sections = [
  { title: '活動内容', body: 'ここに活動の説明を書く' },   // ← body を書き換える
  { title: 'メンバー', body: '人数・募集状況など' },
  { title: 'アクセス', body: '部室の場所や連絡先など' },
];
```

サークル名やキャッチコピーは `<h1>サークル名</h1>` や `<title>サークル名</title>` の部分を直します。

### 3-2. 画像を追加したいとき

画像ファイルは **`public/`** フォルダに入れます。
`public/logo.png` を置いたら、`index.astro` の中で `<img src="/josyo-site/logo.png" />` のように呼び出せます。

> ⚠️ パスの先頭に `/josyo-site/` が必要です（理由は「8. よくある質問」参照）。

### 3-3. ページを増やしたいとき

`src/pages/` の中にファイルを作ると、それがそのままページの URL になります。

| ファイル | できる URL |
| :-- | :-- |
| `src/pages/index.astro` | `/josyo-site/`（トップ） |
| `src/pages/about.astro` | `/josyo-site/about/` |

---

## 4. 編集中の見た目を確認する（プレビュー）

公開する前に、自分のPCで見た目を確認できます。

```sh
npm run dev
```

実行すると `http://localhost:4321/josyo-site/` が表示されます。
ブラウザで開くと、ファイルを保存するたびに自動で反映されます。
止めるときはターミナルで `Ctrl + C`。

---

## 5. ブランチの使い方（重要なルール）

> 🚨 **作業するときは必ず `develop` ブランチで。`main` は最後に公開するときだけ触る。**

`main` に push した瞬間に本番サイトが書き換わるので、作りかけのものを直接 `main` に入れると、未完成のサイトが公開されてしまいます。
そこで、**普段の編集は `develop` ブランチ**で行い、**完成して確認できたものだけを `main` に移して公開**します。

### 普段の作業の流れ

```sh
# ① develop ブランチに移動して、最新を取り込む
git checkout develop
git pull

# ② 編集する（src/pages/index.astro など）
#    → npm run dev でプレビューしながら作業

# ③ できたところで develop に保存（こまめにやってOK）
git add .
git commit -m "活動内容を更新"
git push                      # develop に push される（まだ公開はされない）
```

この段階では `develop` に上がるだけで、**サイトはまだ変わりません**（安心して作業できる）。

### 完成したら：main に反映して公開

確認が終わって「公開してOK」となったら、`main` に取り込みます。

```sh
git checkout main             # main に移動
git pull                      # 念のため最新化
git merge develop             # develop の内容を main に取り込む
git push                      # ★ ここで初めて本番サイトが更新される
git checkout develop          # 作業用ブランチに戻しておく
```

`main` に push したあと、GitHub が自動でサイトを作り直します。
**数分待つと** https://piku-2.github.io/josyo-site/ に反映されます。

### 進み具合を見る
GitHub のリポジトリページ → 上部の **「Actions」** タブで進行状況が見られます。
- 🟡 黄色 = 作業中
- ✅ 緑 = 公開成功
- ❌ 赤 = 失敗（→「8. よくある質問」へ）

---

## 6. コマンド早見表

すべてプロジェクトのフォルダ内（`josyo-site`）で実行します。

| コマンド | 何をするか |
| :-- | :-- |
| `npm install` | 必要な部品を入れる（最初の1回） |
| `npm run dev` | PCでプレビュー（`localhost:4321`） |
| `npm run build` | 公開用ファイルを作る（確認用。普段は不要） |
| `npm run preview` | build した結果をプレビュー |

---

## 7. ファイル構成

```
josyo-site/
├── public/              静的ファイル（画像・favicon など）
│   └── favicon.svg
├── src/
│   └── pages/
│       └── index.astro  ★ サイトの中身（普段はここを編集）
├── astro.config.mjs     サイトのURL設定（基本さわらない）
├── package.json         プロジェクトの設定・依存関係
└── .github/workflows/
    └── deploy.yml        自動公開の設定（基本さわらない）
```

---

## 8. よくある質問・トラブル対処

**Q. push したのにサイトが変わらない**
→ 反映に数分かかります。Actions タブが ✅ になってからブラウザを更新（キャッシュ削除: `Ctrl + Shift + R`）。

**Q. Actions が ❌ 赤になった**
→ Actions タブで失敗したものをクリックすると、赤い部分にエラー内容が出ます。多くは Node.js のバージョン違い（22.12 以上が必要）か、`index.astro` の書き間違い（タグの閉じ忘れなど）です。

**Q. なぜ画像やリンクのパスに `/josyo-site/` が付くの？**
→ このサイトは `https://piku-2.github.io/` の中の **`/josyo-site/` という一区画**に置かれているためです。この設定は `astro.config.mjs` の `base: '/josyo-site/'` で決まっています。

**Q. 独自ドメイン（例: `〇〇.com`）を使いたくなったら？**
→ ドメインを取得後、(1) GitHub の Settings → Pages でカスタムドメインを設定し、(2) `astro.config.mjs` の `site` を新ドメインに変更、`base` の行を削除します。これで `/josyo-site/` が不要になります。

---

## 9. 引き継ぎメモ

- このサイトは GitHub アカウント **`piku-2`** のリポジトリ上にあります。
  代替わりで管理アカウントを変える場合は、リポジトリの所有者移譲（Transfer）か、新アカウントへの Collaborator 追加を検討してください。
- 公開設定は GitHub リポジトリの **Settings → Pages → Source = 「GitHub Actions」** になっている必要があります（ここが変わると公開されません）。

---

困ったら [Astro 公式ドキュメント](https://docs.astro.build)（日本語あり）も参考になります。
