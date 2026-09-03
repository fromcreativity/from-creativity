/*!
 * ============================================================
 *  From Creativity ／ 特定商取引法に基づく表記ページ
 *  Wix Custom Element
 *
 *  VERSION: 2026-09-03d-LEGAL
 *
 *  【Wix側の設定】
 *    Server URL :
 *      https://cdn.jsdelivr.net/gh/fromcreativity/from-creativity@main/from-creativity-legal-20260903d.js
 *    Tag name   : from-creativity-legal-v1
 *
 *  【2026-09-03d の変更】
 *    • スマホ崩壊の対策として全面的に組み直し
 *        - ヘッダーの「← BACK」を削除（320px幅でロゴと衝突していた）
 *        - グリッドの子に minmax(0,1fr) を指定（はみ出しの主因）
 *        - すべての要素に max-width:100% と overflow-wrap を付与
 *        - fixWixWrapper の width:100vw をやめ、100% に（横スクロール防止）
 *    • フッターの案内文と「無料相談する」ボタンを削除
 *    • 代わりに「ホームに戻る」の大きなボタンを設置
 *    • 行間・項目間の余白を広げ、長文は段落を分けて読みやすく
 *
 *  【診断モード】
 *    表示が崩れたときは、ロゴを5回すばやくタップすると
 *    画面上部に実測値のパネルが出ます（訪問者には出ません）。
 * ============================================================
 */
