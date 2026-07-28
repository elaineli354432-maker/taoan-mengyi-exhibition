import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { events, locations, getEvent, getLocation, getPrimaryChapterForEvent } from '../data/records'
import { SceneImage } from '../components/SceneImage'

const mapLocations = locations.filter((location) => typeof location.svgX === 'number' && typeof location.svgY === 'number')

const firstEventForLocation = (locationId: string) => locations.find((location) => location.id === locationId)?.eventIds[0]

export function MapPage() {
  const [params] = useSearchParams()
  const requestedEvent = params.get('event')
  const requestedLocation = params.get('location')
  const requestedYear = Number(params.get('year'))
  const initialEvent = requestedEvent ? getEvent(requestedEvent) : undefined
  const initialLocation = requestedLocation ? getLocation(requestedLocation) : undefined
  const [eventId, setEventId] = useState(initialEvent?.id || (initialLocation ? firstEventForLocation(initialLocation.id) : undefined) || 'huxinting')
  const [locationId, setLocationId] = useState(initialEvent?.locationIds[0] || initialLocation?.id || 'hangzhou-xihu')
  const [mode, setMode] = useState('地点模式')

  const current = getEvent(eventId)
  const currentLocation = getLocation(locationId) ?? (current?.locationIds[0] ? getLocation(current.locationIds[0]) : undefined) ?? locations[0]
  const yearLimit = Number.isFinite(requestedYear) ? requestedYear : current?.startYear
  const shown = mode === '年代模式'
    ? events.filter((event) => event.startYear !== null && yearLimit !== null && yearLimit !== undefined && event.startYear <= yearLimit)
    : mode === '人生阶段模式' && current ? events.filter((event) => event.stageId === current.stageId) : events
  const relatedEvents = shown.filter((event) => currentLocation.eventIds.includes(event.id)).slice(0, 5)
  const panelEvent = current && current.locationIds.includes(currentLocation.id) ? current : relatedEvents[0]

  const chooseLocation = (id: string) => {
    setLocationId(id)
    const nextEvent = firstEventForLocation(id)
    if (nextEvent) setEventId(nextEvent)
  }

  return (
    <main className="sub-page map-page">
      <header className="page-head"><p>JOURNEYS</p><h1>张岱行迹</h1><span>地点、年份与篇目来自统一数据；地图点位为示意坐标。</span></header>
      <div className="map-mode">{['地点模式', '年代模式', '人生阶段模式'].map((item) => <button onClick={() => setMode(item)} className={mode === item ? 'on' : ''} key={item}>{item}</button>)}</div>
      <section className="story-map">
        <div className="painted-map">
          <div className="map-river" /><div className="map-route before" /><div className="map-route after" />
          {mapLocations.map((location) => {
            const active = location.id === currentLocation.id
            return (
              <button style={{ left: `${location.svgX}%`, top: `${location.svgY}%` }} className={active ? 'active' : ''} onClick={() => chooseLocation(location.id)} key={location.id}>
                <i /><span>{location.modernName}<small>{location.historicalName ? `古称·${location.historicalName}` : location.region}</small></span>
              </button>
            )
          })}
          <em>长江</em><strong>太湖</strong>
        </div>
        <aside className="place-panel">
          <SceneImage kind={panelEvent?.heroImage ?? currentLocation.image ?? 'snow'} variant={panelEvent?.id} />
          <p>{currentLocation.modernName} · {currentLocation.region ?? '区域待核对'}</p>
          <h2>{currentLocation.historicalName ?? currentLocation.modernName}</h2>
          <span>{currentLocation.description}</span>
          <h3>相关年份与篇目</h3>
          {relatedEvents.length ? relatedEvents.map((event) => {
            const chapter = getPrimaryChapterForEvent(event.id)
            return (
              <Link to={`/read?chapter=${chapter?.id ?? event.id}`} key={event.id}>
                {event.displayDate} · {event.title}
                <small>{event.sourceChapter ?? '篇目待核对'} · {event.curatorialSummary}</small>
              </Link>
            )
          }) : <small>本地点已作为基础地图点，相关篇目待补充。</small>}
        </aside>
      </section>
      <div className="map-timeline"><span>1600</span>{events.filter((event) => event.startYear !== null).map((event) => <button className={eventId === event.id ? 'on' : ''} onClick={() => { setEventId(event.id); setLocationId(event.locationIds[0]) }} key={event.id}>{event.displayDate}</button>)}<span>1646</span></div>
    </main>
  )
}
