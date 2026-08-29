'use client';

import { useMemo, useState } from 'react';

type Festival = {
  name: string;
  english: string;
  image: string;
  note: string;
  pairs: [{ name: string; image: string }, { name: string; image: string }];
};

const festivals: Festival[] = [
  { name: '春節', english: 'LUNAR NEW YEAR', image: '/assets/lunar-new-year.png', note: '迎新納福', pairs: [{ name: '紅包', image: '/assets/feature-red-envelope.png' }, { name: '春聯', image: '/assets/feature-spring-couplet.png' }] },
  { name: '元宵節', english: 'LANTERN FESTIVAL', image: '/assets/lantern-festival.png', note: '燈火團圓', pairs: [{ name: '燈籠', image: '/assets/feature-lantern.png' }, { name: '湯圓', image: '/assets/feature-tangyuan.png' }] },
  { name: '清明節', english: 'TOMB-SWEEPING DAY', image: '/assets/tomb-sweeping.png', note: '春日追思', pairs: [{ name: '潤餅', image: '/assets/feature-popiah.png' }, { name: '掃墓', image: '/assets/feature-memorial.png' }] },
  { name: '端午節', english: 'DRAGON BOAT FESTIVAL', image: '/assets/dragon-boat.png', note: '鼓聲競渡', pairs: [{ name: '粽子', image: '/assets/feature-zongzi.png' }, { name: '龍舟', image: '/assets/feature-dragon-boat.png' }] },
  { name: '七夕', english: 'QIXI FESTIVAL', image: '/assets/qixi.png', note: '星河相會', pairs: [{ name: '鵲橋', image: '/assets/feature-magpie-bridge.png' }, { name: '喜鵲', image: '/assets/feature-magpie.png' }] },
  { name: '中元節', english: 'GHOST FESTIVAL', image: '/assets/ghost-festival.png', note: '祈福平安', pairs: [{ name: '供品', image: '/assets/feature-offerings.png' }, { name: '平安燈', image: '/assets/feature-peace-lantern.png' }] },
  { name: '中秋節', english: 'MID-AUTUMN FESTIVAL', image: '/assets/mid-autumn.png', note: '賞月分享', pairs: [{ name: '月餅', image: '/assets/feature-mooncake.png' }, { name: '柚子', image: '/assets/feature-pomelo.png' }] },
  { name: '重陽節', english: 'DOUBLE NINTH FESTIVAL', image: '/assets/double-ninth.png', note: '登高敬老', pairs: [{ name: '菊花', image: '/assets/feature-chrysanthemum.png' }, { name: '登高', image: '/assets/feature-hiking.png' }] },
  { name: '冬至', english: 'WINTER SOLSTICE', image: '/assets/winter-solstice.png', note: '冬日圍聚', pairs: [{ name: '冬至湯圓', image: '/assets/feature-winter-tangyuan.png' }, { name: '火鍋', image: '/assets/feature-hot-pot.png' }] },
  { name: '兒童節', english: "CHILDREN'S DAY", image: '/assets/childrens-day.png', note: '玩心全開', pairs: [{ name: '氣球', image: '/assets/feature-balloons.png' }, { name: '玩具火車', image: '/assets/feature-toy-train.png' }] },
  { name: '母親節', english: "MOTHER'S DAY", image: '/assets/mothers-day.png', note: '把愛說出來', pairs: [{ name: '康乃馨', image: '/assets/feature-carnation.png' }, { name: '愛心卡片', image: '/assets/feature-heart-card.png' }] },
  { name: '除夕', english: "NEW YEAR'S EVE", image: '/assets/new-years-eve.png', note: '一家圍爐', pairs: [{ name: '年菜', image: '/assets/feature-new-year-dishes.png' }, { name: '圍爐', image: '/assets/feature-reunion-pot.png' }] },
];

const steps = [
  { number: '01', title: '洗牌與鋪牌', body: '將 48 張牌洗勻，全部正面朝下散放在桌面中央。每位玩家都要伸手拿得到。' },
  { number: '02', title: '輪流翻牌', body: '從最年輕的玩家開始，順時針一次翻開一張牌，翻開後留在原位。' },
  { number: '03', title: '推理節慶關聯', body: '當場上出現有關聯的「節日卡＋特色卡」，立刻喊「配對！」並拍卡。不要靠顏色或編號，要靠圖像與節日常識判斷。' },
  { number: '04', title: '一人最多拍一張', body: '關聯成立時，每位玩家每次最多拍、拿一張牌；最快的兩位不同玩家各拿一張，各得 1 分。' },
];

