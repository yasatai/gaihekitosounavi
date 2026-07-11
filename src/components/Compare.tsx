import styles from './Compare.module.css';

const badRows = [
  { k: '塗料名', v: '不明' },
  { k: '保証', v: '不明' },
  { k: '足場代', v: '別途?' },
];

const goodChips = ['塗料名', '足場代', '保証内容', '下地処理', '塗装回数', '追加費用'];

export function Compare() {
  return (
    <section id="hikaku-link" className={styles.section}>
      <div className="shell">
        <div className={styles.head} data-stage-item>
          <div className={styles.eyebrow}>REASON — 比較が必要な理由</div>
          <h2 className={styles.title}>
            1社だけでは、見積りの<em>“中身”</em>が
            <br />
            正しいか分かりにくいことがあります
          </h2>
          <p className={styles.lead}>
            外壁塗装は、総額だけでなく「何が含まれているか」で判断することが大切です。
          </p>
        </div>

        <div className={styles.card} data-stage-item>
          <div className={styles.panels}>
            <div className={styles.panel}>
              <span className={styles.badge}>総額だけで判断</span>
              <h3 className={styles.panelTitle}>
                安く見えても、
                <br />
                理由が分かりにくい
              </h3>
              <p className={styles.panelText}>
                金額だけでは、工事内容や保証の差が見えにくくなります。
              </p>
              <div className={styles.quote}>
                <div className={styles.quotePrice}>例：92万円</div>
                <div className={styles.quoteTable}>
                  {badRows.map((r) => (
                    <div key={r.k} className={styles.quoteRow}>
                      <span className={styles.quoteKey}>{r.k}</span>
                      <span className={styles.quoteVal}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.arrow} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className={`${styles.panel} ${styles.panelGood}`}>
              <span className={`${styles.badge} ${styles.badgeGood}`}>中身まで比較</span>
              <h3 className={`${styles.panelTitle} ${styles.panelTitleGood}`}>
                納得して選びやすい
              </h3>
              <p className={`${styles.panelText} ${styles.panelTextGood}`}>
                複数の見積りで、価格だけでなく
                <br />
                工事内容まで確認できます。
              </p>
              <div className={styles.chips}>
                {goodChips.map((c) => (
                  <span key={c} className={styles.chip}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.pointBar} data-stage-item>
          <span className={styles.pointTag}>POINT</span>
          <span className={styles.pointText}>
            安い見積りが悪いわけではありません。大切なのは、金額と工事内容をセットで見比べることです。
          </span>
        </div>

        <div className={styles.ctaWrap} data-stage-item>
          <a href="#contact-link" className={styles.cta}>
            無料で見積り内容を比較する
          </a>
        </div>
      </div>
    </section>
  );
}
