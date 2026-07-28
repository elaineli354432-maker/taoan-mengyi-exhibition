import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { chapters, getChapter, sortedChapters } from '../data/chapters'
import { getEvent } from '../data/events'
import { getLocation } from '../data/locations'
import { getPerson, people } from '../data/people'

type ReaderMode = 'clean' | 'annotated' | 'night'

const resolveChapter = (id: string | null) => getChapter(id ?? '') ?? getChapter('huxinting')!

export function ReadPage() {
  const [params, setParams] = useSearchParams()
  const [selected, setSelected] = useState(resolveChapter(params.get('chapter')).id)
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<ReaderMode>('annotated')
  const [fontSize, setFontSize] = useState(18)
  const [lineHeight, setLineHeight] = useState(2.15)
  const chapter = resolveChapter(selected)
  const selectedIndex = sortedChapters.findIndex((item) => item.id === chapter.id)
  const previous = sortedChapters[selectedIndex - 1]
  const next = sortedChapters[selectedIndex + 1]
  const relatedEvents = chapter.relatedEventIds.map(getEvent).filter(Boolean)
  const relatedLocations = chapter.relatedLocationIds.map(getLocation).filter(Boolean)
  const relatedPeople = chapter.relatedPersonIds.map(getPerson).filter(Boolean)

  useEffect(() => {
    const nextChapter = resolveChapter(params.get('chapter'))
    if (nextChapter.id !== selected) setSelected(nextChapter.id)
  }, [params, selected])

  const results = useMemo(() => {
    const term = query.trim()
    if (!term) return []
    return chapters.filter((item) => {
      const searchableOriginal = item.originalTextVerified ? item.originalText : ''
      const linkedEvents = item.relatedEventIds.map(getEvent).filter(Boolean)
      const linkedLocations = item.relatedLocationIds.map(getLocation).filter(Boolean)
      const linkedPeople = people.filter((person) => item.relatedPersonIds.includes(person.id))
      return [
        item.title,
        searchableOriginal,
        item.curatorialIntroduction ?? '',
        item.sourceReference ?? '',
        ...linkedEvents.map((event) => `${event?.title ?? ''}${event?.themes.join(' ') ?? ''}`),
        ...linkedLocations.map((location) => `${location?.modernName ?? ''}${location?.historicalName ?? ''}${location?.description ?? ''}`),
        ...linkedPeople.map((person) => `${person.name}${person.courtesyName ?? ''}${person.description}`),
      ].some((text) => text.includes(term))
    })
  }, [query])

  const chooseChapter = (id: string) => {
    const nextChapter = resolveChapter(id)
    setSelected(nextChapter.id)
    const next = new URLSearchParams({ chapter: nextChapter.id })
    if (nextChapter.relatedEventIds[0]) next.set('event', nextChapter.relatedEventIds[0])
    setParams(next)
  }

  return (
    <main className={`reader-page ${mode === 'night' ? 'is-night' : ''}`}>
      <aside className="reader-directory">
        <Link to="/" className="reader-mark">陶庵一梦</Link>
        <label>
          <span>搜索</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="篇名、原文、地点、人物、主题" />
        </label>
        {query && (
          <div className="reader-search-results">
            {results.length ? results.map((item) => (
              <button onClick={() => chooseChapter(item.id)} key={item.id}>
                {item.title}
                <small>{item.originalTextVerified ? '原文已校核' : '原文校核中'}</small>
              </button>
            )) : <small>没有匹配篇目</small>}
          </div>
        )}
        <details open>
          <summary>精选篇目</summary>
          {sortedChapters.map((item) => (
            <button className={item.id === chapter.id ? 'on' : ''} onClick={() => chooseChapter(item.id)} key={item.id}>
              《{item.title}》
              <small>{item.originalTextVerified ? '原文已校核' : '校核中'}</small>
            </button>
          ))}
        </details>
      </aside>

      <article className="reading-pane" style={{ fontSize: `${fontSize}px`, lineHeight }}>
        <header>
          <p>《陶庵梦忆》精选阅读</p>
          <h1>{chapter.title}</h1>
          <span>{chapter.sourceReference ?? '卷次与篇目正在持续校核'} · {chapter.originalTextVerified ? '原文已校核' : '原文校核中'}</span>
          <div className="reader-settings">
            <button className={mode === 'clean' ? 'on' : ''} onClick={() => setMode('clean')}>清读</button>
            <button className={mode === 'annotated' ? 'on' : ''} onClick={() => setMode('annotated')}>注读</button>
            <button className={mode === 'night' ? 'on' : ''} onClick={() => setMode('night')}>夜读</button>
            <button onClick={() => setFontSize((value) => Math.max(15, value - 1))}>A-</button>
            <button onClick={() => setFontSize((value) => Math.min(24, value + 1))}>A+</button>
            <button onClick={() => setLineHeight((value) => Number(Math.max(1.75, value - 0.1).toFixed(2)))}>行距-</button>
            <button onClick={() => setLineHeight((value) => Number(Math.min(2.7, value + 0.1).toFixed(2)))}>行距+</button>
          </div>
        </header>

        {chapter.originalTextVerified ? (
          chapter.originalText.split('\n').map((paragraph, index) => <p key={`${chapter.id}-${index}`}>{paragraph}</p>)
        ) : (
          <p className="unverified-text">本篇原文仍在校核，当前仅提供策展说明。</p>
        )}
        {chapter.curatorialIntroduction && <p className="reader-curatorial">{chapter.curatorialIntroduction}</p>}

        <nav className="reader-pager">
          {previous ? <button onClick={() => chooseChapter(previous.id)}>上一篇 · {previous.title}</button> : <span />}
          {next ? <button onClick={() => chooseChapter(next.id)}>下一篇 · {next.title}</button> : <span />}
        </nav>
      </article>

      {mode !== 'clean' && (
        <aside className="reader-context">
          <p>关联地点</p>
          {relatedLocations.map((location) => location && (
            <section key={location.id}>
              <h2>{location.modernName}</h2>
              <span>{location.description}</span>
            </section>
          ))}
          <p>关联人物</p>
          {relatedPeople.map((person) => person && <span key={person.id}>{person.name}：{person.description}</span>)}
          <p>关联事件</p>
          {relatedEvents.map((event) => event && (
            <Link to={`/timeline?event=${event.id}`} key={event.id}>
              {event.displayDate} · {event.title}
              <small>{event.ageDisplay ?? '年龄待核'}</small>
            </Link>
          ))}
          {relatedEvents[0] && <Link to={`/map?event=${relatedEvents[0].id}&location=${relatedEvents[0].locationIds[0]}${relatedEvents[0].startYear ? `&year=${relatedEvents[0].startYear}` : ''}`}>在地图中查看</Link>}
        </aside>
      )}
    </main>
  )
}