const variants = [
  { number: '01', title: '親子合作版', body: '不計個人分數，全桌一起找完 24 組關聯。適合第一次玩或年齡差距較大的家庭。' },
  { number: '02', title: '記憶挑戰版', body: '翻開的牌在關聯成立前都留在原位；若翻到沒有關聯的牌，下一輪必須先說出自己記得的牌面。' },
  { number: '03', title: '限時派對版', body: '設定 10 分鐘倒數，時間到立即停止翻牌；已拿到最多牌的玩家獲勝，節奏更快更緊張。' },
  { number: '04', title: '反向線索版', body: '翻到特色卡時，玩家要搶答它可能對應的節日；答對即可拍下該特色卡，答錯本回合不能再拍。' },
];

export default function Home() {
  const [activeFestival, setActiveFestival] = useState(6);
  const [activeStep, setActiveStep] = useState(0);
  const festival = festivals[activeFestival];

  const pairCards = useMemo(() => festival.pairs.map((pair, index) => ({
    key: `${String(activeFestival + 1).padStart(2, '0')}${String.fromCharCode(65 + index)}`,
    feature: pair.name,
    image: pair.image,
  })), [activeFestival, festival]);

  return (
    <main className="site-shell">
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="回到節慶連連拍首頁"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span><strong>節慶連連拍</strong><small>FESTIVAL SNAP</small></span></a>
        <nav className="desktop-nav" aria-label="主要導覽"><a href="#how-to-play">玩法</a><a href="#deck">牌組</a><a href="#rules">規則</a><a href="#variants">變化玩法</a></nav>
        <a className="nav-download" href="/downloads/節慶連連拍_48張牌卡.pdf" download>下載牌卡 <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">A FAST FESTIVAL MATCHING GAME</p><h1>把節日記憶，<br /><em>拍</em>成一場派對。</h1><p className="hero-lead">看見熟悉的節日與特色重逢，先喊、先拍、先得分。三人以上一起玩，讓每一次翻牌都變成全桌的瞬間反應。</p><div className="hero-actions"><a className="button button-primary" href="#how-to-play">先看懂玩法 <span>↓</span></a><a className="button button-quiet" href="/downloads/節慶連連拍_48張牌卡.pdf" download>下載 48 張牌卡 <span>↗</span></a></div><div className="hero-meta"><span><i />3-6 位玩家</span><span><i />約 15 分鐘</span><span><i />6 歲以上</span></div></div>
        <div className="hero-stage" aria-label="中秋節關聯示範"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-note note-left"><span>LOOK</span><strong>找節慶關聯</strong><small>節日 + 特色</small></div><div className="hero-note note-right"><span>SNAP!</span><strong>兩人得分</strong><small>各拿一張</small></div><MiniCard title="中秋節" subtitle="節日卡" image={festivals[6].image} variant="festival" /><MiniCard title="月餅" subtitle="特色卡" image={festivals[6].pairs[0].image} variant="feature" /><span className="stage-spark spark-a">✦</span><span className="stage-spark spark-b">✦</span><span className="stage-spark spark-c">•</span></div>
      </section>

      <section className="stat-strip" aria-label="遊戲資訊"><div><strong>12</strong><span>個節日</span></div><div><strong>24</strong><span>組精準配對</span></div><div><strong>48</strong><span>張遊戲牌卡</span></div><div><strong>2</strong><span>人同回合得分</span></div></section>

      <section className="section how-section" id="how-to-play"><div className="section-heading split-heading"><div><p className="eyebrow">HOW TO PLAY</p><h2>四步驟，<br /><span>拍出你的節日直覺。</span></h2></div><p className="section-intro">遊戲的關鍵不是記住所有牌，而是從節日場景與單一物件中找出文化關聯。牌面不靠顏色或編號提示，讓反應力與觀察力同時上場。</p></div><div className="step-layout"><div className="step-list" role="tablist" aria-label="玩法步驟">{steps.map((step, index) => <button key={step.number} className={`step-button ${activeStep === index ? 'is-active' : ''}`} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index}><span className="step-number">{step.number}</span><span className="step-label"><strong>{step.title}</strong><small>{activeStep === index ? step.body : '點擊查看這一步'}</small></span><span className="step-arrow">↗</span></button>)}</div><div className="step-visual"><div className="visual-topline"><span>ROUND FLOW</span><span>0{activeStep + 1} / 04</span></div><div className="visual-cards"><div className="visual-card visual-card-back"><span>翻開我</span><b>✦</b></div><div className="visual-arrow">→</div><div className="visual-card visual-card-front"><img src={activeStep >= 2 ? festival.pairs[0].image : festival.image} alt={activeStep >= 2 ? `${festival.pairs[0].name}特色插畫` : '節日插畫'} /><span>{activeStep === 3 ? '各拿一張' : activeStep === 2 ? '關聯成立' : activeStep === 1 ? '翻開一張' : '準備開始'}</span></div></div><div className="visual-caption"><span className="caption-dot" />{steps[activeStep].body}</div></div></div></section>

      <section className="section deck-section" id="deck"><div className="section-heading"><p className="eyebrow">THE DECK</p><h2>12 個節日，<span>24 組連連看。</span></h2><p className="section-intro">每個節日各有兩張節日卡，分別對應兩張特色卡。卡面不使用配對顏色或編號，必須從節日與物件的關聯來推理。</p></div><div className="festival-tabs" role="tablist" aria-label="選擇節日">{festivals.map((item, index) => <button key={item.name} className={`festival-tab ${activeFestival === index ? 'is-selected' : ''}`} onClick={() => setActiveFestival(index)} role="tab" aria-selected={activeFestival === index}><span className="tab-dot" />{item.name}</button>)}</div><div className="deck-feature"><div className="deck-feature-image"><img src={festival.image} alt={`${festival.name}節日插畫`} /><span className="image-label">{festival.english}</span></div><div className="deck-feature-copy"><div className="feature-kicker"><span />{festival.name} · {festival.note}</div><h3>一個節日，<br /><em>兩個精準呼應。</em></h3><p>翻到 {festival.name} 的牌，先觀察節慶線索，再從桌面上找出「{festival.pairs[0].name}」或「{festival.pairs[1].name}」等相關特色。特色卡只呈現物件本身，不能直接從牌面看出答案。</p><div className="pair-stack">{pairCards.map((pair, index) => <div className="pair-line" key={pair.key}><span className="pair-index">0{index + 1}</span><strong>{festival.name}</strong><span>＋</span><b>{pair.feature}</b><small>靠關聯性判斷</small></div>)}</div></div></div></section>

      <section className="section rule-section" id="rules"><div className="rule-card"><div className="rule-card-main"><p className="eyebrow">THE CORE RULE</p><h2>一人拍一張，<br /><span>兩人一起得分。</span></h2><p>關聯出現時，所有人同時出手；但每位玩家每次最多拍、拿一張牌，同一回合不能搶第二張。前兩位不同玩家各取走一張，雙方都獲得 1 分。你不只要快，還要先判斷節日與物件是否真的有關。</p><a className="button button-light" href="/downloads/節慶連連拍_48張牌卡.pdf" download>下載完整牌卡 PDF <span>↗</span></a></div><div className="rule-card-side"><span className="side-stamp">SNAP<br />SNAP</span><div><strong>結束條件</strong><p>所有牌翻完後，計算獲得的牌。分數最高者勝出。</p></div><div><strong>誤拍處理</strong><p>沒有合法關聯就拍，退回自己的一張得分牌作為懲罰。</p></div></div></div><div className="rule-notes"><div><span>01</span><strong>牌組構成</strong><p>24 張節日卡＋24 張特色卡。每個節日有兩張節日卡與兩張單一物件特色卡。</p></div><div><span>02</span><strong>一人最多一張</strong><p>每次關聯成立，每位玩家最多拍、拿一張；已經拿到一張就不能再搶第二張。</p></div><div><span>03</span><strong>三人以上</strong><p>為了讓每一組關聯都能由兩位玩家得分，建議 3-6 人遊玩。</p></div></div></section>

      <section className="section variants-section" id="variants"><div className="section-heading"><p className="eyebrow">PLAY IT YOUR WAY</p><h2>四種變化，<br /><span>每一局都能換節奏。</span></h2><p className="section-intro">熟悉基本規則後，可以依照玩家年齡、人數與想要的刺激程度切換玩法。所有變化玩法都保留「一人一次最多拍一張」的安全核心。</p></div><div className="variant-grid">{variants.map((variant) => <article className="variant-card" key={variant.number}><span className="variant-number">{variant.number}</span><h3>{variant.title}</h3><p>{variant.body}</p></article>)}</div><div className="download-row"><div><strong>需要完整列印素材？</strong><span>牌面與牌背分開下載，列印後即可自行裁切使用。</span></div><div className="download-actions"><a className="button button-primary" href="/downloads/節慶連連拍_48張牌卡.pdf" download>下載牌面 PDF <span>↗</span></a><a className="button button-quiet" href="/downloads/節慶連連拍_牌背_48張.pdf" download>下載牌背 PDF <span>↗</span></a></div></div></section>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><strong>節慶連連拍</strong></div><p>把熟悉的節日，變成一場全桌都想再來一局的反應力遊戲。</p><a href="#top">回到頂端 ↑</a></footer>
    </main>
  );
}

function MiniCard({ title, subtitle, image, variant }: { title: string; subtitle: string; image: string; variant: 'festival' | 'feature' }) {
  return <div className={`mini-card mini-card-${variant}`}><div className="mini-card-top"><span>{subtitle}</span><b>看線索</b></div><img src={image} alt="" /><div className="mini-card-bottom"><strong>{title}</strong><span>{variant === 'festival' ? '節日' : '特色'}</span></div></div>;
}
