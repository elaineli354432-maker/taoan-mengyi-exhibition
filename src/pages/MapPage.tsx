import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { events, locations, getEvent, getLocation, getPrimaryChapterForEvent } from '../data/records'
import { SceneImage } from '../components/SceneImage'

const mapLocations = locations.filter((location) => typeof location.svgX === 'number' && typeof location.svgY === 'number')

const firstEventForLocation = (locationId: string) => locations.find((location) => location.id === locationId)?.eventIds[0]
const mapModes = ['地点模式', '年代模式', '人生阶段模式'] as const
type MapMode = typeof mapModes[number]

const eventCoversYear = (event: (typeof events)[number], year: number) => {
  if (event.startYear === null) return false
  const endYear = event.endYear ?? event.startYear
  return event.startYear <= year && year <= endYear
}

export function MapPage() {
  const [params, setParams] = useSearchParams()
  const requestedEvent = params.get('event')
  const requestedLocation = params.get('location')
  const requestedYearParam = params.get('year')
  const requestedYear = requestedYearParam ? Number(requestedYearParam) : undefined
  const initialEvent = requestedEvent ? getEvent(requestedEvent) : undefined
  const initialLocation = requestedLocation ? getLocation(requestedLocation) : undefined
  const [eventId, setEventId] = useState(initialEvent?.id || (initialLocation ? firstEventForLocation(initialLocation.id) : undefined) || 'huxinting')
  const [locationId, setLocationId] = useState(initialEvent?.locationIds[0] || initialLocation?.id || 'hangzhou-xihu')
  const [mode, setMode] = useState<MapMode>('地点模式')

  const current = getEvent(eventId)
  const currentLocation = getLocation(locationId) ?? (current?.locationIds[0] ? getLocation(current.locationIds[0]) : undefined) ?? locations[0]
  const yearLimit = typeof requestedYear === 'number' && Number.isFinite(requestedYear) ? requestedYear : current?.startYear
  const shown = mode === '年代模式'
    ? events.filter((event) => typeof yearLimit === 'number' && eventCoversYear(event, yearLimit))
    : mode === '人生阶段模式' && current ? events.filter((event) => event.stageId === current.stageId) : events
  const relatedEvents = shown.filter((event) => currentLocation.eventIds.includes(event.id)).slice(0, 5)
  const panelEvent = current && current.locationIds.includes(currentLocation.id) ? current : relatedEvents[0]

  useEffect(() => {
    const nextEvent = requestedEvent ? getEvent(requestedEvent) : undefined
    const nextLocation = requestedLocation ? getLocation(requestedLocation) : undefined
    if (nextEvent) {
      setEventId(nextEvent.id)
      setLocationId(nextLocation?.id ?? nextEvent.locationIds[0])
    } else if (nextLocation) {
      setLocationId(nextLocation.id)
      setEventId(firstEventForLocation(nextLocation.id) ?? eventId)
    }
  }, [requestedEvent, requestedLocation])

  const updateUrl = (nextEventId: string | undefined, nextLocationId: string) => {
    const event = nextEventId ? getEvent(nextEventId) : undefined
    const next = new URLSearchParams()
    next.set('location', nextLocationId)
    if (event?.startYear) next.set('year', String(event.startYear))
    if (nextEventId) next.set('event', nextEventId)
    setParams(next, { replace: false })
  }

  const chooseLocation = (id: string) => {
    setLocationId(id)
    const nextEvent = firstEventForLocation(id)
    if (nextEvent) setEventId(nextEvent)
    updateUrl(nextEvent, id)
  }

  const chooseEvent = (id: string) => {
    const event = getEvent(id)
    if (!event) return
    setEventId(event.id)
    setLocationId(event.locationIds[0])
    updateUrl(event.id, event.locationIds[0])
  }

  return (
    <main className="sub-page map-page">
      <header className="page-head"><p>JOURNEYS</p><h1>张岱行迹</h1><span>地点、年份与篇目来自统一数据；地图点位为示意坐标。</span></header>
      <div className="map-mode">{mapModes.map((item) => <button onClick={() => setMode(item)} className={mode === item ? 'on' : ''} key={item}>{item}</button>)}</div>
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
              <Link to={`/read?chapter=${chapter?.id ?? event.id}&event=${event.id}`} key={event.id}>
                {event.displayDate} · {event.title}
                <small>{event.sourceChapter ?? '篇目待核对'} · {event.curatorialSummary}</small>
              </Link>
            )
          }) : <small>本地点已作为基础地图点，相关篇目待补充。</small>}
          <div className="place-tools">
            {panelEvent && <Link to={`/timeline?event=${panelEvent.id}`}>回到年谱</Link>}
            {panelEvent && <Link to={`/read?chapter=${getPrimaryChapterForEvent(panelEvent.id)?.id ?? panelEvent.id}&event=${panelEvent.id}`}>阅读相关篇目</Link>}
          </div>
        </aside>
      </section>
      <div className="map-timeline"><span>1600</span>{events.filter((event) => event.startYear !== null).map((event) => <button className={eventId === event.id ? 'on' : ''} onClick={() => chooseEvent(event.id)} key={event.id}>{event.displayDate}</button>)}<span>1646</span></div>
    </main>
  )
}
