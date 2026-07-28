import { Link } from 'react-router-dom'
import { events, stageRecords, type EventRecord } from '../data/records'
import { SceneImage } from '../components/SceneImage'

const stageIds = stageRecords.map((stage) => ({ id: stage.id, number: stage.number, title: stage.title }))

const byId = (id: string) => events.find((event) => event.id === id)!
const pick = (ids: string[]) => ids.map(byId).filter(Boolean)

function EventCard({ event, compact = false }: { event: EventRecord; compact?: boolean }) {
  const chapterId = event.relatedChapterIds?.[0] ?? event.id

  return (
    <article className={compact ? 'home-event compact' : 'home-event'}>
      <SceneImage kind={event.heroImage ?? event.id} variant={event.id} />
      <div>
        <p className="event-meta">{event.displayDate} · {event.sourceChapter ?? event.title}</p>
        <h3>{event.title}</h3>
        <p className="event-summary">{event.curatorialSummary}</p>
        <p className="event-work">关联篇目 · {event.sourceWork ? `《${event.sourceWork}》` : '待核对'}</p>
        <div className="event-links">
          <Link to={`/timeline?event=${event.id}`}>年谱</Link>
          <Link to={`/map?event=${event.id}`}>行迹</Link>
          <Link to={`/read?chapter=${chapterId}`}>原文</Link>
        </div>
      </div>
    </article>
  )
}

export function DreamPage() {
  const youth = pick(['xuanyaoting', 'nanzhen', 'lanxue', 'qinpai'])
  const prosperity = pick(['fengmen', 'jinshan', 'zhongqiu', 'buxiyuan'])
  const huxinting = byId('huxinting')
  const sideObsessions = pick(['tea-obsession', 'qin-obsession', 'garden-obsession'])
  const decline = pick(['lanterns', 'zhaoqing', 'famine', 'roadblock'])
  const afterDream = pick(['mingwang', 'books', 'shanzhong', 'old-zhangdai'])

  return (
    <main className="dream-page narrative-home">
      <nav className="home-progress" aria-label="五幕进度">
        {stageIds.map((stage) => <a href={`#${stage.id}`} key={stage.id}><span>{stage.number}</span>{stage.title}</a>)}
      </nav>

      <section id="top" className="dream-hero">
        <SceneImage kind="snow" variant="cover" />
        <div className="dream-hero-copy">
          <h1>陶庵一梦</h1>
          <h2>从《陶庵梦忆》进入张岱的一生</h2>
          <p>五十年来，总成一梦。</p>
          <span>向下滚动</span>
        </div>
      </section>

      <section id="act-1" className="home-act act-youth">
        <header>
          <span>01 少年有梦</span>
          <h2>感官与审美如何形成</h2>
          <p>书亭、祈梦、茶事与琴声，先于功名和乱世，塑造了张岱感受世界的方式。</p>
        </header>
        <div className="home-feature">
          <SceneImage kind={youth[1].heroImage ?? youth[1].id} variant={youth[1].id} />
          <div>
            <p className="event-meta">{youth[1].displayDate} · 南镇</p>
            <h3>{youth[1].title}</h3>
            <p>{youth[1].curatorialSummary}</p>
            <div className="event-links"><Link to="/timeline?event=nanzhen">回到年谱</Link><Link to="/read?chapter=nanzhen">核对篇目</Link></div>
          </div>
        </div>
        <div className="home-branch-grid">
          {[youth[0], youth[2], youth[3]].map((event) => <EventCard event={event} compact key={event.id} />)}
        </div>
      </section>

      <section id="act-2" className="home-act act-prosperity">
        <header>
          <span>02 人间繁华</span>
          <h2>他是晚明繁华的参与者</h2>
          <p>张岱不是站在岸边记录热闹的人。他组织夜戏，经营园林，也把城市的声色写进记忆。</p>
        </header>
        <div className="home-event-list">
          {prosperity.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
        <p className="light-link">白洋潮等次要事件保留在完整年谱中：<Link to="/timeline?event=baiyang">查看白洋潮</Link></p>
      </section>

      <section id="act-3" className="home-act act-huxinting">
        <header>
          <span>03 天地一痴</span>
          <h2>湖心亭成为全站的精神中心</h2>
          <p>极寒、空湖、小舟与两三人，把张岱的“痴”从热闹中抽离出来，凝成一个清冷的文学瞬间。</p>
        </header>
        <div className="huxinting-center">
          <SceneImage kind={huxinting.heroImage ?? huxinting.id} variant={huxinting.id} />
          <aside>
            <p className="verified-label">《陶庵梦忆》原文摘录</p>
            <p className="original-snippet">{huxinting.originalQuote}</p>
            <p>{huxinting.curatorialSummary}</p>
            <div className="event-links"><Link to="/read?chapter=huxinting">阅读完整原文</Link><Link to="/timeline?event=huxinting">回到1632年</Link><Link to="/map?event=huxinting">查看西湖位置</Link></div>
          </aside>
        </div>
        <div className="home-branch-grid subtle">
          {sideObsessions.map((event) => <EventCard event={event} compact key={event.id} />)}
        </div>
      </section>

      <section id="act-4" className="home-act act-decline">
        <header>
          <span>04 灯火将尽</span>
          <h2>繁华开始失去支撑</h2>
          <p>灯仍然亮着，但城市、寺院、道路与粮食已经一层层松动。</p>
        </header>
        <div className="decline-steps">
          {decline.map((event, index) => <EventCard event={event} compact={index > 0} key={event.id} />)}
          <article className="fall-note">
            <span>1644</span>
            <h3>明亡</h3>
            <p>宏大战争不在这里成为奇观。它只是让此前所有热闹，突然变成需要保存的旧梦。</p>
            <Link to="/timeline?event=mingwang">进入年谱节点</Link>
          </article>
        </div>
      </section>

      <section id="act-5" className="home-act act-afterdream">
        <header>
          <span>05 总成一梦</span>
          <h2>用文字保存已经消失的世界</h2>
          <p>国破、书散、入山与著述，不再只是结局，而是《陶庵梦忆》被写下的理由。</p>
        </header>
        <div className="home-event-list final">
          {afterDream.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
        <div className="dream-ending">
          <p>现实中的世界消失以后，文字成为张岱保存它的方式。</p>
          <div><Link to="/timeline">查看完整年谱</Link><Link to="/map">重游张岱行迹</Link><Link to="/read">阅读《陶庵梦忆》</Link></div>
        </div>
      </section>

      <section className="exhibition-teaser">
        <p>专题展览</p>
        <h2>从一篇、一地、一场变局继续进入</h2>
        <div>
          <Link to="/exhibitions/huxinting">一痕、一点、一芥</Link>
          <Link to="/exhibitions/jinshan-night-opera">夜半张灯</Link>
          <Link to="/exhibitions/xihu-incense-market">西湖旧梦</Link>
          <Link to="/exhibitions/southern-ming">南明余影</Link>
        </div>
      </section>
    </main>
  )
}
