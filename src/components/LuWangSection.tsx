import { useState } from 'react'
import { luWangSection } from '../data/luWangSection'
import { assetUrl } from '../utils/assetUrl'

const notes: Record<string, string> = {
  南明: '明亡后延续的政权与抗清力量。',
  鲁王: '朱以海，南明鲁王与监国人物。',
  朱以海: '流寓越地时，短暂进入张岱的生活世界。',
  旧臣之家: '仓促接驾、设座献茶的私人宅第。',
  陈洪绶: '字章侯，晚明画家，与张岱交游密切。',
  演戏: '接驾宴饮中的戏曲安排，也使这次相遇带有戏剧性。',
  亡国余影: '旧礼仪尚存，而稳定的王朝秩序已经消失。',
}

export function LuWangSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id={luWangSection.id} className="lu-act-section">
      <header className="lu-act-head">
        <div className="lu-act-head-copy">
          <p className="chapter-kicker">06 · 南明余影</p>
          <h2>{luWangSection.title}</h2>
          <span>{luWangSection.subtitle}</span>
          <p>{luWangSection.intro}</p>
          <div className="lu-keywords" aria-label="关键词说明">
            {luWangSection.keywords.map((word) => <span key={word} title={notes[word]}>{word}</span>)}
          </div>
          <button className="scene-text-button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
            {expanded ? '收起全部原文' : '查看全部原文'} <b>{expanded ? '−' : '+'}</b>
          </button>
        </div>
      </header>

      {expanded && (
        <article className="lu-original-panel">
          <p>{luWangSection.source}</p>
          <blockquote>{luWangSection.originalText}</blockquote>
        </article>
      )}

      <div className="lu-act-scenes" aria-label="鲁王过越五组图像素材">
        {luWangSection.scenes.map((scene, index) => (
          <article id={`lu-${scene.id}`} className="lu-act-scene" key={scene.id}>
            <img loading="lazy" decoding="async" src={assetUrl(scene.image)} alt="" aria-hidden="true" />
            <div className="lu-act-overlay">
              <p>{String(index + 1).padStart(2, '0')} · {scene.year} · {scene.place}</p>
              <h3>{scene.title}</h3>
              <blockquote>{scene.quote}</blockquote>
              <div className="on-image-text">
                <p>{scene.text}</p>
              </div>
            </div>
            {index < luWangSection.scenes.length - 1 && <span className="scene-next">继续向右 →</span>}
          </article>
        ))}
      </div>
    </section>
  )
}
