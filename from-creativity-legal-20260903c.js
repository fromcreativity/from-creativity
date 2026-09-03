/*!
 * ============================================================
 *  From Creativity ／ 特定商取引法に基づく表記ページ
 *  Wix Custom Element
 *
 *  VERSION: 2026-09-03c-LEGAL
 *  ↑ この行でバージョンを判別できます。
 *
 *  【Wix側の設定】
 *    Server URL :
 *      https://cdn.jsdelivr.net/gh/fromcreativity/from-creativity@main/from-creativity-legal-20260903c.js
 *    Tag name   : from-creativity-legal-v1
 *
 *  ※ トップページ（from-creativity-page-v4）とは別のタグ名です。
 *     同じページに両方を置くことはできますが、通常は /legal 専用ページに
 *     これ1つだけを配置します。
 *
 *  【2026-09-03c の変更】
 *    • フッターのコピーライト表記と矢印を削除
 *    • 交通費に宿泊費を追加
 *    • 物理納品の費用を「作成費用」に変更
 *    • 制作物の不備欄に「納品前のカット編集のみ1回無料」を追加
 *
 *  【2026-09-03b の変更】
 *    • 「お見積もりと初回相談は無料です」を3箇所に明記
 *      （リード文／役務の対価欄／フッター）
 * ============================================================
 */
