import { useState, type FormEvent } from 'react';
import type { PlaceKey } from '../types';
import styles from './Contact.module.css';

const places: PlaceKey[] = ['屋根塗装', '外壁塗装', '屋根＋外壁'];

export function Contact() {
  const [place, setPlace] = useState<PlaceKey | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('お名前を入力してください。');
      return;
    }
    if (!form.phone.trim() && !form.email.trim()) {
      setError('電話番号またはメールアドレスを入力してください。');
      return;
    }
    if (!consent) {
      setError('プライバシーポリシーへの同意が必要です。');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}send.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ place, ...form, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('sent');
      } else {
        setStatus('idle');
        setError(data.error || '送信に失敗しました。時間をおいて再度お試しください。');
      }
    } catch {
      setStatus('idle');
      setError('通信に失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <section id="contact-link" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro} data-stage-item>
          <div className={styles.eyebrow}>CONTACT</div>
          <h2 className={styles.title}>無料相談</h2>
          <p className={styles.introLead}>
            お見積り・ご相談は無料です。
            <br />
            下記フォームからお気軽にお問い合わせください。
          </p>
        </div>

        <div className={styles.panel} data-stage-item>
          {status === 'sent' ? (
            <div className={styles.success}>
              <div className={styles.successMark}>✓</div>
              <h3 className={styles.successTitle}>お問い合わせありがとうございます</h3>
              <p className={styles.successText}>
                内容を確認のうえ、担当者よりご連絡いたします。
                <br />
                この時点では、工事契約は成立していません。
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                ご相談の箇所 <span className={styles.required}>必須</span>
              </div>
              <div className={styles.placeGrid}>
                {places.map((p) => (
                  <div
                    key={p}
                    role="button"
                    tabIndex={0}
                    className={`${styles.placeChoice} ${place === p ? styles.placeChoiceSelected : ''}`}
                    onClick={() => setPlace(place === p ? null : p)}
                    onKeyDown={(e) =>
                      (e.key === 'Enter' || e.key === ' ') && setPlace(place === p ? null : p)
                    }
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div>
                <label className={styles.label}>
                  お名前 <span className={styles.required}>必須</span>
                </label>
                <input
                  className={styles.input}
                  placeholder="宮城 太郎"
                  value={form.name}
                  onChange={update('name')}
                />
              </div>
              <div>
                <label className={styles.label}>
                  電話番号 <span className={styles.required}>必須</span>
                </label>
                <input
                  className={styles.input}
                  placeholder="022-000-0000"
                  value={form.phone}
                  onChange={update('phone')}
                />
              </div>
              <div>
                <label className={styles.label}>メールアドレス</label>
                <input
                  className={styles.input}
                  placeholder="example@mail.com"
                  value={form.email}
                  onChange={update('email')}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                ご相談内容 <span className={styles.optional}>※任意</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="気になる症状やご希望など、ご自由にご記入ください"
                value={form.message}
                onChange={update('message')}
              />
            </div>

            <label className={styles.consent}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                <a
                  href={`${import.meta.env.BASE_URL}privacy-policy/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  プライバシーポリシー
                </a>
                に同意する
              </span>
            </label>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <button
              type="submit"
              className={`${styles.primaryBtn} ${styles.submit}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? '送信中…' : 'この内容で無料相談する'}
            </button>
            <p className={styles.disclaimer}>
              無理な営業・契約を迫ることはありません。お気軽にどうぞ。
            </p>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
