import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Parser } from 'budoux';

// BudouX（Google）の日本語文節分割。ブラウザ非依存で「塗装」「業者」などの
// 語の途中改行を防ぐ（CSS の word-break: auto-phrase は Chromium 限定のため）。
//
// モデルが大きいので budoux は動的 import で別チャンク化し、初期表示（LCP）を軽く保つ。
// 適用対象（お客様の声・診断結果など）はファーストビュー外なので、
// 読み込み前は通常改行、読み込み後に文節改行へ切り替わる（利用者には見えない）。

const ZWSP = '\u200B';

let parserPromise: Promise<Parser> | null = null;
function getParser(): Promise<Parser> {
  if (!parserPromise) {
    parserPromise = import('budoux').then((m) => m.loadDefaultJapaneseParser());
  }
  return parserPromise;
}

// BudouX が形態素境界で割ってしまう複合語（塗り替え→塗り|替え 等）は、
// 内部の境界(U+200B)を除去して1語として扱い、途中改行を防ぐ。
// 変な改行が見つかったらここに語を足す。
const NO_BREAK_WORDS = [
  '塗り替え',
  '仕上がり',
  '住まい',
  '一括見積もり',
  '見積もり',
  'お問い合わせ',
  '見えにくく',
  '「何が含まれているか」',
];
function keepWordsTogether(s: string): string {
  for (const w of NO_BREAK_WORDS) {
    // 各文字の間に入りうる U+200B を許容してマッチし、綺麗な語に置換する
    const re = new RegExp([...w].join(`${ZWSP}?`), 'g');
    s = s.replace(re, w);
  }
  // --- 禁則処理 ---
  // 行頭に来てはいけない文字（閉じ括弧・句読点・長音等）の直前では改行させない
  s = s.replace(new RegExp(`${ZWSP}(?=[”」』）)。、，．・ー〜→])`, 'g'), '');
  // 行末に残ってはいけない文字（開き括弧）の直後では改行させない
  s = s.replace(new RegExp(`(?<=[“「『（(])${ZWSP}`, 'g'), '');
  // 数値レンジ（100〜160万円 等）は「〜」の前後で割らない。
  // keep-all でも「〜+数字」間はブラウザ標準の改行可能位置なので、
  // WORD JOINER(U+2060) を挿入して改行自体を禁止する。
  s = s.replace(new RegExp(`(?<=〜)${ZWSP}`, 'g'), '');
  s = s.replace(/〜(?=[0-9０-９])/g, '〜\u2060');
  return s;
}

const cache = new Map<string, string>();

/**
 * 分割済み文字列を React ノードに変換する。
 * 文節境界（改行されうる位置）の直前にある「、」は <span data-jc> で包み、
 * 実際にその位置で行が折り返された場合だけ非表示にする（行末の読点を消す）。
 */
function toNodes(segmented: string): ReactNode[] {
  const parts = segmented.split(ZWSP);
  const nodes: ReactNode[] = [];
  parts.forEach((seg, i) => {
    const prefix = i > 0 ? ZWSP : '';
    if (i < parts.length - 1 && seg.endsWith('、')) {
      nodes.push(prefix + seg.slice(0, -1));
      nodes.push(
        <span key={i} data-jc>
          、
        </span>
      );
    } else {
      nodes.push(prefix + seg);
    }
  });
  return nodes;
}

/**
 * 日本語テキストを文節単位でしか改行させないラッパー。
 * 文節境界に U+200B を挿入し、className="ja-wrap"（word-break: keep-all）と併用する。
 * budoux 読み込み前は素のテキスト（通常改行）でフォールバックする。
 * さらに、行末（改行の直前）に来た「、」は自動で非表示にする。
 */
export function Ja({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [segmented, setSegmented] = useState<string | null>(() => cache.get(children) ?? null);

  useEffect(() => {
    const cached = cache.get(children);
    if (cached !== undefined) {
      setSegmented(cached);
      return;
    }
    let alive = true;
    getParser().then((parser) => {
      const v = keepWordsTogether(parser.parse(children).join(ZWSP));
      cache.set(children, v);
      if (alive) setSegmented(v);
    });
    return () => {
      alive = false;
    };
  }, [children]);

  // 行末に来た「、」を非表示にする（幅は保持して再レイアウトの揺れを防ぐ）。
  // 画面幅の変化・フォント読み込みで折返し位置が変わるたびに再判定する。
  useEffect(() => {
    if (!segmented) return;
    const el = ref.current;
    if (!el) return;

    const update = () => {
      el.querySelectorAll<HTMLElement>('span[data-jc]').forEach((sp) => {
        sp.style.visibility = '';
        const next = sp.nextSibling;
        if (!next || next.nodeType !== Node.TEXT_NODE) return;
        const txt = next.nodeValue || '';
        let idx = 0;
        while (idx < txt.length && (txt[idx] === ZWSP || txt[idx] === '\u2060')) idx++;
        if (idx >= txt.length) return;
        const rng = document.createRange();
        rng.setStart(next, idx);
        rng.setEnd(next, idx + 1);
        const a = sp.getBoundingClientRect();
        const b = rng.getBoundingClientRect();
        // 次の文字が下の行にある＝この「、」は行末 → 非表示
        if (b.top - a.top > a.height / 2) sp.style.visibility = 'hidden';
      });
    };

    update();
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('resize', schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
    };
  }, [segmented]);

  // 分割済みなら keep-all（挿入した境界だけで改行）、未読込なら通常改行でフォールバック。
  return (
    <span ref={ref} className={segmented ? 'ja-wrap' : undefined}>
      {segmented ? toNodes(segmented) : children}
    </span>
  );
}
