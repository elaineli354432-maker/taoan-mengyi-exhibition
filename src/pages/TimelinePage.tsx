import { Link, useSearchParams } from 'react-router-dom'
import { events, stageRecords, getLocation, getPrimaryChapterForEvent, type DateCertainty } from '../data/records'
import { SceneImage } from '../components/SceneImage'
import { useState } from 'react'

const history = [
  ['1627', '崇祯即位，试图整饬朝局。'],
  ['1640', '灾荒与战乱加剧，社会秩序日益紧张。'],
  ['1644', '李自成入北京，崇祯帝自缢，明北京政权覆亡。'],
  ['1645', '清军南下，南明局势与江南社会剧烈变化。'],
  ['清初', '新秩序逐步建立，遗民写作成为保存旧世界的方式之一。'],
]

const certaintyLabel: Record<DateCertainty, string> = {
  exact: '可确认',
  inferred: '据篇目推定',
  approximate: '约略时间',
  unknown: '时间待核对',
}

export function TimelinePage() {
  const [params] = useSearchParams()
  const [filter, setFilter] = useState('全部')
  const target = params.get('event')
  const visible = events.filter((event) => (filter === '全部' || event.stageId === filter) && (target ? event.id === target : true))

  return (
    <main className="sub-page timeline-page">
      <header className="page-head"><p>CHRONICLE</p><h1>张岱年谱</h1><span>年谱节点、地图与阅读器共用同一套事件数据。</span></header>
      <div className="timeline-filter">
        <button className={filter === '全部' ? 'on' : ''} onClick={() => setFilter('全部')}>全部</button>
        {stageRecords.map((stage) => <button className={filter === stage.id ? 'on' : ''} onClick={() => setFilter(stage.id)} key={stage.id}>{stage.title}</button>)}
      </div>
      <div className="timeline-layout">
        <aside>
          <span>1597—1646</span>
          <b>人生年谱</b>
          <small>实心圆 · 可确认<br />空心圆 · 推定<br />虚线圆 · 约略<br />短横线 · 待核对</small>
        </aside>
        <section>
          {visible.map((event) => {
            const locations = event.locationIds.map(getLocation).filter(Boolean)
            const chapter = getPrimaryChapterForEvent(event.id)
            const readTarget = chapter?.id ?? event.id

            return (
              <article className="chrono-event" key={event.id}>
                <div className="chrono-year">
                  <i className={event.dateCertainty} title={certaintyLabel[event.dateCertainty]} />
                  <b>{event.displayDate}</b>
                  <span>张岱 {event.age}</span>
                </div>
                <SceneImage kind={event.heroImage ?? event.id} variant={event.id} />
                <div className="chrono-copy">
                  <p>{locations.map((location) => location?.modernName).join(' / ') || '地点待核对'} · {event.sourceChapter ?? '篇目待核对'}</p>
                  <h2>{event.title}</h2>
                  {event.originalQuoteVerified && event.originalQuote ? (
                    <blockquote>{event.originalQuote}</blockquote>
                  ) : (
                    <p className="curatorial-note">策展叙述 · 原文摘录待核对</p>
                  )}
                  <span>{event.curatorialSummary}</span>
                  <div><Link to={`/map?event=${event.id}`}>地图中查看</Link><Link to={`/read?chapter=${readTarget}`}>阅读原文</Link></div>
                </div>
              </article>
            )
          })}
        </section>
        <aside className="history-line"><b>明末大事</b>{history.map(([year, text]) => <p key={year}><strong>{year}</strong> · {text}</p>)}</aside>
      </div>
    </main>
  )
}
