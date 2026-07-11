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
const scrollToHero = () => window.scrollTo(0, 0);
scrollToHero();
// コンテンツの高さが確定した後にブラウザが位置を復元しようとするため、
// 読み込み完了・bfcache復帰のタイミングでも先頭へ戻す。
window.addEventListener('load', scrollToHero);
window.addEventListener('pageshow', scrollToHero);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
