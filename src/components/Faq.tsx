import { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { faqItems } from '../data/faq';
import { Ja } from '../lib/ja';
import styles from './Faq.module.css';

export function Faq() {
  // -1 = all closed; first item open by default
  const [openIndex, setOpenIndex] = useState(0);

  // アコーディオン開閉時、上にある開いていた回答が閉じると
  // 押した質問の位置がずれて「がくっ」と見える。
  // 開閉アニメーションの間、押した質問行が画面上で動かないよう
  // スクロール位置を毎フレーム補正して固定する（自動で閉じる挙動は維持）。
  //
  // ガクガク（振動）対策:
  //  1) scrollingElement.scrollTop を直接書き換える。window.scrollBy は
  //     グローバルの scroll-behavior:smooth の影響で滑らかスクロール扱いに
  //     なる環境があり、毎フレームの補正どうしがキューで競合して振動する。
  //     直接代入は常に即時なので競合しない。
  //  2) ブラウザ標準のスクロールアンカリング（overflow-anchor）も高さ変化を
  //     自動補正するため、JSの補正と二重になって行き過ぎ→振動する。
  //     .list 側で overflow-anchor:none にして無効化し、補正はJSに一本化する。
  const toggle = (i: number, btn: HTMLElement) => {
    const anchorTop = btn.getBoundingClientRect().top;
    setOpenIndex((cur) => (cur === i ? -1 : i));
    const scroller = document.scrollingElement || document.documentElement;
    const t0 = performance.now();
    const pin = () => {
      const delta = btn.getBoundingClientRect().top - anchorTop;
      if (delta !== 0) {
        scroller.scrollTop += delta;
      }
      // CSS の transition (0.4s) が終わるまで追従する
      if (performance.now() - t0 < 500) requestAnimationFrame(pin);
    };
    requestAnimationFrame(pin);
  };

  return (
    <section id="faq-link" className="section">
      <div className="shell">
        <SectionHeading eyebrow="FAQ" title="よくある質問" item />
        <div className={styles.list}>
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className={styles.item} data-stage-item>
                <button
                  type="button"
                  className={styles.row}
                  aria-expanded={open}
                  onClick={(e) => toggle(i, e.currentTarget)}
                >
                  <span className={styles.question}>
                    <span className={styles.qMark}>Q</span>
                    <Ja>{item.q}</Ja>
                  </span>
                  <span className={styles.sign}>{open ? '−' : '＋'}</span>
                </button>
                <div className={`${styles.answer} ${open ? styles.open : ''}`}>
                  <div className={styles.answerClip}>
                    <div className={styles.answerInner}>
                      <span className={styles.aMark}>A</span>
                      <span>
                        <Ja>{item.a}</Ja>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
