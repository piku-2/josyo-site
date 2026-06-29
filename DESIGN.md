# DESIGN.md

デザイン規約（エージェントが UI を変更/追加するときの参照）。仕様は [SPEC.md](./SPEC.md)、作業手順は [AGENTS.md](./AGENTS.md)。スタイルの実体はすべて `src/styles/global.css`。

## 原則

1. **配色は CSS 変数経由のみ。** 要素に色値を直書きしない。アクセント由来の中間色は `color-mix(in srgb, var(--accent) N%, ...)`。
2. **テーマはページ単位。** `BaseLayout` の `theme` prop → `<html data-theme>` → `global.css` の `html[data-theme="..."]` ブロックが `--accent` 系を上書き。
3. **トークン（余白・角丸・影・幅）を再利用する。** 新しい数値を散発的に足さない。
4. **コンポーネントは `global.css` のクラスを使う。** scoped style より共通クラス優先。

## テーマと配色

`<html data-theme>` で切替。テーマ: `home` / `about` / `teams` / `works` / `festival` / `article`。各テーマが上書きする変数:

| 変数 | 役割 |
| :-- | :-- |
| `--accent` | 主アクセント（リンク・ボタン・見出し装飾・アイコン） |
| `--accent-2` | 補助（グラデーション相手） |
| `--accent-soft` | 淡い背景（タグ・ホバー面） |
| `--accent-pale` | 最も淡い背景（セクション背景） |

テーマ別 `--accent`: home `#0b4fd6` / about `#135fe4` / teams `#5722c9` / works `#078f7d` / festival `#e60070` / article `#4356a5`。

## ベーストークン（`:root`）

| 変数 | 値 | 用途 |
| :-- | :-- | :-- |
| `--ink` | `#0d1f46` | 本文文字色 |
| `--muted` | `#5f6d86` | 補助テキスト |
| `--line` | `#dfe5ee` | 罫線 |
| `--soft` | `#f7f9fc` | 淡い面 |
| `--white` | `#ffffff` | 背景 |
| `--shadow` | `0 18px 45px rgb(13 31 70 / 7%)` | カード等の影 |
| `--radius` / `--radius-sm` | `8px` | 角丸 |
| `--shell` | `min(1180px, calc(100% - 48px))` | コンテナ幅 |
| `--font-sans` | system-ui + 日本語スタック | 本文 |
| `--font-mono` | 等幅 | ラベル・班ファイル名・タグ |

## タイポグラフィ

- 本文は `--font-sans`、行間 1.75。
- ラベル/装飾（eyebrow・班 `file`・タグ）は `--font-mono`。
- 見出しは `clamp()` の流体スケール（ヒーロー h1 は最大 5rem 超、`white-space: nowrap`）。

## レイアウト

- `.shell` = 中央寄せコンテナ、`.narrow-shell`（最大 850px）= 記事系。
- セクション: `.section`（上下 76px）、淡背景 `.section-soft`。
- グリッド: トップは多カラム（作品 4 列 / 班 6 列ベース）。一覧系は `auto-fit` + `minmax` で折返し。
- ヘッダー: sticky、上辺にアクセント太線、背景は半透明 + `backdrop-filter: blur`。

## コンポーネント

| ファイル | 役割 |
| :-- | :-- |
| `Header.astro` | sticky ヘッダー。デスクトップナビ + `<details>` モバイルナビ |
| `Footer.astro` | ブランド・ドメイン・ナビ・コピーライト |
| `Icon.astro` | インライン SVG 集。`name` 分岐、`fill:none`/`stroke:currentColor` の線画 |
| `SectionHeading.astro` | eyebrow + 見出し |
| `TeamCard.astro` | 班カード（簡易 / 詳細 `team-card-detailed`） |
| `WorkCard.astro` | 作品カード（16:9 サムネ・タグ・メタ） |
| `AbstractGraphic.astro` | ヒーロー脇の幾何学装飾 |

## UI パターン

- **ボタン**: `.button`（塗り）/ `.button-outline`（白地）/ `.button-small`。ホバーで `translateY(-2px)` + 影。
- **eyebrow**: アクセント色・等幅・末尾に短い罫線のラベル。
- **カードホバー**: 持ち上げ + 罫線をアクセント寄り + 影、サムネ画像を微拡大。
- **抽象グラフィック**: 歪めたブロック / 端点付き回転細線 / ドットパターン / 薄グリッドをアクセント色で重ねる。
- **文化祭ストリップ**: 校舎の線画スケッチ + 日程データ 3 カラム。
- タグ: `--accent-soft` 背景 + 等幅。

## レスポンシブ

- モバイルはデスクトップナビを隠し、丸ボタンの `<details>` メニューへ。
- 多カラムは `auto-fit minmax` とメディアクエリ（`global.css` 後半）で段組みを減らす。
- 最小幅 320px 想定（`body { min-width: 320px }`）。

## アクセシビリティ

- `lang="ja"`、装飾 SVG は `aria-hidden`、ナビに `aria-label`、現在地に `aria-current="page"`。
- アイコンは色を継承（`stroke: currentColor`）。
- 本文 `#0d1f46` × 白基調でコントラスト確保。

## 変更チェックリスト

- [ ] 新しい色 → テーマ変数で定義したか（直書きしていないか）
- [ ] 余白/角丸/影 → 既存トークンを使ったか
- [ ] 新コンポーネント → 共通クラスを再利用したか
- [ ] アイコン → `Icon.astro` の線画スタイルに合わせたか
- [ ] `npm run build` が通るか
