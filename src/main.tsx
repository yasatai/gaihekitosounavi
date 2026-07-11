import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

// ページを更新（リロード）したときは、前回のスクロール位置やアンカー(#...)へ戻さず、
// 必ず先頭（Heroセクション）から表示する。
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
// behavior:'instant' で、CSSの scroll-behavior:smooth を無視して“アニメーションなし”で先頭へ。
// （復元位置からHeroへスーッとスクロールするのではなくHeroを最初から表示する）
const scrollToHero = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
scrollToHero();
window.addEventListener('load', scrollToHero);
window.addEventListener('pageshow', scrollToHero);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