(function () {
  'use strict';

  const VERSION = '2026-09-03c-LEGAL';

  /* Google Fonts（トップページと同じ書体を確実に読み込む） */
  function ensureFonts() {
    try {
      if (document.getElementById('fc-legal-fonts')) return;
      const l = document.createElement('link');
      l.id = 'fc-legal-fonts';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?' +
        'family=Bebas+Neue&' +
        'family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&' +
        'family=Noto+Sans+JP:wght@300;400;500&' +
        'family=Noto+Serif+JP:wght@300;400;500&' +
        'family=Shippori+Mincho+B1:wght@400;500&display=swap';
      document.head.appendChild(l);
    } catch (e) { /* noop */ }
  }

  const STYLES = `<style>
.fcl *,.fcl *::before,.fcl *::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:rgba(194,160,109,0.2)}
.fcl{-webkit-text-size-adjust:100%;text-size-adjust:100%}
.fcl{overflow-x:hidden;width:100%;max-width:100%;box-sizing:border-box}

.fcl{
  --ink:#0A0907;--paper:#F5F1E8;--gold:#C2A06D;
  --gold-soft:rgba(194,160,109,0.4);--gray:#3A3833;
  --serif-en:'Cormorant Garamond', serif;
  --serif-jp:'Shippori Mincho B1','Noto Serif JP', serif;
  --sans-jp:'Noto Sans JP', sans-serif;
  --display:'Bebas Neue', sans-serif;
}

.fcl{
  background:var(--ink);color:var(--paper);
  font-family:var(--sans-jp);font-weight:300;
  position:relative;
}

/* ── ヘッダー ───────────────────────────── */
.fcl-top{
  display:flex;align-items:center;justify-content:space-between;
  padding:26px 48px;border-bottom:1px solid var(--gold-soft);
}
.fcl-logo{display:flex;align-items:center;gap:14px;text-decoration:none}
.fcl-logo svg{width:20px;height:30px;display:block}
.fcl-logo-text{
  font-family:var(--display);font-size:15px;letter-spacing:0.32em;
  color:var(--paper);white-space:nowrap;
}
.fcl-back{
  font-family:var(--display);font-size:12px;letter-spacing:0.28em;
  color:var(--gold);text-decoration:none;border-bottom:1px solid transparent;
  padding-bottom:4px;transition:border-color .4s,letter-spacing .4s;
}
.fcl-back:hover{border-bottom-color:var(--gold);letter-spacing:0.34em}

/* ── 見出し ───────────────────────────── */
.fcl-head{padding:110px 48px 60px;max-width:1000px;margin:0 auto}
.fcl-num{
  font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--gold);
  margin-bottom:20px;display:flex;align-items:center;gap:14px;
}
.fcl-num::before{content:'';width:40px;height:1px;background:var(--gold)}
.fcl-h1{
  font-family:var(--serif-jp);font-size:clamp(28px,4vw,44px);line-height:1.45;
  font-weight:400;letter-spacing:0.05em;color:var(--paper);margin-bottom:26px;
}
.fcl-lead{
  font-family:var(--serif-jp);font-size:14.5px;line-height:2.1;font-weight:300;
  color:rgba(245,241,232,0.65);letter-spacing:0.04em;max-width:760px;
}

/* ── 本体：定義リスト ─────────────────────── */
.fcl-body{padding:0 48px 120px;max-width:1000px;margin:0 auto}
.fcl-dl{border-top:1px solid var(--gold-soft)}
.fcl-row{
  display:grid;grid-template-columns:260px 1fr;gap:36px;
  padding:30px 8px;border-bottom:1px solid rgba(194,160,109,0.18);
  transition:background .4s;
}
.fcl-row:hover{background:rgba(194,160,109,0.04)}
.fcl-dt{
  font-family:var(--serif-jp);font-size:14px;font-weight:500;
  color:var(--gold);letter-spacing:0.09em;line-height:1.7;
  padding-top:2px;
}
.fcl-dd{
  font-family:var(--serif-jp);font-size:14.5px;line-height:2.05;
  color:rgba(245,241,232,0.86);letter-spacing:0.04em;font-weight:300;
}
.fcl-dd p + p{margin-top:14px}
.fcl-dd ul{list-style:none;margin-top:6px}
.fcl-dd li{position:relative;padding-left:18px;line-height:1.95}
.fcl-dd li::before{
  content:'';position:absolute;left:0;top:0.85em;
  width:7px;height:1px;background:var(--gold);
}
.fcl-dd a{color:var(--gold);text-decoration:none;border-bottom:1px solid var(--gold-soft);transition:border-color .4s}
.fcl-dd a:hover{border-bottom-color:var(--gold)}
.fcl-note{
  display:block;margin-top:12px;font-family:var(--sans-jp);
  font-size:12px;line-height:1.95;color:rgba(245,241,232,0.5);letter-spacing:0.03em;
}
.fcl-price{
  font-family:var(--display);font-size:19px;letter-spacing:0.05em;
  color:var(--paper);
}

/* ── フッター ───────────────────────────── */
.fcl-foot{
  border-top:1px solid var(--gold-soft);
  padding:56px 48px 70px;text-align:center;
}
.fcl-foot-cta{
  display:inline-flex;align-items:center;gap:14px;
  font-family:var(--display);letter-spacing:0.3em;font-size:13px;color:var(--gold);
  text-decoration:none;border-bottom:1px solid var(--gold);padding-bottom:7px;
  transition:gap .4s,letter-spacing .4s;
}
.fcl-foot-cta:hover{gap:22px;letter-spacing:0.36em}
.fcl-copy{
  margin-top:34px;font-family:var(--display);font-size:10px;
  letter-spacing:0.3em;color:rgba(245,241,232,0.35);
}

/* ── レスポンシブ ─────────────────────────── */
@media(max-width:900px){
  .fcl-top{padding:20px 28px}
  .fcl-head{padding:76px 28px 44px}
  .fcl-body{padding:0 28px 90px}
  .fcl-row{grid-template-columns:1fr;gap:12px;padding:26px 4px}
  .fcl-dt{font-size:13px}
  .fcl-dd{font-size:13.5px;line-height:1.95}
  .fcl-foot{padding:44px 28px 56px}
}
@media(max-width:480px){
  .fcl-top{padding:16px 18px}
  .fcl-logo-text{font-size:13px;letter-spacing:0.24em}
  .fcl-back{font-size:11px;letter-spacing:0.22em}
  .fcl-head{padding:60px 18px 36px}
  .fcl-body{padding:0 18px 72px}
  .fcl-lead{font-size:13px;line-height:1.95}
  .fcl-row{padding:22px 2px}
  .fcl-dt{font-size:12.5px}
  .fcl-dd{font-size:12.5px;line-height:1.9}
  .fcl-note{font-size:11px}
  .fcl-price{font-size:17px}
  .fcl-foot{padding:38px 18px 48px}
}

/* Wixラッパー対策（トップページと同じ） */
from-creativity-legal-v1{
  display:block !important;margin:0 !important;padding:0 !important;
  width:100% !important;max-width:100% !important;box-sizing:border-box !important;
  position:relative !important;left:0 !important;height:auto !important;
}
.fcl{margin:0 !important;padding:0 !important;width:100% !important;max-width:100% !important;box-sizing:border-box !important;left:0 !important;right:auto !important}
</style>`;

  const HTML = `
<main class="fcl">

  <header class="fcl-top">
    <a href="https://www.from-creativity.com/" target="_top" class="fcl-logo" aria-label="From Creativity">
      <svg viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0,0 L240,0 L240,360 L120,300 L0,360 Z" fill="#F5F1E8"/>
        <rect x="32" y="42" width="42" height="42" fill="#0A0907"/>
        <rect x="32" y="118" width="42" height="42" fill="#0A0907"/>
        <rect x="32" y="194" width="42" height="42" fill="#0A0907"/>
      </svg>
      <span class="fcl-logo-text">FROM&nbsp;CREATIVITY</span>
    </a>
    <a href="https://www.from-creativity.com/" target="_top" class="fcl-back">← BACK</a>
  </header>

  <div class="fcl-head">
    <div class="fcl-num">LEGAL ／ 特定商取引法</div>
    <h1 class="fcl-h1">特定商取引法に基づく表記</h1>
    <p class="fcl-lead">
      特定商取引に関する法律第11条にもとづき、以下のとおり表示します。
      お見積もりと初回相談は無料です。ご不明な点は、お気軽にお問い合わせください。
    </p>
  </div>

  <div class="fcl-body">
    <div class="fcl-dl">

      <div class="fcl-row">
        <div class="fcl-dt">事業者名</div>
        <div class="fcl-dd">From Creativity（フロムクリエイティビティ）</div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">運営統括責任者</div>
        <div class="fcl-dd">佐々木 駿平</div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">所在地</div>
        <div class="fcl-dd">
          東京都羽村市
          <span class="fcl-note">※ 詳細な住所は、ご請求いただければ遅滞なく開示いたします。下記メールアドレスまでご連絡ください。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">電話番号</div>
        <div class="fcl-dd">
          ご請求いただければ遅滞なく開示いたします。
          <span class="fcl-note">※ 下記メールアドレスまでご連絡ください。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">メールアドレス</div>
        <div class="fcl-dd">
          <a href="mailto:fromcreativity.sasaki@gmail.com">fromcreativity.sasaki@gmail.com</a>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">事業内容</div>
        <div class="fcl-dd">ドキュメンタリー映像の企画・取材・撮影・編集および納品</div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">役務の対価<br>（販売価格）</div>
        <div class="fcl-dd">
          <ul>
            <li>個人向け　<span class="fcl-price">¥149,800 〜 ¥599,800</span></li>
            <li>法人向け　<span class="fcl-price">¥199,800 〜 ¥699,800</span></li>
            <li>1日密着ドキュメンタリー　<span class="fcl-price">¥399,800</span>（個人・法人 同額）</li>
          </ul>
          <p><strong style="font-weight:500;color:var(--gold)">お見積もりと初回相談は無料です。</strong></p>
          <span class="fcl-note">※ 表示価格はすべて税込みです。内容・撮影日数・編集量により、お見積もりのうえ個別に金額を確定します。各プランの詳細はトップページのサービス欄をご覧ください。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">対価以外に<br>必要な費用</div>
        <div class="fcl-dd">
          <ul>
            <li>撮影地までの交通費、宿泊費（実費）</li>
            <li>オプション（2カメ体制、ナレーション、予告編制作など）の費用</li>
            <li>DVD・USBメモリでの物理納品をご希望の場合の作成費用</li>
            <li>お振込手数料</li>
          </ul>
          <span class="fcl-note">※ いずれもお見積もり時に提示し、ご同意いただいたうえで承ります。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">お支払い方法</div>
        <div class="fcl-dd">銀行振込</div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">お支払い時期</div>
        <div class="fcl-dd">
          <p>ご契約時に、代金の50%を着手金としてお支払いいただきます。</p>
          <p>残額は、映像の納品後にお支払いいただきます。</p>
          <span class="fcl-note">※ お支払い期限は、それぞれ請求書発行日から14日以内とします。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">役務の提供時期</div>
        <div class="fcl-dd">
          撮影終了日から1ヶ月以内に納品します。
          <span class="fcl-note">※ 撮影日数や内容により前後する場合は、事前にお知らせします。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">納品方法</div>
        <div class="fcl-dd">
          <p>編集した映像データを、ギガファイル便などのオンラインストレージを通じてお渡しします。</p>
          <p>オプションとして、DVDまたはUSBメモリでの物理納品も承ります。</p>
          <span class="fcl-note">※ 物理納品をご希望の場合は、お見積もり時にお申し付けください（別途実費）。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">申込みの撤回・<br>契約の解除について</div>
        <div class="fcl-dd">
          <p>本サービスは、お客様のご要望に応じて個別に制作する役務のため、クーリング・オフの適用対象外です。</p>
          <p>ご契約後のキャンセルについては、進行状況に応じて個別にご相談させていただきます。ただし、キャンセルのご連絡をいただいた時点までに発生した実費（交通費、機材・人員の手配費用など）をご負担いただく場合があります。</p>
          <p>撮影後・納品後のキャンセルおよび返金は承っておりません。</p>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">制作物の不備<br>について</div>
        <div class="fcl-dd">
          <p>納品した映像に、当方の作業上の不備があった場合は、無償で修正いたします。また納品前のカット編集のみ、1回無料です。</p>
          <span class="fcl-note">※ 映像の演出・構成に関する主観的なご意見にもとづく作り直しは、別途お見積もりとなります。</span>
        </div>
      </div>

    </div>
  </div>

  <footer class="fcl-foot">
    <p style="font-family:var(--serif-jp);font-size:14px;line-height:2;color:rgba(245,241,232,0.7);font-weight:300;letter-spacing:0.04em;margin-bottom:26px">
      お見積もりと初回相談は無料です。<br>
      「何を撮りたいか」がはっきりしていない段階でも構いません。
    </p>
    <a href="https://www.from-creativity.com/contact" target="_top" class="fcl-foot-cta">
      無料相談する
    </a>
  </footer>

</main>
`;

  class FromCreativityLegalV1 extends HTMLElement {
    connectedCallback() {
      ensureFonts();
      this.innerHTML = STYLES + HTML;
      this.fixWixWrapper();
      [0, 300, 1200, 2500, 5000].forEach(t => setTimeout(() => {
        this.fixWixWrapper();
        this.trimWixGap();
      }, t));
      window.addEventListener('load', () => setTimeout(() => this.trimWixGap(), 400));
      let rt = null;
      window.addEventListener('resize', () => {
        clearTimeout(rt);
        rt = setTimeout(() => { this.fixWixWrapper(); this.trimWixGap(); }, 400);
      }, { passive: true });
    }

    /* Wixが本番だけ付ける左右パディング／はみ出しを打ち消す */
    fixWixWrapper() {
      try {
        let el = this.parentElement;
        while (el && el !== document.body && el !== document.documentElement) {
          const isWixSection = el.tagName === 'SECTION' ||
            (el.classList && (el.classList.contains('wixui-section') || (el.id && /^comp-/.test(el.id))));
          if (isWixSection) {
            el.style.cssText += ';padding:0 !important;width:100vw !important;max-width:100vw !important;' +
              'left:0 !important;right:0 !important;margin-left:0 !important;margin-right:0 !important;';
          }
          el = el.parentElement;
        }
      } catch (e) { /* noop */ }
    }

    /* 要素の高さを中身に合わせる。
       min-height は height / max-height より強いので、必ず 0 にしてから測る。
       祖先には触らない（Wixの他の要素を切り落とさないため）。 */
    trimWixGap() {
      try {
        const app = this.querySelector('.fcl');
        if (!app) return;
        app.style.setProperty('height', 'auto', 'important');
        app.style.setProperty('min-height', '0', 'important');
        app.style.setProperty('max-height', 'none', 'important');
        app.style.setProperty('align-self', 'start', 'important');
        app.style.setProperty('flex', '0 0 auto', 'important');

        const realH = Math.ceil(app.getBoundingClientRect().height);
        if (!realH || realH < 200) return;

        this.style.setProperty('display', 'block', 'important');
        this.style.setProperty('min-height', '0', 'important');
        this.style.setProperty('height', realH + 'px', 'important');
        this.style.setProperty('max-height', realH + 'px', 'important');
        this.style.setProperty('overflow', 'hidden', 'important');
        this.style.setProperty('align-self', 'start', 'important');
        this.style.setProperty('flex', '0 0 auto', 'important');

        if (!this._mo) {
          this._mo = new MutationObserver(() => {
            if (this._busy) return;
            this._busy = true;
            clearTimeout(this._moT);
            this._moT = setTimeout(() => { this._busy = false; this.trimWixGap(); }, 300);
          });
          this._mo.observe(this, { attributes: true, attributeFilter: ['style'] });
        }
        if (!this._ro && 'ResizeObserver' in window) {
          this._ro = new ResizeObserver(() => {
            clearTimeout(this._roT);
            this._roT = setTimeout(() => this.trimWixGap(), 350);
          });
          this._ro.observe(app);
        }
      } catch (e) { /* noop */ }
    }
  }

  if (!customElements.get('from-creativity-legal-v1')) {
    customElements.define('from-creativity-legal-v1', FromCreativityLegalV1);
  }
})();
