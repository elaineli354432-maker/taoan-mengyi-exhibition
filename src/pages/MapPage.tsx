import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ResponsiveImage } from '../components/shared/ResponsiveImage'
import { events, getEvent } from '../data/events'
import { getPrimaryChapterForEvent } from '../data/chapters'
import { getLocation, locations } from '../data/locations'
import { stages } from '../data/stages'

type MapMode = 'place' | 'year' | 'stage'

const mapLocations = locations.filter((location) => typeof location.svgX === 'number' && typeof location.svgY === 'number')

function eventReachedByYear(event: (typeof events)[number], year: number) {
  return event.startYear !== null && event.startYear <= year
}

function latestEventByYear(year: number) {
  return [...events]
    .filter((event) => eventReachedByYear(event, year))
    .sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0))[0]
}

export function MapPage() {
  const [params, setParams] = useSearchParams()
  const requestedEvent = params.get('event')
  const requestedLocation = params.get('location')
  const requestedYear = params.get('year') ? Number(params.get('year')) : undefined
  const initialEvent = requestedEvent ? getEvent(requestedEvent) : undefined
  const [mode, setMode] = useState<MapMode>('place')
  const [locationId, setLocationId] = useState(requestedLocation ?? initialEvent?.locationIds[0] ?? 'hangzhou-xihu')
  const [eventId, setEventId] = useState(initialEvent?.id ?? '')
  const [year, setYear] = useState(Number.isFinite(requestedYear) ? requestedYear! : 1632)
  const location = getLocation(locationId) ?? locations[0]

  useEffect(() => {
    const nextEvent = requestedEvent ? getEvent(requestedEvent) : undefined
    const nextLocation = requestedLocation ? getLocation(requestedLocation) : undefined
    if (nextEvent) {
      setEventId(nextEvent.id)
      setLocationId(nextLocation?.id ?? nextEvent.locationIds[0])
      if (nextEvent.startYear) setYear(nextEvent.startYear)
    } else if (nextLocation) {
      setLocationId(nextLocation.id)
      setEventId('')
    }
    if (Number.isFinite(requestedYear)) {
      setMode('year')
      setYear(requestedYear!)
      if (!nextEvent) {
        const latest = latestEventByYear(requestedYear!)
        if (latest) {
          setEventId(latest.id)
          setLocationId(latest.locationIds[0])
        }
      }
    }
  }, [requestedEvent, requestedLocation, requestedYear])

  const filteredEvents = useMemo(() => {
    if (mode === 'year') return events.filter((event) => eventReachedByYear(event, year))
    if (mode === 'stage') {
      const selected = eventId ? getEvent(eventId) : undefined
      return selected ? events.filter((event) => event.stageId === selected.stageId) : events.filter((event) => event.stageId === 'prosperity')
    }
    return events
  }, [mode, year, eventId])

  const visibleLocationIds = useMemo(() => new Set(filteredEvents.flatMap((event) => event.locationIds)), [filteredEvents])
  const relatedEvents = filteredEvents.filter((event) => event.locationIds.includes(location.id))

  const enterYearMode = () => {
    setMode('year')
    const latest = latestEventByYear(year)
    if (!latest) return
    setEventId(latest.id)
    setLocationId(latest.locationIds[0])
    setParams(new URLSearchParams({ year: String(year), event: latest.id, location: latest.locationIds[0] }))
  }

  const chooseYear = (nextYear: number) => {
    setYear(nextYear)
    const latest = latestEventByYear(nextYear)
    if (!latest) {
      setParams(new URLSearchParams({ year: String(nextYear) }))
      return
    }
    setEventId(latest.id)
    setLocationId(latest.locationIds[0])
    setParams(new URLSearchParams({ year: String(nextYear), event: latest.id, location: latest.locationIds[0] }))
  }

  const chooseLocation = (id: string) => {
    if (mode === 'year' && !visibleLocationIds.has(id)) return
    setLocationId(id)
    setEventId('')
    const next = new URLSearchParams({ location: id })
    if (mode === 'year') next.set('year', String(year))
    setParams(next)
  }

  const chooseEvent = (id: string) => {
    const event = getEvent(id)
    if (!event) return
    setEventId(id)
    setLocationId(event.locationIds[0])
    const next = new URLSearchParams({ event: id, location: event.locationIds[0] })
    if (event.startYear) next.set('year', String(event.startYear))
    setParams(next)
  }

  return (
    <main className="sub-page map-page">
      <header className="page-head">
        <p>行迹</p>
        <h1>沿江南重新行走</h1>
        <span>地图是张岱文学空间的探索工具。地点点位为示意，年份筛选使用标准化 `startYear/endYear` 数据。</span>
      </header>

      <div className="map-controls">
        <button className={mode === 'place' ? 'on' : ''} onClick={() => setMode('place')}>地点模式</button>
        <button className={mode === 'year' ? 'on' : ''} onClick={enterYearMode}>年代模式</button>
        <button className={mode === 'stage' ? 'on' : ''} onClick={() => setMode('stage')}>人生阶段</button>
        {mode === 'year' && <input type="range" min="1600" max="1646" value={year} onChange={(event) => chooseYear(Number(event.target.value))} aria-label="年份" />}
        {mode === 'year' && <strong>{year}</strong>}
      </div>

      <section className="literary-map">
        <div className="map-canvas">
          <ResponsiveImage image="map" alt="江南行迹示意地图" />
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <path d="M54 10 C42 24 33 31 31 36 S45 42 48 44 S60 54 67 64 S72 72 82 63" />
          </svg>
          {mapLocations.map((item) => (
            <button
              className={`${item.id === location.id ? 'active' : ''} ${mode === 'year' && !visibleLocationIds.has(item.id) ? 'muted' : ''} ${mode === 'year' && visibleLocationIds.has(item.id) ? 'visible-year' : ''}`}
              style={{ left: `${item.svgX}%`, top: `${item.svgY}%` }}
              onClick={() => chooseLocation(item.id)}
              key={item.id}
            >
              <i />
              <span>{item.modernName}</span>
            </button>
          ))}
        </div>
        <aside className="location-panel">
          <ResponsiveImage image={location.image ?? 'map'} alt={location.modernName} />
          <p>{location.region ?? '区域待核'} · {location.historicalName ? `古称 ${location.historicalName}` : '古称待补'}</p>
          <h2>{location.modernName}</h2>
          <span>{location.description}</span>
          <h3>相关事件</h3>
          {relatedEvents.length ? relatedEvents.map((event) => {
            const chapter = getPrimaryChapterForEvent(event.id)
            return (
              <button className={event.id === eventId ? 'selected' : ''} onClick={() => chooseEvent(event.id)} key={event.id}>
                {event.displayDate} · {event.title}
                <small>{event.sourceChapter ?? '篇目待核'} · {event.dateCertainty}</small>
                {chapter && <Link to={`/read?chapter=${chapter.id}&event=${event.id}`}>阅读</Link>}
              </button>
            )
          }) : <small>本地点作为地图基础点保留，具体事件仍待史料补充。</small>}
        </aside>
      </section>

      <div className="map-stage-row">
        {stages.map((stage) => (
          <button key={stage.id} onClick={() => {
            setMode('stage')
            const first = events.find((event) => event.stageId === stage.id)
            if (first) chooseEvent(first.id)
          }}>{stage.shortTitle}</button>
        ))}
      </div>
    </main>
  )
}
