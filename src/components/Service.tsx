import type { CSSProperties } from 'react';
import { IconDiagnose, IconCompare, IconEstimate } from './Icons';
import styles from './Service.module.css';

const services = [
  {
    icon: <IconDiagnose />,
    title: '診断',
    img: 'diagnosis-bg',
    body: '外壁や屋根の劣化状況をヒアリングし、塗り替えが本当に必要かどうかを整理します。“急がせる診断”ではなく、“納得できる診断”を大切にしています。',
  },
  {
    icon: <IconCompare />,
    title: '比較',
    img: 'compare-bg',
    body: '塗料のグレード・耐久年数・施工方法・アフターフォローは業者で大きく異なります。複数社の提案を同じ基準で整理し、分かりやすく比較できるようサポートします。',
  },
  {
    icon: <IconEstimate />,
    title: '見積もりサポート',
    img: 'support-bg',
    body: '見積書の内容を一緒に確認し、不明点や不安点をクリアに。契約前の“最終チェック”まで、業者と対等に話せる状態をつくります。',
  },
];

export function Service() {
  return (
    // 背景（グレー＋光）をセクション全幅に敷くため、section は全幅。max-width は内側の shell で。
    <section id="service-link" className="section">
      <div className="shell">
        {/* 見出しもピン留めタイムラインに載せるため data-stage-item に */}
        <div className="heading-block" data-stage-item>
          <div className="eyebrow">SERVICE</div>
          <h2 className="heading">サービス紹介</h2>
        </div>
        <div className={styles.grid}>
          {services.map((s) => (
            <div
              key={s.title}
              className={styles.card}
              data-stage-item
              style={{ '--card-img': `url('/${s.img}.jpg')` } as CSSProperties}
            >
              <div className={styles.iconBox}>{s.icon}</div>
              <h3 className={styles.title}>{s.title}</h3>
              <div className={styles.rule} />
              <p className={styles.body}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
