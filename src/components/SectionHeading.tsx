import { Reveal } from './Reveal';
import { Ja } from '../lib/ja';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** optional supporting line under the title */
  note?: string;
  /** override colors for dark sections (Voice) */
  dark?: boolean;
  /** ピン留めセクション用: Reveal を使わず、ピンのタイムラインに載せる data-stage-item にする */
  item?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  note,
  dark = false,
  item = false,
}: SectionHeadingProps) {
  const inner = (
    <>
      <div className="eyebrow" style={dark ? { color: 'var(--gold-light)' } : undefined}>
        {eyebrow}
      </div>
      <h2 className="heading" style={dark ? { color: '#fff' } : undefined}>
        <Ja>{title}</Ja>
      </h2>
      {note && (
        <p style={{ margin: '12px 0 0', fontSize: 15.5, color: 'var(--text-muted)' }}>
          <Ja>{note}</Ja>
        </p>
      )}
    </>
  );

  if (item) {
    return (
      <div className="heading-block" data-stage-item>
        {inner}
      </div>
    );
  }

  return <Reveal className="heading-block">{inner}</Reveal>;
}
