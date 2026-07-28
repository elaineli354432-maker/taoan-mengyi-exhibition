import { Link } from 'react-router-dom'

const exhibitions = [
  { path: '/exhibitions/huxinting', title: '一痕、一点、一芥', subtitle: '《湖心亭看雪》', note: '以西湖雪夜为中心的原文细读专题。' },
  { path: '/exhibitions/jinshan-night-opera', title: '夜半张灯', subtitle: '《金山夜戏》', note: '围绕夜戏、寺院和晚明游赏组织方式展开。' },
  { path: '/exhibitions/xihu-incense-market', title: '西湖旧梦', subtitle: '从香市繁华到城市凋零', note: '把西湖城市生活与乱世变化并置。' },
  { path: '/exhibitions/southern-ming', title: '南明余影', subtitle: '鲁王、祁氏兄弟与张岱的后半生', note: '承接鲁王过越与祁世培入梦两组既有专题素材。' },
]

export function ExhibitionsPage() {
  return (
    <main className="sub-page exhibitions-page">
      <header className="page-head">
        <p>EXHIBITIONS</p>
        <h1>专题展览</h1>
        <span>专题不进入一级导航；它们从首页、年谱、地图和阅读器的相关节点进入。</span>
      </header>
      <section className="exhibition-grid">
        {exhibitions.map((item) => (
          <Link to={item.path} key={item.path}>
            <p>{item.subtitle}</p>
            <h2>{item.title}</h2>
            <span>{item.note}</span>
          </Link>
        ))}
      </section>
    </main>
  )
}
