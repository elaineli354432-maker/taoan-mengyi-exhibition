import { Link, useParams } from 'react-router-dom'
import { LuWangSection } from '../components/LuWangSection'
import { QiBiaojiaSection } from '../components/QiBiaojiaSection'
import { SceneImage } from '../components/SceneImage'

const placeholders: Record<string, { title: string; subtitle: string; image: string; event: string; summary: string }> = {
  huxinting: {
    title: '一痕、一点、一芥',
    subtitle: '《湖心亭看雪》',
    image: 'huxinting',
    event: 'huxinting',
    summary: '本专题将围绕西湖雪夜、原文细读、局部地图和相关年谱展开。第一轮先保留入口，避免在未核对前扩写原文。',
  },
  'jinshan-night-opera': {
    title: '夜半张灯',
    subtitle: '《金山夜戏》',
    image: 'jinshan',
    event: 'jinshan',
    summary: '本专题将聚焦夜戏、寺院空间和晚明游赏组织。第一轮先建立路由和入口。',
  },
  'xihu-incense-market': {
    title: '西湖旧梦',
    subtitle: '从香市繁华到城市凋零',
    image: 'zhaoqing',
    event: 'zhaoqing',
    summary: '本专题将连接西湖香市、昭庆寺火灾与杭州城市变化。第一轮先建立路由和入口。',
  },
}

export function ExhibitionPage() {
  const { slug = '' } = useParams()

  if (slug === 'southern-ming') {
    return (
      <main className="exhibition-detail southern-ming-exhibition">
        <header className="exhibition-head">
          <Link to="/exhibitions">← 返回专题展览</Link>
          <p>专题展览</p>
          <h1>南明余影</h1>
          <span>鲁王、祁氏兄弟与张岱的后半生</span>
          <small>本专题沿用现有鲁王与祁世培视觉素材。文本来源仍需在第二轮数据重构中进一步标注《陶庵梦忆》《石匮书》及现代策展说明。</small>
        </header>
        <LuWangSection />
        <QiBiaojiaSection />
      </main>
    )
  }

  const item = placeholders[slug] || placeholders.huxinting

  return (
    <main className="sub-page exhibition-detail">
      <header className="page-head">
        <Link to="/exhibitions">← 返回专题展览</Link>
        <p>{item.subtitle}</p>
        <h1>{item.title}</h1>
        <span>{item.summary}</span>
      </header>
      <section className="exhibition-placeholder">
        <SceneImage kind={item.image} variant={item.event} />
        <div>
          <p>第一轮重构说明</p>
          <h2>专题结构已预留</h2>
          <span>后续轮次会补入事件过程、局部地图、原文细读、人物和年代背景；本轮不擅自扩写未核对文本。</span>
          <div><Link to={`/timeline?event=${item.event}`}>查看年谱节点</Link><Link to={`/read?chapter=${item.event}`}>进入阅读器</Link></div>
        </div>
      </section>
    </main>
  )
}
