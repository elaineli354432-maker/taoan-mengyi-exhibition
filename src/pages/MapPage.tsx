import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { dreamEvents } from '../data/dreamEvents'
import { SceneImage } from '../components/SceneImage'

const spots = [
  { name: '绍兴', ancient: '山阴', x: 67, y: 64, events: ['birth', 'xuanyaoting', 'nanzhen', 'lanxue', 'qinpai'] },
  { name: '杭州', ancient: '钱塘', x: 48, y: 42, events: ['huxinting', 'baiyang', 'zhaoqing'] },
  { name: '苏州', ancient: '吴中', x: 30, y: 35, events: ['fengmen'] },
  { name: '镇江', ancient: '润州', x: 34, y: 22, events: ['jinshan'] },
  { name: '剡县', ancient: '剡', x: 72, y: 76, events: ['shanzhong'] },
]

export function MapPage() {
  const [params] = useSearchParams()
  const initial = dreamEvents.find((event) => event.id === params.get('event'))?.id || 'huxinting'
  const [eventId, setEventId] = useState(initial)
  const [mode, setMode] = useState('地点模式')
  const current = dreamEvents.find((event) => event.id === eventId)!
  const shown = mode === '年代模式'
    ? dreamEvents.filter((event) => Number(event.year.slice(0, 4)) <= Number(current.year.slice(0, 4)))
    : mode === '人生阶段模式' ? dreamEvents.filter((event) => event.stage === current.stage) : dreamEvents
  const city = current.place.split(' / ')[0]
  const uniqueWorks = (events: typeof dreamEvents) => events
    .filter((event, index, list) => list.findIndex((item) => item.work === event.work) === index)
  const samePlace = uniqueWorks(shown.filter((event) => event.id !== current.id && event.place.split(' / ')[0] === city))
  const sameAct = uniqueWorks(shown.filter((event) => event.id !== current.id && event.stage === current.stage && !samePlace.some((item) => item.work === event.work)))
  const nearby = uniqueWorks(shown.filter((event) => event.id !== current.id && !samePlace.some((item) => item.work === event.work) && !sameAct.some((item) => item.work === event.work)))
  const related = [...samePlace, ...sameAct, ...nearby].slice(0, 4)

  return (
    <main className="sub-page map-page">
      <header className="page-head"><p>JOURNEYS</p><h1>张岱行迹</h1><span>晚明江南游踪图与数字故事地图。</span></header>
      <div className="map-mode">{['地点模式', '年代模式', '人生阶段模式'].map((item) => <button onClick={() => setMode(item)} className={mode === item ? 'on' : ''} key={item}>{item}</button>)}</div>
      <section className="story-map">
        <div className="painted-map">
          <div className="map-river" /><div className="map-route before" /><div className="map-route after" />
          {spots.map((spot) => {
            const active = spot.events.includes(eventId)
            return <button style={{ left: `${spot.x}%`, top: `${spot.y}%` }} className={active ? 'active' : ''} onClick={() => setEventId(spot.events[0])} key={spot.name}><i /><span>{spot.name}<small>古称·{spot.ancient}</small></span></button>
          })}
          <em>长江</em><strong>太湖</strong>
        </div>
        <aside className="place-panel">
          <SceneImage kind={current.image} variant={current.id} />
          <p>{current.place} · {current.year}</p><h2>{current.title}</h2><span>{current.description}</span>
          <h3>相关篇目</h3>
          {related.map((event) => <Link to={`/read?chapter=${event.id}`} key={event.work}>{event.work}<small>{event.year} · {event.quote}</small></Link>)}
        </aside>
      </section>
      <div className="map-timeline"><span>1600</span>{dreamEvents.map((event) => <button className={eventId === event.id ? 'on' : ''} onClick={() => setEventId(event.id)} key={event.id}>{event.year}</button>)}<span>1646</span></div>
    </main>
  )
}
