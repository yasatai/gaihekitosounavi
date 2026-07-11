import { useEffect, useState } from 'react';
import type { Parser } from 'budoux';

// BudouX（Google）の日本語文節分割。ブラウザ非依存で「塗装」「業者」などの
// 語の途中改行を防ぐ（CSS の word-break: auto-phrase は Chromium 限定のため）。
//
// モデルが大きいので budoux は動的 import で別チャンク化し、初期表示（LCP）を軽く保つ。
// 適用対象（お客様の声・診断結果など）はファーストビュー外なので、
// 読み込み前は通常改行、読み込み後に文節改行へ切り替わる（利用者には見えない）。

const ZWSP = '​';

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
const NO_BREAK_WORDS = ['塗り替え', '仕上がり', '住まい', '見積もり', '「何が含まれているか」'];
function keepWordsTogether(s: string): string {
  for (const w of NO_BREAK_WORDS) {
    // 各文字の間に入りうる U+200B を許容してマッチし、綺麗な語に置換する
    const re = new RegExp([...w].join(`${ZWSP}?`), 'g');
    s = s.replace(re, w);
  }
  return s;
}

const cache = new Map<string, string>();

/**
 * 日本語テキストを文節単位でしか改行させないラッパー。
 * 文節境界に U+200B を挿入し、className="ja-wrap"（word-break: keep-all）と併用する。
 * budoux 読み込み前は素のテキスト（通常改行）でフォールバックする。
 */
export function Ja({ children }: { children: string }) {
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

  // 分割済みなら keep-all（挿入した境界だけで改行）、未読込なら通常改行でフォールバック。
  return <span className={segmented ? 'ja-wrap' : undefined}>{segmented ?? children}</span>;
}
