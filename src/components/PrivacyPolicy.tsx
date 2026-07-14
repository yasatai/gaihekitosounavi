import { LogoMark } from './Icons';
import styles from './PrivacyPolicy.module.css';

export function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <a href={import.meta.env.BASE_URL} className={styles.brand}>
          <LogoMark size={34} />
          <span className={styles.brandText}>
            <span className={styles.brandJa}>外壁・屋根塗装ナビ</span>
            <span className={styles.brandEn}>MIYAGI PAINTING NAVI</span>
          </span>
        </a>
        <a href={import.meta.env.BASE_URL} className={styles.back}>
          ← トップへ戻る
        </a>
      </header>

      <main className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label="パンくずリスト">
          <a href={import.meta.env.BASE_URL}>ホーム</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">プライバシーポリシー</span>
        </nav>
        <div className={styles.eyebrow}>PRIVACY POLICY</div>
        <h1 className={styles.title}>プライバシーポリシー</h1>

        <p className={styles.lead}>
          外壁・屋根塗装ナビ（以下「当サイト」といいます。）では、当サイトをご利用いただく皆様の個人情報を適切に取り扱うため、以下のとおりプライバシーポリシーを定めます。
        </p>
        <p className={styles.lead}>
          当サイトの運営者（以下「運営者」といいます。）は、個人情報保護法その他関連法令を遵守し、取得した個人情報を適正に管理・利用いたします。
        </p>

        <section className={styles.section}>
          <h2 className={styles.h2}>1. 基本方針</h2>
          <p className={styles.p}>
            運営者は、個人情報の重要性を認識し、個人情報保護法および関連する法令・ガイドライン等を遵守します。
          </p>
          <p className={styles.p}>
            運営者は、取得した個人情報を適切に管理し、不正アクセス、漏えい、滅失、き損等の防止に努めます。
          </p>
          <p className={styles.p}>
            また、個人情報の取り扱いについて必要に応じて見直しを行い、継続的な改善に努めます。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>2. 個人情報の取得について</h2>
          <p className={styles.p}>
            当サイトでは、お問い合わせフォーム、見積もり相談、無料相談、その他当サイト上の各種入力フォームのご利用に際して、以下のような個人情報の提供をお願いする場合があります。
          </p>
          <ul className={styles.ul}>
            <li>氏名</li>
            <li>住所</li>
            <li>電話番号</li>
            <li>メールアドレス</li>
            <li>建物に関する情報</li>
            <li>ご相談内容</li>
            <li>その他、お問い合わせ対応に必要な情報</li>
          </ul>
          <p className={styles.p}>これらの個人情報は、適法かつ公正な手段により取得します。</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>3. 個人情報の利用目的</h2>
          <p className={styles.p}>
            当サイトで取得した個人情報は、以下の目的の範囲内で利用いたします。
          </p>
          <ul className={styles.ul}>
            <li>お問い合わせへの回答</li>
            <li>見積もり依頼、現地調査、施工相談等への対応</li>
            <li>ご相談内容に応じた提携施工会社または加盟店への情報共有</li>
            <li>お客様への連絡、本人確認</li>
            <li>サービス内容の確認、改善、品質向上</li>
            <li>不正利用、迷惑行為、トラブル等の防止</li>
            <li>当サイトからの必要なご案内、重要なお知らせの送付</li>
            <li>アクセス解析、広告配信、広告効果測定、サイト改善のための分析</li>
          </ul>
          <p className={styles.p}>
            上記の利用目的を超えて個人情報を利用する場合は、あらかじめご本人の同意を得るものとします。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>4. 提携施工会社・加盟店への情報提供について</h2>
          <p className={styles.p}>
            当サイトでは、お客様からいただいたお問い合わせ内容に応じて、見積もり対応、現地調査、施工相談等を行うため、提携施工会社または加盟店に、お客様の個人情報を提供する場合があります。
          </p>
          <p className={styles.p}>
            提供する情報には、氏名、住所、電話番号、メールアドレス、建物に関する情報、ご相談内容、その他対応に必要な情報が含まれる場合があります。
          </p>
          <p className={styles.p}>
            なお、提携施工会社または加盟店への情報提供は、お客様の同意を得たうえで行います。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>5. 個人情報の第三者提供について</h2>
          <p className={styles.p}>
            運営者は、次の場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
          </p>
          <ul className={styles.ul}>
            <li>ご本人の同意がある場合</li>
            <li>見積もり対応、現地調査、施工相談等のため、提携施工会社または加盟店へ提供する場合</li>
            <li>法令に基づき開示または提供が必要となる場合</li>
            <li>人の生命、身体または財産の保護のために必要がある場合</li>
            <li>公的機関等から正当な理由に基づき開示を求められた場合</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>6. 個人情報の管理について</h2>
          <p className={styles.p}>
            運営者は、取得した個人情報を正確かつ最新の内容に保つよう努めるとともに、不正アクセス、漏えい、紛失、改ざん等を防止するため、必要かつ適切な安全管理措置を講じます。
          </p>
          <p className={styles.p}>
            また、個人情報を取り扱う運営関係者に対して、適切な管理を行うよう努めます。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>7. 個人情報の保存期間について</h2>
          <p className={styles.p}>
            運営者は、取得した個人情報を利用目的の達成に必要な範囲で保管します。
          </p>
          <p className={styles.p}>
            利用目的が達成され、保管の必要がなくなった個人情報については、適切な方法で削除または廃棄します。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>8. 個人情報の開示・訂正・削除等について</h2>
          <p className={styles.p}>
            ご本人から、個人情報の開示、訂正、追加、削除、利用停止等のご請求があった場合は、本人確認のうえ、法令に従い適切に対応いたします。
          </p>
          <p className={styles.p}>
            個人情報に関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>9. Cookie・アクセス解析・広告配信について</h2>
          <p className={styles.p}>
            当サイトでは、利便性の向上、アクセス解析、広告配信、広告効果測定、サイト改善のため、Cookie等の技術を使用する場合があります。
          </p>
          <p className={styles.p}>
            Cookieにより取得される情報には、閲覧ページ、利用環境、アクセス日時、広告識別子、IPアドレス、ブラウザ情報等が含まれる場合があります。
          </p>
          <p className={styles.p}>
            これらの情報は、サイトの利用状況の分析、サービス改善、広告配信の最適化等の目的で利用されます。
          </p>
          <p className={styles.p}>
            なお、Cookieの利用は、ブラウザの設定により拒否することが可能です。ただし、Cookieを無効にした場合、当サイトの一部機能が正常に利用できない場合があります。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>10. 著作権について</h2>
          <p className={styles.p}>
            当サイトに掲載されている文章、写真、画像、動画、ロゴ、デザイン、その他のコンテンツの著作権は、当サイトまたは正当な権利者に帰属します。
          </p>
          <p className={styles.p}>無断での複製、転載、転用、改変、配布等を禁止します。</p>
          <p className={styles.p}>
            当サイトのコンテンツを使用する場合は、事前に運営者の許可を得るものとします。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>11. 免責事項</h2>
          <p className={styles.p}>
            当サイトに掲載する情報については、できる限り正確な情報を提供するよう努めていますが、その正確性、完全性、最新性を保証するものではありません。
          </p>
          <p className={styles.p}>
            当サイトの情報を利用したことにより生じた損害等について、運営者は一切の責任を負いかねます。
          </p>
          <p className={styles.p}>
            また、当サイトからリンクされた第三者のウェブサイトの内容やサービスについては、各リンク先の責任において管理・運営されており、運営者はその内容や利用に関して責任を負いません。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>12. プライバシーポリシーの変更について</h2>
          <p className={styles.p}>
            運営者は、必要に応じて本ポリシーの内容を変更する場合があります。
          </p>
          <p className={styles.p}>
            変更後の内容は、当サイトに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>13. お問い合わせ</h2>
          <p className={styles.p}>
            本ポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりお願いいたします。
          </p>
          <dl className={styles.contact}>
            <div className={styles.contactRow}>
              <dt>制定日</dt>
              <dd>2025年12月10日</dd>
            </div>
            <div className={styles.contactRow}>
              <dt>運営</dt>
              <dd>外壁・屋根塗装ナビ</dd>
            </div>
          </dl>
        </section>

        <div className={styles.backWrap}>
          <a href={import.meta.env.BASE_URL} className={styles.backBtn}>
            ← トップページへ戻る
          </a>
        </div>
      </main>

      <footer className={styles.foot}>
        <span>外壁・屋根塗装ナビ</span>
      </footer>
    </div>
  );
}
