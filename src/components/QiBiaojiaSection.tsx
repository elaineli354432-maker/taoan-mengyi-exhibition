import { useState } from 'react'
import { qiDreamSection } from '../data/qiBiaojiaTimeline'
import { assetUrl } from '../utils/assetUrl'

export function QiBiaojiaSection() {
  const [expanded, setExpanded] = useState(false)

  return <section id="qi-biaojia" className="qi-act-page">
    <header className="qi-act-head">
      <div className="qi-act-head-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(12, 24, 26, .96) 0%, rgba(12, 24, 26, .65) 42%, rgba(12, 24, 26, .12) 76%), url('${assetUrl('/images/qi-dream-shikui-whisper.webp')}')` }} aria-hidden="true"/>
      <div className="qi-act-head-copy">
        <p>07 · 亡友入梦</p>
        <h2>祁世培入梦</h2>
        <span>亡友在梦中劝他还山，并以一句“完《石匮书》”改写后半生</span>
        <button className="scene-text-button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
          {expanded ? '收起全部原文' : '查看全部原文'} <b>{expanded ? '−' : '+'}</b>
        </button>
        <em>向右，进入祁世培入梦的五个场景 →</em>
      </div>
    </header>

    {expanded && (
      <article className="lu-original-panel qi-original-panel">
        <p>{qiDreamSection.source}</p>
        <blockquote>{qiDreamSection.originalText}</blockquote>
      </article>
    )}

    <div className="qi-act-scenes" aria-label="祁世培入梦五组图像素材">
      {qiDreamSection.scenes.map((item, index) => <article key={`${item.year}-${item.title}`} className="qi-act-scene">
        <img loading="lazy" decoding="async" src={assetUrl(item.image)} alt={`${item.title} 场景插画`}/>
        <div className="qi-act-overlay">
          <p>{item.year} · {item.theme}</p>
          <h3>{item.title}</h3>
          <div className="qi-dialogue">
            {item.dialogue.map((line) => <blockquote key={line}>{line}</blockquote>)}
          </div>
          <div className="qi-act-note"><b>梦意</b><span>{item.note}</span></div>
        </div>
        {index < qiDreamSection.scenes.length - 1 && <span className="qi-scene-next">继续向右 →</span>}
      </article>)}
    </div>

    <aside className="lu-qi-bridge">
      <img loading="lazy" decoding="async" src={assetUrl('/images/qi-return-to-writing.webp')} alt="张岱归山著史的山路场景"/>
      <p className="chapter-kicker">转场</p>
      <h3>一个让他看见南明，一个让他回到山中</h3>
      <p>鲁王过越，是南明政治在张岱生活中的一次短暂显影。它带着接驾、宴饮、演戏与旧臣礼仪，像亡国之后临时搭起的一方戏台。</p>
      <p>祁世培入梦，则是张岱精神世界中的一次转向。亡友以梦的形式出现，告诉他天下事已不可为，并嘱他完成《石匮书》。</p>
      <p>一个让张岱看见南明仍在挣扎的余影；一个让张岱意识到旧世界只能通过文字保存。</p>
    </aside>
    <div id="writing-history" className="writing-transition" style={{ backgroundImage: `linear-gradient(90deg, rgba(11, 22, 24, .88), rgba(11, 22, 24, .3)), url('${assetUrl('/images/qi-return-to-writing.webp')}')` }}>
      鲁王带来的是南明政治的残影；祁世培带来的是亡友入梦的劝归。<br/>此后，张岱真正走向山中，也真正走向他的后半生使命：以《石匮书》保存故国，以《陶庵梦忆》保存旧梦。
    </div>
  </section>
}
