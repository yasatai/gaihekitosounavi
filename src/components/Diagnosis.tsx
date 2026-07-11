import { useState } from 'react';
import type { AgeKey } from '../types';
import { ageOptions, ageMap, segLabels } from '../data/diagnosis';
import { Ja } from '../lib/ja';
import styles from './Diagnosis.module.css';

export function Diagnosis() {
  const [age, setAge] = useState<AgeKey | null>(null);
  const result = age ? ageMap[age] : null;

  return (
    <section id="shindan-link" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro} data-stage-item>
          <div className={styles.eyebrow}>DIAGNOSIS</div>
          <h2 className={styles.title}>築年数かんたん診断</h2>
          <p className={styles.introLead}>
            <Ja>お住まいの築年数から、塗り替え相談の目安をその場でチェック。</Ja>
            <br />
            <Ja>30秒でわかる簡易診断です。</Ja>
          </p>
        </div>

        <div className={styles.panel} data-stage-item>
          <h3 className={styles.q}>お住まいの築年数を教えてください</h3>
          <p className={styles.qSub}>
            <Ja>前回の塗装からの年数でもOK。塗り替え相談の目安を簡易診断します。</Ja>
          </p>

          <div className={styles.ageGrid}>
            {ageOptions.map((opt) => (
              <div
                key={opt.key}
                role="button"
                tabIndex={0}
                className={`${styles.choice} ${age === opt.key ? styles.choiceSelected : ''}`}
                onClick={() => setAge(opt.key)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setAge(opt.key)}
              >
                {opt.label}
              </div>
            ))}
          </div>

          {result && (
            <div className={styles.result}>
              <div className={styles.resultEyebrow}>診断結果</div>
              <h4 className={styles.resultTitle}>
                <Ja>{result.title}</Ja>
              </h4>
              <p className={styles.resultMsg}>
                <Ja>{result.msg}</Ja>
              </p>
              <div className={styles.segs}>
                {segLabels.map((label, i) => {
                  const active = result.lvl >= 1 && i === result.lvl - 1;
                  return (
                    <div
                      key={label}
                      className={`${styles.seg} ${active ? styles.segActive : ''}`}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
              <div className={styles.resultNote}>
                <Ja>※あくまで目安です。正確な状態は無料診断でご確認いただけます。</Ja>
              </div>
              <a href="#contact-link" className={`${styles.primaryBtn} ${styles.toContact}`}>
                {/* 矢印だけが次行に落ちないよう、直前を nbsp で連結 */}
                <Ja>この診断をもとに無料相談する</Ja>
                {' →'}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
