import { Link } from 'react-router-dom'
import { dreamEvents, stages } from '../data/dreamEvents'
import { SceneImage } from '../components/SceneImage'
import { JourneyAtlas } from '../components/JourneyAtlas'
import { LifeRoute } from '../components/LifeRoute'
import { HistoryComparison } from '../components/HistoryComparison'
import { LuWangSection } from '../components/LuWangSection'
import { QiBiaojiaSection } from '../components/QiBiaojiaSection'
import { SectionNav } from '../components/SectionNav'

export function DreamPage() {
  return <main className="dream-page">
    <SectionNav/>
    <section id="top" className="dream-hero">
      <SceneImage kind="snow" variant="cover"/>
      <div className="dream-hero-copy">
        <p>TAO’AN MENGYI · A DIGITAL EXHIBITION</p>
        <h1>陶庵一梦</h1>
        <h2>从《陶庵梦忆》进入张岱的一生</h2>
        <span>向下，重游旧梦</span>
      </div>
    </section>

    <section className="act-portal-grid" aria-label="五幕叙事">
      {stages.map((stage, index) => {
        const event = dreamEvents.find((item) => item.stage === stage)!
        return <Link to={`/dream/${encodeURIComponent(stage)}`} className={`act-portal portal-${index + 1}`} key={stage}>
          <SceneImage kind={event.image} variant={event.id}/>
          <div><p>第 {['一', '二', '三', '四', '五'][index]} 幕 · {event.year}</p><h2>{stage}</h2><span>进入 {event.title} →</span></div>
        </Link>
      })}
    </section>

    <JourneyAtlas/>
    <LifeRoute/>
    <HistoryComparison/>
    <LuWangSection/>
    <QiBiaojiaSection/>

    <section className="dream-ending">
      <p>鸡鸣枕上，夜气方回。因想余生平，繁华靡丽，过眼皆空，五十年来，总成一梦。</p>
      <div><Link to="/timeline">查看完整年谱</Link><Link to="/map">重游张岱行迹</Link><Link to="/read">打开《陶庵梦忆》</Link></div>
    </section>
  </main>
}