(function () {
  'use strict';

  const VERSION = '2026-09-03d-LEGAL';

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
/* ── リセット。はみ出しを起こさないことを最優先 ────────── */
.fcl,.fcl *,.fcl *::before,.fcl *::after{
  box-sizing:border-box;margin:0;padding:0;
  max-width:100%;min-width:0;
  -webkit-tap-highlight-color:rgba(194,160,109,0.2);
}
.fcl{
  -webkit-text-size-adjust:100%;text-size-adjust:100%;
  width:100%;max-width:100%;overflow-x:hidden;
}

.fcl{
  --ink:#0A0907;--paper:#F5F1E8;--gold:#C2A06D;
  --gold-soft:rgba(194,160,109,0.4);
  --serif-en:'Cormorant Garamond', serif;
  --serif-jp:'Shippori Mincho B1','Noto Serif JP', serif;
  --sans-jp:'Noto Sans JP', sans-serif;
  --display:'Bebas Neue', sans-serif;
}
.fcl{
  background:var(--ink);color:var(--paper);
  font-family:var(--sans-jp);font-weight:300;position:relative;
}

/* ── ヘッダー：ロゴのみ。横並びの衝突をなくす ───────── */
.fcl-top{
  display:flex;align-items:center;justify-content:center;
  padding:30px 24px;border-bottom:1px solid var(--gold-soft);
}
.fcl-logo{display:inline-flex;align-items:center;gap:14px;text-decoration:none}
.fcl-logo svg{width:20px;height:30px;display:block;flex:0 0 auto}
.fcl-logo-text{
  font-family:var(--display);font-size:15px;letter-spacing:0.3em;
  color:var(--paper);line-height:1;
}

/* ── 見出し ───────────────────────────── */
.fcl-head{padding:96px 48px 56px;max-width:960px;margin:0 auto}
.fcl-num{
  font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--gold);
  margin-bottom:22px;display:flex;align-items:center;gap:14px;
}
.fcl-num::before{content:'';width:40px;height:1px;background:var(--gold);flex:0 0 auto}
.fcl-h1{
  font-family:var(--serif-jp);font-size:clamp(26px,3.6vw,42px);line-height:1.5;
  font-weight:400;letter-spacing:0.05em;color:var(--paper);margin-bottom:28px;
}
.fcl-lead{
  font-family:var(--serif-jp);font-size:14.5px;line-height:2.2;font-weight:300;
  color:rgba(245,241,232,0.65);letter-spacing:0.04em;
}

/* ── 本体 ───────────────────────────── */
.fcl-body{padding:0 48px 110px;max-width:960px;margin:0 auto}
.fcl-dl{border-top:1px solid var(--gold-soft)}
.fcl-row{
  display:grid;grid-template-columns:240px minmax(0,1fr);gap:40px;
  padding:38px 6px;border-bottom:1px solid rgba(194,160,109,0.18);
  transition:background .4s;
}
.fcl-row:hover{background:rgba(194,160,109,0.04)}
.fcl-dt{
  font-family:var(--serif-jp);font-size:14px;font-weight:500;
  color:var(--gold);letter-spacing:0.09em;line-height:1.85;padding-top:2px;
}
.fcl-dd{
  font-family:var(--serif-jp);font-size:14.5px;line-height:2.2;
  color:rgba(245,241,232,0.88);letter-spacing:0.04em;font-weight:300;
  overflow-wrap:anywhere;word-break:normal;
}
.fcl-dd p + p{margin-top:18px}
.fcl-dd ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.fcl-dd li{position:relative;padding-left:20px;line-height:2}
.fcl-dd li::before{
  content:'';position:absolute;left:0;top:0.95em;
  width:8px;height:1px;background:var(--gold);
}
.fcl-dd a{
  color:var(--gold);text-decoration:none;
  border-bottom:1px solid var(--gold-soft);transition:border-color .4s;
  overflow-wrap:anywhere;
}
.fcl-dd a:hover{border-bottom-color:var(--gold)}
.fcl-free{color:var(--gold);font-weight:500}
.fcl-note{
  display:block;margin-top:16px;font-family:var(--sans-jp);
  font-size:12px;line-height:2;color:rgba(245,241,232,0.5);letter-spacing:0.03em;
}
.fcl-price{
  font-family:var(--display);font-size:18px;letter-spacing:0.04em;
  color:var(--paper);white-space:nowrap;
}
.fcl-plan{display:block}
.fcl-plan-name{
  display:block;font-size:13px;color:rgba(245,241,232,0.7);
  letter-spacing:0.06em;margin-bottom:2px;
}

/* ── フッター：ホームに戻るボタン ─────────────── */
.fcl-foot{
  border-top:1px solid var(--gold-soft);
  padding:70px 24px 84px;text-align:center;
}
.fcl-home{
  display:inline-flex;flex-direction:column;align-items:center;gap:7px;
  width:auto;min-width:340px;padding:26px 56px;
  background:var(--gold);color:var(--ink);text-decoration:none;
  border:1px solid var(--gold);
  transition:background .45s,transform .45s,box-shadow .45s;
}
.fcl-home:hover{
  background:#F0DEB6;transform:translateY(-4px);
  box-shadow:0 18px 44px rgba(194,160,109,0.32);
}
.fcl-home-jp{
  font-family:var(--serif-jp);font-size:19px;font-weight:500;
  letter-spacing:0.18em;line-height:1.4;
}
.fcl-home-en{
  font-family:var(--display);font-size:11px;letter-spacing:0.34em;
  opacity:0.62;line-height:1;
}

/* ── タブレット ─────────────────────────── */
@media(max-width:900px){
  .fcl-top{padding:24px 20px}
  .fcl-head{padding:72px 28px 42px}
  .fcl-body{padding:0 28px 84px}
  .fcl-row{grid-template-columns:minmax(0,1fr);gap:14px;padding:30px 2px}
  .fcl-dt{font-size:13.5px;line-height:1.7}
  .fcl-dd{font-size:14px;line-height:2.1}
  .fcl-foot{padding:56px 20px 66px}
}

/* ── スマホ ───────────────────────────── */
@media(max-width:600px){
  .fcl-top{padding:20px 14px}
  .fcl-logo{gap:10px}
  .fcl-logo svg{width:16px;height:24px}
  .fcl-logo-text{font-size:12.5px;letter-spacing:0.2em}

  .fcl-head{padding:54px 18px 32px}
  .fcl-num{font-size:10px;letter-spacing:0.3em;margin-bottom:16px}
  .fcl-num::before{width:26px}
  .fcl-h1{font-size:23px;line-height:1.55;margin-bottom:20px}
  .fcl-lead{font-size:13px;line-height:2.05}

  .fcl-body{padding:0 18px 64px}
  .fcl-row{gap:10px;padding:26px 0}
  .fcl-dt{font-size:12.5px;letter-spacing:0.06em;line-height:1.6}
  .fcl-dd{font-size:13px;line-height:2.05}
  .fcl-dd p + p{margin-top:14px}
  .fcl-dd ul{gap:8px}
  .fcl-dd li{padding-left:16px;line-height:1.95}
  .fcl-dd li::before{width:6px}
  .fcl-note{font-size:11px;line-height:1.9;margin-top:12px}
  .fcl-price{font-size:16px}
  .fcl-plan-name{font-size:12px}

  .fcl-foot{padding:44px 18px 54px}
  .fcl-home{
    min-width:0;width:100%;padding:20px 20px;gap:6px;
  }
  .fcl-home-jp{font-size:16.5px;letter-spacing:0.14em}
  .fcl-home-en{font-size:10px;letter-spacing:0.28em}
}

/* ── 極小画面（320px）でも破綻させない ───────────── */
@media(max-width:360px){
  .fcl-logo-text{font-size:11px;letter-spacing:0.16em}
  .fcl-head{padding:46px 14px 28px}
  .fcl-body{padding:0 14px 56px}
  .fcl-h1{font-size:20.5px}
  .fcl-dd{font-size:12.5px}
  .fcl-price{font-size:15px}
  .fcl-foot{padding:38px 14px 46px}
}

/* ── Wixラッパー対策 ──────────────────────── */
from-creativity-legal-v1{
  display:block !important;margin:0 !important;padding:0 !important;
  width:100% !important;max-width:100% !important;box-sizing:border-box !important;
  position:relative !important;left:0 !important;height:auto !important;
  overflow-x:hidden !important;
}
</style>`;

  const HTML = `
<main class="fcl">

  <header class="fcl-top">
    <a href="https://www.from-creativity.com/" target="_top" class="fcl-logo" aria-label="From Creativity トップページへ">
      <svg viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0,0 L240,0 L240,360 L120,300 L0,360 Z" fill="#F5F1E8"></path>
        <rect x="32" y="42" width="42" height="42" fill="#0A0907"></rect>
        <rect x="32" y="118" width="42" height="42" fill="#0A0907"></rect>
        <rect x="32" y="194" width="42" height="42" fill="#0A0907"></rect>
      </svg>
      <span class="fcl-logo-text">FROM&nbsp;CREATIVITY</span>
    </a>
  </header>

  <div class="fcl-head">
    <div class="fcl-num">LEGAL ／ 特定商取引法</div>
    <h1 class="fcl-h1">特定商取引法に基づく表記</h1>
    <p class="fcl-lead">
      特定商取引に関する法律第11条にもとづき、以下のとおり表示します。<br>
      お見積もりと初回相談は無料です。<br>
      ご不明な点は、お気軽にお問い合わせください。
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
          <p>東京都羽村市</p>
          <span class="fcl-note">※ 詳細な住所は、ご請求いただければ遅滞なく開示いたします。<br>下記メールアドレスまでご連絡ください。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">電話番号</div>
        <div class="fcl-dd">
          <p>ご請求いただければ遅滞なく開示いたします。</p>
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
        <div class="fcl-dd">
          ドキュメンタリー映像の企画・取材・撮影・編集および納品
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">役務の対価<br>（販売価格）</div>
        <div class="fcl-dd">
          <ul>
            <li>
              <span class="fcl-plan">
                <span class="fcl-plan-name">個人向け</span>
                <span class="fcl-price">¥149,800 〜 ¥599,800</span>
              </span>
            </li>
            <li>
              <span class="fcl-plan">
                <span class="fcl-plan-name">法人向け</span>
                <span class="fcl-price">¥199,800 〜 ¥699,800</span>
              </span>
            </li>
            <li>
              <span class="fcl-plan">
                <span class="fcl-plan-name">1日密着ドキュメンタリー（個人・法人 同額）</span>
                <span class="fcl-price">¥399,800</span>
              </span>
            </li>
          </ul>
          <p style="margin-top:20px"><span class="fcl-free">お見積もりと初回相談は無料です。</span></p>
          <span class="fcl-note">※ 表示価格はすべて税込みです。<br>※ 内容・撮影日数・編集量により、お見積もりのうえ個別に金額を確定します。<br>※ 各プランの詳細はトップページのサービス欄をご覧ください。</span>
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
          <p>撮影終了日から1ヶ月以内に納品します。</p>
          <span class="fcl-note">※ 撮影日数や内容により前後する場合は、事前にお知らせします。</span>
        </div>
      </div>

      <div class="fcl-row">
        <div class="fcl-dt">納品方法</div>
        <div class="fcl-dd">
          <p>編集した映像データを、ギガファイル便などのオンラインストレージを通じてお渡しします。</p>
          <p>オプションとして、DVDまたはUSBメモリでの物理納品も承ります。</p>
          <span class="fcl-note">※ 物理納品をご希望の場合は、お見積もり時にお申し付けください（別途作成費用）。</span>
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
          <p>納品した映像に、当方の作業上の不備があった場合は、無償で修正いたします。</p>
          <p>また納品前のカット編集のみ、1回無料です。</p>
          <span class="fcl-note">※ 映像の演出・構成に関する主観的なご意見にもとづく作り直しは、別途お見積もりとなります。</span>
        </div>
      </div>

    </div>
  </div>

  <footer class="fcl-foot">
    <a href="https://www.from-creativity.com/" target="_top" class="fcl-home">
      <span class="fcl-home-jp">ホームに戻る</span>
      <span class="fcl-home-en">BACK TO HOME</span>
    </a>
  </footer>

</main>
`;

  class FromCreativityLegalV1 extends HTMLElement {
    connectedCallback() {
      ensureFonts();
      this.innerHTML = STYLES + HTML;
      this.fixWixWrapper();
      [0, 300, 1000, 2200, 4500, 8000].forEach(t => setTimeout(() => {
        this.fixWixWrapper();
        this.trimWixGap();
      }, t));
      window.addEventListener('load', () => setTimeout(() => {
        this.fixWixWrapper(); this.trimWixGap();
      }, 400));
      let rt = null;
      window.addEventListener('resize', () => {
        clearTimeout(rt);
        rt = setTimeout(() => { this.fixWixWrapper(); this.trimWixGap(); }, 400);
      }, { passive: true });
      this.initDebugTrigger();
    }

    /* Wixが本番だけ付ける左右パディングを打ち消す。
       ※ width:100vw は使わない。スマホで横スクロールを生む原因になるため。 */
    fixWixWrapper() {
      try {
        let el = this.parentElement, n = 0;
        while (el && el !== document.body && el !== document.documentElement && n < 8) {
          const isWixSection = el.tagName === 'SECTION' ||
            (el.classList && (el.classList.contains('wixui-section') || (el.id && /^comp-/.test(el.id))));
          if (isWixSection) {
            el.style.setProperty('padding-left', '0', 'important');
            el.style.setProperty('padding-right', '0', 'important');
            el.style.setProperty('margin-left', '0', 'important');
            el.style.setProperty('margin-right', '0', 'important');
            el.style.setProperty('width', '100%', 'important');
            el.style.setProperty('max-width', '100%', 'important');
            el.style.setProperty('left', '0', 'important');
            el.style.setProperty('overflow-x', 'hidden', 'important');
          }
          el = el.parentElement; n++;
        }
      } catch (e) { /* noop */ }
    }

    /* 要素の高さを中身に合わせる。
       min-height は height / max-height より強いので、必ず 0 にしてから測る。
       祖先の高さには触らない（他のWix要素を切り落とさないため）。 */
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
      } catch (e) { this._err = String(e); }
    }

    /* 診断：ロゴを5回すばやくタップ、または ?fcdebug=1 */
    initDebugTrigger() {
      try {
        if (/[?&]fcdebug=1/.test(location.search) || /fcdebug/.test(location.hash)) {
          [800, 2500, 5000].forEach(t => setTimeout(() => this.debugPanel(), t));
        }
        const logo = this.querySelector('.fcl-logo');
        if (!logo) return;
        let c = 0, tm = null;
        logo.addEventListener('click', (e) => {
          c++; clearTimeout(tm);
          tm = setTimeout(() => { c = 0; }, 900);
          if (c >= 5) { c = 0; e.preventDefault(); this.debugPanel(); }
        });
      } catch (e) { /* noop */ }
    }

    debugPanel() {
      try {
        const app = this.querySelector('.fcl');
        if (!app) return;
        let box = document.getElementById('fclDebugBox');
        if (!box) {
          box = document.createElement('div');
          box.id = 'fclDebugBox';
          box.style.cssText = 'position:fixed;left:4px;right:4px;top:4px;z-index:2147483647;' +
            'background:#fff;color:#111;font:10px/1.5 ui-monospace,monospace;padding:9px 11px;' +
            'border:3px solid #E94B2B;border-radius:8px;max-height:70vh;overflow:auto;' +
            'box-shadow:0 8px 30px rgba(0,0,0,.6);white-space:pre-wrap';
          box.addEventListener('click', () => box.remove());
          document.body.appendChild(box);
        }
        const a = app.getBoundingClientRect(), h = this.getBoundingClientRect();
        let widest = null, wmax = 0;
        this.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > wmax) { wmax = r.width; widest = el; }
        });
        let o = '■FCL DIAG ' + VERSION + ' ※タップで閉じる\n';
        o += 'vw=' + window.innerWidth + ' docW=' + document.documentElement.scrollWidth + '\n';
        o += 'main w=' + Math.round(a.width) + ' h=' + Math.round(a.height) + '\n';
        o += 'host w=' + Math.round(h.width) + ' h=' + Math.round(h.height) +
             ' 差=' + Math.round(h.height - a.height) + '\n';
        o += '横に一番広い要素: ' + (widest ? '<' + widest.tagName.toLowerCase() + '> .' +
             (widest.className || '-') + ' w=' + Math.round(wmax) : '-') + '\n';
        o += '横スクロール: ' + (document.documentElement.scrollWidth > window.innerWidth + 2 ? 'あり' : 'なし');
        if (this._err) o += '\nERR ' + this._err;
        box.textContent = o;
      } catch (e) { /* noop */ }
    }
  }

  if (!customElements.get('from-creativity-legal-v1')) {
    customElements.define('from-creativity-legal-v1', FromCreativityLegalV1);
  }
})();
