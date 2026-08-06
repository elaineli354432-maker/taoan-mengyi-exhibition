import { useEffect, useState } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Era = { year: string; place: string; age: string; title: string; image: string; life: string; history: string; writing: string; note: string }
const sceneSources: Record<string, string> = {
  child: '/images/scene-child-wide.webp',
  youth: '/images/scene-youth-wide.webp',
  snow: '/images/huxinting.webp',
  ruin: '/images/scene-ruin-wide.webp',
  elder: '/images/scene-elder-wide.webp',
}
const eras: Era[] = [
  { year: '1597', place: '山阴 / 今绍兴', age: '幼年张岱', title: '生于书香水乡', image: 'child', life: '出生于浙江山阴书香世家，河埠、书斋与家族藏书构成最早的世界。', history: '万历后期，江南城市生活与文人文化仍在繁盛。', writing: '水乡、戏曲与家族生活，日后成为《陶庵梦忆》的记忆根基。', note: '旧宅 · 河埠 · 藏书' },
  { year: '1620s', place: '杭州 / 西湖 / 吴中', age: '青年张岱', title: '游赏江南，风雅正盛', image: 'youth', life: '舟游、茶事、戏曲、灯火、古董、园林与雅集，构成他的审美生活。', history: '天启、崇祯相继即位，政治危机已在繁华背后积聚。', writing: '晚明江南的声色与人情，后来被追写为《陶庵梦忆》。', note: '西湖 · 园林 · 戏台' },
  { year: '1632', place: '杭州 / 湖心亭', age: '中年张岱', title: '雪夜，一痕一点', image: 'snow', life: '更定之后独往湖心亭，在人鸟声俱绝的雪湖中确认自己的“痴”。', history: '明代后期危机持续累积，静美与崩塌并行。', writing: '《湖心亭看雪》以一痕、一点、一芥、两三粒，留下绝境中的构图。', note: '长堤 · 湖心亭 · 孤舟' },
  { year: '1644', place: '绍兴 / 江南', age: '乱世张岱', title: '甲申梦碎', image: 'ruin', life: '人生由游赏转入破碎；风雅文人不得不面对故国覆亡与行旅避乱。', history: '李自成入北京，崇祯帝自缢，明北京政权崩溃。', writing: '《石匮书》的史家使命与《陶庵梦忆》的追忆情绪，从此交织。', note: '风雨 · 残卷 · 旧印' },
  { year: '1646以后', place: '剡县 / 山寺', age: '晚年张岱', title: '入山，梦余成书', image: 'elder', life: '避兵入山、寄居山寺，在贫困、孤灯与残雪中继续著述。', history: '清初秩序重建，明清鼎革已成为不可逆转的历史。', writing: '整理《陶庵梦忆》《西湖梦寻》《石匮书》《夜航船》，以文存梦、以史存国。', note: '山寺 · 孤灯 · 史稿' }
]
const locations: Array<{ modern: string; ancient: string; position: LatLngExpression; eras: number[] }> = [
  { modern: '南京', ancient: '明代应天府', position: [32.06, 118.79], eras: [1] }, { modern: '苏州', ancient: '吴中', position: [31.30, 120.62], eras: [1] }, { modern: '杭州 / 西湖', ancient: '钱塘 · 西湖', position: [30.25, 120.15], eras: [1, 2] }, { modern: '绍兴', ancient: '山阴', position: [30.00, 120.58], eras: [0, 3] }, { modern: '嵊州', ancient: '剡县', position: [29.56, 120.82], eras: [4] }
]
const beforeRoute: LatLngExpression[] = [[32.06, 118.79], [31.30, 120.62], [30.25, 120.15], [30.00, 120.58]]
const afterRoute: LatLngExpression[] = [[30.00, 120.58], [29.56, 120.82]]

export function JourneyAtlas() {
  const [active, setActive] = useState(2); const current = eras[active]; const [pointer, setPointer] = useState({ x: -100, y: -100 })
  useEffect(() => { const move = (event: PointerEvent) => setPointer({ x: event.clientX + 15, y: event.clientY + 15 }); window.addEventListener('pointermove', move); return () => window.removeEventListener('pointermove', move) }, [])
  return <section id="atlas" className="atlas-section">
    <div className="atlas-heading"><p className="eyebrow">02 · 时空卷轴</p><h2>一生如梦：张岱的时空卷轴</h2><p>在地图上停驻，在图像里进入他的年纪、地理与时代。</p></div>
    <div className="atlas-layout">
      <div className="map-wrap"><MapContainer center={[30.55, 120.15]} zoom={8} scrollWheelZoom className="real-map"><TileLayer opacity={0.26} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Polyline positions={beforeRoute} pathOptions={{ color: '#829ba0', weight: 4, dashArray: '8 10' }}/><Polyline positions={afterRoute} pathOptions={{ color: '#9e4939', weight: 4, dashArray: '6 9' }}/>{locations.map(location => { const isActive = location.eras.includes(active); return <CircleMarker key={location.modern} center={location.position} radius={isActive ? 12 : 8} pathOptions={{ color: '#f5f0e8', weight: 3, fillColor: isActive ? '#a34232' : '#31413d', fillOpacity: 1 }} eventHandlers={{ click: () => setActive(location.eras[0]) }}><Tooltip permanent direction="right" offset={[11, 0]} opacity={1}><span className="modern-name">{location.modern}</span><small>古称 · {location.ancient}</small></Tooltip></CircleMarker> })}</MapContainer><div className="map-wash" aria-hidden="true"/><p className="map-caption"><span></span>游赏与风雅 <i></i> 乱世、避兵与著述</p></div>
      <article className={`scene-card scene-${current.image}`}><img loading="lazy" decoding="async" className="atlas-scene-image" src={sceneSources[current.image]} alt={`${current.title} 场景插画`}/><div className="scene-overlay"><p>{current.year} · {current.place}</p><h3>{current.title}</h3><span>{current.age}</span></div></article>
      <div className="atlas-copy"><p className="place-note"><MapPin size={15}/>{current.note}</p><div><b>人生</b><p>{current.life}</p></div><div><b>时代</b><p>{current.history}</p></div><div><b>书写</b><p>{current.writing}</p></div><button onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}>查看关联作品 <ArrowUpRight size={15}/></button></div>
    </div>
    <div className="era-dots">{eras.map((era, i) => <button key={era.year} onClick={() => setActive(i)} className={active === i ? 'active' : ''}><span>{era.year}</span><b>{era.title}</b></button>)}</div>
    <div className={`age-cursor cursor-${current.image}`} style={{ transform: `translate(${pointer.x}px,${pointer.y}px)` }} aria-hidden="true"><span>{current.age}</span></div>
  </section>
}
