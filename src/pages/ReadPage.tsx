import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { dreamEvents } from '../data/dreamEvents'
import { originalTexts } from '../data/originalTexts'

const volumes: Array<[string, string[]]> = [
  ['卷一', ['《钟山》', '《金山夜戏》', '《悬杪亭》']],
  ['卷二', ['《葑门荷宕》', '《西湖香市》', '《湖心亭看雪》']],
  ['卷三', ['《兰雪茶》', '《绍兴琴派》', '《不系园》']],
  ['卷四', ['《闰中秋》', '《白洋潮》', '《三世藏书》', '《祁止祥癖》']],
  ['卷五', ['《鹿苑寺方柿》']],
  ['卷八', ['《梦忆序》']],
]

export function ReadPage() {
  const [params] = useSearchParams()
  const [selected, setSelected] = useState(params.get('chapter') || 'huxinting')
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<'清读' | '注读' | '夜读'>('注读')
  const event = dreamEvents.find((item) => item.id === selected) || dreamEvents[4]
  const paragraphs = originalTexts[event.id] ?? ['此篇原文正在校勘整理中。']
  const chapterTitle = event.work.replace(/[《》]/g, '')
  const results = useMemo(
    () => dreamEvents.filter((item) => item.title.includes(query) || item.work.includes(query) || item.place.includes(query)),
    [query],
  )

  const chooseWork = (work: string) => {
    const found = dreamEvents.find((item) => item.work === work)
    if (found) setSelected(found.id)
  }

  return (
    <main className={`reader ${mode === '夜读' ? 'night' : ''}`}>
      <aside className="reader-menu">
        <Link to="/" className="reader-logo">陶庵一梦</Link>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索篇目、地点" />
        {query && <div className="search-list">{results.map((item) => <button onClick={() => setSelected(item.id)} key={item.id}>{item.title}</button>)}</div>}
        <div className="volume-list">
          {volumes.map(([volume, works]) => (
            <details open key={volume}>
              <summary>{volume}</summary>
              {works.map((work) => <button onClick={() => chooseWork(work)} key={work}>{work}</button>)}
            </details>
          ))}
        </div>
      </aside>

      <article className="reader-text">
        <header>
          <p>{event.work} · {event.place} · {event.year}</p>
          <h1>{chapterTitle}</h1>
          <div>{(['清读', '注读', '夜读'] as const).map((item) => <button className={mode === item ? 'on' : ''} onClick={() => setMode(item)} key={item}>{item}</button>)}</div>
        </header>
        <p className="original-label">{event.id === 'xuanyaoting' ? '《陶庵梦忆》本节全文' : '《陶庵梦忆》原文'}</p>
        {paragraphs.map((paragraph, index) => (
          <p
            key={`${event.id}-${index}`}
            className={[
              mode === '注读' && index === 0 ? 'annotated' : '',
              /^[①②③④⑤]/.test(paragraph) ? 'original-note' : '',
            ].filter(Boolean).join(' ')}
          >
            {paragraph}
          </p>
        ))}
      </article>

      {mode === '注读' && <aside className="reader-notes">
        <p>关联注读</p>
        <h2>{event.place}</h2>
        <span>{event.description}</span>
        <hr />
        <p>时间</p>
        <h2>{event.year}</h2>
        <Link to={`/timeline?event=${event.id}`}>查看年谱</Link>
        <Link to={`/map?event=${event.id}`}>查看行迹</Link>
      </aside>}
    </main>
  )
}
