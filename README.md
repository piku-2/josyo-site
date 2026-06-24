# jyousho-official-site

情報処理研究会の活動ブログです。Astro で Markdown 記事を静的 HTML に変換し、Cloudflare Workers の静的アセット配信で公開しています。

- 公開 URL: https://jyousho-official-site.pi09158ku.workers.dev/
- ソースコード: https://github.com/jyousho-official/jyousho-official-site
- Node.js: 22.12 以上

## 現在の構成

```
src/content/blog/*.md        記事本文
        │
        ▼
src/pages/index.astro        記事一覧ページを生成
src/pages/blog/[...slug].astro  記事ページを生成
        │
        ▼
npm run build                dist/ に静的ファイルを出力
        │
        ▼
Cloudflare Workers           dist/ を公開
```

トップページ `/` は記事一覧です。記事ファイルを `src/content/blog/` に追加すると、ビルド時に `/blog/記事ファイル名/` のページが作られます。

## 初回セットアップ

```sh
git clone https://github.com/jyousho-official/jyousho-official-site.git
cd jyousho-official-site
npm install
```

Node.js は 22.12 以上を使ってください。

```sh
node --version
```

## ローカル確認

```sh
npm run dev
```

表示された `http://localhost:4321/` をブラウザで開きます。ファイルを保存すると自動で反映されます。止めるときは `Ctrl + C` です。

公開前に本番用ビルドが通るか確認する場合:

```sh
npm run build
```

ビルド結果をローカルで確認する場合:

```sh
npm run preview
```

## 記事の追加

記事は `src/content/blog/` に Markdown ファイルとして追加します。

例: `src/content/blog/2026-07-event-report.md`

```md
---
title: "イベント準備レポート"
date: 2026-07-01
author: "情報処理研究会"
heroImage: ""
---

ここに本文を書きます。

## 見出し

- 箇条書き
- **太字**
- [リンク](https://example.com)
```

ファイル名が URL になります。この例なら `/blog/2026-07-event-report/` です。

必須の frontmatter は次の 3 つです。

| 項目 | 内容 |
| :-- | :-- |
| `title` | 記事タイトル |
| `date` | 日付。`YYYY-MM-DD` 形式 |
| `author` | 著者名 |

`heroImage` は現在のレイアウトでは表示に使っていませんが、将来の拡張用に残しています。

## 既存記事の編集

現在の記事:

- `src/content/blog/2026-06-bunkasai.md`

記事本文は `---` で囲まれた設定ブロックの下に書きます。

```md
---
title: "文化祭2026 準備レポート"
date: 2026-06-24
author: "わたりく"
heroImage: ""
---

ここから下が本文です。
```

## 画面を編集する場所

| ファイル | 役割 |
| :-- | :-- |
| `src/pages/index.astro` | トップページの記事一覧 |
| `src/pages/blog/[...slug].astro` | 記事 URL の生成 |
| `src/layouts/BlogLayout.astro` | 記事ページの HTML 構造 |
| `src/styles/global.css` | 全体の見た目 |
| `src/content.config.ts` | 記事データの定義 |

## 公開

このリポジトリは `wrangler.jsonc` で Cloudflare Workers の静的アセット配信を設定しています。

```jsonc
{
  "name": "jyousho-official-site",
  "compatibility_date": "2026-06-18",
  "assets": {
    "directory": "./dist"
  }
}
```

公開する前に必ずビルドを確認します。

```sh
npm run build
```

Cloudflare 側で GitHub 連携を使っている場合は、Cloudflare ダッシュボードの当プロジェクトの Deployments で成功・失敗を確認してください。

手元から直接デプロイする場合は、Cloudflare にログイン済みの状態で次を実行します。

```sh
npm run build
npx wrangler deploy
```

公開後は次を確認します。

- https://jyousho-official-site.pi09158ku.workers.dev/
- https://jyousho-official-site.pi09158ku.workers.dev/blog/2026-06-bunkasai/

## ブランチ運用

通常作業は `develop` で行い、公開してよい状態になったら `main` に反映します。

```sh
git checkout develop
git pull

# 編集して確認
npm run build

git add .
git commit -m "記事を更新"
git push
```

`main` に反映する例:

```sh
git checkout main
git pull
git merge develop
git push
git checkout develop
```

実際に `main` への push で自動公開されるかどうかは、Cloudflare 側の連携設定に依存します。公開状況は Cloudflare ダッシュボードの Deployments で確認してください。

## コマンド早見表

| コマンド | 内容 |
| :-- | :-- |
| `npm install` | 依存関係をインストール |
| `npm run dev` | ローカル開発サーバーを起動 |
| `npm run build` | `dist/` に公開用ファイルを生成 |
| `npm run preview` | ビルド結果をローカル確認 |
| `npx wrangler deploy` | Cloudflare Workers に公開 |

## ファイル構成

```
jyousho-official-site/
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── content/
│   │   └── blog/
│   │       └── 2026-06-bunkasai.md
│   ├── layouts/
│   │   └── BlogLayout.astro
│   ├── pages/
│   │   ├── blog/
│   │   │   └── [...slug].astro
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── astro.config.mjs
├── package.json
├── wrangler.jsonc
└── README.md
```

## トラブル対応

**公開 URL が開けない**

Cloudflare ダッシュボードでプロジェクト名と公開 URL を確認してください。現在確認できている URL は `https://jyousho-official-site.pi09158ku.workers.dev/` です。

**`npm run build` が失敗する**

Node.js のバージョンを確認してください。`package.json` では `>=22.12.0` を要求しています。Markdown の frontmatter に `title`、`date`、`author` がない場合も失敗します。

**記事を追加したのに一覧に出ない**

ファイルが `src/content/blog/` にあるか、拡張子が `.md` か、frontmatter が正しいかを確認してください。

**URL が想定と違う**

記事 URL は Markdown のファイル名で決まります。`src/content/blog/sample.md` は `/blog/sample/` になります。

## 引き継ぎメモ

- GitHub リポジトリは `jyousho-official/jyousho-official-site` です。
- Cloudflare 側の公開 URL は `workers.dev` の URL を使っています。
- Cloudflare のアカウント、2FA、リカバリーコード、支払い情報は個人に依存しない形で引き継いでください。
- 独自ドメインを取得した場合は、Cloudflare 側のルート設定と `astro.config.mjs` の `site` を新しい URL に合わせてください。

参考:

- Astro Docs: https://docs.astro.build/
- Cloudflare Workers Static Assets: https://developers.cloudflare.com/workers/static-assets/
