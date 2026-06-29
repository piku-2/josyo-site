# SPEC.md

機能仕様（エージェントが実装判断に使う参照）。作業手順は [AGENTS.md](./AGENTS.md)、デザインは [DESIGN.md](./DESIGN.md)、人間向け概要は [README.md](./README.md)。

## システム種別

静的サイト（SSG）。全ページがビルド時に確定する HTML。ランタイムのサーバー処理・API・DB・認証・ユーザー入力処理は持たない。インタラクションは CSS と `<details>` 等のネイティブ HTML のみで実現する。

## ルーティング（ファイル = URL）

| パス | ソース | theme | 内容 |
| :-- | :-- | :-- | :-- |
| `/` | `src/pages/index.astro` | `home` | ヒーロー、班概要、注目作品、文化祭導線 |
| `/about` | `src/pages/about.astro` | `about` | 理念・活動・環境 |
| `/teams` | `src/pages/teams.astro` | `teams` | 5 班の詳細 |
| `/works` | `src/pages/works/index.astro` | `works` | 作品一覧（featured を強調） |
| `/works/<slug>` | `src/pages/works/[...slug].astro` | `works` | 作品詳細（Markdown 本文） |
| `/festival` | `src/pages/festival/index.astro` | `festival` | 文化祭案内 |
| `/404` | `src/pages/404.astro` | — | 404 |
| `/sitemap-index.xml` | `@astrojs/sitemap`（自動） | — | サイトマップ |
| `/robots.txt` | `public/robots.txt` | — | 全許可 + sitemap 参照 |

`theme` は `BaseLayout` の prop で `<html data-theme>` に渡り、配色を切り替える（Union: `home|about|teams|works|festival|article`）。

## データモデル

### 班（`src/data/site.ts`）

`teams: readonly` 配列。各要素のフィールド:

| フィールド | 型 | 用途 |
| :-- | :-- | :-- |
| `id` | `'programming'｜'illustration'｜'cg'｜'video'｜'music'` | 班 ID（固定 5 値） |
| `name` | string | 表示名（例: プログラミング班） |
| `file` | string | 擬似ファイル名（例: `programming.exe`）。デザインモチーフ |
| `icon` | string | `Icon.astro` のアイコン名 |
| `image` | string | 班アイコン画像パス（`/images/teams/*.svg`） |
| `description` | string | 短い説明 |
| `activity` | string | 活動内容 |

班 ID → 表示名は `teamLabels` を唯一の対応表とする。

### 文化祭（`src/data/site.ts` の `festival`）

`year` / `date` / `place` / `time` / `notice`。未定項目は「決まり次第お知らせします」の文言で運用。

### サイト共通（`src/data/site.ts` の `site`）

`name` / `shortName` / `domain` / `description` / `nav`（`{href,label}[]`）。`nav` は Header・Footer で共有。

## コンテンツコレクション: `works`

`src/content/works/**/*.md` を `glob` ローダーで読み込む（`src/content.config.ts`）。ファイル名 = `slug` = URL。

### frontmatter スキーマ（zod）

| フィールド | 型 | 必須 | 既定 | 備考 |
| :-- | :-- | :-- | :-- | :-- |
| `title` | string | ✔ | — | |
| `description` | string | ✔ | — | 一覧用の短い説明 |
| `publishedAt` | date（`coerce`） | ✔ | — | `YYYY-MM-DD` |
| `team` | enum ｜ enum[]（min 1） | ✔ | — | 単一値も内部で配列に正規化 |
| `creator` | string | | `情報処理研究会` | |
| `image` | string | | — | サムネ/カバー |
| `imageAlt` | string | | — | |
| `featured` | boolean | | `false` | 一覧先頭で強調 |
| `tags` | string[] | | `[]` | |
| `externalUrl` | string（url） | | — | 外部公開リンク |
| `draft` | boolean | | `false` | true は非公開 |

### 生成・表示ルール

- `getStaticPaths` は `draft: false` のみページ化する。
- 詳細ページ: 所属班名（`teamLabels` で変換、複数班は ` / ` 連結）、タグ、Markdown 本文、`externalUrl` があれば外部リンクボタンを描画。
- 一覧の `featured`: 複数 true のとき `publishedAt` 降順を優先。

## 共通メタデータ（`BaseLayout.astro`）

全ページで出力:

- `<title>`: `title` 指定時 `{title} | {site.name}`、無指定時 `{site.name} | {site.shortName}`
- `description`（既定は `site.description`）、`<html lang="ja">`、canonical
- OGP（`og:type/locale/site_name/title/description/url/image`）、Twitter `summary_large_image`
- OGP 画像: ページ指定 or 既定 `/images/placeholder.svg`。URL は `Astro.site` 基準で絶対化
- 日付は `Intl.DateTimeFormat('ja-JP', {year,month,day})` で整形（`ContentLayout`）

## ナビゲーション挙動

`site.nav` を Header（デスクトップ + モバイル `<details>`）と Footer で共有。現在地は `aria-current="page"`。判定は `/` のみ完全一致、他は `pathname.startsWith(href)` の前方一致。

## スコープ外（実装しない）

- ログイン/会員、コメント、動的検索、サーバー API、DB
- 多言語化（日本語のみ）
- クライアント JS フレームワーク（現状ランタイム JS にほぼ依存しない）

## 未実装だが言及がある領域

- 制作記録 / blog: README に記述があるが未実装。要求時は `blog` コレクション（`content.config.ts`）+ `src/pages/blog/` を新設する。
