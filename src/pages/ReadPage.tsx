import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { chapters, events, people, getChapter, getEvent, getLocation, getPrimaryChapterForEvent } from '../data/records'

const sortedChapters = [...chapters].sort((a, b) => a.volume - b.volume || a.orderInVolume - b.orderInVolume)

const resolveChapter = (id: string) => getChapter(id) ?? getPrimaryChapterForEvent(id) ?? getChapter('huxinting')!

export function ReadPage() {
  const [params, setParams] = useSearchParams()
  const [selected, setSelected] = useState(resolveChapter(params.get('chapter') || 'huxinting').id)
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<'清读' | '注读' | '夜读'>('注读')
  const [fontSize, setFontSize] = useState(18)
  const [lineHeight, setLineHeight] = useState(2.25)
  const chapter = resolveChapter(selected)
  const paragraphs = chapter.originalText ? chapter.originalText.split('\n') : []
  const relatedEvents = chapter.relatedEventIds.map(getEvent).filter(Boolean)
  const relatedLocations = chapter.relatedLocationIds.map(getLocation).filter(Boolean)
  const relatedPeople = people.filter((person) => chapter.relatedPersonIds.includes(person.id))
  const selectedIndex = sortedChapters.findIndex((item) => item.id === chapter.id)
  const previous = sortedChapters[selectedIndex - 1]
  const next = sortedChapters[selectedIndex + 1]
  const volumes = useMemo(() => {
    const grouped = new Map<number, typeof chapters>()
    for (const item of sortedChapters) grouped.set(item.volume, [...(grouped.get(item.volume) ?? []), item])
    return [...grouped.entries()]
  }, [])
  const results = useMemo(() => {
    const trimmed = query.trim()
    if (!trimmed) return []
    return sortedChapters.filter((item) => {
      const linkedEvents = item.relatedEventIds.map(getEvent).filter(Boolean)
      const linkedLocations = item.relatedLocationIds.map(getLocation).filter(Boolean)
      const linkedPeople = people.filter((person) => item.relatedPersonIds.includes(person.id))
      return [
        item.title,
        item.originalText,
        item.curatorialIntroduction ?? '',
        item.sourceReference ?? '',
        ...linkedLocations.map((location) => `${location?.modernName ?? ''}${location?.historicalName ?? ''}${location?.description ?? ''}`),
        ...linkedPeople.map((person) => `${person.name}${person.courtesyName ?? ''}${person.relationshipToZhangDai ?? ''}${person.description}`),
        ...linkedEvents.map((event) => `${event?.title ?? ''}${event?.curatorialSummary ?? ''}${event?.sourceChapter ?? ''}`),
      ].some((text) => text.includes(trimmed))
    })
  }, [query])

  useEffect(() => {
    const next = resolveChapter(params.get('chapter') || selected)
    if (next.id !== selected) setSelected(next.id)
  }, [params])

  const chooseChapter = (id: string) => {
    const next = resolveChapter(id)
    setSelected(next.id)
    const linkedEvent = next.relatedEventIds[0]
    const search = new URLSearchParams()
    search.set('chapter', next.id)
    if (linkedEvent) search.set('event', linkedEvent)
    setParams(search, { replace: false })
  }

  return (
    <main className={`reader ${mode === '夜读' ? 'night' : ''}`}>
      <aside className="reader-menu">
        <Link to="/" className="reader-logo">陶庵一梦</Link>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索原文、篇目、地点" />
        {query && <div className="search-list">
          {results.length ? results.map((item) => <button onClick={() => chooseChapter(item.id)} key={item.id}>{item.title}<small>卷{item.volume} · {item.originalTextVerified ? '原文已核' : '待核'}</small></button>) : <small>没有匹配篇目</small>}
        </div>}
        <div className="volume-list">
          {volumes.map(([volume, items]) => (
            <details open key={volume}>
              <summary>{volume === 0 ? '自序' : `卷${volume}`}</summary>
              {items.map((item) => <button className={item.id === chapter.id ? 'on' : ''} onClick={() => chooseChapter(item.id)} key={item.id}>《{item.title}》</button>)}
            </details>
          ))}
        </div>
      </aside>

      <article className="reader-text" style={{ fontSize: `${fontSize}px`, lineHeight }}>
        <header>
          <p>{chapter.volume === 0 ? '自序' : `卷${chapter.volume}`} · {relatedLocations.map((location) => location?.modernName).join(' / ') || '地点待核对'}</p>
          <h1>{chapter.title}</h1>
          <div className="reader-controls">
            {(['清读', '注读', '夜读'] as const).map((item) => <button className={mode === item ? 'on' : ''} onClick={() => setMode(item)} key={item}>{item}</button>)}
            <button onClick={() => setFontSize((value) => Math.max(15, value - 1))}>A-</button>
            <button onClick={() => setFontSize((value) => Math.min(24, value + 1))}>A+</button>
            <button onClick={() => setLineHeight((value) => Number(Math.max(1.7, value - 0.15).toFixed(2)))}>行距-</button>
            <button onClick={() => setLineHeight((value) => Number(Math.min(2.8, value + 0.15).toFixed(2)))}>行距+</button>
          </div>
        </header>
        <p className="original-label">《陶庵梦忆》原文</p>
        {chapter.originalTextVerified ? paragraphs.map((paragraph, index) => (
          <p
            key={`${chapter.id}-${index}`}
            className={[
              mode === '注读' && index === 0 ? 'annotated' : '',
              /^[①②③④⑤]/.test(paragraph) ? 'original-note' : '',
            ].filter(Boolean).join(' ')}
          >
            {paragraph}
          </p>
        )) : (
          <p className="unverified-text">本篇原文正在校核，当前仅提供策展说明。</p>
        )}
        {chapter.curatorialIntroduction && <p className="curatorial-reader-note">{chapter.curatorialIntroduction}</p>}
        <nav className="reader-pager">
          {previous ? <button onClick={() => chooseChapter(previous.id)}>上一篇 · {previous.title}</button> : <span />}
          {next ? <button onClick={() => chooseChapter(next.id)}>下一篇 · {next.title}</button> : <span />}
        </nav>
      </article>

      {mode === '注读' && <aside className="reader-notes">
        <p>关联地点</p>
        {relatedLocations.map((location) => <h2 key={location?.id}>{location?.modernName}</h2>)}
        <span>{relatedLocations.map((location) => location?.description).join(' ')}</span>
        <hr />
        <p>关联人物</p>
        {relatedPeople.map((person) => <span key={person.id}>{person.name}：{person.description}</span>)}
        <hr />
        <p>相关事件</p>
        {relatedEvents.map((event) => event && <Link to={`/timeline?event=${event.id}`} key={event.id}>{event.displayDate} · {event.title}</Link>)}
        {relatedEvents[0] && <Link to={`/map?location=${relatedEvents[0].locationIds[0]}&year=${relatedEvents[0].startYear ?? ''}&event=${relatedEvents[0].id}`}>查看行迹</Link>}
      </aside>}
    </main>
  )
}
