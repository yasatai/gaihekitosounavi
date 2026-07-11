import { IconCrown, IconGuarantee, IconFairPrice, IconFree, IconShield } from './Icons';
import styles from './Hero.module.css';

const features = [
  { icon: <IconGuarantee />, sub: '宮城県内の', main: '優良業者のみ厳選' },
  { icon: <IconFairPrice />, sub: '複数社を比較して', main: '適正価格がわかる' },
  { icon: <IconFree />, sub: 'ご利用・お見積もり', main: 'すべて無料' },
];

export function Hero() {
  return (
    <section id="top" className={styles.hero} data-hero>
      <div className={styles.bg} />

      <div className={styles.inner} data-hero-inner>
        <div className={styles.content}>
          <div className={styles.eyebrow} data-hero-reveal>
            <IconCrown />
            <span>RELIABLE PAINTING PARTNER</span>
          </div>

          <h1 className={styles.title} data-hero-reveal>
            信頼できる業者選びで
            <br />
            <em>外壁塗装</em>を成功へ。
          </h1>

          <div className={styles.tagline} data-hero-reveal>
            <em>宮城</em>で評判の<em>塗装業者を複数比較</em>
          </div>

          <p className={styles.lead} data-hero-reveal>
            様々な業者の中から、あなたの要望に合わせて
            <br />
            信頼できる塗装業者を複数比較・検討できます。
            <br />
            地元宮城で評判の業者だけを厳選紹介する
            <br />
            無料の一括見積もり比較サービスです。
          </p>

          <div className={styles.features} data-hero-reveal>
            {features.map((f) => (
              <div key={f.main} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span className={styles.featureText}>
                  <span className={styles.featureSub}>{f.sub}</span>
                  <span className={styles.featureMain}>{f.main}</span>
                </span>
              </div>
            ))}
          </div>

          <a href="#contact-link" className={styles.cta} data-hero-reveal>
            <span className={styles.ctaBadge}>
              最短
              <strong>30秒</strong>
            </span>
            <span className={styles.ctaText}>無料で一括見積もりを依頼する</span>
            <svg
              className={styles.ctaArrow}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className={styles.privacy} data-hero-reveal>
            <IconShield />
            個人情報は厳重に管理しますのでご安心ください
          </div>
        </div>
      </div>
    </section>
  );
}
