/*!
 * From Creativity ／ Wix Custom Element  ── 第4稿 左右分割ヒーロー版（V4-FIX）
 * 見た目はV4のまま。以下のバグ修正＋SEO強化を反映：
 *
 * 【バグ修正】
 *   • コンセプト動画ブラー解除（filter:blur(8px) 残留 → !important で解除）
 *   • MESSAGEセクション文字サイズ正常化（".message ..fc-app p" 不正セレクタ修正）
 *   • Hero h1 二重アニメ削除（h1自体のrise削除、charだけアニメ）
 *   • Awardsマーキューを GPU合成化（will-change + translateZ(0)）でちらつき抑制
 *   • デッドコード削除（hero-play-badge / .reel系 / scroll-hint::after）
 *   • 未使用 @keyframes（rise / pulse / scrollLine）削除
 *
 * 【ヒーロー改修】
 *   • PCは左にコピー／右に動画、スマホはコピーの下に動画を配置
 *   • 自動再生はミュート固定で開始（ブラウザの自動再生制限に対応）
 *   • 「最初から」「音声」「一時停止」「全画面」を独自UIで実装
 *   • 動画はobject-fit:containでクロップせず、全体を表示
 *   • ポスターのぼかしを背面に敷き、映像の境界だけを柔らかく処理
 *
 * 【SEO 強化】
 *   • JSON-LD 構造化データ：6 エンティティ
 *     - Service（個人向け／法人向け）追加 → 価格・通貨を明示
 *     - VideoObject（コンセプトムービー）追加
 *     - FAQPageはWix側との重複を避けるため、このJSには入れない
 *   • Awards重複ローレル4枚に aria-hidden="true"（装飾と明示）
 *   • makesOffer / worksFor の関係を ProfessionalService / Person に追加
 *
 * Tag name: from-creativity-page-v4（V4と同じ。GitHub上の同名ファイルを差し替え、jsDelivrをパージ）
 * 
 * V3からの変更：
 *   • Ken Burns（無限ループ）削除 → ホバー時のみズーム
 *   • タグライン金色シマー（無限ループ）削除 → 静的グラデーション
 *   • YouTubeカードの脈打ち（無限ループ）削除 → 静的グロウ
 *   • ヒーロー動画 breathe（無限ループ）削除
 *   • film grain animation 削除（薄い静的オーバーレイのみ）
 *   • 受賞ローレルの3D効果はホバー時のみ
 * 
 * 残した演出：
 *   • 文字カスケード（ロード時1回）
 *   • スクロールリビール（一度だけ発火）
 *   • ヒーロー動画フェードイン（ロード時1回）
 *   • 全要素ホバー時インタラクション
 *
 * Tag name: from-creativity-page-v4
 */
