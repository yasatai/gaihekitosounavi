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

## SEO 対応（このリポジトリで対応済み）

- `title` / `meta description`（トップ・プライバシー各ページ）
- `canonical`（環境変数のドメインで生成）
- OGP / Twitter Card
- 構造化データ JSON-LD（WebSite ＋ 宮城県の地域サービス Service）
- `robots.txt` / `sitemap.xml`（`scripts/gen-seo.mjs` がビルド後に生成）
- `.htaccess` による HTTPS 統一・www 正規化・Gzip・キャッシュ・セキュリティヘッダ
- `lang="ja"`、日本語の文節折り返し（`word-break: auto-phrase`）

> 補足: OGP画像は暫定で `/hero-pc.jpg` を指定。専用の 1200×630 画像を用意して
> `index.html` の `og:image` / `twitter:image` を差し替えると見栄えが良くなる。

---

## 参考: GitHub Pages（従来の配信）

`.github/workflows/deploy.yml` により、`main` push で GitHub Pages にも配信される
（`GITHUB_PAGES=1` でサブパス `/gaihekitosounavi/` 用にビルド）。
XServer 本番へ移行後は不要なら停止してよい。canonical は常に `miyagi-tosou.com` を指す。
