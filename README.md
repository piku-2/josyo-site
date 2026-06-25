# jyousho-official-site

情報処理研究会の公式サイトです。Astro でトップページ、班紹介、作品集、制作記録、文化祭ページを静的 HTML として生成し、Cloudflare Workers の静的アセット配信で公開します。

- 公開 URL: https://jyousho-official-site.pages.dev/
- Node.js: 22.12 以上

## 構成

```txt
src/pages/                 ページ
src/components/            共通 UI
src/layouts/               共通レイアウト
src/data/site.ts           サイト名、ナビ、班情報、文化祭情報
src/content/blog/*.md      制作記録
src/content/works/*.md     作品紹介
src/styles/global.css      全体の見た目
public/images/             画像アセット
```

## ローカル確認

```sh
npm install
npm run dev
```

表示された `http://localhost:4321/` をブラウザで開きます。公開前は必ずビルドを確認してください。

```sh
npm run build
```

## 制作記録の追加

`src/content/blog/` に Markdown ファイルを追加します。ファイル名が URL になります。

例: `src/content/blog/2026-07-event-report.md`

```md
---
title: "イベント準備レポート"
description: "記事一覧に表示する短い説明"
publishedAt: 2026-07-01
team: programming
author: "情報処理研究会"
draft: false
---

本文を書きます。
```

下書きのひな形は `src/content/blog/_template.md` にあります。

## 作品の追加

`src/content/works/` に Markdown ファイルを追加します。

```md
---
title: "作品タイトル"
description: "作品一覧に表示する短い説明"
publishedAt: 2026-07-01
team: programming
creator: "制作者名またはチーム名"
featured: false
tags:
  - Web
draft: false
---

作品紹介を書きます。
```

下書きのひな形は `src/content/works/_template.md` にあります。

`team` は `programming`、`illustration`、`video`、`music` のいずれかです。

## 主な編集場所

| ファイル | 役割 |
| :-- | :-- |
| `src/data/site.ts` | ナビ、班情報、文化祭の基本情報 |
| `src/pages/index.astro` | トップページ |
| `src/pages/about.astro` | 私たちについて |
| `src/pages/teams.astro` | 班紹介 |
| `src/pages/works/index.astro` | 作品一覧 |
| `src/pages/blog/index.astro` | 制作記録一覧 |
| `src/pages/festival/index.astro` | 文化祭ページ |
| `src/styles/global.css` | デザイン全体 |

## 公開

Cloudflare Workers の静的アセット配信は `wrangler.jsonc` で設定しています。

```sh
npm run build
npx wrangler deploy
```

GitHub 連携で公開している場合は、Cloudflare ダッシュボードの Deployments で成功・失敗を確認してください。