(function(){
  if (typeof customElements === 'undefined') return;
  if (customElements.get('from-creativity-page-v4')) return;

  const STYLES = `<style>
.fc-app *,.fc-app *::before,.fc-app *::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:rgba(194,160,109,0.2)}
.fc-app{-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-behavior:smooth}
.fc-app{overflow-x:hidden;width:100%;max-width:100%;box-sizing:border-box}

.fc-app{
  --ink:#0A0907;--paper:#F5F1E8;--gold:#C2A06D;
  --gold-soft:rgba(194,160,109,0.4);--red:#E94B2B;--gray:#3A3833;
  --serif-en:'Cormorant Garamond', serif;
  --serif-jp:'Shippori Mincho B1','Noto Serif JP', serif;
  --sans-jp:'Noto Sans JP', sans-serif;
  --display:'Bebas Neue', sans-serif;
}

.fc-app{
  background:var(--ink);color:var(--paper);
  font-family:var(--sans-jp);font-weight:300;
  line-height:1.8;letter-spacing:0.04em;
}
img{max-width:100%;display:block;height:auto}
a{color:inherit;text-decoration:none}
button{cursor:pointer;font:inherit;color:inherit}

.fc-app::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:9998;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:0.08;mix-blend-mode:overlay;
}


/* NAV */
nav.top{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 36px 14px 56px;
  background:linear-gradient(180deg,rgba(10,9,7,0.85) 0%,rgba(10,9,7,0.65) 80%,rgba(10,9,7,0) 100%);
  backdrop-filter:blur(14px) saturate(140%);
  -webkit-backdrop-filter:blur(14px) saturate(140%);
  border-bottom:1px solid rgba(194,160,109,0.18);
  box-shadow:0 8px 32px rgba(0,0,0,0.18);
  font-family:var(--display);letter-spacing:0.22em;font-size:12px;color:var(--paper);
  transition:background .5s,padding .5s,backdrop-filter .5s;
}
nav.top .logo{
  display:flex;align-items:center;gap:12px;
  padding:6px 14px 6px 6px;border-radius:30px;
  transition:background .4s;
}
nav.top .logo:hover{background:rgba(194,160,109,0.08)}
nav.top .logo svg{width:28px;height:28px;display:block;filter:drop-shadow(0 4px 10px rgba(194,160,109,0.25))}
nav.top .logo .logo-text{
  font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:0.32em;
  color:var(--paper);font-weight:700;
  background:linear-gradient(120deg,#F5F1E8 0%,#C2A06D 50%,#F5F1E8 100%);
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:transparent;
}
/* メニューを右寄せに配置 */
nav.top ul{
  display:flex;align-items:center;gap:32px;list-style:none;
  margin-left:auto;margin-right:0;
}
nav.top ul li{position:relative}
nav.top ul a{
  position:relative;display:inline-block;padding:10px 14px;
  color:var(--paper);transition:color .4s;
  border-radius:4px;
}
nav.top ul a::before{
  content:'';position:absolute;inset:0;border-radius:4px;
  background:linear-gradient(135deg,rgba(194,160,109,0.22),rgba(194,160,109,0.05));
  opacity:0;transition:opacity .4s;pointer-events:none;
}
nav.top ul a::after{
  content:'';position:absolute;left:14px;right:14px;bottom:6px;height:1px;
  background:linear-gradient(90deg,transparent,var(--gold) 50%,transparent);
  transform:scaleX(0);transform-origin:center;
  transition:transform .5s cubic-bezier(.7,0,.3,1);
}
nav.top ul a:hover{color:var(--gold)}
nav.top ul a:hover::before{opacity:1}
nav.top ul a:hover::after{transform:scaleX(1)}
/* Contact だけアクセントカラー */
nav.top ul li:last-child a{
  color:var(--gold);border:1px solid rgba(194,160,109,0.45);
  padding:10px 18px;letter-spacing:0.28em;
}
nav.top ul li:last-child a:hover{background:var(--gold);color:var(--ink);border-color:var(--gold)}
nav.top ul li:last-child a::after{display:none}
.nav-toggle{display:none}

/* HERO */
.hero{
  position:relative;
  display:flex;align-items:center;
  padding:96px 48px 96px;overflow:hidden;background:#0A0907;
}
.hero-grid{
  position:relative;z-index:2;
  width:100%;
  display:grid;
  grid-template-columns:0.85fr 1.4fr;
  gap:50px;
  align-items:center;
}
.hero-video{
  position:relative;width:100%;
  aspect-ratio:16/9;
  background:#000;border:1px solid var(--gold-soft);overflow:hidden;
  box-shadow:0 30px 80px rgba(194,160,109,0.18), 0 0 0 1px rgba(194,160,109,0.05);
  opacity:0;transform:translateY(30px);
  animation:videoIn 1.4s cubic-bezier(.5,0,.1,1) .8s forwards;
}
@keyframes videoIn{
  0%{opacity:0;transform:translateY(30px)}
  100%{opacity:1;transform:translateY(0)}
}
.hero-video-meta{
  opacity:0;animation:fade 1.2s ease 2.0s forwards;
}
.hero-video video{
  position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;
}
.hero-video-meta{
  position:absolute;bottom:-30px;left:0;right:0;
  display:flex;justify-content:space-between;
  font-family:var(--display);font-size:10px;letter-spacing:0.4em;color:var(--gold);
}
.hero-video-placeholder{
  position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(circle at 30% 40%, rgba(194,160,109,0.18) 0%, transparent 60%),
    radial-gradient(circle at 70% 60%, rgba(233,75,43,0.08) 0%, transparent 55%),
    linear-gradient(135deg, #0A0907 0%, #1a1410 40%, #0A0907 100%);
}
.hero::after{
  content:'';position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(180deg,rgba(10,9,7,0.50) 0%,rgba(10,9,7,0.35) 35%,rgba(10,9,7,0.65) 70%,rgba(10,9,7,0.95) 100%);
}
.hero > div, .hero > a{position:relative;z-index:2}

/* H1: Japanese phrase, single block. Animation runs on .char children only. */
.hero h1{
  font-family:var(--serif-jp);font-weight:500;
  font-size:clamp(32px,4.6vw,68px);line-height:1.45;
  letter-spacing:0.04em;color:var(--paper);
  margin-bottom:36px;
}

/* dash phrase: 一行で表示・改行しない・小さめのletter-spacingに調整 */
.hero h1 em{
  display:block;font-family:var(--serif-jp);font-style:normal;font-weight:300;
  font-size:clamp(13px,1.5vw,20px);color:var(--gold);
  letter-spacing:0.08em;line-height:1.6;margin-top:24px;
  opacity:0;animation:fade 1.5s ease 1.0s forwards;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
@keyframes fade{to{opacity:1}}

.hero .lead{
  max-width:520px;font-family:var(--serif-jp);font-size:17px;line-height:2.1;
  color:var(--paper);font-weight:300;letter-spacing:0.05em;
  opacity:0;animation:fade 1.5s ease 1.4s forwards;
}
.hero .lead .accent{color:var(--gold);font-style:italic;font-family:var(--serif-en)}

/* .scroll-hint は .fc-app .scroll-hint{display:none} で非表示 */
.scroll-hint{display:none}


/* AWARDS */
.awards{
  border-top:1px solid var(--gold-soft);border-bottom:1px solid var(--gold-soft);
  padding:48px 0;overflow:hidden;background:#000;position:relative;
}
.awards::before,.awards::after{
  content:'';position:absolute;top:0;bottom:0;width:120px;z-index:2;pointer-events:none;
}
.awards::before{left:0;background:linear-gradient(90deg,#000,transparent)}
.awards::after{right:0;background:linear-gradient(-90deg,#000,transparent)}
.awards-label{text-align:center;font-family:var(--display);font-size:11px;letter-spacing:0.5em;color:var(--gold);margin-bottom:30px}
.awards-track{display:flex;gap:80px;animation:marquee 40s linear infinite;width:max-content;will-change:transform;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:translateZ(0)}
.awards-track:hover{animation-play-state:paused}
@keyframes marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
.award-item{display:flex;align-items:center;gap:24px;white-space:nowrap;padding:0 30px}
.award-item img.laurel-img{height:120px;width:auto;display:block;filter:brightness(1.05) contrast(1.05)}
.award-item .award-text{display:flex;flex-direction:column;gap:4px}
.award-item .award-name{font-family:var(--serif-en);font-size:16px;color:var(--paper);font-style:italic;font-weight:400;line-height:1.3}
.award-item .award-meta{font-family:var(--display);font-size:10px;color:var(--gold);letter-spacing:0.35em}
.award-item .award-sub{font-family:var(--sans-jp);font-size:10px;color:rgba(245,241,232,0.5);letter-spacing:0.1em;font-weight:300}

/* SECTION COMMON */
section{position:relative;padding:140px 48px}
.section-num{font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--gold);margin-bottom:20px;display:flex;align-items:center;gap:14px}
.section-num::before{content:'';width:40px;height:1px;background:var(--gold)}
.section-h{font-family:var(--serif-jp);font-size:clamp(36px,5vw,60px);line-height:1.3;font-weight:400;letter-spacing:0.05em;margin-bottom:48px;color:var(--paper)}
.section-h em{font-family:var(--serif-en);font-style:italic;color:var(--gold);font-weight:300}

/* NEWS ／ 新着情報 */
.news{
  background:linear-gradient(180deg,#0D0B09,#0A0907);
  border-bottom:1px solid var(--gold-soft);
  padding:56px 48px;
}
.news-inner{max-width:1100px;margin:0 auto}
.news-label{
  font-family:var(--display);font-size:11px;letter-spacing:0.5em;color:var(--gold);
  margin-bottom:24px;display:flex;align-items:center;gap:14px;
}
.news-label::before{content:'';width:40px;height:1px;background:var(--gold)}
.news-list{list-style:none;display:flex;flex-direction:column}
.news-list li{border-bottom:1px solid rgba(194,160,109,0.16)}
.news-list li:first-child{border-top:1px solid rgba(194,160,109,0.16)}
.news-list a{
  display:grid;grid-template-columns:100px 1fr auto;gap:24px;align-items:center;
  padding:18px 6px;transition:background .4s,padding-left .4s;
}
.news-list a:hover{background:rgba(194,160,109,0.06);padding-left:14px}
.news-date{font-family:var(--display);font-size:11px;letter-spacing:0.3em;color:var(--gold)}
.news-title{
  font-family:var(--serif-jp);font-size:15px;font-weight:400;color:var(--paper);
  letter-spacing:0.04em;line-height:1.6;
}
.news-tag{
  display:inline-block;margin-right:12px;padding:3px 9px;
  font-family:var(--display);font-size:9px;letter-spacing:0.25em;
  border:1px solid var(--gold-soft);color:var(--gold);vertical-align:2px;
}
.news-arrow{font-size:16px;color:var(--gold);transition:transform .4s;display:inline-block}
.news-list a:hover .news-arrow{transform:translateX(6px)}

/* CLIENT WORKS ／ 法人・店舗向け制作実績 */
.client-works{padding:80px 48px 90px;background:var(--ink)}
.client-head{max-width:1400px;margin:0 auto 46px}
.client-head .section-h{margin-bottom:18px}
.client-lead{
  font-family:var(--serif-jp);font-size:14.5px;line-height:2.1;
  color:rgba(245,241,232,0.7);font-weight:300;letter-spacing:0.04em;max-width:720px;
}
.client-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;max-width:1400px;margin:0 auto}
.client-card{
  position:relative;padding:36px 30px 34px;
  border:1px solid var(--gold-soft);background:rgba(194,160,109,0.03);
  transition:background .6s,border-color .6s,transform .6s,box-shadow .6s;
}
.client-card:hover{
  background:rgba(194,160,109,0.07);border-color:var(--gold);
  transform:translateY(-5px);box-shadow:0 24px 60px rgba(0,0,0,0.4);
}
.client-no{
  font-family:var(--serif-en);font-style:italic;font-weight:300;
  font-size:34px;color:var(--gold);line-height:1;margin-bottom:18px;opacity:0.85;
}
.client-client{
  font-family:var(--serif-jp);font-size:15px;font-weight:500;
  color:var(--paper);letter-spacing:0.06em;line-height:1.5;margin-bottom:6px;
}
.client-type{
  font-family:var(--display);font-size:10px;letter-spacing:0.34em;color:var(--gold);
  padding-bottom:16px;margin-bottom:16px;border-bottom:1px solid rgba(194,160,109,0.22);
}
.client-type .jp{font-family:var(--serif-jp);font-size:11.5px;letter-spacing:0.1em}
.client-card p{
  font-family:var(--serif-jp);font-size:13.5px;line-height:2.05;
  color:rgba(245,241,232,0.75);font-weight:300;letter-spacing:0.03em;
}
.client-foot{
  max-width:1400px;margin:26px auto 0;
  font-family:'Noto Sans JP',var(--sans-jp),sans-serif;
  font-size:11.5px;font-weight:300;line-height:1.9;
  color:rgba(245,241,232,0.5);letter-spacing:0.04em;
}

/* SERVICES */
.services-intro{max-width:780px;font-family:var(--serif-jp);font-size:17px;line-height:2.1;color:var(--paper);margin-bottom:40px;letter-spacing:0.05em}

/* 一貫担当アピール */
.all-in-one{
  max-width:780px;margin:0 auto 80px;padding:32px 36px;
  border:1px solid var(--gold-soft);background:rgba(194,160,109,0.04);
  display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;
}
.all-in-one-label{
  font-family:var(--display);font-size:11px;letter-spacing:0.5em;color:var(--gold);
}
.all-in-one-flow{
  display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center;
  font-family:var(--serif-jp);font-size:18px;font-weight:500;color:var(--paper);letter-spacing:0.18em;
}
.all-in-one-flow .dot{color:var(--gold);font-size:16px;letter-spacing:0}
.all-in-one-text{
  font-family:var(--serif-jp);font-size:14px;line-height:2;color:rgba(245,241,232,0.8);font-weight:300;letter-spacing:0.04em;
}
.all-in-one-text em{color:var(--gold);font-style:normal;font-weight:500}
/* Service section前に余白追加。他セクションと幅を揃える */
#service{padding-top:200px}
.case-grid{display:grid;grid-template-columns:repeat(2,1fr);border:1px solid var(--gold-soft)}
.case{position:relative;padding:80px 60px;overflow:hidden;transition:background-color .6s}
.case:not(:last-child){border-right:1px solid var(--gold-soft)}
.case:hover{background:rgba(194,160,109,0.05)}
.case .case-no{font-family:var(--serif-en);font-style:italic;font-size:80px;color:var(--gold);font-weight:300;line-height:1;margin-bottom:30px;transition:transform .6s cubic-bezier(.7,0,.3,1)}
.case:hover .case-no{transform:translateX(20px) rotate(-3deg)}
.case h3{font-family:var(--serif-jp);font-size:26px;line-height:1.6;font-weight:500;letter-spacing:0.04em;margin-bottom:24px}
.case p{font-family:var(--serif-jp);font-size:15px;line-height:2.1;color:rgba(245,241,232,0.75);margin-bottom:36px;letter-spacing:0.04em}
.case .stamp{position:absolute;top:30px;right:30px;font-family:var(--display);font-size:10px;letter-spacing:0.4em;color:var(--gold);border:1px solid var(--gold);padding:6px 12px;border-radius:30px;opacity:0.7}
/* プラン一覧（ライト／ベーシック／スタンダード／プレミアム） */
.plan-list{border-top:1px solid var(--gold-soft);margin:28px 0 16px}
.plan-row{
  padding:18px 0;border-bottom:1px solid rgba(194,160,109,0.18);
  transition:background .4s,padding-left .4s;
}
.plan-row:hover{background:rgba(194,160,109,0.05);padding-left:8px}
.plan-head{display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap}
.plan-name{
  font-family:'Noto Sans JP',var(--sans-jp),sans-serif;
  font-size:14px;font-weight:500;color:var(--paper);letter-spacing:0.16em;
}
.plan-price{
  font-family:'Noto Sans JP',var(--sans-jp),sans-serif;
  font-weight:400;font-style:normal;font-size:27px;color:var(--gold);
  line-height:1;letter-spacing:0.01em;white-space:nowrap;
  font-variant-numeric:tabular-nums;font-feature-settings:'tnum' 1;
}
.plan-price small{font-size:0.6em;margin-left:3px;font-weight:300;letter-spacing:0}
.plan-spec{
  font-family:'Noto Sans JP',var(--sans-jp),sans-serif;
  font-size:11.5px;color:rgba(245,241,232,0.55);
  margin-top:7px;letter-spacing:0.03em;font-weight:300;
}
.price-note{
  font-family:'Noto Sans JP',var(--sans-jp),sans-serif;
  font-size:11.5px;line-height:1.9;
  color:rgba(245,241,232,0.5);margin:0;letter-spacing:0.03em;font-weight:300;
}
.price-foot{
  max-width:1280px;margin:20px auto 0;
  font-family:'Noto Sans JP',var(--sans-jp),sans-serif;
  font-size:11.5px;font-weight:300;line-height:1.9;
  color:rgba(245,241,232,0.5);letter-spacing:0.04em;text-align:right;
}
.case .cta{display:inline-flex;align-items:center;gap:14px;font-family:var(--display);letter-spacing:0.3em;font-size:13px;color:var(--gold);border-bottom:1px solid var(--gold);padding-bottom:6px;transition:gap .4s, letter-spacing .4s}
.case .cta:hover{gap:24px;letter-spacing:0.4em}
.case .cta::after{content:'→';font-family:var(--sans-jp);font-size:14px}

/* YOUTUBE */
.youtube-strip{padding:120px 48px;background:var(--ink);border-top:1px solid var(--gold-soft)}
.yt-card{
  display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;
  max-width:1300px;margin:0 auto;padding:60px;
  background:linear-gradient(135deg,#1a0f0a 0%,#2b1818 50%,#1a0f0a 100%);
  border:1px solid rgba(255,0,0,0.18);
  position:relative;overflow:hidden;
  transition:transform .6s cubic-bezier(.7,0,.3,1), box-shadow .6s;
}
.yt-card::before{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,0,0,0.15) 0%,transparent 70%);pointer-events:none}
.yt-card:hover{transform:translateY(-6px);box-shadow:0 30px 80px rgba(255,0,0,0.2)}
.yt-left{position:relative;z-index:2}
.yt-label{display:flex;align-items:center;gap:12px;margin-bottom:30px;font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--paper)}
.yt-title{font-family:var(--serif-en);font-weight:300;font-size:clamp(48px,6vw,80px);line-height:1;letter-spacing:-0.02em;color:var(--paper);margin-bottom:24px}
.yt-title em{font-style:italic;color:#FF4444;font-weight:300}
.yt-desc{font-family:var(--serif-jp);font-size:15px;line-height:2;color:rgba(245,241,232,0.8);margin-bottom:36px;font-weight:300;letter-spacing:0.04em}
.yt-cta{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.yt-btn{display:inline-flex;align-items:center;padding:18px 32px;background:#FF0000;color:#fff;font-family:var(--display);font-size:13px;letter-spacing:0.4em;border-radius:50px;transition:transform .4s, background-color .4s}
.yt-card:hover .yt-btn{background:#fff;color:#FF0000;transform:scale(1.04)}
.yt-handle{font-family:var(--display);font-size:11px;color:var(--gold);letter-spacing:0.3em}
.yt-right{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;position:relative;z-index:2}
.yt-thumb{aspect-ratio:16/9;border-radius:6px;position:relative;overflow:hidden;background-size:cover;background-position:center}
.yt-thumb::after{content:'▶';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;border-radius:50%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;padding-left:3px;opacity:0;transition:opacity .4s}
.yt-card:hover .yt-thumb::after{opacity:1}
/* YouTubeチャンネル紹介の4窓＝優先順1〜4の作品サムネイル */
.yt-thumb-1{background-image:url("https://img.youtube.com/vi/FbfWuQoAqoY/maxresdefault.jpg")}
.yt-thumb-2{background-image:url("https://img.youtube.com/vi/zwogoIGO5Vc/maxresdefault.jpg")}
.yt-thumb-3{background-image:url("https://img.youtube.com/vi/LWeY9iSR6qU/maxresdefault.jpg")}
.yt-thumb-4{background-image:url("https://img.youtube.com/vi/p87q4C8VGEs/maxresdefault.jpg")}
.yt-thumb{background-color:#0A0907}

/* PORTFOLIO */
.portfolio{padding:80px 48px 140px;background:var(--ink)}
.portfolio-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:40px;margin-bottom:80px}
.portfolio-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:24px}
.work{
  position:relative;overflow:hidden;background:#0A0907;display:block;
  text-decoration:none;color:inherit;
  border:1px solid rgba(194,160,109,0.18);
  transition:transform .8s cubic-bezier(.5,0,.1,1),box-shadow .8s;
}
/* ポスター＝A判比率／動画サムネ＝16:9。画像を切らずに全面表示する */
.work--poster{aspect-ratio:1/1.414}
.work--video{aspect-ratio:16/9}
.work.span-2{grid-column:span 2}
.work.span-3{grid-column:span 3}
.work.span-4{grid-column:span 4}
.work:hover{transform:translateY(-8px);box-shadow:0 30px 70px rgba(0,0,0,0.55)}
.work .work-cover{
  position:absolute;inset:0;z-index:1;
  font-size:0;color:transparent;
  background-size:contain;background-repeat:no-repeat;background-position:center;
  background-color:#0A0907;
  filter:contrast(1.02) brightness(0.9);
  transition:filter 1s;
}
.work:hover .work-cover{filter:contrast(1.06) brightness(1.04)}
.work .work-info{position:absolute;left:24px;right:24px;bottom:22px;z-index:3;transform:translateY(20px);opacity:0;transition:transform .6s, opacity .6s}
.work:hover .work-info{transform:translateY(0);opacity:1}
.work .work-cat{font-family:var(--display);font-size:10px;letter-spacing:0.4em;color:var(--gold);margin-bottom:6px}
.work .work-title{font-family:var(--serif-jp);font-size:18px;color:var(--paper);font-weight:500;line-height:1.4;text-shadow:0 2px 12px rgba(0,0,0,0.8)}
.work .work-year{font-family:var(--display);font-size:10px;letter-spacing:0.3em;color:var(--gold);margin-top:6px;opacity:0.75}
.work::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(10,9,7,0.9) 100%);z-index:2;opacity:0;transition:opacity .6s;pointer-events:none}
.work:hover::after{opacity:1}
/* 各作品カードのカバー画像 */
/* 作品01 - A Man, A Hobby, A Whole Life（ポスター） */
.yt-cover-01{background-image:url("https://static.wixstatic.com/media/0a9631_b9c3392712844544910439be2961308a~mv2.png")}
/* 作品02 - 澄江の空 Smie's Sky（ポスター） */
.yt-cover-02{background-image:url("https://static.wixstatic.com/media/0a9631_1711ee5112424b3cab270a64ea363703~mv2.jpg")}
/* 作品03 - lAKV68K_rvk */
.yt-cover-03{background-image:url("https://img.youtube.com/vi/lAKV68K_rvk/maxresdefault.jpg")}
/* 作品04 - p87q4C8VGEs */
.yt-cover-04{background-image:url("https://img.youtube.com/vi/p87q4C8VGEs/maxresdefault.jpg")}
/* 作品05 - XEN8DWARd9Y */
.yt-cover-05{background-image:url("https://img.youtube.com/vi/XEN8DWARd9Y/maxresdefault.jpg")}
/* 作品06 - 増えちゃった zwogoIGO5Vc */
.yt-cover-06{background-image:url("https://img.youtube.com/vi/zwogoIGO5Vc/maxresdefault.jpg")}
/* 作品07 - 居酒屋・もがみ LWeY9iSR6qU */
.yt-cover-07{background-image:url("https://img.youtube.com/vi/LWeY9iSR6qU/maxresdefault.jpg")}

/* YouTubeリンク表示バッジ（編集箇所を明示） */
.work-yt-badge{
  position:absolute;top:14px;right:14px;z-index:3;
  display:inline-flex;align-items:center;gap:6px;
  padding:6px 10px;border-radius:30px;
  background:rgba(255,0,0,0.85);color:#fff;
  font-family:var(--display);font-size:9px;letter-spacing:0.2em;
  font-weight:700;
  box-shadow:0 4px 14px rgba(255,0,0,0.4);
}
.work-yt-badge svg{width:14px;height:10px;display:block}
.work .work-info .work-yt-url{
  display:block;font-family:var(--display);font-size:9px;letter-spacing:0.15em;
  color:rgba(255,255,255,0.6);margin-top:8px;word-break:break-all;
  border-top:1px dashed rgba(255,255,255,0.2);padding-top:6px;
}
.portfolio-cta{display:flex;justify-content:center;margin-top:80px}
.portfolio-cta a{display:inline-flex;align-items:center;gap:14px;padding:24px 40px;border:1px solid var(--gold);font-family:var(--display);font-size:13px;letter-spacing:0.4em;color:var(--paper);transition:background-color .4s, color .4s, gap .4s}
.portfolio-cta a:hover{background:var(--gold);color:var(--ink);gap:24px}

/* PROFILE */
.profile{padding:140px 48px;background:var(--paper);color:var(--ink);position:relative;overflow:hidden}
.profile-grid{display:grid;grid-template-columns:5fr 7fr;gap:80px;align-items:start;max-width:1300px;margin:0 auto}
.profile-portrait{position:relative;aspect-ratio:3/4;overflow:hidden;background:#1a1410}
.profile-portrait img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(0.95);transition:transform 1.4s cubic-bezier(.5,0,.1,1), filter .8s}
.profile-portrait:hover img{transform:scale(1.04);filter:contrast(1.1) saturate(1)}
.profile-portrait .portrait-overlay{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,transparent 50%,rgba(10,9,7,0.55) 100%)}
.profile-portrait::after{content:'SHUMPEI SASAKI · DIRECTOR';position:absolute;left:24px;bottom:24px;z-index:2;font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--paper);border:1px solid var(--paper);padding:8px 14px;background:rgba(10,9,7,0.4);backdrop-filter:blur(4px)}
.profile-content .section-num{color:var(--gold)}
.profile-content .section-num::before{background:var(--gold)}
.profile-content h2{font-family:var(--serif-jp);font-size:clamp(32px,4vw,52px);line-height:1.3;font-weight:500;color:var(--ink);margin-bottom:20px;letter-spacing:0.04em}
.profile-content h2 em{font-family:var(--serif-en);font-style:italic;color:var(--gold);font-weight:400}
.profile-name{font-family:var(--serif-en);font-style:italic;font-size:46px;font-weight:400;color:var(--gold);margin-bottom:8px}
.profile-role{font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--ink);margin-bottom:32px;opacity:0.6}
.profile-meta{display:grid;grid-template-columns:auto 1fr;gap:12px 24px;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink);padding:24px 0;margin-bottom:36px}
.profile-meta dt{font-family:var(--display);font-size:10px;letter-spacing:0.3em;color:var(--gold);align-self:center}
.profile-meta dd{font-family:var(--serif-jp);font-size:14px;color:var(--ink);font-weight:400}
.profile-meta dd a{color:var(--ink);border-bottom:1px solid rgba(10,9,7,0.3)}
.profile-bio{font-family:var(--serif-jp);font-size:15px;line-height:2.05;color:var(--ink);font-weight:300;letter-spacing:0.04em;margin-bottom:36px}
.profile-bio p{margin-bottom:14px;text-indent:1em}
/* 数字実績ブロック */
.profile-stats{
  display:grid;grid-template-columns:repeat(4,1fr);gap:14px;
  margin:8px 0 36px;padding:24px 0;
  border-top:1px solid var(--ink);border-bottom:1px solid var(--ink);
}
.profile-stats .stat{display:flex;flex-direction:column;gap:6px}
.profile-stats .stat-num{
  font-family:var(--serif-en);font-style:italic;font-weight:400;
  font-size:42px;line-height:1;color:var(--gold);letter-spacing:-0.02em;
}
.profile-stats .stat-num small{font-size:18px;font-style:italic;font-weight:400;margin-left:2px}
.profile-stats .stat-label{
  font-family:var(--display);font-size:9px;letter-spacing:0.25em;color:var(--ink);opacity:0.65;
}
.profile-stats .stat-sub{
  font-family:var(--serif-jp);font-size:11px;color:var(--ink);opacity:0.7;font-weight:400;line-height:1.4;
}

.profile-extra{display:flex;flex-direction:column;gap:14px;margin-bottom:36px;padding:24px;background:rgba(194,160,109,0.1);border-left:3px solid var(--gold)}
.profile-extra-h{font-family:var(--display);font-size:11px;letter-spacing:0.3em;color:var(--gold)}
.profile-extra p{font-family:var(--serif-jp);font-size:14px;line-height:1.95;color:var(--ink);font-weight:300}
.profile-awards-h{font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--gold);margin-bottom:16px}
.profile-awards ul{list-style:none}
.profile-awards li{font-family:var(--serif-jp);font-size:13px;line-height:1.5;color:var(--ink);padding:14px 0;border-bottom:1px solid rgba(10,9,7,0.15);font-weight:400;display:grid;grid-template-columns:24px 1fr auto;gap:12px;align-items:center}
.profile-awards li::before{content:'🏆';color:var(--gold);font-size:14px}
.profile-awards li span{font-family:var(--display);font-size:10px;letter-spacing:0.3em;color:var(--gold);white-space:nowrap}
.awards-foot{font-family:var(--sans-jp);font-size:11px;color:var(--ink);opacity:0.6;margin-top:14px;line-height:1.7;font-weight:400}
.profile-onair{margin-top:40px;padding:24px;background:#0A0907;color:var(--paper);display:flex;flex-direction:column;gap:10px}
.profile-onair-h{font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--gold)}
.profile-onair-program{font-family:var(--serif-jp);font-size:15px;color:var(--paper);font-weight:500;line-height:1.6}
.profile-onair-credit{font-family:var(--sans-jp);font-size:11px;color:rgba(245,241,232,0.7)}

/* ADVISOR */
.advisor{margin-top:100px;padding:60px;background:#0A0907;color:var(--paper);display:grid;grid-template-columns:280px 1fr;gap:60px;align-items:start;max-width:1300px;margin-left:auto;margin-right:auto;position:relative;overflow:hidden}
.advisor::before{content:'';position:absolute;top:-80px;right:-80px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(194,160,109,0.15) 0%,transparent 70%);pointer-events:none}
.advisor-portrait{width:280px;height:340px;position:relative;overflow:hidden;display:flex;align-items:flex-end;justify-content:flex-start;padding:24px;background:linear-gradient(180deg,#3a2f1e 0%,#0A0907 100%)}
.advisor-portrait img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(0.85);z-index:0;transition:transform 1.2s cubic-bezier(.5,0,.1,1), filter .8s}
.advisor:hover .advisor-portrait img{transform:scale(1.05);filter:contrast(1.1) saturate(1)}
.advisor-portrait::after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(circle at 50% 30%,transparent 0%,rgba(10,9,7,0.4) 100%),linear-gradient(180deg,transparent 50%,rgba(10,9,7,0.85) 100%)}
.advisor-portrait .portrait-frame-meta{position:absolute;left:24px;bottom:24px;z-index:2;font-family:var(--display);font-size:10px;letter-spacing:0.4em;color:var(--paper);border:1px solid rgba(245,241,232,0.4);padding:6px 10px;background:rgba(10,9,7,0.5);backdrop-filter:blur(4px)}
.advisor-content{padding-top:8px;position:relative;z-index:1}
.advisor-label{font-family:var(--display);font-size:11px;letter-spacing:0.4em;color:var(--gold);margin-bottom:18px;display:flex;align-items:center;gap:14px}
.advisor-label::before{content:'';width:40px;height:1px;background:var(--gold)}
.advisor-name{font-family:var(--serif-en);font-style:italic;font-size:42px;font-weight:400;color:var(--gold);margin-bottom:4px;letter-spacing:-0.01em}
.advisor-name-jp{font-family:var(--serif-jp);font-size:24px;color:var(--paper);font-weight:500;margin-bottom:8px;letter-spacing:0.06em}
.advisor-title{font-family:var(--serif-jp);font-size:13px;color:var(--gold);font-weight:400;margin-bottom:24px;line-height:1.7}
.advisor-bio{font-family:var(--serif-jp);font-size:13px;line-height:2;color:rgba(245,241,232,0.85);font-weight:300;letter-spacing:0.04em}
.advisor-bio p{margin-bottom:12px}
.advisor-bio p.lead{font-size:15px;color:var(--paper);font-weight:400}
.advisor-tags{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0}
.advisor-tag{font-family:var(--display);font-size:9px;letter-spacing:0.3em;color:var(--gold);border:1px solid var(--gold-soft);padding:6px 12px;border-radius:30px}

/* MESSAGE */
.message{background:var(--paper);color:var(--ink);padding:100px 48px 140px;position:relative}
.message::before{content:'"';position:absolute;top:30px;left:48px;font-family:var(--serif-en);font-size:240px;color:var(--gold);line-height:0.6;font-style:italic;font-weight:300;opacity:0.4}
.message .content{max-width:880px;margin:0 auto;position:relative;z-index:1}
.message .label{font-family:var(--display);font-size:12px;letter-spacing:0.4em;color:var(--gold);margin-bottom:30px;display:flex;align-items:center;gap:14px}
.message .label::before{content:'';width:40px;height:1px;background:var(--gold)}
.message h2{font-family:var(--serif-jp);font-size:clamp(28px,4vw,46px);line-height:1.7;font-weight:500;letter-spacing:0.04em;margin-bottom:50px;color:var(--ink)}
.message h2 em{font-style:normal;color:var(--gold)}
.message p{font-family:var(--serif-jp);font-size:17px;line-height:2.4;color:var(--ink);margin-bottom:24px;letter-spacing:0.04em;font-weight:300}
.message .sig{margin-top:80px;display:flex;align-items:center;gap:30px;border-top:1px solid var(--ink);padding-top:30px;font-family:var(--serif-jp);font-size:14px}
.message .sig-name{font-family:var(--serif-en);font-size:32px;font-style:italic;color:var(--gold);font-weight:400}

/* TAGLINE */
.tagline{padding:120px 48px 50px;text-align:center;background:var(--ink);position:relative;overflow:hidden}
.tagline h2{font-family:var(--serif-en);font-style:italic;font-weight:300;font-size:clamp(26px,4.2vw,58px);line-height:1.4;letter-spacing:-0.01em;color:var(--paper);max-width:1100px;margin:0 auto}
.tagline h2 .accent{color:var(--gold)}
.tagline .jp{font-family:var(--serif-jp);font-size:14px;color:var(--gold);letter-spacing:0.5em;margin-top:18px;font-weight:300}

/* CONTACT */
.contact{padding:140px 48px;background:#06050B;border-top:1px solid var(--gold-soft)}
.contact-head{max-width:880px;margin:0 auto 70px;text-align:center}
.contact-head .section-num{justify-content:center}
.contact-head .section-num::before{background:var(--gold)}
.contact-head .section-h{margin-bottom:24px}
.contact-lead{font-family:var(--serif-jp);font-size:16px;line-height:2.1;color:rgba(245,241,232,0.8);font-weight:300;letter-spacing:0.04em}
.contact-lead em{color:var(--gold);font-style:normal;font-weight:500}
.form-placeholder{
  max-width:780px;margin:0 auto;
  border:1px dashed var(--gold-soft);
  background:rgba(194,160,109,0.04);
  min-height:680px;
  display:flex;align-items:center;justify-content:center;
  position:relative;
}
.form-placeholder-inner{text-align:center;color:rgba(245,241,232,0.4);display:flex;flex-direction:column;align-items:center;gap:18px}
.form-placeholder-icon{font-size:46px;color:var(--gold-soft)}
.form-placeholder-text strong{font-family:var(--display);font-size:14px;letter-spacing:0.4em;color:var(--gold);display:block;margin-bottom:10px}
.form-placeholder-text span{font-family:var(--serif-jp);font-size:13px;line-height:1.9;color:rgba(245,241,232,0.5);font-weight:300}

/* FOOTER */
footer{padding:100px 48px 60px;background:#06050B;border-top:1px solid var(--gold-soft)}
footer .row{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:48px;margin-bottom:80px}
footer h4{font-family:var(--display);font-size:12px;letter-spacing:0.3em;color:var(--gold);margin-bottom:24px}
footer .brand{display:flex;align-items:center;gap:12px;margin-bottom:20px}
footer .brand svg{width:40px;height:40px;display:block}
footer .brand .brand-text{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:0.18em;color:var(--paper);font-weight:700}
footer p,footer li{font-family:var(--sans-jp);font-size:13px;line-height:2;color:rgba(245,241,232,0.7);font-weight:300}
footer ul{list-style:none}
footer ul a:hover{color:var(--gold)}
footer .copy{border-top:1px solid var(--gold-soft);padding-top:30px;font-family:var(--display);font-size:11px;letter-spacing:0.3em;color:var(--gold);display:flex;justify-content:space-between}

/* FLOAT CTA  ※ JSで document.body 直下に逃がして viewport 追従させる */
.float-cta,
body > .float-cta-detached{
  position:fixed !important;bottom:30px;right:30px;z-index:99999;
  background:#C2A06D;color:#0A0907;
  padding:20px 32px;border-radius:50px;
  font-family:'Shippori Mincho B1','Noto Serif JP',serif;font-weight:500;font-size:14px;letter-spacing:0.1em;
  display:flex;align-items:center;gap:14px;text-decoration:none;
  box-shadow:0 12px 40px rgba(194,160,109,0.4);
  transition:transform .4s cubic-bezier(.7,0,.3,1), box-shadow .4s;
  pointer-events:auto;
}
.float-cta:hover,
body > .float-cta-detached:hover{transform:translateY(-4px) scale(1.04);box-shadow:0 20px 50px rgba(194,160,109,0.55)}
.float-cta::after,
body > .float-cta-detached::after{content:'→';font-size:18px;display:inline-block}
@media (max-width:768px){
  body > .float-cta-detached{bottom:18px;right:18px;left:auto;padding:10px 18px;font-size:13px;border-radius:40px}
  body > .float-cta-detached::after{font-size:16px}
}

/* REVEAL */
.reveal{opacity:0;transform:translateY(40px);transition:opacity 1s cubic-bezier(.5,0,.1,1), transform 1s cubic-bezier(.5,0,.1,1)}
.reveal.in{opacity:1;transform:translateY(0)}

/* TABLET */
@media (max-width: 1024px){
  nav.top{padding:20px 32px}
  nav.top ul{gap:24px;font-size:12px}
  .hero{padding:110px 32px 80px}
  .hero-grid{gap:40px}
  section, .reel, .youtube-strip, .portfolio, .profile, .contact{padding:120px 32px}
  .case{padding:60px 40px}
  .case .case-no{font-size:64px}
  .case h3{font-size:22px}
  .message{padding:120px 32px}
  .message::before{font-size:200px;top:50px;left:32px}
  .portfolio-grid{grid-template-columns:repeat(4,1fr);gap:18px}
  .work.span-3, .work.span-4, .work.span-2{grid-column:span 2}
  .profile-grid{grid-template-columns:1fr 1.5fr;gap:50px}
  .yt-card{grid-template-columns:1fr 1fr;gap:40px;padding:50px}
  .yt-title{font-size:54px}
  .advisor{grid-template-columns:240px 1fr;gap:40px;padding:50px}
  .advisor-portrait{width:240px;height:300px}
  footer{padding:90px 32px 50px}
  footer .row{grid-template-columns:1fr 1fr;gap:40px}
}

/* MOBILE */
@media (max-width: 768px){
  .fc-app{font-size:14px}
  nav.top{padding:16px 20px;background:rgba(10,9,7,0.85);backdrop-filter:blur(8px);mix-blend-mode:normal}
  nav.top .logo svg{width:28px;height:28px}
  nav.top .logo .logo-text{font-size:14px;letter-spacing:0.14em}
  nav.top ul{display:flex;flex-direction:column;gap:0;position:fixed;top:60px;left:0;right:0;background:#0A0907;padding:24px 24px 36px;border-top:1px solid var(--gold-soft);transform:translateY(-120%);transition:transform .4s cubic-bezier(.7,0,.3,1);pointer-events:none}
  nav.top ul.is-open{transform:translateY(0);pointer-events:auto}
  nav.top ul li{border-bottom:1px solid rgba(245,241,232,0.1);padding:14px 0}
  nav.top ul li:last-child{border-bottom:none}
  nav.top ul a{display:block;font-size:14px}
  .nav-toggle{display:flex;flex-direction:column;justify-content:center;align-items:center;width:36px;height:36px;border:none;background:transparent;gap:5px;padding:0}
  .nav-toggle span{width:22px;height:1px;background:var(--paper);transition:transform .4s, opacity .3s}
  .nav-toggle.is-open span:nth-child(1){transform:translateY(6px) rotate(45deg)}
  .nav-toggle.is-open span:nth-child(2){opacity:0}
  .nav-toggle.is-open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}

  /* スマホ：ヒーローを中央寄せ＋動画をフチ無しで大きく */
  .hero{padding:84px 0 60px;min-height:auto}
  .hero-grid{grid-template-columns:1fr;gap:36px;text-align:center}
  .hero-text{padding:0 20px}
  .hero h1{font-size:clamp(24px,7.2vw,32px);line-height:1.5;margin-bottom:24px;text-align:center;letter-spacing:0.02em}
  .hero h1 em{font-size:11px;letter-spacing:0.04em;line-height:1.6;margin-top:14px;white-space:normal;text-align:center}
  .hero .lead{font-size:14px;line-height:2;margin-left:auto;margin-right:auto;text-align:center}
  .hero-video{
    margin:0;width:100%;
    border-left:none;border-right:none;border-radius:0;
    box-shadow:0 20px 60px rgba(194,160,109,0.18);
  }
  .hero-video-meta{display:none}
  .scroll-hint{display:none}

  .awards{padding:30px 0}
  .awards-label{font-size:9px;letter-spacing:0.4em;margin-bottom:20px;padding:0 20px;line-height:1.5}
  .awards-track{gap:36px;animation-duration:30s}
  .award-item{gap:14px;padding:0 16px}
  .award-item img.laurel-img{height:80px}
  .award-item .award-name{font-size:13px}
  .award-item .award-meta{font-size:9px;letter-spacing:0.25em}
  .award-item .award-sub{font-size:9px}
  .awards::before,.awards::after{width:36px}

  section, .reel, .youtube-strip, .portfolio, .profile, .contact{padding:80px 20px}
  .section-num{font-size:10px;letter-spacing:0.3em}
  .section-num::before{width:28px}
  .section-h{font-size:30px;line-height:1.3;margin-bottom:32px}
  .services-intro{font-size:14px;line-height:2;margin-bottom:50px}
  .reel-meta{flex-direction:column;align-items:flex-start;gap:18px;margin-bottom:30px}
  .reel-caption{font-size:13px;max-width:none}
  .reel-frame-meta{font-size:9px;letter-spacing:0.3em;flex-wrap:wrap;gap:8px}

  .yt-card{grid-template-columns:1fr;padding:28px 18px;gap:24px;overflow:hidden}
  .yt-label{font-size:9px;letter-spacing:0.3em;margin-bottom:18px;flex-wrap:wrap}
  .yt-title{font-size:clamp(22px,7vw,30px);line-height:1.15;margin-bottom:18px;word-break:break-word;overflow-wrap:anywhere}
  .yt-desc{font-size:13px;margin-bottom:24px;line-height:1.9}
  .yt-cta{gap:14px}
  .yt-btn{padding:14px 22px;font-size:11px;letter-spacing:0.3em}
  .yt-handle{font-size:9px;letter-spacing:0.2em}

  .case-grid{grid-template-columns:1fr;border:1px solid var(--gold-soft)}
  .case{padding:48px 24px}
  .case:not(:last-child){border-right:none;border-bottom:1px solid var(--gold-soft)}
  .case .case-no{font-size:54px;margin-bottom:20px}
  .case h3{font-size:19px;line-height:1.65}
  .case p{font-size:13px;line-height:1.95;margin-bottom:24px}
  .case .stamp{top:20px;right:20px;font-size:9px;padding:5px 10px}
  .plan-list{margin:22px 0 14px}
  .plan-row{padding:15px 0}
  .plan-price{font-size:24px}
  .plan-name{font-size:13.5px}
  .plan-spec{font-size:11px;margin-top:6px}
  .price-note{font-size:11px;line-height:1.85}
  .price-foot{font-size:11px;text-align:left;margin-top:16px}
  .client-works{padding:56px 24px 64px}
  .client-grid{grid-template-columns:1fr;gap:16px}
  .client-card{padding:28px 22px}
  .client-no{font-size:28px;margin-bottom:14px}
  .client-client{font-size:14px}
  .client-card p{font-size:12.5px;line-height:1.95}
  .client-lead{font-size:13px;line-height:2}
  .news{padding:40px 24px}
  .news-list a{grid-template-columns:1fr auto;gap:8px 14px;padding:16px 4px}
  .news-date{grid-column:1/-1;font-size:10px}
  .news-title{font-size:13.5px}
  .news-tag{font-size:8px;padding:2px 7px;margin-right:8px}
  /* all-in-one mobile */
  .all-in-one{padding:24px 22px;gap:14px;margin-bottom:50px}
  .all-in-one-flow{font-size:15px;gap:10px;letter-spacing:0.12em}
  .all-in-one-flow .dot{font-size:13px}
  .all-in-one-text{font-size:12.5px;line-height:1.95}

  .message{padding:80px 20px}
  .message::before{font-size:120px;top:24px;left:20px}
  .message h2{font-size:24px;line-height:1.6;margin-bottom:32px}
  .message p{font-size:14px;line-height:2.1;margin-bottom:18px}
  .message .sig{flex-direction:column;align-items:flex-start;gap:14px;margin-top:50px}
  .message .sig-name{font-size:26px}

  .portfolio-head{flex-direction:column;align-items:flex-start;gap:20px;margin-bottom:50px}
  .portfolio-grid{grid-template-columns:1fr;gap:14px}
  .work, .work.span-3, .work.span-4, .work.span-2{grid-column:auto}
  .work--poster{aspect-ratio:1/1.414}
  .work--video{aspect-ratio:16/9}
  .work .work-info{left:18px;right:18px;bottom:18px}
  .work .work-info{transform:translateY(0);opacity:1;background:linear-gradient(180deg,transparent,rgba(10,9,7,0.85) 60%);left:0;right:0;bottom:0;padding:20px}
  .work::after{opacity:0.7}
  .work .work-cat{font-size:9px;letter-spacing:0.3em}
  .work .work-title{font-size:16px;line-height:1.4}
  .work .work-year{font-size:9px}
  .portfolio-cta{margin-top:50px}
  .portfolio-cta a{padding:18px 28px;font-size:11px;letter-spacing:0.3em}

  .profile-grid{grid-template-columns:1fr;gap:40px}
  .profile-portrait{aspect-ratio:4/5;max-height:520px}
  .profile-portrait::after{font-size:9px;letter-spacing:0.3em;padding:6px 10px;left:16px;bottom:16px}
  .profile-content h2{font-size:26px;line-height:1.4;margin-bottom:16px}
  .profile-name{font-size:34px}
  .profile-role{font-size:10px;letter-spacing:0.3em;margin-bottom:24px}
  .profile-meta{grid-template-columns:1fr;gap:4px;padding:18px 0;margin-bottom:24px}
  .profile-meta dt{margin-top:8px;font-size:9px;letter-spacing:0.25em}
  .profile-meta dd{font-size:13px}
  .profile-stats{grid-template-columns:repeat(2,1fr);gap:18px;padding:20px 0}
  .profile-stats .stat-num{font-size:34px}
  .profile-stats .stat-label{font-size:8.5px;letter-spacing:0.2em}
  .profile-stats .stat-sub{font-size:10px}
  .profile-bio{font-size:13px;line-height:2;margin-bottom:24px}
  .profile-bio p{text-indent:0.8em}
  .profile-extra{padding:18px;margin-bottom:24px}
  .profile-extra-h{font-size:9px;letter-spacing:0.25em}
  .profile-extra p{font-size:13px;line-height:1.95}
  .profile-awards-h{font-size:10px;letter-spacing:0.3em}
  .profile-awards li{grid-template-columns:18px 1fr;gap:8px;padding:12px 0;font-size:12px;line-height:1.5}
  .profile-awards li::before{font-size:13px}
  .profile-awards li span{grid-column:1/-1;font-size:9px;padding-left:26px;color:var(--gold);opacity:0.85}
  .awards-foot{font-size:10px;line-height:1.7}
  .profile-onair{padding:18px;margin-top:28px}
  .profile-onair-h{font-size:10px;letter-spacing:0.3em}
  .profile-onair-program{font-size:14px;line-height:1.55}
  .profile-onair-credit{font-size:10px}

  .advisor{grid-template-columns:1fr;gap:32px;padding:36px 24px;margin-top:60px}
  .advisor-portrait{width:100%;height:auto;aspect-ratio:4/5;max-height:420px}
  .advisor-name{font-size:30px}
  .advisor-name-jp{font-size:20px;margin-bottom:6px}
  .advisor-title{font-size:12px;line-height:1.7;margin-bottom:20px}
  .advisor-tags{gap:6px;margin:18px 0}
  .advisor-tag{font-size:8px;letter-spacing:0.2em;padding:5px 10px}
  .advisor-bio{font-size:12px;line-height:1.95}
  .advisor-bio p{margin-bottom:10px}
  .advisor-bio p.lead{font-size:13px}

  .tagline{padding:80px 20px}
  .tagline h2{font-size:34px;line-height:1.3}
  .tagline .jp{font-size:11px;letter-spacing:0.3em;margin-top:20px}

  .contact-head{margin-bottom:48px}
  .contact-lead{font-size:13px;line-height:1.95}
  .form-placeholder{min-height:560px}

  footer{padding:60px 20px 40px}
  footer .row{grid-template-columns:1fr;gap:36px;margin-bottom:50px}
  footer .brand svg{width:32px;height:32px}
  footer .brand .brand-text{font-size:18px;letter-spacing:0.14em}
  footer h4{font-size:10px;letter-spacing:0.25em;margin-bottom:14px}
  footer p,footer li{font-size:12px;line-height:1.9}
  footer .copy{flex-direction:column;gap:12px;text-align:center;font-size:9px;letter-spacing:0.25em;padding-top:24px}

  .float-cta{bottom:18px;right:18px;left:18px;justify-content:center;padding:16px 22px;font-size:13px;border-radius:40px}
  .float-cta::after{font-size:16px}

  .fc-app::before{opacity:0.05}
}

/* XS（小型スマホ ≤480px）*/
@media (max-width: 480px){
  .fc-app{font-size:13.5px}
  .hero{padding:80px 0 48px}
  .hero-text{padding:0 18px}
  .hero h1{font-size:clamp(22px,7vw,28px);line-height:1.5;letter-spacing:0.01em}
  .hero h1 em{font-size:10.5px;letter-spacing:0.02em;line-height:1.55}
  .hero .lead{font-size:13px;line-height:1.95}
  .section-h{font-size:24px;line-height:1.35;margin-bottom:28px}
  .services-intro{font-size:13px;margin-bottom:40px}
  .case{padding:40px 20px}
  .case .case-no{font-size:42px}
  .case h3{font-size:17px}
  .case p{font-size:12.5px}
  .plan-price{font-size:22px}
  .plan-name{font-size:13px}
  .yt-card{padding:24px 14px;gap:22px}
  .yt-title{font-size:clamp(20px,6.6vw,26px);line-height:1.15}
  .yt-desc{font-size:12.5px}
  .work .work-info{padding:14px}
  .work .work-cat{font-size:8px}
  .work .work-title{font-size:14px}
  .work .work-year{font-size:8px}
  .award-item img.laurel-img{height:64px}
  .award-item .award-name{font-size:12px}
  .profile{padding:60px 18px}
  .profile-name{font-size:26px}
  .profile-content h2{font-size:22px}
  .profile-bio{font-size:12.5px;line-height:1.95}
  .profile-extra p,.profile-extra-h{font-size:12px}
  .profile-awards li{font-size:11.5px}
  .advisor{padding:28px 18px;gap:24px}
  .advisor-name{font-size:24px}
  .advisor-name-jp{font-size:18px}
  .advisor-bio{font-size:11.5px}
  .advisor-bio p.lead{font-size:12.5px}
  .advisor-tag{font-size:8px;padding:4px 8px}
  .tagline{padding:60px 18px}
  .tagline h2{font-size:26px;line-height:1.35}
  .tagline .jp{font-size:10px;letter-spacing:0.2em}
  .message{padding:60px 18px}
  .message::before{font-size:96px;top:18px;left:18px}
  .message h2{font-size:20px;line-height:1.55;margin-bottom:24px}
  .message p{font-size:12.5px;line-height:2}
  .reel{padding:60px 18px}
  .youtube-strip{padding:60px 18px}
  .portfolio{padding:60px 18px}
  section{padding:60px 18px}
}

@media (min-width: 769px){.nav-toggle{display:none}}
@media (hover: none) and (pointer: coarse){
  .work .work-info{transform:translateY(0);opacity:1}
  .work::after{opacity:0.7}
  a, button, .submit-btn, .cta, .yt-btn, .float-cta, .nav-toggle{min-height:44px}
}
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:0.01ms !important;transition-duration:0.01ms !important}
  .fc-app::before{animation:none}
  .awards-track{animation:none;transform:none}
  .hero h1{opacity:1;transform:none;animation:none}
  .hero h1 em,.hero .lead,.scroll-hint,.hero-video-meta{opacity:1;animation:none}
  .hero-video{opacity:1;transform:none;filter:none;animation:none}
  .scroll-hint::after{animation:none}
}
@supports (padding: max(0px)){
  nav.top{padding-left:max(20px,env(safe-area-inset-left));padding-right:max(20px,env(safe-area-inset-right))}
  .float-cta{bottom:max(18px,env(safe-area-inset-bottom))}
}


/* ============== V4 STABLE：チラチラ解消／ホバー演出のみ ============== */

.fc-app{position:relative;overflow:hidden}

/* リビール演出（一度だけ・スクロール検知で発火） */
.fc-app .reveal{
  opacity:0;transform:translateY(50px);
  transition:opacity 1.2s cubic-bezier(.5,0,.1,1),transform 1.2s cubic-bezier(.5,0,.1,1);
}
.fc-app .reveal.in{opacity:1;transform:translateY(0)}

/* ヒーロー文字カスケード（一度だけ・ロード時） */
.fc-app .hero h1 .char{
  display:inline-block;
  opacity:0;transform:translateY(40px);
  animation:charRise 1.0s cubic-bezier(.5,0,.1,1) both;
}
@keyframes charRise{
  to{opacity:1;transform:translateY(0)}
}

/* ヒーロー動画ボックス：金色シャドウ（静止） */
.fc-app .hero-video{
  box-shadow:0 30px 80px rgba(194,160,109,0.20),0 0 0 1px rgba(194,160,109,0.08);
}

/* タグライン："creativity" 静的な金色グラデーション（揺れなし） */
.fc-app .tagline h2 .accent{
  background:linear-gradient(120deg,#9A7F4E 0%,#E5C896 50%,#9A7F4E 100%);
  -webkit-background-clip:text;background-clip:text;
  color:transparent;-webkit-text-fill-color:transparent;
}

/* プロフィール写真：ホバー時のみゆっくりズーム（継続なし） */
.fc-app .profile-portrait img{
  transition:transform 2s cubic-bezier(.5,0,.1,1),filter 1.5s;
  filter:contrast(1.05) saturate(0.95);
}
.fc-app .profile-portrait:hover img{
  transform:scale(1.06);
  filter:contrast(1.1) saturate(1.05);
}

/* アドバイザー写真：ホバー時のみ */
.fc-app .advisor-portrait img{
  transition:transform 2s cubic-bezier(.5,0,.1,1),filter 1.5s;
  filter:contrast(1.05) saturate(0.85);
}
.fc-app .advisor:hover .advisor-portrait img{
  transform:scale(1.05);
  filter:contrast(1.1) saturate(0.95);
}

/* 受賞ローレル：ホバー時のみ拡大 */
.fc-app .award-item{transition:transform .8s cubic-bezier(.5,0,.1,1),filter .8s}
.fc-app .award-item:hover{
  transform:scale(1.10);
  filter:brightness(1.2) drop-shadow(0 12px 24px rgba(194,160,109,0.4));
}

/* YouTubeカード：ホバー時のみ */
.fc-app .yt-card{transition:transform .8s cubic-bezier(.5,0,.1,1),box-shadow .8s,border-color .8s}
.fc-app .yt-card:hover{
  transform:translateY(-6px);
  border-color:rgba(255,0,0,0.45);
  box-shadow:0 40px 120px rgba(255,0,0,0.22);
}
/* YouTubeカードの内側グロウは静止 */
.fc-app .yt-card::before{
  background:radial-gradient(circle,rgba(255,0,0,0.18) 0%,transparent 70%);
}

/* 作品カード：時間差フェード（一度だけ）＋ホバーで浮き上がる */
.fc-app .portfolio-grid .work{transition:transform .8s cubic-bezier(.5,0,.1,1),box-shadow .8s,filter .8s}
.fc-app .portfolio-grid .work:hover{
  transform:translateY(-8px);
  box-shadow:0 30px 80px rgba(194,160,109,0.25);
  filter:brightness(1.06);
  z-index:2;
}
.fc-app .portfolio-grid .work.reveal{transition-delay:0s}
.fc-app .portfolio-grid .work.reveal:nth-child(2){transition-delay:.08s}
.fc-app .portfolio-grid .work.reveal:nth-child(3){transition-delay:.16s}
.fc-app .portfolio-grid .work.reveal:nth-child(4){transition-delay:.24s}
.fc-app .portfolio-grid .work.reveal:nth-child(5){transition-delay:.32s}
.fc-app .portfolio-grid .work.reveal:nth-child(6){transition-delay:.40s}
.fc-app .portfolio-grid .work.reveal:nth-child(7){transition-delay:.48s}

/* サービスカード：ホバーで内側グロウ */
.fc-app .case{transition:background-color .6s,box-shadow .6s}
.fc-app .case:hover{
  background:rgba(194,160,109,0.07);
  box-shadow:inset 0 0 80px rgba(194,160,109,0.10);
}

/* 価格：ホバー時のみシマー */
.fc-app .plan-price{transition:text-shadow .6s}
.fc-app .plan-row:hover .plan-price{text-shadow:0 0 40px rgba(194,160,109,0.4)}

/* 一貫担当：ホバーで金線が際立つ */
.fc-app .all-in-one{transition:border-color .6s,background .6s,box-shadow .6s}
.fc-app .all-in-one:hover{
  border-color:var(--gold);
  background:rgba(194,160,109,0.10);
  box-shadow:0 0 0 1px rgba(194,160,109,0.3);
}

/* セクション間の金線セパレータ（静止） */
.fc-app section + section::before,
.fc-app section + .youtube-strip::before,
.fc-app .youtube-strip + section::before,
.fc-app .awards + section::before{
  content:'';display:block;width:60px;height:1px;
  background:linear-gradient(90deg,transparent,var(--gold-soft) 50%,transparent);
  margin:0 auto -1px;position:relative;top:-1px;opacity:0.4;
}

/* セレクション色 */
.fc-app *::selection{background:var(--gold);color:var(--ink)}
.fc-app{
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  text-rendering:optimizeLegibility;
}

/* スクロールヒント非表示 */
.fc-app .scroll-hint{display:none}

/* スマホでのみ表示する改行 */
.fc-app .sp-only{display:none}
@media (max-width:768px){
  .fc-app .sp-only{display:inline}
}

/* ===========================================================
   セクション左端切れ対策：Wix側のCSS干渉を完全に上書きする
   全セクションの左右paddingを!importantで強制し、box-sizingを保証
   =========================================================== */
.fc-app section,
.fc-app .awards,
.fc-app .youtube-strip{
  padding-left:48px !important;
  padding-right:48px !important;
  margin-left:0 !important;
  margin-right:0 !important;
  max-width:100% !important;
  box-sizing:border-box !important;
}
.fc-app .hero{padding-left:48px !important;padding-right:48px !important;padding-top:96px !important;padding-bottom:96px !important}
.fc-app #service{padding-top:160px !important;padding-bottom:140px !important}
.fc-app .portfolio{padding-top:80px !important;padding-bottom:140px !important}
.fc-app .message{padding-top:100px !important;padding-bottom:140px !important}
.fc-app .tagline{padding-top:120px !important;padding-bottom:50px !important}

/* 上部余白＆右ずれ対策：custom element ホストとmainを完全リセット */
from-creativity-page-v4{display:block !important;margin:0 !important;padding:0 !important;width:100% !important;max-width:100% !important;box-sizing:border-box !important;position:relative !important;left:0 !important}
.fc-app{margin:0 !important;padding:0 !important;width:100% !important;max-width:100% !important;box-sizing:border-box !important;left:0 !important;right:auto !important}
/* nav が widget 端で見切れないよう、メニューの折り返しを許容 */
.fc-app nav.top{flex-wrap:wrap;gap:12px}
.fc-app #service .section-num,
.fc-app #service .section-h,
.fc-app #service .services-intro,
.fc-app section .section-num,
.fc-app section .section-h{
  margin-left:0 !important;
  padding-left:0 !important;
}
@media (max-width:768px){
  .fc-app section,
  .fc-app .awards,
  .fc-app .youtube-strip,
  .fc-app .hero,
  .fc-app .portfolio,
  .fc-app .tagline{
    padding-left:24px !important;
    padding-right:24px !important;
  }
  .fc-app #service{padding-top:120px !important;padding-bottom:80px !important}
  .fc-app .portfolio{padding-top:60px !important;padding-bottom:80px !important}
  .fc-app .tagline{padding-top:80px !important;padding-bottom:30px !important}
}
@media (max-width:480px){
  .fc-app section,
  .fc-app .awards,
  .fc-app .youtube-strip,
  .fc-app .hero,
  .fc-app .portfolio,
  .fc-app .tagline{
    padding-left:18px !important;
    padding-right:18px !important;
  }
}

@media (prefers-reduced-motion: reduce){
  .fc-app .hero h1 .char,
  .fc-app .hero-video,
  .fc-app .reveal{animation:none;transition:none;opacity:1;transform:none}
}

/* ===========================================================
   SPLIT-SCREEN CINEMATIC HERO 2026
   PC：左にコピー、右に動画。スマホ：コピーの下に動画。
   動画そのものはobject-fit:containで全画面を欠けずに表示する。
   =========================================================== */
.fc-app .hero.hero-cinematic{
  position:relative !important;
  isolation:isolate;
  display:block;
  width:100% !important;
  min-height:clamp(720px,96svh,940px);
  padding:0 !important;
  margin:0 !important;
  overflow:hidden;
  background:#080705;
}
.fc-app .hero-cinematic .hero-video-placeholder{
  position:absolute;
  inset:0;
  z-index:0;
  background:
    radial-gradient(circle at 78% 44%,rgba(194,160,109,.14),transparent 37%),
    radial-gradient(circle at 20% 42%,rgba(233,75,43,.055),transparent 31%),
    linear-gradient(115deg,#070604 0%,#0d0b08 49%,#070604 100%);
}
.fc-app .hero.hero-cinematic::after{
  content:'';
  position:absolute;
  inset:0;
  z-index:1;
  pointer-events:none;
  background:
    linear-gradient(180deg,rgba(5,5,4,.44),transparent 23%,transparent 76%,rgba(5,5,4,.64)),
    radial-gradient(ellipse at center,transparent 42%,rgba(5,5,4,.36) 100%);
}
.fc-app .hero-cinematic .hero-grid{
  position:relative !important;
  z-index:2 !important;
  display:grid;
  grid-template-columns:minmax(400px,.95fr) minmax(560px,1.4fr);
  align-items:center;
  gap:clamp(54px,5vw,78px);
  width:min(100%,1600px);
  min-height:clamp(720px,96svh,940px);
  margin:0 auto;
  padding:clamp(108px,12vh,142px) clamp(24px,3.2vw,52px) 68px;
}
.fc-app .hero-cinematic .hero-text{
  position:relative;
  z-index:2;
  width:100%;
  min-width:0;
  padding:0;
  text-align:left;
  text-shadow:0 3px 22px rgba(0,0,0,.68);
}
.fc-app .hero-cinematic .hero-text::before{display:none}
.fc-app .hero-cinematic h1{
  width:calc(100% + clamp(38px,4.5vw,70px));
  max-width:none;
  margin:0 0 30px;
  font-size:clamp(42px,4.15vw,64px);
  line-height:1.34;
  letter-spacing:.012em;
  text-wrap:initial;
}
.fc-app .hero-title-line{
  display:block;
  opacity:0;
  transform:translateY(22px);
  animation:heroLineIn 1s cubic-bezier(.5,0,.1,1) .12s forwards;
}
.fc-app .hero-title-line--long{
  margin-top:2px;
  font-size:.74em;
  white-space:nowrap;
  animation-delay:.24s;
}
@keyframes heroLineIn{to{opacity:1;transform:translateY(0)}}
.fc-app .hero-cinematic h1 em{
  display:block;
  margin-top:24px;
  overflow:visible;
  color:var(--gold);
  font-size:clamp(14px,1.25vw,19px);
  line-height:1.75;
  letter-spacing:.055em;
  white-space:normal;
  text-overflow:clip;
}
.fc-app .hero-cinematic .lead{
  max-width:540px;
  margin:0;
  padding-left:17px;
  border-left:1px solid rgba(194,160,109,.54);
  color:rgba(245,241,232,.86);
  font-size:clamp(15px,1.22vw,18px);
  line-height:2.05;
}

/* 右側の動画ユニット */
.fc-app .hero-visual{
  position:relative;
  z-index:2;
  --hero-video-bleed:clamp(58px,7vw,108px);
  width:calc(100% + var(--hero-video-bleed));
  margin-right:calc(var(--hero-video-bleed) * -1);
  min-width:0;
  align-self:center;
}
.fc-app .hero-visual::before{
  content:'';
  position:absolute;
  inset:-7% -7% 14%;
  z-index:0;
  background:url('https://static.wixstatic.com/media/0a9631_0d6027021819447aac13a2a1c5cd674d~mv2.jpg') center/cover no-repeat;
  filter:blur(46px) saturate(.82);
  transform:scale(1.04);
  opacity:.46;
  pointer-events:none;
}
.fc-app .hero-cinematic .hero-media{
  position:relative !important;
  inset:auto;
  z-index:1 !important;
  width:100%;
  aspect-ratio:16/9;
  overflow:hidden;
  border:0;
  border-radius:2px;
  background:#000;
  box-shadow:
    0 40px 118px rgba(0,0,0,.68),
    0 18px 104px rgba(194,160,109,.27),
    0 0 68px 18px rgba(8,7,5,.82);
}
.fc-app .hero-cinematic .hero-media::after{
  content:'';
  position:absolute;
  inset:-1px;
  z-index:2;
  pointer-events:none;
  border-radius:inherit;
  box-shadow:inset 0 0 clamp(42px,5vw,78px) clamp(8px,1.2vw,20px) rgba(5,5,4,.68);
  background:
    linear-gradient(90deg,rgba(8,7,5,.36),transparent 7%,transparent 93%,rgba(8,7,5,.36)),
    linear-gradient(180deg,rgba(8,7,5,.34),transparent 10%,transparent 90%,rgba(8,7,5,.40));
}
.fc-app .hero-cinematic .hero-video-player{
  position:absolute;
  inset:0;
  z-index:1;
  width:100%;
  height:100%;
  max-width:none;
  object-fit:contain;
  object-position:center;
  background:#000;
  border-radius:inherit;
  opacity:0;
  transform:none;
  filter:saturate(.9) contrast(1.04) brightness(.96);
  -webkit-mask-image:none;
  mask-image:none;
  transition:opacity 1.15s ease;
}
.fc-app .hero-cinematic .hero-video-player.is-ready{opacity:1}
.fc-app .hero-progress{
  position:absolute !important;
  right:0;
  bottom:0;
  left:0;
  z-index:4 !important;
  height:2px;
  background:rgba(245,241,232,.12);
  pointer-events:none;
}
.fc-app .hero-progress span{
  display:block;
  width:100%;
  height:100%;
  background:linear-gradient(90deg,var(--gold),#ead2aa);
  transform:scaleX(0);
  transform-origin:left center;
  will-change:transform;
}

/* 動画下の情報と操作ボタン */
.fc-app .hero-reel-ui{
  position:relative !important;
  inset:auto;
  z-index:2 !important;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:18px;
  width:100%;
  margin-top:16px;
  pointer-events:auto;
}
.fc-app .hero-reel-id{
  display:flex;
  flex:0 0 auto;
  flex-direction:column;
  gap:2px;
  color:rgba(245,241,232,.57);
  font-family:var(--display);
  font-size:8px;
  letter-spacing:.31em;
  line-height:1.5;
  text-shadow:none;
}
.fc-app .hero-reel-id strong{
  color:var(--gold);
  font-size:10px;
  font-weight:400;
  letter-spacing:.38em;
}
.fc-app .hero-controls{
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:7px;
  min-width:0;
}
.fc-app .hero-control{
  min-height:42px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  padding:0 13px;
  border:1px solid rgba(245,241,232,.24);
  border-radius:999px;
  background:rgba(8,8,7,.72);
  color:var(--paper);
  -webkit-backdrop-filter:blur(12px) saturate(120%);
  backdrop-filter:blur(12px) saturate(120%);
  box-shadow:0 9px 26px rgba(0,0,0,.24);
  font-family:var(--sans-jp);
  font-size:9.5px;
  font-weight:500;
  letter-spacing:.075em;
  line-height:1;
  white-space:nowrap;
  transition:background .3s,border-color .3s,color .3s,transform .3s;
}
.fc-app .hero-control:hover{
  transform:translateY(-2px);
  border-color:rgba(194,160,109,.84);
  background:rgba(194,160,109,.92);
  color:var(--ink);
}
.fc-app .hero-control:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.fc-app .hero-control-icon{
  min-width:14px;
  font-family:Arial,sans-serif;
  font-size:15px;
  line-height:1;
  text-align:center;
}
.fc-app .hero-sound-icon svg,.fc-app .hero-fullscreen-icon svg{display:block;width:16px;height:16px;overflow:visible}
.fc-app .hero-sound-icon .sound-wave,.fc-app .hero-sound-icon .sound-slash{transition:opacity .25s}
.fc-app .hero-sound[aria-pressed='false'] .sound-wave{opacity:0}
.fc-app .hero-sound[aria-pressed='true'] .sound-slash{opacity:0}
.fc-app .hero-sound[aria-pressed='true']{border-color:rgba(194,160,109,.62);color:#ead2aa}
.fc-app .hero-status{
  position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
  clip:rect(0,0,0,0);white-space:nowrap;border:0;
}

/* PCの全画面表示。映像と操作ボタンをまとめて表示する */
.fc-app .hero-visual:fullscreen,
.fc-app .hero-visual:-webkit-full-screen{
  --hero-video-bleed:0px;
  width:100vw;
  height:100vh;
  max-width:none;
  margin:0 !important;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:22px;
  background:#000;
}
.fc-app .hero-visual:fullscreen::before,
.fc-app .hero-visual:-webkit-full-screen::before{display:none}
.fc-app .hero-visual:fullscreen .hero-media,
.fc-app .hero-visual:-webkit-full-screen .hero-media{
  width:min(100%,calc((100vh - 100px) * 16 / 9));
  max-height:calc(100vh - 100px);
  margin:auto;
  border:0;
  box-shadow:none;
}
.fc-app .hero-visual:fullscreen .hero-reel-ui,
.fc-app .hero-visual:-webkit-full-screen .hero-reel-ui{
  width:min(100%,calc((100vh - 100px) * 16 / 9));
  margin:12px auto 0;
}

@media (max-width:1100px) and (min-width:961px){
  .fc-app .hero-cinematic .hero-grid{
    grid-template-columns:minmax(365px,.88fr) minmax(500px,1.28fr);
    gap:30px;
    padding-right:24px;
    padding-left:28px;
  }
  .fc-app .hero-cinematic h1{
    width:calc(100% + 30px);
    font-size:37px;
  }
  .fc-app .hero-title-line--long{font-size:.76em}
  .fc-app .hero-cinematic .lead{font-size:14px}
  .fc-app .hero-visual{
    --hero-video-bleed:46px;
  }
  .fc-app .hero-control{padding:0 10px;font-size:9px}
  .fc-app .hero-reel-id{display:none}
}

/* スマホ・タブレット：文字と動画を完全に分離する */
@media (max-width:960px){
  .fc-app .hero.hero-cinematic{
    min-height:auto;
    padding:0 !important;
  }
  .fc-app .hero-cinematic .hero-grid{
    display:grid;
    grid-template-columns:1fr;
    gap:30px;
    width:100%;
    min-height:auto;
    padding:104px 20px 112px !important;
  }
  .fc-app .hero-cinematic .hero-text{
    width:100%;
    max-width:590px;
    margin:0 auto;
    text-align:center;
    text-shadow:0 3px 20px rgba(0,0,0,.72);
  }
  .fc-app .hero-cinematic h1{
    width:100%;
    margin-bottom:22px;
    font-size:clamp(27px,7.6vw,34px);
    line-height:1.43;
    letter-spacing:0;
    text-align:center;
  }
  .fc-app .hero-title-line--long{font-size:.82em;white-space:nowrap}
  .fc-app .hero-cinematic h1 em{
    margin-top:16px;
    font-size:12px;
    line-height:1.65;
    letter-spacing:.025em;
  }
  .fc-app .hero-cinematic .lead{
    max-width:390px;
    margin:0 auto;
    padding:0;
    border-left:0;
    font-size:14px;
    line-height:1.9;
    text-align:center;
  }
  .fc-app .hero-visual{
    --hero-video-bleed:0px;
    width:calc(100% + 40px);
    max-width:none;
    margin-left:-20px;
    margin-right:0;
  }
  .fc-app .hero-visual::before{
    inset:-4% -3% 18%;
    filter:blur(34px) saturate(.78);
    opacity:.40;
  }
  .fc-app .hero-cinematic .hero-media{
    width:100%;
    border-right:0;
    border-left:0;
    border-radius:0;
    box-shadow:
      0 28px 72px rgba(0,0,0,.58),
      0 14px 70px rgba(194,160,109,.20),
      0 0 42px 12px rgba(8,7,5,.76);
  }
  .fc-app .hero-cinematic .hero-media::after{
    border-radius:0;
    box-shadow:inset 0 0 34px 7px rgba(5,5,4,.54);
  }
  .fc-app .hero-reel-ui{
    display:block;
    margin-top:0;
    padding:15px 18px 0;
  }
  .fc-app .hero-reel-id{
    align-items:center;
    margin-bottom:12px;
    text-align:center;
  }
  .fc-app .hero-controls{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:8px;
    width:100%;
  }
  .fc-app .hero-control{
    width:100%;
    min-width:0;
    min-height:43px;
    padding:0 10px;
    font-size:10px;
    letter-spacing:.055em;
  }
  .fc-app .hero-pause,.fc-app .hero-fullscreen{width:100%;padding:0 10px}
  .fc-app .hero-pause .hero-control-label{display:inline}
}

@media (max-width:380px){
  .fc-app .hero-cinematic .hero-grid{padding-right:14px !important;padding-left:14px !important}
  .fc-app .hero-visual{width:calc(100% + 28px);margin-left:-14px;margin-right:0}
  .fc-app .hero-cinematic h1{font-size:25px}
  .fc-app .hero-control{font-size:9.5px;padding:0 8px}
}

@media (prefers-reduced-motion:reduce){
  .fc-app .hero-title-line{animation:none;opacity:1;transform:none}
  .fc-app .hero-cinematic .hero-video-player{transition:none}
}
</style>`;
  const HTML = `
<main class="fc-app" itemscope itemtype="https://schema.org/WebPage">
<nav class="top">
  <a href="#" class="logo" aria-label="From Creativity">
    <svg viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0,0 L240,0 L240,360 L120,300 L0,360 Z" fill="#F5F1E8"/>
      <rect x="32" y="42" width="42" height="42" fill="#0A0907"/>
      <rect x="32" y="118" width="42" height="42" fill="#0A0907"/>
      <rect x="32" y="194" width="42" height="42" fill="#0A0907"/>
    </svg>
    <span class="logo-text">FROM&nbsp;CREATIVITY</span>
  </a>
  <button class="nav-toggle" id="navToggle" aria-label="メニューを開く" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul id="navMenu">
    <li><a href="#top" data-scroll-top="1">Top</a></li>
    <li><a href="#service">Service</a></li>
    <li><a href="#works">Works</a></li>
    <li><a href="#about">Profile</a></li>
    <li><a href="#message">Message</a></li>
    <li><a href="https://www.from-creativity.com/contact" target="_top">Contact</a></li>
  </ul>
</nav>

<section class="hero hero-cinematic" id="top" aria-label="From Creativity コンセプトムービー">
  <div class="hero-video-placeholder"></div>

  <div class="hero-grid">
    <div class="hero-text">
      <h1>
        <span class="hero-title-line">人は誰もが、</span>
        <span class="hero-title-line hero-title-line--long">語るべき物語を持っている。</span>
        <em>― ひとりの人生の物語を、<br class="sp-only">未来へ残す〝記録映画〟に ―</em>
      </h1>
      <p class="lead">
        自分史・終活の映像から、企業・店舗 PR・採用動画まで。<br>
        <span class="accent">世界に一つだけの</span>ドキュメンタリーを、丁寧な取材と言葉を生かす編集で。
      </p>
    </div>

    <div class="hero-visual">
      <div class="hero-media">
        <!-- ミュート状態で自動再生。画面を切らずに全編を表示する -->
        <video class="hero-video-player"
               autoplay muted loop playsinline webkit-playsinline
               preload="auto"
               disablepictureinpicture
               controlslist="nodownload noremoteplayback"
               poster="https://static.wixstatic.com/media/0a9631_0d6027021819447aac13a2a1c5cd674d~mv2.jpg"
               aria-label="From Creativity コンセプトムービー">
          <source src="https://video.wixstatic.com/video/0a9631_6a91c44a9d014b54b640c5d394767720/1080p/mp4/file.mp4" type="video/mp4">
        </video>
        <div class="hero-progress" aria-hidden="true"><span></span></div>
      </div>

      <div class="hero-reel-ui">
        <div class="hero-reel-id" aria-hidden="true">
          <strong>CONCEPT MOVIE</strong>
        </div>
        <div class="hero-controls" aria-label="コンセプトムービーの操作">
          <button class="hero-control hero-restart" type="button" aria-label="コンセプトムービーを最初から見る">
            <span class="hero-control-icon" aria-hidden="true">↺</span>
            <span class="hero-control-label">最初から見る</span>
          </button>
          <button class="hero-control hero-sound" type="button" aria-label="音声をオンにする" aria-pressed="false">
            <span class="hero-control-icon hero-sound-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M3 9v6h4l5 4V5L7 9H3Z" fill="currentColor"></path>
                <path class="sound-wave" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
                <path class="sound-slash" d="M4.5 4.5l15 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
              </svg>
            </span>
            <span class="hero-control-label hero-sound-label">音声をオン</span>
          </button>
          <button class="hero-control hero-pause" type="button" aria-label="動画を一時停止する" aria-pressed="false">
            <span class="hero-control-icon hero-play-icon" aria-hidden="true">Ⅱ</span>
            <span class="hero-control-label hero-play-label">一時停止</span>
          </button>
          <button class="hero-control hero-fullscreen" type="button" aria-label="動画を全画面で見る" aria-pressed="false">
            <span class="hero-control-icon hero-fullscreen-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </span>
            <span class="hero-control-label hero-fullscreen-label">全画面</span>
          </button>
          <span class="hero-status" role="status" aria-live="polite"></span>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="awards">
  <div class="awards-label">SELECTED FILM FESTIVALS</div>
  <div class="awards-track">
    <div class="award-item">
      <img class="laurel-img" loading="lazy" decoding="async" alt='Best Documentary Short Film - New York Istanbul Short Film Festival 2026' src="https://static.wixstatic.com/media/0a9631_81bbcacc2e4d4ad9a25a4e2349e053c5~mv2.png">
      <div class="award-text">
        <span class="award-name">Best Documentary<br>Short Film</span>
        <span class="award-meta">NEW YORK ISTANBUL · 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item">
      <img class="laurel-img" loading="lazy" decoding="async" alt='Best Documentary Film - 7th Kolkata International Micro Film Festival KIMFF 2026' src="https://static.wixstatic.com/media/0a9631_71d7fb2690e4454da4e211e570966dd4~mv2.png">
      <div class="award-text">
        <span class="award-name">Best Documentary<br>Film</span>
        <span class="award-meta">KOLKATA · KIMFF 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item">
      <img class="laurel-img" loading="lazy" decoding="async" alt='Honorable Mention - Mannheim Arts and Film Festival 2026' src="https://static.wixstatic.com/media/0a9631_ea483b1d3e6344b39c3b742fd7a41d1f~mv2.png">
      <div class="award-text">
        <span class="award-name">Honorable Mention</span>
        <span class="award-meta">MANNHEIM ARTS & FILM · 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item">
      <img class="laurel-img" loading="lazy" decoding="async" alt='Honorable Mention - Post-Cinema Film Festival 2026' src="https://static.wixstatic.com/media/0a9631_80fdba64574b4d08987f1bab8c047b98~mv2.png">
      <div class="award-text">
        <span class="award-name">Honorable Mention</span>
        <span class="award-meta">POST-CINEMA FILM FEST · 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item">
      <img class="laurel-img" loading="lazy" decoding="async" alt='Finalist - Sweden Film Awards 2026' src="https://static.wixstatic.com/media/0a9631_ae94139adb4c4c4f8124d27071c50080~mv2.png">
      <div class="award-text">
        <span class="award-name">Finalist</span>
        <span class="award-meta">SWEDEN FILM AWARDS · 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item" aria-hidden="true">
      <img class="laurel-img" loading="lazy" decoding="async" alt="" src="https://static.wixstatic.com/media/0a9631_81bbcacc2e4d4ad9a25a4e2349e053c5~mv2.png">
      <div class="award-text">
        <span class="award-name">Best Documentary<br>Short Film</span>
        <span class="award-meta">NEW YORK ISTANBUL · 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item" aria-hidden="true">
      <img class="laurel-img" loading="lazy" decoding="async" alt="" src="https://static.wixstatic.com/media/0a9631_71d7fb2690e4454da4e211e570966dd4~mv2.png">
      <div class="award-text">
        <span class="award-name">Best Documentary<br>Film</span>
        <span class="award-meta">KOLKATA · KIMFF 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item" aria-hidden="true">
      <img class="laurel-img" loading="lazy" decoding="async" alt="" src="https://static.wixstatic.com/media/0a9631_ea483b1d3e6344b39c3b742fd7a41d1f~mv2.png">
      <div class="award-text">
        <span class="award-name">Honorable Mention</span>
        <span class="award-meta">MANNHEIM ARTS & FILM · 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item" aria-hidden="true">
      <img class="laurel-img" loading="lazy" decoding="async" alt="" src="https://static.wixstatic.com/media/0a9631_80fdba64574b4d08987f1bab8c047b98~mv2.png">
      <div class="award-text">
        <span class="award-name">Honorable Mention</span>
        <span class="award-meta">POST-CINEMA FILM FEST · 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
    <div class="award-item" aria-hidden="true">
      <img class="laurel-img" loading="lazy" decoding="async" alt="" src="https://static.wixstatic.com/media/0a9631_ae94139adb4c4c4f8124d27071c50080~mv2.png">
      <div class="award-text">
        <span class="award-name">Finalist</span>
        <span class="award-meta">SWEDEN FILM AWARDS · 2026</span>
        <span class="award-sub">A Man, A Hobby, A Whole life</span>
      </div>
    </div>
  </div>
</div>

<!-- 新着情報 -->
<div class="news">
  <div class="news-inner">
    <div class="news-label">NEWS ／ 新着情報</div>
    <ul class="news-list">
      <li>
        <a href="#client-works">
          <span class="news-date">2026.08</span>
          <span class="news-title"><span class="news-tag">WORKS</span>法人・店舗向けドキュメンタリー制作実績を追加しました</span>
          <span class="news-arrow">→</span>
        </a>
      </li>
      <li>
        <a href="https://youtu.be/zwogoIGO5Vc" target="_blank" rel="noopener">
          <span class="news-date">2026.08</span>
          <span class="news-title"><span class="news-tag">NEW FILM</span>新作ドキュメンタリーを公開しました</span>
          <span class="news-arrow">→</span>
        </a>
      </li>
      <li>
        <a href="#awards-list">
          <span class="news-date">2026.08</span>
          <span class="news-title"><span class="news-tag">AWARD</span>受賞歴を更新しました</span>
          <span class="news-arrow">→</span>
        </a>
      </li>
    </ul>
  </div>
</div>

<section id="service">
  <div class="reveal">
    <div class="section-num">01 ／ SERVICE</div>
    <h2 class="section-h">サービス<br><em>人生と仕事を、〝記録映画〟として残す</em></h2>
    <p class="services-intro">
      ドキュメンタリー制作 ／ PR 映像制作。<br>
      個人にも、企業にも。「人」を中心にした映像を、ナレーションに頼らずお作りします。
    </p>

    <!-- 一貫担当アピール -->
    <div class="all-in-one">
      <div class="all-in-one-label">ALL&nbsp;IN&nbsp;ONE</div>
      <div class="all-in-one-flow">
        <span>企画</span>
        <span class="dot">·</span>
        <span>取材</span>
        <span class="dot">·</span>
        <span>撮影</span>
        <span class="dot">·</span>
        <span>編集</span>
      </div>
      <p class="all-in-one-text">
        映像制作は、<em>すべて佐々木駿平が一貫して担当</em>します。<br>
        分業ではなく、ひとりが最初から最後まで責任を持って向き合うからこそ、
        撮るべき瞬間と、削るべきカットがわかります。
      </p>
    </div>
  </div>
  <div class="case-grid">
    <article class="case reveal">
      <div class="stamp">For Personal</div>
      <div class="case-no">01.</div>
      <h3>自分の歩みを振り返りたいときや、家族に思いを託したいときに。</h3>
      <p>自分史動画や終活ビデオを、丁寧なインタビューと繊細な映像表現で、記録映画としてお作りします。</p>
      <div class="plan-list">
        <div class="plan-row">
          <div class="plan-head"><span class="plan-name">ライト</span><span class="plan-price">¥149,800<small>〜</small></span></div>
          <div class="plan-spec">撮影 3 時間以内 ／ 1 分までの映像作品</div>
        </div>
        <div class="plan-row">
          <div class="plan-head"><span class="plan-name">ベーシック</span><span class="plan-price">¥259,800<small>〜</small></span></div>
          <div class="plan-spec">撮影 1 日 ／ 5 分までの映像作品</div>
        </div>
        <div class="plan-row">
          <div class="plan-head"><span class="plan-name">スタンダード</span><span class="plan-price">¥479,800<small>〜</small></span></div>
          <div class="plan-spec">撮影 2 日 ／ 12 分までの映像作品</div>
        </div>
        <div class="plan-row">
          <div class="plan-head"><span class="plan-name">プレミアム</span><span class="plan-price">¥599,800<small>〜</small></span></div>
          <div class="plan-spec">撮影 3 日以上 ／ 12 分以上の映像作品</div>
        </div>
      </div>
      <p class="price-note">※ 納期は撮影から 1 ヶ月以内。内容・撮影日数・編集量に応じてお見積もりします。</p>
    </article>
    <article class="case reveal">
      <div class="stamp">For Business</div>
      <div class="case-no">02.</div>
      <h3>お店や会社の PR・採用動画を、「人」を中心にしたドキュメンタリーとして残したい方へ。</h3>
      <p>店舗 PR 映像や企業 PR 動画、採用ムービーを、現場の空気感が伝わる映像作品として制作します。</p>
      <div class="plan-list">
        <div class="plan-row">
          <div class="plan-head"><span class="plan-name">ライト</span><span class="plan-price">¥199,800<small>〜</small></span></div>
          <div class="plan-spec">撮影 3 時間以内 ／ 1 分までの映像作品</div>
        </div>
        <div class="plan-row">
          <div class="plan-head"><span class="plan-name">ベーシック</span><span class="plan-price">¥309,800<small>〜</small></span></div>
          <div class="plan-spec">撮影 1 日 ／ 5 分までの映像作品</div>
        </div>
        <div class="plan-row">
          <div class="plan-head"><span class="plan-name">スタンダード</span><span class="plan-price">¥579,800<small>〜</small></span></div>
          <div class="plan-spec">撮影 2 日 ／ 12 分までの映像作品</div>
        </div>
        <div class="plan-row">
          <div class="plan-head"><span class="plan-name">プレミアム</span><span class="plan-price">¥699,800<small>〜</small></span></div>
          <div class="plan-spec">撮影 3 日以上 ／ 12 分以上の映像作品</div>
        </div>
      </div>
      <p class="price-note">※ 納期は撮影から 1 ヶ月以内。内容・撮影日数・編集量に応じてお見積もりします。</p>
    </article>
  </div>
  <div class="price-foot">※ 表示価格はすべて税込みです。オプション（2カメ体制・ナレーション・予告編制作など）は別途お見積もりいたします。</div>
</section>

<section class="youtube-strip" id="youtube">
  <a href="https://www.youtube.com/@FromCreativity-Documentaries" target="_blank" rel="noopener" class="yt-card reveal">
    <div class="yt-left">
      <div class="yt-label">
        <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden="true">
          <path fill="#FF0000" d="M27.4,3.1c-0.3-1.2-1.3-2.2-2.5-2.5C22.7,0,14,0,14,0S5.3,0,3.1,0.6 C1.9,0.9,0.9,1.9,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.3,1.2,1.3,2.2,2.5,2.5C5.3,20,14,20,14,20s8.7,0,10.9-0.6 c1.2-0.3,2.2-1.3,2.5-2.5C28,14.7,28,10,28,10S28,5.3,27.4,3.1z"/>
          <polygon fill="#FFFFFF" points="11.2,14.3 18.5,10 11.2,5.7"/>
        </svg>
        <span>OFFICIAL · YOUTUBE CHANNEL</span>
      </div>
      <h3 class="yt-title">From&nbsp;Creativity<br><em>Human&nbsp;Documentary.</em></h3>
      <p class="yt-desc">
        公式 YouTube チャンネル「From&nbsp;Creativity｜ヒューマンドキュメンタリー」。<br>
        ひとりの人生の物語を〝記録映画〟として残す、ドキュメンタリー作品を配信中。
      </p>
      <div class="yt-cta">
        <span class="yt-btn">SUBSCRIBE&nbsp;&nbsp;&nbsp;→</span>
        <span class="yt-handle">@FromCreativity-Documentaries</span>
      </div>
    </div>
    <div class="yt-right">
      <div class="yt-thumb yt-thumb-1"></div>
      <div class="yt-thumb yt-thumb-2"></div>
      <div class="yt-thumb yt-thumb-3"></div>
      <div class="yt-thumb yt-thumb-4"></div>
    </div>
  </a>
</section>

<!-- 法人・店舗向けドキュメンタリー制作実績 -->
<section class="client-works" id="client-works">
  <div class="client-head reveal">
    <div class="section-num">02 ／ CLIENT WORKS</div>
    <h2 class="section-h">法人・店舗向け<em>ドキュメンタリー制作実績</em></h2>
    <p class="client-lead">
      企業・店舗・団体さまからご依頼いただいた制作実績の一部です。<br>
      現場に通い、そこで働く「人」を中心に据えた記録映画としてお作りしています。
    </p>
  </div>
  <div class="client-grid">
    <article class="client-card reveal">
      <div class="client-no">01</div>
      <div class="client-client">社会福祉法人（東京）</div>
      <div class="client-type">MID-LENGTH DOCUMENTARY<br><span class="jp">中編ドキュメンタリー</span></div>
      <p>モンテッソーリ教育に取り組む保育園を取材。園児たちの日々の活動を追い、その理念や取り組みを描く中編ドキュメンタリーを制作。</p>
    </article>
    <article class="client-card reveal">
      <div class="client-no">02</div>
      <div class="client-client">飲食店・カフェ（大阪）</div>
      <div class="client-type">SHOP DOCUMENTARY<br><span class="jp">店舗ドキュメンタリー</span></div>
      <p>店舗オーナーへの人物取材を中心に、店が生まれた背景や仕事への思い、店舗の空気感を伝えるドキュメンタリーを制作。</p>
    </article>
    <article class="client-card reveal">
      <div class="client-no">03</div>
      <div class="client-client">自動車関連企業（東京）</div>
      <div class="client-type">CRAFTSMANSHIP DOCUMENTARY<br><span class="jp">旧車修復ドキュメンタリー</span></div>
      <p>旧車の修復工程と、それに携わる職人を追ったドキュメンタリーを制作。職人の技術や仕事への姿勢を、修復の過程とともに記録。</p>
    </article>
  </div>
  <div class="client-foot">※ 公開許諾の関係上、法人名・店舗名は伏せて掲載しております。詳細は個別にお問い合わせください。</div>
</section>

<section class="portfolio" id="works">
  <div class="portfolio-head reveal">
    <div>
      <div class="section-num">03 ／ WORKS</div>
      <h2 class="section-h">作品&nbsp;<em>Portfolio.</em></h2>
    </div>
  </div>
  <!-- ======================================================
       👇 YouTubeリンクの貼り替え方
       下の各 <a href="https://www.youtube.com/..."> の中身を、
       実際のYouTube動画URL（例: https://youtu.be/dQw4w9WgXcQ）に
       置き換えるだけです。それ以外は触らなくてOK。
       ====================================================== -->
  <div class="portfolio-grid">

    <!-- ▼ 作品01｜受賞作 / A Man, A Hobby, A Whole Life -->
    <a class="work work--poster span-3 reveal"
       href="https://youtu.be/FbfWuQoAqoY"
       target="_blank" rel="noopener"
       aria-label="離婚して車とバイクに9000万 - 趣味に全てを捧げる男の物語（YouTubeで再生）">
      <div class="work-cover yt-cover-01">01</div>
      <div class="work-yt-badge">
        <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill="#fff" d="M27.4,3.1c-0.3-1.2-1.3-2.2-2.5-2.5C22.7,0,14,0,14,0S5.3,0,3.1,0.6 C1.9,0.9,0.9,1.9,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.3,1.2,1.3,2.2,2.5,2.5C5.3,20,14,20,14,20s8.7,0,10.9-0.6 c1.2-0.3,2.2-1.3,2.5-2.5C28,14.7,28,10,28,10S28,5.3,27.4,3.1z"/>
          <polygon fill="#FF0000" points="11.2,14.3 18.5,10 11.2,5.7"/>
        </svg>
        WATCH ON YT
      </div>
      <div class="work-info">
        <div class="work-cat">PERSONAL · 短編ドキュメンタリー（受賞作）</div>
        <div class="work-title">離婚して車とバイクに 9000 万円。<br>趣味に全てを捧げる男の物語。</div>
        <div class="work-year">2025 · 10 MIN｜A Man, A Hobby, A Whole Life</div>
      </div>
    </a>

    <!-- ▼ 作品02｜澄江の空 Smie's Sky（東京・青梅） -->
    <a class="work work--poster span-3 reveal"
       href="https://youtu.be/xtZviIie2w0"
       target="_blank" rel="noopener"
       aria-label="澄江の空 - 86歳の傘屋、雨が降らない街で（YouTubeで再生）">
      <div class="work-cover yt-cover-02">02</div>
      <div class="work-yt-badge">
        <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#fff" d="M27.4,3.1c-0.3-1.2-1.3-2.2-2.5-2.5C22.7,0,14,0,14,0S5.3,0,3.1,0.6 C1.9,0.9,0.9,1.9,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.3,1.2,1.3,2.2,2.5,2.5C5.3,20,14,20,14,20s8.7,0,10.9-0.6 c1.2-0.3,2.2-1.3,2.5-2.5C28,14.7,28,10,28,10S28,5.3,27.4,3.1z"/><polygon fill="#FF0000" points="11.2,14.3 18.5,10 11.2,5.7"/></svg>
        WATCH ON YT
      </div>
      <div class="work-info">
        <div class="work-cat">PERSONAL · 短編ドキュメンタリー</div>
        <div class="work-title">澄江の空｜86 歳の傘屋、<br>雨が降らない街で。</div>
        <div class="work-year">2026 · 11 MIN｜東京・青梅｜Smie's Sky</div>
      </div>
    </a>

    <!-- ▼ 作品03｜奥多摩・旧車ミーティング -->
    <a class="work work--video span-2 reveal"
       href="https://youtu.be/lAKV68K_rvk"
       target="_blank" rel="noopener"
       aria-label="奥多摩・旧車ミーティング 密着（YouTubeで再生）">
      <div class="work-cover yt-cover-03">03</div>
      <div class="work-yt-badge">
        <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#fff" d="M27.4,3.1c-0.3-1.2-1.3-2.2-2.5-2.5C22.7,0,14,0,14,0S5.3,0,3.1,0.6 C1.9,0.9,0.9,1.9,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.3,1.2,1.3,2.2,2.5,2.5C5.3,20,14,20,14,20s8.7,0,10.9-0.6 c1.2-0.3,2.2-1.3,2.5-2.5C28,14.7,28,10,28,10S28,5.3,27.4,3.1z"/><polygon fill="#FF0000" points="11.2,14.3 18.5,10 11.2,5.7"/></svg>
        WATCH ON YT
      </div>
      <div class="work-info">
        <div class="work-cat">EVENT · 1 日密着</div>
        <div class="work-title">奥多摩・旧車ミーティング</div>
        <div class="work-year">2025 · 11 MIN</div>
      </div>
    </a>

    <!-- ▼ 作品04｜八王子の駄菓子屋おばちゃん -->
    <a class="work work--video span-2 reveal"
       href="https://youtu.be/p87q4C8VGEs"
       target="_blank" rel="noopener"
       aria-label="八王子の駄菓子屋おばちゃん（YouTubeで再生）">
      <div class="work-cover yt-cover-04">04</div>
      <div class="work-yt-badge">
        <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#fff" d="M27.4,3.1c-0.3-1.2-1.3-2.2-2.5-2.5C22.7,0,14,0,14,0S5.3,0,3.1,0.6 C1.9,0.9,0.9,1.9,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.3,1.2,1.3,2.2,2.5,2.5C5.3,20,14,20,14,20s8.7,0,10.9-0.6 c1.2-0.3,2.2-1.3,2.5-2.5C28,14.7,28,10,28,10S28,5.3,27.4,3.1z"/><polygon fill="#FF0000" points="11.2,14.3 18.5,10 11.2,5.7"/></svg>
        WATCH ON YT
      </div>
      <div class="work-info">
        <div class="work-cat">PERSONAL · 街と人</div>
        <div class="work-title">フワちゃんも愛した、<br>駄菓子屋おばちゃん。</div>
        <div class="work-year">2025 · 13 MIN｜東京・八王子</div>
      </div>
    </a>

    <!-- ▼ 作品05｜CAFE TIPO 8（大阪） -->
    <a class="work work--video span-2 reveal"
       href="https://youtu.be/XEN8DWARd9Y"
       target="_blank" rel="noopener"
       aria-label="CAFE TIPO 8 - カフェ経営という、しんどくて楽しい生き方（YouTubeで再生）">
      <div class="work-cover yt-cover-05">05</div>
      <div class="work-yt-badge">
        <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#fff" d="M27.4,3.1c-0.3-1.2-1.3-2.2-2.5-2.5C22.7,0,14,0,14,0S5.3,0,3.1,0.6 C1.9,0.9,0.9,1.9,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.3,1.2,1.3,2.2,2.5,2.5C5.3,20,14,20,14,20s8.7,0,10.9-0.6 c1.2-0.3,2.2-1.3,2.5-2.5C28,14.7,28,10,28,10S28,5.3,27.4,3.1z"/><polygon fill="#FF0000" points="11.2,14.3 18.5,10 11.2,5.7"/></svg>
        WATCH ON YT
      </div>
      <div class="work-info">
        <div class="work-cat">BUSINESS · 経営者ドキュメンタリー</div>
        <div class="work-title">「カフェ経営」という、<br>しんどくて楽しい生き方。</div>
        <div class="work-year">2025 · 13 MIN｜大阪・CAFE TIPO 8</div>
      </div>
    </a>

    <!-- ▼ 作品06｜増えちゃった（東京・奥多摩） -->
    <a class="work work--video span-3 reveal"
       href="https://youtu.be/zwogoIGO5Vc"
       target="_blank" rel="noopener"
       aria-label="増えちゃった - 短編ドキュメンタリー（YouTubeで再生）">
      <div class="work-cover yt-cover-06">06</div>
      <div class="work-yt-badge">
        <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#fff" d="M27.4,3.1c-0.3-1.2-1.3-2.2-2.5-2.5C22.7,0,14,0,14,0S5.3,0,3.1,0.6 C1.9,0.9,0.9,1.9,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.3,1.2,1.3,2.2,2.5,2.5C5.3,20,14,20,14,20s8.7,0,10.9-0.6 c1.2-0.3,2.2-1.3,2.5-2.5C28,14.7,28,10,28,10S28,5.3,27.4,3.1z"/><polygon fill="#FF0000" points="11.2,14.3 18.5,10 11.2,5.7"/></svg>
        WATCH ON YT
      </div>
      <div class="work-info">
        <div class="work-cat">PERSONAL · 短編ドキュメンタリー</div>
        <div class="work-title">増えちゃった</div>
        <div class="work-year">2026 · 5 MIN｜東京・奥多摩</div>
      </div>
    </a>

    <!-- ▼ 作品07｜居酒屋・もがみ（東京・高田馬場） -->
    <a class="work work--video span-3 reveal"
       href="https://youtu.be/LWeY9iSR6qU"
       target="_blank" rel="noopener"
       aria-label="居酒屋・もがみ - 1日密着ドキュメンタリー（YouTubeで再生）">
      <div class="work-cover yt-cover-07">07</div>
      <div class="work-yt-badge">
        <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#fff" d="M27.4,3.1c-0.3-1.2-1.3-2.2-2.5-2.5C22.7,0,14,0,14,0S5.3,0,3.1,0.6 C1.9,0.9,0.9,1.9,0.6,3.1C0,5.3,0,10,0,10s0,4.7,0.6,6.9c0.3,1.2,1.3,2.2,2.5,2.5C5.3,20,14,20,14,20s8.7,0,10.9-0.6 c1.2-0.3,2.2-1.3,2.5-2.5C28,14.7,28,10,28,10S28,5.3,27.4,3.1z"/><polygon fill="#FF0000" points="11.2,14.3 18.5,10 11.2,5.7"/></svg>
        WATCH ON YT
      </div>
      <div class="work-info">
        <div class="work-cat">BUSINESS · 1 日密着ドキュメンタリー</div>
        <div class="work-title">居酒屋・もがみ</div>
        <div class="work-year">2026 · 9 MIN｜東京・高田馬場</div>
      </div>
    </a>
  </div>
  <div class="portfolio-cta reveal">
    <a href="https://www.youtube.com/@FromCreativity-Documentaries" target="_blank" rel="noopener">VIEW ALL ON YOUTUBE</a>
  </div>
</section>

<section class="profile" id="about" itemscope itemtype="https://schema.org/Person">
  <div class="profile-grid">
    <div class="profile-portrait reveal">
      <img src="https://static.wixstatic.com/media/0a9631_39241bb073ef4ea7860c6a02c262e235~mv2.jpg" alt="From Creativity 代表 佐々木駿平 - 阿蘇の草原でカメラを構える" loading="lazy">
      <div class="portrait-overlay"></div>
    </div>
    <div class="profile-content reveal">
      <div class="section-num">04 ／ PROFILE</div>
      <h2>ドキュメンタリーは、<br><em>聴くこと</em>から始まる。</h2>
      <div class="profile-name" itemprop="alternateName">Shumpei Sasaki</div>
      <div class="profile-role">映像作家｜FROM CREATIVITY 代表</div>
      <dl class="profile-meta">
        <dt>NAME</dt><dd><span itemprop="name">佐々木　駿平</span> / Shumpei Sasaki</dd>
        <dt>BORN</dt><dd>1997 年・東京</dd>
        <dt>BASE</dt><dd>東京都羽村市（西多摩エリア）／ 全国対応<br><span style="font-size:11px;opacity:0.75">2025 年 10 月 1 日開業</span></dd>
        <dt>EMAIL</dt><dd><a href="mailto:fromcreativity.sasaki@gmail.com" itemprop="email">fromcreativity.sasaki@gmail.com</a></dd>
      </dl>
      <div class="profile-bio">
        <p>1997 年、東京生まれ。早稲田大学卒業。野中章弘ゼミでジャーナリズムを学ぶ。大学在学時より、ドキュメンタリーの制作をはじめる。</p>
        <p>2019 年、初めてのドキュメンタリー『この“つながり”は切らせない 〜熊本地震・ある下宿の物語〜』を制作。取材、撮影、音楽など全てを 1 人で手がける。2020 年の卒業制作「ピアノが私にくれたもの」が、第 3 回ヤングリポーターコンペティションで毎日新聞社賞を受賞。東京ドキュメンタリー映画祭 2020 でも正式出品される。</p>
        <p>2020 年、ディレクターとして NHK（日本放送協会）入局。初任地は熊本放送局。熊本では主にドキュメンタリー番組やスポーツ中継、情報番組などを担当。2022 年には「Dear にっぽん」で、学生時代に取材した下宿を再取材。同作『“学生さん”を待ち続けて』は全国放送され、現在もネットで配信されている。2024 年、初めて企画・演出をした、ラジオドラマ・FM シアター『風がやむまでは』を放送。以降、NHK ではドラマ制作に転じる。東京渋谷の放送センターに異動後、2025 年前期連続テレビ小説（朝ドラ）『あんぱん』の制作に携わる。</p>
        <p>2025 年 9 月 30 日をもって NHK を退職し、独立。映像作家としての活動をスタートする。</p>
      </div>
      <div class="profile-extra">
        <div class="profile-extra-h">PRIVATE</div>
        <p>プライベートでは 1 児の父。趣味は日本酒とラーメンを嗜むこと。</p>
        <p>脚本の執筆、楽曲制作も行なっている。「Departure」など 3 曲が、各種音楽配信サービスで配信中。</p>
      </div>

      <div class="profile-awards" id="awards-list">
        <div class="profile-awards-h">受賞歴 ／ AWARDS</div>
        <ul>
          <li>第 3 回ヤングリポーターコンペティション　毎日新聞社賞<span>2020</span></li>
          <li>2020 年度 NHK 九州沖縄ブロック新人選奨　第 1 位<span>2020</span></li>
          <li>7th Kolkata International Micro Film Festival（インド）　最優秀ドキュメンタリー映画賞<span>2026</span></li>
          <li>New York Istanbul Short Film Festival（アメリカ）　最優秀短編ドキュメンタリー映画賞<span>2026</span></li>
          <li>Mannheim Arts &amp; Film Festival（ドイツ）　特別賞（Honorable Mention）<span>2026</span></li>
          <li>Post-Cinema Film Festival（イタリア）　特別賞（Honorable Mention）<span>2026</span></li>
        </ul>
        <div class="awards-foot">
          ※「ピアノが私にくれたもの」（毎日新聞社賞）<br>
          ※「クマロク！」リポート企画（NHK 九州沖縄ブロック新人選奨）<br>
          ※短編ドキュメンタリー映画「A Man, A Hobby, A Whole Life」（Kolkata / NY Istanbul / Mannheim / Post-Cinema）
        </div>
      </div>
      <div class="profile-onair">
        <div class="profile-onair-h">配信中の担当番組 ／ ON&nbsp;AIR</div>
        <div class="profile-onair-program">NHK ドキュメンタリー番組　Dear にっぽん『〝学生さん〟を待ち続けて』</div>
        <div class="profile-onair-credit">ディレクター：佐々木 駿平　／　語り：吉岡 里帆</div>
      </div>
    </div>
  </div>

  <div class="advisor reveal" itemscope itemtype="https://schema.org/Person">
    <div class="advisor-portrait">
      <img src="https://static.wixstatic.com/media/0a9631_e2671b195f034902a788b4fd8f064576~mv2.jpg" alt="エグゼクティブ・アドバイザー 野中章弘 - 早稲田大学名誉教授・アジアプレス代表" loading="lazy">
      <span class="portrait-frame-meta">AKIHIRO NONAKA</span>
    </div>
    <div class="advisor-content">
      <div class="advisor-label">EXECUTIVE ADVISOR ／ エグゼクティブ・アドバイザー</div>
      <div class="advisor-name" itemprop="alternateName">Akihiro Nonaka.</div>
      <div class="advisor-name-jp" itemprop="name">野中　章弘</div>
      <div class="advisor-title">
        早稲田大学名誉教授／アジアプレス・インターナショナル代表<br>
        ジャーナリスト・プロデューサー
      </div>
      <div class="advisor-tags">
        <span class="advisor-tag">JOURNALISM</span>
        <span class="advisor-tag">VIDEO JOURNALISM</span>
        <span class="advisor-tag">ASIA / 第三世界</span>
        <span class="advisor-tag">早稲田大学</span>
      </div>
      <div class="advisor-bio">
        <p class="lead">1953 年、兵庫県生まれ。日系アメリカ人、インドシナ紛争、アフガニスタン内戦、エチオピアの飢餓、台湾人元日本兵、カンボジア紛争、ビルマ（ミャンマー）の民主化、少数民族の武装闘争、タイのエイズ問題、チベット、東ティモール独立闘争、朝鮮半島問題、イラク戦争など、アジアを中心に第三世界の問題を取材し、新聞・雑誌・テレビなどで発表してきた。</p>
        <p>1987 年、報道規制の厳しいアジア諸国のジャーナリストたちのネットワークである「アジアプレス・インターナショナル」を設立。小型ビデオを使うビデオ・ジャーナリズム（VJ）の手法によるニュースリポートやドキュメンタリーを制作・プロデュース。NHK（ETV 特集、BS ドキュメンタリー など）を中心に、テレビ朝日、朝日ニュースター、MX テレビなど、発表本数は 200 本を超える。</p>
        <p>2004 年、第 3 回「放送人グランプリ特別賞」受賞。</p>
        <p>大学の教員としては、1990 年代より東京大学・立教大学・青山学院大学などで、ジャーナリズム論、映像論、時事問題研究などを担当。2000 年代からはおもに早稲田大学（全学副専攻、政治学研究科、教育学部 など）でジャーナリスト教育に注力している。</p>
      </div>
    </div>
  </div>
</section>

<section class="message" id="message">
  <div class="content reveal">
    <div class="label">05 ／ MESSAGE</div>
    <h2>〜なぜ人生や仕事を、<em>ドキュメンタリーとして残すのか</em>〜</h2>
    <div class="body">
      <p>私には、信じていることがあります。〝 人は誰もが、語るべき物語を持っている〟ということです。</p>
      <p>「語る価値のない人生」は、一つもありません。ただ、ご本人がまだ気づいていないというだけです。日々の選択、ため息、ささやかな喜びの奥に、普遍性のあるメッセージは静かに眠っています。</p>
      <p>私ができることは、映像をつくることだけです。やりたいことも、それだけなのです。命があるかぎり、人々の生き様と言葉を記録することが、私自身の使命だと思っています。</p>
      <p>だからこそ丁寧にお話を聴き、必要な質問を重ね、言葉と表情の温度をそのまま映します。記録として確かに残し、作品として見る人の〝 心 〟に届く形に仕上げていきます。そこにはきっと、これからを生きるヒントが見えてくるはずです。</p>
      <p>インタビューでは、沈黙も大事にします。決まった型はありません。テンプレートもありません。どんな作品にするのか、一緒にゼロから考えます。</p>
      <p>世界に一つだけの「作品」を、一緒に。見終えたあと、少し背筋が伸びるような、静かな余白が残る映像を…</p>
      <p>ぜひ、あなたと〝あなたの大切な人〟の物語を聴かせてください。そのままの輪郭で、未来へ手渡せる映像にします。</p>
    </div>
    <div class="sig">
      <div>
        <div style="font-size:11px;letter-spacing:0.3em;color:var(--gold);font-family:var(--display);margin-bottom:6px">FROM CREATIVITY · DIRECTOR</div>
        <div class="sig-name">Shumpei Sasaki</div>
        <div style="font-family:var(--serif-jp);color:var(--ink);margin-top:4px">佐々木 駿平</div>
      </div>
    </div>
  </div>
</section>

<section class="tagline">
  <h2>
    Everything springs <span class="accent">from creativity</span>—<br>
    and at its heart, there's always a <em>story.</em>
  </h2>
  <p class="jp">全ては、「創造性」から生まれる</p>
</section>

<!-- CONTACT セクションとフッターはB案により削除（Wix側で配置） -->

<!-- スクロール追従の「無料相談する」ボタン → /contact ページへ -->
<a href="https://www.from-creativity.com/contact" target="_top" class="float-cta">無料相談する</a>
</main>

<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
{"@type":"ProfessionalService","@id":"https://www.from-creativity.com/#org","name":"From Creativity","alternateName":"フロムクリエイティビティ","url":"https://www.from-creativity.com/","description":"元NHKディレクター佐々木駿平が運営する、東京・西多摩（羽村）拠点の映像制作スタジオ。自分史・終活映像から企業PR・採用動画まで、人を中心にしたドキュメンタリー作品を制作。全国対応。","priceRange":"¥149,800〜","address":{"@type":"PostalAddress","addressLocality":"羽村市","addressRegion":"東京都","addressCountry":"JP"},"areaServed":[{"@type":"City","name":"羽村市"},{"@type":"AdministrativeArea","name":"西多摩地域"},{"@type":"City","name":"青梅市"},{"@type":"City","name":"福生市"},{"@type":"City","name":"あきる野市"},{"@type":"City","name":"八王子市"},{"@type":"City","name":"立川市"},{"@type":"AdministrativeArea","name":"東京都"},{"@type":"Country","name":"日本"}],"founder":{"@id":"https://www.from-creativity.com/#founder"},"member":[{"@id":"https://www.from-creativity.com/#advisor"}],"makesOffer":[{"@id":"https://www.from-creativity.com/#service-personal"},{"@id":"https://www.from-creativity.com/#service-business"}],"sameAs":["https://www.youtube.com/@FromCreativity-Documentaries"]},
{"@type":"Person","@id":"https://www.from-creativity.com/#founder","name":"佐々木 駿平","alternateName":"Shumpei Sasaki","birthDate":"1997","jobTitle":"映像作家","alumniOf":{"@type":"CollegeOrUniversity","name":"早稲田大学"},"award":["毎日新聞社賞 (2020)","NHK九州沖縄ブロック新人選奨第1位","Best Documentary Film - Kolkata 2026","Best Documentary Short Film - NY Istanbul 2026","Honorable Mention - Mannheim 2026","Honorable Mention - Post-Cinema Film Festival 2026"],"worksFor":{"@id":"https://www.from-creativity.com/#org"}},
{"@type":"Person","@id":"https://www.from-creativity.com/#advisor","name":"野中 章弘","alternateName":"Akihiro Nonaka","jobTitle":"エグゼクティブ・アドバイザー","affiliation":[{"@type":"CollegeOrUniversity","name":"早稲田大学"},{"@type":"Organization","name":"アジアプレス・インターナショナル"}],"award":"放送人グランプリ特別賞 (2004)"},
{"@type":"Service","@id":"https://www.from-creativity.com/#service-personal","name":"自分史・終活ドキュメンタリー映像制作","serviceType":"個人向けドキュメンタリー映像制作","description":"自分史動画や終活ビデオを、丁寧なインタビューと繊細な映像表現で記録映画として制作。","provider":{"@id":"https://www.from-creativity.com/#org"},"areaServed":[{"@type":"AdministrativeArea","name":"東京都西多摩地域"},{"@type":"AdministrativeArea","name":"東京都"},{"@type":"Country","name":"日本"}],"offers":{"@type":"Offer","price":"149800","priceCurrency":"JPY","priceSpecification":{"@type":"PriceSpecification","price":"149800","priceCurrency":"JPY","valueAddedTaxIncluded":false},"availability":"https://schema.org/InStock"}},
{"@type":"Service","@id":"https://www.from-creativity.com/#service-business","name":"企業PR・採用ドキュメンタリー映像制作","serviceType":"法人向けドキュメンタリー映像制作","description":"店舗PR映像や企業PR動画、採用ムービーを、現場の空気感が伝わる映像作品として制作。","provider":{"@id":"https://www.from-creativity.com/#org"},"areaServed":[{"@type":"AdministrativeArea","name":"東京都西多摩地域"},{"@type":"AdministrativeArea","name":"東京都"},{"@type":"Country","name":"日本"}],"offers":{"@type":"Offer","price":"199800","priceCurrency":"JPY","priceSpecification":{"@type":"PriceSpecification","price":"199800","priceCurrency":"JPY","valueAddedTaxIncluded":false},"availability":"https://schema.org/InStock"}},
{"@type":"VideoObject","@id":"https://www.from-creativity.com/#concept-reel","name":"From Creativity ／ コンセプトムービー","description":"映像作家・佐々木駿平が手がけるドキュメンタリー制作スタジオFrom Creativityのコンセプトムービー。","thumbnailUrl":"https://static.wixstatic.com/media/0a9631_0d6027021819447aac13a2a1c5cd674d~mv2.jpg","uploadDate":"2025-10-01","contentUrl":"https://video.wixstatic.com/video/0a9631_6a91c44a9d014b54b640c5d394767720/1080p/mp4/file.mp4","publisher":{"@id":"https://www.from-creativity.com/#org"}}
]}
</script>

`;

  class FromCreativityPageV4 extends HTMLElement {
    connectedCallback() {
      this.innerHTML = STYLES + HTML;
      this.fixWixWrapper();
      this.splitHeroTitle();
      this.initHeroVideo();
      this.initInteractions();
      this.ensureFloatCta();
      setTimeout(() => { this.fixWixWrapper(); this.ensureFloatCta(); }, 300);
      setTimeout(() => { this.fixWixWrapper(); this.ensureFloatCta(); }, 1500);
      setTimeout(() => { this.fixWixWrapper(); this.ensureFloatCta(); }, 4000);
      this.hideCtaOnTagline();
      setTimeout(() => this.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in')), 5000);
    }
    /* Wix Editorで「ストレッチ」していても、本番では <section class="wixui-section"> に
       padding:48px が当たって content が48px右にずれ、結果として右側が切れる現象がある。
       祖先を遡って Wix セクションを見つけ padding/width を viewport全幅にリセットする。 */
    fixWixWrapper() {
      try {
        let el = this.parentElement;
        while (el && el !== document.body && el !== document.documentElement) {
          const isWixSection = el.tagName === 'SECTION' ||
            (el.classList && (el.classList.contains('wixui-section') || (el.id && /^comp-/.test(el.id))));
          if (isWixSection) {
            el.style.cssText += ';padding:0 !important;width:100vw !important;max-width:100vw !important;left:0 !important;right:0 !important;margin-left:0 !important;margin-right:0 !important;';
          }
          el = el.parentElement;
        }
      } catch (e) { /* noop */ }
    }
    /* タグライン（英語メッセージ）の直後（スクロールで通過後）に追従ボタンを隠す */
    hideCtaOnTagline() {
      try {
        const setHidden = (hidden) => {
          const cta1 = document.body.querySelector('a[data-fc-cta="1"]');
          const cta2 = this.querySelector('.float-cta');
          [cta1, cta2].forEach(el => {
            if (!el) return;
            if (hidden) {
              el.style.opacity = '0';
              el.style.pointerEvents = 'none';
              el.style.transform = 'translateY(20px)';
            } else {
              el.style.opacity = '1';
              el.style.pointerEvents = 'auto';
              el.style.transform = '';
            }
          });
        };
        const update = () => {
          const tagline = this.querySelector('.tagline');
          if (!tagline) return;
          const rect = tagline.getBoundingClientRect();
          // タグラインの下端がviewport上端より上＝完全に通過した
          const passed = rect.bottom < 0;
          setHidden(passed);
        };
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update, { passive: true });
        update();
      } catch (e) { /* noop */ }
    }
    /* 「無料相談する」ボタンを確実に表示。
       1) HTML内の元ボタンは残す（最低限の表示を保証）
       2) document.body 直下にもクローンを置いて Wix のラッパー transform を回避し scroll 追従させる
       3) 失敗してもtry/catchで握り、元ボタンは生き続ける */
    ensureFloatCta() {
      try {
        const isMobile = window.innerWidth < 768;
        const styleStr = (
          'position:fixed !important;' +
          (isMobile
            ? 'bottom:18px;right:18px;left:auto;padding:10px 18px;border-radius:40px;font-size:13px;'
            : 'bottom:30px;right:30px;left:auto;padding:20px 32px;border-radius:50px;font-size:14px;') +
          'z-index:2147483647;background:#C2A06D;color:#0A0907;' +
          "font-family:'Shippori Mincho B1','Noto Serif JP',serif;" +
          'font-weight:500;letter-spacing:0.1em;' +
          'display:flex;align-items:center;gap:14px;text-decoration:none;' +
          'box-shadow:0 12px 40px rgba(194,160,109,0.45);' +
          'transition:transform .4s,box-shadow .4s;'
        );
        // body直下に既に存在すれば再作成しない（mobile/desktopの切替だけ更新）
        let bodyCta = document.body.querySelector('a[data-fc-cta="1"]');
        if (!bodyCta) {
          bodyCta = document.createElement('a');
          bodyCta.setAttribute('data-fc-cta', '1');
          bodyCta.href = 'https://www.from-creativity.com/contact';
          bodyCta.target = '_top';
          bodyCta.setAttribute('aria-label', '無料相談する（お問い合わせページへ）');
          bodyCta.innerHTML = '無料相談する<span style="font-size:18px;line-height:1;display:inline-block">→</span>';
          bodyCta.addEventListener('mouseenter', () => {
            bodyCta.style.transform = 'translateY(-4px) scale(1.04)';
            bodyCta.style.boxShadow = '0 20px 50px rgba(194,160,109,0.55)';
          });
          bodyCta.addEventListener('mouseleave', () => {
            bodyCta.style.transform = '';
            bodyCta.style.boxShadow = '0 12px 40px rgba(194,160,109,0.45)';
          });
          document.body.appendChild(bodyCta);
        }
        bodyCta.style.cssText = styleStr;
        // 元のHTML側 .float-cta は重複防止のため非表示にする
        const local = this.querySelector('.float-cta');
        if (local) local.style.display = 'none';
      } catch (e) {
        // body直下挿入が失敗したら、element内の元ボタンを表示・position:fixed で動かす
        const local = this.querySelector('.float-cta');
        if (local) {
          local.style.display = '';
          local.style.cssText += ';position:fixed !important;bottom:30px;right:30px;z-index:99999;';
        }
      }
    }
    disconnectedCallback() {
      const cta = document.body.querySelector('a[data-fc-cta="1"]');
      if (cta) cta.remove();
      if (this._heroFullscreenUpdate) {
        document.removeEventListener('fullscreenchange', this._heroFullscreenUpdate);
        document.removeEventListener('webkitfullscreenchange', this._heroFullscreenUpdate);
      }
    }
    splitHeroTitle() {
      const h1 = this.querySelector('.hero h1');
      if (!h1) return;
      /* 左右分割版では行単位アニメーションをCSSで行うため、文字分割しない */
      if (h1.querySelector('.hero-title-line')) return;
      const walk = (node) => {
        const out = [];
        node.childNodes.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent;
            for (let i = 0; i < text.length; i++) {
              const c = text[i];
              if (c.trim()) {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = c;
                span.style.animationDelay = (0.04 * out.length) + 's';
                out.push(span);
              } else {
                out.push(document.createTextNode(c));
              }
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            out.push(child.cloneNode(true));
          }
        });
        return out;
      };
      const newNodes = walk(h1);
      h1.innerHTML = '';
      newNodes.forEach(n => h1.appendChild(n));
    }
    /*
       ヒーロー動画：
       - muted + playsinline で自動再生制限に対応
       - 音声は必ずオフで開始し、ユーザー操作時だけオンにする
       - 自動再生できない環境でも「再生／最初から見る」から開始できる
       - PCは動画ユニット、iPhoneはvideo要素を全画面表示できる
    */
    initHeroVideo() {
      try {
        const video = this.querySelector('.hero-video-player');
        if (!video) return;

        const restartButton = this.querySelector('.hero-restart');
        const soundButton = this.querySelector('.hero-sound');
        const soundLabel = this.querySelector('.hero-sound-label');
        const pauseButton = this.querySelector('.hero-pause');
        const playIcon = this.querySelector('.hero-play-icon');
        const playLabel = this.querySelector('.hero-play-label');
        const fullscreenButton = this.querySelector('.hero-fullscreen');
        const fullscreenLabel = this.querySelector('.hero-fullscreen-label');
        const fullscreenTarget = this.querySelector('.hero-visual');
        const progress = this.querySelector('.hero-progress span');
        const status = this.querySelector('.hero-status');
        let userPaused = false;

        /* HTML属性だけでなくpropertyも先に設定するのがSafari対策 */
        video.defaultMuted = true;
        video.muted = true;
        video.volume = 1;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        const announce = (message) => {
          if (status) status.textContent = message;
        };
        const updateSound = () => {
          const soundOn = !video.muted && video.volume > 0;
          if (soundButton) {
            soundButton.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
            soundButton.setAttribute('aria-label', soundOn ? '音声をオフにする' : '音声をオンにする');
          }
          if (soundLabel) soundLabel.textContent = soundOn ? '音声をオフ' : '音声をオン';
        };
        const updatePlay = () => {
          const isPlaying = !video.paused && !video.ended;
          if (pauseButton) {
            pauseButton.setAttribute('aria-pressed', isPlaying ? 'false' : 'true');
            pauseButton.setAttribute('aria-label', isPlaying ? '動画を一時停止する' : '動画を再生する');
          }
          if (playIcon) playIcon.textContent = isPlaying ? 'Ⅱ' : '▶';
          if (playLabel) playLabel.textContent = isPlaying ? '一時停止' : '再生';
        };
        const updateProgress = () => {
          if (!progress) return;
          const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
          const ratio = duration ? Math.min(1, Math.max(0, video.currentTime / duration)) : 0;
          progress.style.transform = 'scaleX(' + ratio + ')';
        };
        const setFullscreenState = (active) => {
          if (fullscreenButton) {
            fullscreenButton.setAttribute('aria-pressed', active ? 'true' : 'false');
            fullscreenButton.setAttribute('aria-label', active ? '全画面表示を終了する' : '動画を全画面で見る');
          }
          if (fullscreenLabel) fullscreenLabel.textContent = active ? '全画面を終了' : '全画面';
        };
        const updateFullscreen = () => {
          const activeElement = document.fullscreenElement || document.webkitFullscreenElement;
          setFullscreenState(Boolean(activeElement && fullscreenTarget && activeElement === fullscreenTarget));
        };
        this._heroFullscreenUpdate = updateFullscreen;
        const markReady = () => {
          video.classList.add('is-ready');
          updatePlay();
        };
        const playVideo = (fromUser) => {
          if (!fromUser && userPaused) return;
          const result = video.play();
          if (result && typeof result.then === 'function') {
            result.then(() => {
              markReady();
              updatePlay();
            }).catch(() => {
              /* iOS省電力モード等では自動再生を拒否する場合がある。手動ボタンを残す */
              video.classList.add('is-ready');
              updatePlay();
              announce('再生ボタンを押すと動画が始まります');
            });
          }
        };

        if (video.readyState >= 2) markReady();
        video.addEventListener('loadeddata', markReady, { once: true });
        video.addEventListener('canplay', markReady, { once: true });
        video.addEventListener('play', updatePlay);
        video.addEventListener('pause', updatePlay);
        video.addEventListener('volumechange', updateSound);
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('durationchange', updateProgress);
        video.addEventListener('webkitbeginfullscreen', () => setFullscreenState(true));
        video.addEventListener('webkitendfullscreen', () => setFullscreenState(false));
        document.addEventListener('fullscreenchange', updateFullscreen);
        document.addEventListener('webkitfullscreenchange', updateFullscreen);
        video.addEventListener('error', () => {
          announce('動画を読み込めませんでした。通信環境をご確認ください');
          updatePlay();
        });

        if (restartButton) {
          restartButton.addEventListener('click', () => {
            userPaused = false;
            try { video.currentTime = 0; } catch (e) { /* metadata待ち */ }
            playVideo(true);
            announce('コンセプトムービーを最初から再生します');
          });
        }
        if (soundButton) {
          soundButton.addEventListener('click', () => {
            video.muted = !video.muted;
            if (!video.muted) video.volume = 1;
            userPaused = false;
            if (video.paused) playVideo(true);
            updateSound();
            announce(video.muted ? '音声をオフにしました' : '音声をオンにしました');
          });
        }
        if (pauseButton) {
          pauseButton.addEventListener('click', () => {
            if (video.paused) {
              userPaused = false;
              playVideo(true);
              announce('動画を再生します');
            } else {
              userPaused = true;
              video.pause();
              announce('動画を一時停止しました');
            }
            updatePlay();
          });
        }
        if (fullscreenButton && fullscreenTarget) {
          fullscreenButton.addEventListener('click', async () => {
            try {
              const activeElement = document.fullscreenElement || document.webkitFullscreenElement;
              if (activeElement) {
                if (document.exitFullscreen) {
                  await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
                }
                announce('全画面表示を終了しました');
                return;
              }
              if (fullscreenTarget.requestFullscreen) {
                await fullscreenTarget.requestFullscreen();
              } else if (fullscreenTarget.webkitRequestFullscreen) {
                fullscreenTarget.webkitRequestFullscreen();
              } else if (video.webkitEnterFullscreen) {
                /* iPhone Safariではvideo要素のネイティブ全画面を使用 */
                video.webkitEnterFullscreen();
              }
              setFullscreenState(true);
              announce('動画を全画面で表示します');
            } catch (e) {
              try {
                if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
              } catch (fallbackError) {
                announce('このブラウザでは全画面表示を利用できません');
              }
            }
          });
        }

        updateSound();
        updatePlay();
        updateProgress();
        updateFullscreen();

        /* Wix内で接続直後にautoplay属性の評価が遅れる場合にも再試行 */
        requestAnimationFrame(() => playVideo(false));
        setTimeout(() => playVideo(false), 650);
      } catch (e) { /* ポスター表示とHTMLの標準autoplayをフォールバックにする */ }
    }
    initInteractions() {
      const root = this;
      const toggle = root.querySelector('#navToggle');
      const menu = root.querySelector('#navMenu');
      if (toggle && menu) {
        toggle.addEventListener('click', () => {
          const open = menu.classList.toggle('is-open');
          toggle.classList.toggle('is-open', open);
        });
      }
      // メニューリンクのスムーズスクロール
      const navLinks = root.querySelectorAll('nav.top ul a, .news-list a[href^="#"]');
      navLinks.forEach(a => {
        a.addEventListener('click', (ev) => {
          const href = a.getAttribute('href') || '';
          // 外部リンクや /contact 等はそのまま
          if (!href.startsWith('#')) {
            // モバイルメニュー閉じるだけ
            if (menu && toggle) { menu.classList.remove('is-open'); toggle.classList.remove('is-open'); }
            return;
          }
          ev.preventDefault();
          const isTop = a.dataset.scrollTop === '1' || href === '#' || href === '#top';
          let targetY = 0;
          const navEl = root.querySelector('nav.top');
          const navH = (navEl ? navEl.offsetHeight : 60) + 12;
          if (isTop) {
            targetY = 0;
          } else {
            const target = root.querySelector(href);
            if (target) {
              const rect = target.getBoundingClientRect();
              targetY = window.scrollY + rect.top - navH;
            }
          }
          // ヒーローを上書きしてしまうほど上にいかないよう0で下限
          targetY = Math.max(0, targetY);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          if (menu && toggle) { menu.classList.remove('is-open'); toggle.classList.remove('is-open'); }
        });
      });
      // ロゴクリックでもトップへ
      const logo = root.querySelector('nav.top .logo');
      if (logo) {
        logo.addEventListener('click', (ev) => {
          ev.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        root.querySelectorAll('.reveal').forEach(el => io.observe(el));
      } else {
        root.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      }
    }
  }
  customElements.define('from-creativity-page-v4', FromCreativityPageV4);
})();
