import { useState } from 'react'
import { Link } from 'react-router-dom'
import { dreamEvents, stages } from '../data/dreamEvents'

type Props = { currentStage: string; currentScene?: string }

export function ActNavigator({ currentStage, currentScene }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <aside className={`act-navigator ${open ? 'open' : ''}`} aria-label="五幕与场景导航">
      <button className="act-nav-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>浏览五幕</span><b>{open ? '收起 −' : '展开 +'}</b>
      </button>
      {open && <nav>
        {stages.map((stage, index) => {
          const scenes = dreamEvents.filter((event) => event.stage === stage)
          return <section key={stage} className={stage === currentStage ? 'active' : ''}>
            <Link to={`/dream/${encodeURIComponent(stage)}`} onClick={() => setOpen(false)}>
              <small>{String(index + 1).padStart(2, '0')}</small>{stage}
            </Link>
            <div>{scenes.map((scene) => <Link to={`/dream/${encodeURIComponent(stage)}#${scene.id}`} onClick={() => setOpen(false)} className={scene.id === currentScene ? 'current' : ''} key={scene.id}>{scene.title}</Link>)}</div>
          </section>
        })}
      </nav>}
    </aside>
  )
}
