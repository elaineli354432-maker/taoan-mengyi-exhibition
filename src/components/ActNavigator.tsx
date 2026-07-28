import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events, stageRecords } from '../data/records'

type Props = { currentStage: string; currentScene?: string }

export function ActNavigator({ currentStage, currentScene }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <aside className={`act-navigator ${open ? 'open' : ''}`} aria-label="五幕与场景导航">
      <button className="act-nav-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>浏览五幕</span><b>{open ? '收起 −' : '展开 +'}</b>
      </button>
      {open && <nav>
        {stageRecords.map((stage) => {
          const scenes = events.filter((event) => event.stageId === stage.id)
          return <section key={stage.id} className={stage.title === currentStage ? 'active' : ''}>
            <Link to={`/dream/${encodeURIComponent(stage.title)}`} onClick={() => setOpen(false)}>
              <small>{stage.number}</small>{stage.title}
            </Link>
            <div>{scenes.map((scene) => <Link to={`/dream/${encodeURIComponent(stage.title)}#${scene.id}`} onClick={() => setOpen(false)} className={scene.id === currentScene ? 'current' : ''} key={scene.id}>{scene.title}</Link>)}</div>
          </section>
        })}
      </nav>}
    </aside>
  )
}
