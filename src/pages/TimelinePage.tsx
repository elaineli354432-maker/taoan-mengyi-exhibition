import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ResponsiveImage } from '../components/shared/ResponsiveImage'
import { events, type DateCertainty, type EventRecord } from '../data/events'
import { historicalContext } from '../data/historicalContext'
import { getLocation } from '../data/locations'
import { getPrimaryChapterForEvent } from '../data/chapters'
import { stages } from '../data/stages'

const certaintyText: Record<DateCertainty, string> = {
  exact: '确年',
  inferred: '推定',
  approximate: '约略',
  unknown: '',
}

function TimelineEvent({ event, active }: { event: EventRecord; active: boolean }) {
  const chapter = getPrimaryChapterForEvent(event.id)
  const locations = event.locationIds.map(getLocation).filter(Boolean)
  const isMajor = event.weight === 'major'

  return (
    <article id={`event-${event.id}`} className={`timeline-event ${isMajor ? 'is-major' : 'is-minor'} ${active ? 'is-active' : ''}`}>
      <div className="timeline-year">
        <i className={event.dateCertainty} />
        <strong>{event.displayDate}</strong>
        {certaintyText[event.dateCertainty] && <span>{certaintyText[event.dateCertainty]}</span>}
      </div>
      {isMajor && <ResponsiveImage image={event.heroImage ?? event.id} alt={event.title} />}
      <div className="timeline-copy">
        <p>{[event.ageDisplay, locations.map((location) => location?.modernName).join(' / '), event.sourceChapter].filter(Boolean).join(' · ')}</p>
        <h2>{event.title}</h2>
        {event.originalQuoteVerified && event.originalQuote ? <blockquote>{event.originalQuote}</blockquote> : null}
        <span>{event.curatorialText}</span>
        {event.dateSource && <em>日期来源：{event.dateSource}</em>}
        <div className="text-links">
          <Link to={`/map?event=${event.id}&location=${event.locationIds[0]}${event.startYear ? `&year=${event.startYear}` : ''}`}>地图中查看</Link>
          {chapter && <Link to={`/read?chapter=${chapter.id}&event=${event.id}`}>阅读篇目</Link>}
        </div>
      </div>
    </article>
  )
}

export function TimelinePage() {
  const [params] = useSearchParams()
  const [stage, setStage] = useState('all')
  const targetEvent = params.get('event') ?? ''
  const targetYear = params.get('year')
  const visible = useMemo(() => events.filter((event) => stage === 'all' || event.stageId === stage), [stage])

  useEffect(() => {
    const targetId = targetEvent || (targetYear ? events.find((event) => event.startYear === Number(targetYear))?.id : '')
    if (!targetId) return
    window.setTimeout(() => document.getElementById(`event-${targetId}`)?.scrollIntoView({ block: 'center' }), 80)
  }, [targetEvent, targetYear])

  return (
    <main className="sub-page timeline-page">
      <header className="page-head">
        <p>年谱</p>
        <h1>在时间中重排旧梦</h1>
        <span>年谱不是首页故事的重复，而是把事件、地点、篇目和日期可信度放回同一条研究线索中。</span>
      </header>

      <div className="timeline-filter">
        <button className={stage === 'all' ? 'on' : ''} onClick={() => setStage('all')}>全部</button>
        {stages.map((item) => <button className={stage === item.id ? 'on' : ''} onClick={() => setStage(item.id)} key={item.id}>{item.shortTitle}</button>)}
      </div>

      <section className="timeline-layout">
        <aside className="timeline-legend">
          <b>日期可信度</b>
          <p><i className="exact" /> 确年</p>
          <p><i className="inferred" /> 推定</p>
          <p><i className="approximate" /> 约略</p>
        </aside>
        <div className="timeline-main">
          {visible.map((event) => <TimelineEvent event={event} active={targetEvent === event.id || String(event.startYear) === targetYear} key={event.id} />)}
        </div>
        <aside className="historical-rail">
          <b>时代辅助线</b>
          {historicalContext.map((item) => (
            <p key={item.id}><strong>{item.year}</strong><span>{item.title}</span>{item.text}</p>
          ))}
        </aside>
      </section>
    </main>
  )
}
