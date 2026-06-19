# jyousho-official-site — サークルサイト 取扱説明書

情報処理研究会の公式サイトです。**[Astro](https://astro.build) で作り、Cloudflare Pages で無料公開**しています。
この README は、サイトを引き継いで運用する後任者向けの取説です。プログラミングが初めてでも、この通りに進めれば更新・公開できます。

- **公開 URL（暫定）**: https://jyousho-official-site.pages.dev/
  （独自ドメインを取得したらそのURLに変わります。実際のURLは Cloudflare のダッシュボードで確認できます）
- **ソースコード**: https://github.com/jyousho-official/jyousho-official-site

---

## 1. 仕組み（まず全体像）

```
develop ブランチで編集・確認        ← 普段の作業はここ
        │
        ▼
完成したら main ブランチに反映（push）
        │
        ▼
Cloudflare Pages が自動でビルド & 公開   ← ここは全自動。何もしなくてよい
        │
        ▼
公開URLが更新される（数分後）
```

ポイントは2つ:

1. **普段の作業は `develop` ブランチでやる**（→「5. ブランチの使い方」）。
2. **`main` ブランチに push したものが、Cloudflare Pages によって自動で本番サイトに公開される**。
   つまり `main` は「公開してOKな完成版だけ」を置く場所です。公開作業を手でやる必要はありません。

> 📌 公開を実行しているのは **Cloudflare Pages** です。GitHub リポジトリと連携していて、
> `main` への push を検知すると、Cloudflare 側で自動的に `npm run build` → 公開まで行います。

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
git clone https://github.com/jyousho-official/jyousho-official-site.git
cd jyousho-official-site
npm install
```

`npm install` は必要な部品をダウンロードする作業です（初回のみ時間がかかります）。

---

## 3. 内容を編集する

### 3-1. 編集するファイル

サイトの各ページは **`src/pages/` フォルダ**の中にあります。

| ファイル | 対応するページ |
| :-- | :-- |
| `src/pages/index.astro` | トップページ |
| `src/pages/group/cg.astro` ほか | 各班（CG・音楽・プログラミング・イラスト・動画）のページ |

トップページの文章を変えるなら `src/pages/index.astro` の**上半分**を書き換えます:

```js
const sections = [
  { title: "活動内容", body: "ここに活動の説明を書く" },   // ← body を書き換える
  { title: "メンバー", body: "人数・募集状況など" },
  { title: "アクセス", body: "部室の場所や連絡先など" },
  { title: "班", body: "班ごとの実績や成果物など" },
];
```

- ファイルの**上半分**（`const sections = [...]`）= 各セクションの**文章**
- ファイルの**下半分**（`<style>` の中）= **見た目（色・文字サイズなど）**

サークル名やタイトルは `<h1>...</h1>` や `<title>...</title>` の部分を直します。

### 3-2. 画像を追加したいとき

画像ファイルは **`public/`** フォルダに入れます。
`public/logo.png` を置いたら、`.astro` の中で `<img src="/logo.png" />` のように**先頭スラッシュ**で呼び出せます。

### 3-3. ページを増やしたいとき

`src/pages/` の中にファイルを作ると、それがそのままページの URL になります。

| ファイル | できる URL |
| :-- | :-- |
| `src/pages/index.astro` | `/`（トップ） |
| `src/pages/about.astro` | `/about/` |
| `src/pages/group/cg.astro` | `/group/cg/` |

---

## 4. 編集中の見た目を確認する（プレビュー）

公開する前に、自分のPCで見た目を確認できます。

```sh
npm run dev
```

実行すると `http://localhost:4321/` が表示されます。
ブラウザで開くと、ファイルを保存するたびに自動で反映されます。
止めるときはターミナルで `Ctrl + C`。

---

## 5. ブランチの使い方（重要なルール）

> 🚨 **作業するときは必ず `develop` ブランチで。`main` は最後に公開するときだけ触る。**

`main` に push した瞬間に Cloudflare Pages が本番サイトを作り直すので、作りかけのものを直接 `main` に入れると、未完成のサイトが公開されてしまいます。
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
git push                      # develop に push される（まだ本番公開はされない）
```

この段階では `develop` に上がるだけで、**本番サイトはまだ変わりません**（安心して作業できる）。

> 💡 Cloudflare Pages は `develop` への push に対しても「プレビュー用URL」を自動で発行します。
> 本番URLとは別物なので、ここで見た目を最終確認してから main に進むと安心です。

### 完成したら：main に反映して公開

確認が終わって「公開してOK」となったら、`main` に取り込みます。

```sh
git checkout main             # main に移動
git pull                      # 念のため最新化
git merge develop             # develop の内容を main に取り込む
git push                      # ★ ここで Cloudflare Pages が本番サイトを更新する
git checkout develop          # 作業用ブランチに戻しておく
```

`main` に push したあと、Cloudflare Pages が自動でサイトを作り直します。
**数分待つと**公開URLに反映されます。

### 進み具合を見る
[Cloudflare ダッシュボード](https://dash.cloudflare.com/) → Workers & Pages → 当プロジェクト → **Deployments** で進行状況とログが見られます。
- 🟡 Building / Deploying = 作業中
- ✅ Success = 公開成功
- ❌ Failed = 失敗（→「8. よくある質問」へ）

---

## 6. コマンド早見表

すべてプロジェクトのフォルダ内（`jyousho-official-site`）で実行します。

| コマンド | 何をするか |
| :-- | :-- |
| `npm install` | 必要な部品を入れる（最初の1回） |
| `npm run dev` | PCでプレビュー（`localhost:4321`） |
| `npm run build` | 公開用ファイルを作る（確認用。普段は不要） |
| `npm run preview` | build した結果をプレビュー |

---

## 7. ファイル構成

```
jyousho-official-site/
├── public/              静的ファイル（画像・favicon など）
│   └── favicon.svg
├── src/
│   └── pages/
│       ├── index.astro  ★ トップページ（普段はここを編集）
│       └── group/       各班のページ
├── astro.config.mjs     サイトのURL設定（基本さわらない）
├── wrangler.jsonc       Cloudflare Pages 用の設定（基本さわらない）
├── package.json         プロジェクトの設定・依存関係
└── README.md            この取説
```

---

## 8. よくある質問・トラブル対処

**Q. push したのにサイトが変わらない**
→ 反映に数分かかります。Cloudflare の Deployments が ✅ Success になってからブラウザを更新（キャッシュ削除: `Ctrl + Shift + R`）。

**Q. Cloudflare のデプロイが ❌ Failed になった**
→ Deployments で失敗したものを開くとビルドログが見られます。多くは Node.js のバージョン違い（22.12 以上が必要）か、`.astro` ファイルの書き間違い（タグの閉じ忘れなど）です。
　Cloudflare 側の Node バージョンは、プロジェクトの Settings → 環境変数で `NODE_VERSION` を `22` 以上に設定しておくと安全です。

**Q. 画像やリンクのパスはどう書く？**
→ このサイトはドメイン直下（ルート）で公開されているので、先頭スラッシュ始まりで書きます。
　例: 画像 `<img src="/logo.png" />`、リンク `<a href="/group/cg">`。

**Q. 独自ドメイン（例: `jyousho.com`）を使いたくなったら？**
→ Cloudflare Registrar でドメインを買った場合、Cloudflare Pages との連携がスムーズです。
　手順: Cloudflare ダッシュボード → 当プロジェクト → **Custom domains** からドメインを追加するだけ。
　DNS は Cloudflare 内で自動設定され、HTTPS も自動。サイト側のコード変更はほぼ不要ですが、
　`astro.config.mjs` の `site` を新ドメイン（例: `https://jyousho.com`）に直しておくと正確です。

---

## 9. 引き継ぎメモ

- このサイトは **GitHub Organization（組織）`jyousho-official`** が所有するリポジトリ
  `jyousho-official-site` 上にあります。個人アカウントではなく組織が持っているので、
  特定の人が卒業・退会してもサイトは残ります。
- **管理者の代替わり**は、組織の `People` タブで次期管理者を **Owner** ロールにするだけで完結します。
  一般部員は **Member** のまま追加すればOKです。
  - 前任の管理者は、引き継ぎ後に自分の Owner 権限を外しても構いません（他に Owner がいる場合）。
- **公開は Cloudflare Pages** が担当しています（GitHub 連携・本番ブランチは `main`）。
  Cloudflare のアカウント／プロジェクトへのアクセス権も、代替わりのときに次の管理者へ引き継いでください。
- **独自ドメインは毎年更新料が必要**です。止めると他人に取られるので、更新を誰が払い続けるかを引き継ぐこと。

---

困ったら [Astro 公式ドキュメント](https://docs.astro.build)（日本語あり）や
[Cloudflare Pages のドキュメント](https://developers.cloudflare.com/pages/)も参考になります。
