# 外壁・屋根塗装ナビ（MIYAGI PAINTING NAVI）

宮城県の外壁・屋根塗装業者を無料で一括比較する紹介サイト。
Vite + React 19 + TypeScript（CSS Modules / GSAP）。

- 公開ドメイン: **https://miyagi-tosou.com**
- 本番サーバー: **XServer**（Apache + PHP）

---

## 環境変数（ドメイン管理）

公開ドメインは `.env` の `VITE_SITE_URL` で一元管理します。
canonical / OGP / 構造化データ / sitemap.xml / robots.txt がすべてこの値から生成されます。

```
# .env（コミット対象・非機密）
VITE_SITE_URL=https://miyagi-tosou.com
```

- ドメインを変えるときは `.env` の1行を直すだけ。
- 別環境で一時的に上書きしたい場合は `.env.local`（gitignore対象）に同じキーを書く。
- `index.html` 内では Vite の `%VITE_SITE_URL%` 記法で置換される（ビルド時）。

---

## 開発

```bash
npm install
npm run dev        # 開発サーバー（http://localhost:5173）
npm run build      # 本番ビルド → dist/（postbuildで sitemap/robots も生成）
npm run preview    # ビルド結果のプレビュー
```

---

## XServer へのデプロイ手順

1. **ビルド**

   ```bash
   npm run build
   ```

   `dist/` に以下が出力される：
   - `index.html` / `privacy-policy/index.html`（SEOメタ・ドメイン置換済み）
   - `assets/`（ハッシュ付きJS・CSS）
   - 画像などの静的ファイル
   - `send.php`（お問い合わせフォームのメール送信・PHP）
   - `.htaccess`（HTTPS統一・www除去・圧縮・キャッシュ・セキュリティヘッダ）
   - `robots.txt` / `sitemap.xml`（ドメイン反映済み）

2. **アップロード**
   `dist/` の**中身をすべて**、XServer の公開ルート（`ドメイン/public_html/`）直下へアップロードする。
   （`.htaccess` は隠しファイルなので、FTPクライアントで「隠しファイルを表示」を有効にして転送すること。）

3. **SSL / ドメイン**
   XServer 側でドメイン `miyagi-tosou.com` を追加し、無料独自SSL（Let's Encrypt）を有効化する。
   `.htaccess` が http→https、www→wwwなし に301統一する。

4. **お問い合わせフォーム（send.php）**
   `send.php` はPHPが動くXServerでそのまま動作する（GitHub Pages等の静的ホストでは不可）。
   送信先メールは `public/send.php` 内の `$to` / `$from` を必要に応じて調整する。

---

## SEO 対応（このリポジトリで実施済み）

### メタ情報 / タグ
- `title`（トップ・プライバシー各ページで最適化）
- `meta description`（キーワードを含む説明文、各ページ個別）
- `meta keywords`（宮城・外壁塗装・見積もり 等）
- `canonical`（環境変数のドメインから自動生成、重複コンテンツ対策）
- `meta robots`：`index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
  （検索結果で大きな画像プレビュー・長いスニペットを許可）
- `lang="ja"` / `theme-color`

### OGP / SNS シェア
- Open Graph（`og:type` / `og:site_name` / `og:locale` / `og:title` / `og:description` / `og:url` / `og:image` ＋ 画像の `width`/`height`/`alt`/`type`/`secure_url`）
- Twitter Card（`summary_large_image`）

### 構造化データ（JSON-LD）
- `WebSite`（サイト情報）
- `Service`（宮城県を `areaServed` とする地域サービス＋無料の `Offer`）
- `FAQPage`（FAQ 6問を `faq.json` から自動生成し、ビルド時にトップへ注入）

### クローラビリティ
- `robots.txt`（`scripts/gen-seo.mjs` がビルド後に生成、sitemap を明記）
- `sitemap.xml`（全ページ＋`lastmod`/`changefreq`/`priority`、ドメインは環境変数から）

### パフォーマンス / Core Web Vitals（順位要因）
- ファーストビュー画像の `preload`（PC/モバイルを出し分け、`fetchpriority="high"` で LCP 改善）
- Google Fonts は `display=swap` ＋ `preconnect`
- `.htaccess` で Gzip 圧縮・静的アセットの長期キャッシュ
- 日本語の自然な折り返し（`word-break: auto-phrase` / `text-wrap: balance,pretty`）

### サーバー（.htaccess）
- http → https 統一、www → wwwなし 正規化（301、ドメイン非依存）
- ブラウザキャッシュ制御（HTMLは都度再検証／ハッシュ付きJS・CSSは長期）
- セキュリティヘッダ（`X-Content-Type-Options` / `X-Frame-Options` / `Referrer-Policy` / `Permissions-Policy`）
- ディレクトリ一覧の無効化、ドットファイル（`.env` 等）へのアクセス遮断

### PWA / モバイル
- `site.webmanifest`（アプリ名・テーマカラー・アイコン）、`apple-touch-icon`

### 計測・登録（任意・環境変数で有効化）
- Google Analytics 4：`.env` に `VITE_GA_ID` を設定すると自動で計測タグを読み込み
- Google Search Console：`.env` に `VITE_GSC_VERIFICATION` を設定するとビルド時に認証metaを注入

> 補足: OGP画像は暫定で `/hero-pc.jpg`（1536×1024）を指定。専用の 1200×630 画像を用意して
> `index.html` の `og:image` 系を差し替えると SNS 表示がより最適になります。

### 公開後にやること（推奨）
1. Google Search Console にサイト（`https://miyagi-tosou.com`）を登録
   （`VITE_GSC_VERIFICATION` で認証、または DNS 認証）
2. `https://miyagi-tosou.com/sitemap.xml` を Search Console から送信
3. 必要なら `VITE_GA_ID` を設定して再ビルド → アクセス計測を開始
4. Google ビジネスプロフィール（地域SEO）の整備・NAP情報の統一

---

## 参考: GitHub Pages（従来の配信）

`.github/workflows/deploy.yml` により、`main` push で GitHub Pages にも配信される
（`GITHUB_PAGES=1` でサブパス `/gaihekitosounavi/` 用にビルド）。
XServer 本番へ移行後は不要なら停止してよい。canonical は常に `miyagi-tosou.com` を指す。
