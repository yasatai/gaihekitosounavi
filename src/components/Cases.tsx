import { SectionHeading } from './SectionHeading';
import { CompareSlider } from './CompareSlider';
import { cases } from '../data/cases';

export function Cases() {
  return (
    <section id="sekou-link" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="WORKS"
          title="施工事例"
          note="横スクロールで事例を切り替え／中央のハンドルで施工前後を比較"
        />
      </div>
      <div className="cases-viewport">
        <div className="cases-track" data-cases-track>
          {[...cases, ...cases].map((c, i) => (
            <CompareSlider key={`${c.no}-${i}`} item={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
