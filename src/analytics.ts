// Google Analytics 4（任意）。
// .env に VITE_GA_ID（例: G-XXXXXXXXXX）を設定したときだけ読み込む。
// 未設定なら何も起きない（計測タグは挿入されない）。
export function initAnalytics() {
  const id = import.meta.env.VITE_GA_ID as string | undefined;
  if (!id) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  function gtag(...args: unknown[]) {
    w.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', id);
}
