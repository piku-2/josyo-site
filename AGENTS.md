# AGENTS.md

コーディングエージェント向けの作業ガイド。人間向けの編集手順は [README.md](./README.md)、機能仕様は [SPEC.md](./SPEC.md)、デザイン規約は [DESIGN.md](./DESIGN.md)。

## このリポジトリは何か

情報処理研究会（`jyousho-official-site`）の公式サイト。Astro 6 で静的 HTML を生成し、Cloudflare Workers の静的アセット配信で公開する。サーバーロジック・DB・認証・フォーム送信は一切ない（純粋な SSG）。

- 公開ドメイン: `jyousho-official-site.pages.dev`
- 言語/型: TypeScript（`astro/tsconfigs/strict`）
- Node.js: `>=22.12.0`

## 最初に読むべきファイル

| ファイル | 把握できること |
| :-- | :-- |
| `src/data/site.ts` | サイト名・ナビ・全班定義・文化祭情報（**コンテンツの単一の情報源**） |
| `src/content.config.ts` | `works` コレクションの zod スキーマ |
| `src/layouts/BaseLayout.astro` | 全ページ共通の `<head>`・メタ・OGP・テーマ適用 |
| `src/styles/global.css` | 全スタイルと CSS 変数（テーマ配色） |
| `src/components/Icon.astro` | 使用可能なアイコン名一覧（`name` 分岐） |

## コマンド

```sh
npm install
npm run dev          # http://localhost:4321/
npm run build        # dist/ へ静的ビルド（型・コンテンツスキーマ検証を兼ねる）
npm run preview      # ビルド成果物の確認
npx wrangler deploy  # Cloudflare へデプロイ（dist/ が必要）
```

**検証方法**: テストランナーは無い。変更後の正否は `npm run build` の成否で判断する。型エラー・frontmatter のスキーマ違反・壊れた import はすべてビルドで落ちる。コミット前に必ず通すこと。

## 不変条件（壊してはいけない規約）

1. **コンテンツをコンポーネントに直書きしない。** ナビ・班・文化祭は `src/data/site.ts`、作品は `src/content/works/*.md` を編集する。
2. **色を直書きしない。** 配色は `global.css` の `:root` と `html[data-theme="..."]` ブロックの CSS 変数（`--accent` 等）で定義し、要素側は `var(--accent)` を参照する。中間色は `color-mix(in srgb, var(--accent) N%, ...)`。
3. **班 ID と表示名は `teamLabels` / `teams` を唯一の対応表とする。** 文字列を別の場所で再定義しない。班 ID は `programming` / `illustration` / `cg` / `video` / `music` の 5 つで固定。
4. **作品ページのメタは `BaseLayout`/`ContentLayout` を経由する。** 個別ページで `<head>` を組まない。
5. **`astro.config.mjs` の `site` は公開ドメインと一致させる。** canonical・OGP の絶対 URL・sitemap がこれに依存する。
6. **画像は `public/` に置き `/images/...` の絶対パスで参照する。** `public/` の中身はそのまま配信される。

## よくある作業のレシピ

### 作品を追加する
`src/content/works/<slug>.md` を作る（`_template.md` をコピー）。`<slug>` がそのまま URL になる。frontmatter は `src/content.config.ts` のスキーマに従う（→ SPEC.md）。画像は `public/images/works/` に置く。`draft: true` の間はページ生成されない。

### 班の情報を変える
`src/data/site.ts` の `teams` を編集。表示名だけ使う箇所は `teamLabels`。班を増減する場合は `content.config.ts` の `team` enum、`teamLabels`、班アイコン画像（`public/images/teams/`）、`Icon.astro` の対応も揃える。

### ページを追加する
`src/pages/` にファイルを置く（ファイルパス = URL）。`BaseLayout` でラップし、適切な `theme` prop を渡す。ナビに載せるなら `site.ts` の `nav` に追加。

### アイコンを追加する
`src/components/Icon.astro` に `{name === '...' && <>...</>}` の分岐を足す。`fill: none` / `stroke: currentColor` の線画で統一。

### 配色テーマを足す/変える
`global.css` の `html[data-theme="..."]` ブロックで `--accent` 系を上書きし、`BaseLayout` の `theme` prop の Union 型に値を追加する。

## 既知の注意点

- README には「制作記録 / blog（`src/content/blog/*.md`）」の記述があるが、**現状 `blog` コレクションもページも存在しない**。コンテンツコレクションは `works` のみ。blog 実装を求められた場合はゼロから追加が必要。
- `Astro.site` 未設定時のフォールバックがあるが、ビルドは `astro.config.mjs` の `site` 前提。

## Git / デプロイ

- ブランチ: `main` = 本番、`develop` = 作業。
- コミットメッセージは日本語の簡潔な要約で統一（例: 「画像パスを修正」）。
- **ユーザーの明示指示がない限り commit / push / deploy しない。**
- GitHub 連携時は Cloudflare ダッシュボードの Deployments で結果確認。
