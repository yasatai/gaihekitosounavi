// ビルド後に robots.txt と sitemap.xml を dist/ へ生成する。
// ドメインは .env の VITE_SITE_URL から取得（.env.local / 環境変数で上書き可）。
// npm の postbuild で自動実行される（package.json 参照）。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** 簡易 .env パーサ（KEY=VALUE のみ） */
function readEnvFile(name) {
  const p = resolve(root, name);
  if (!existsSync(p)) return {};
  const out = {};
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

// 優先順位: 実行時の環境変数 > .env.local > .env.production > .env
const env = {
  ...readEnvFile('.env'),
  ...readEnvFile('.env.production'),
  ...readEnvFile('.env.local'),
  ...process.env,
};

const SITE = (env.VITE_SITE_URL || 'https://miyagi-tosou.com').replace(/\/+$/, '');

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
];
const lastmod = new Date().toISOString().slice(0, 10);

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map(
      (p) =>
        `  <url>\n` +
        `    <loc>${SITE}${p.path}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${p.changefreq}</changefreq>\n` +
        `    <priority>${p.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;

const dist = resolve(root, 'dist');
if (!existsSync(dist)) {
  console.error('[gen-seo] dist/ が見つかりません。先に vite build を実行してください。');
  process.exit(1);
}
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(dist, 'robots.txt'), robots, 'utf8');

// --- トップページに FAQ構造化データ(FAQPage) と（任意で）Search Console認証タグを注入 ---
const indexPath = resolve(dist, 'index.html');
if (existsSync(indexPath)) {
  let html = readFileSync(indexPath, 'utf8');
  const inserts = [];

  // FAQPage JSON-LD（faq.json を単一の情報源として生成）
  const faqPath = resolve(root, 'src/data/faq.json');
  if (existsSync(faqPath)) {
    const faq = JSON.parse(readFileSync(faqPath, 'utf8'));
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    };
    inserts.push(
      `<script type="application/ld+json">\n${JSON.stringify(faqLd)}\n</script>`
    );
  }

  // Google Search Console のメタ認証（VITE_GSC_VERIFICATION が設定されていれば）
  if (env.VITE_GSC_VERIFICATION) {
    inserts.push(
      `<meta name="google-site-verification" content="${env.VITE_GSC_VERIFICATION}" />`
    );
  }

  if (inserts.length && html.includes('</head>')) {
    html = html.replace('</head>', `  ${inserts.join('\n  ')}\n</head>`);
    writeFileSync(indexPath, html, 'utf8');
  }
}

console.log(`[gen-seo] sitemap.xml / robots.txt / FAQ構造化データ を生成しました（${SITE}）`);
