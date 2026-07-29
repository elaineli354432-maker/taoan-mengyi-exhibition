import { BookOpen, Maximize2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ResponsiveImage } from '../shared/ResponsiveImage'
import { getScenePassages } from '../../data/scenePassages'
import type { EventRecord } from '../../data/events'

export function SceneTrigger({
  event,
  image,
  alt,
  className = '',
  children,
}: {
  event: EventRecord
  image?: string
  alt?: string
  className?: string
  children?: ReactNode
}) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const passages = getScenePassages(event.id)
  const enabled = passages.length > 0

  const openScene = () => {
    if (!enabled) return
    const next = new URLSearchParams(params)
    next.set('scene', event.id)
    next.delete('passage')
    navigate({ pathname: '/', search: next.toString() })
  }

  if (!enabled) {
    return <ResponsiveImage image={image ?? event.heroImage ?? event.id} alt={alt ?? event.title} className={className} />
  }

  return (
    <button className={`scene-trigger ${className}`} type="button" onClick={openScene} aria-label={`进入${event.title}场景展览`}>
      <ResponsiveImage image={image ?? event.heroImage ?? event.id} alt={alt ?? event.title} />
      <span className="scene-trigger-cue">
        <Maximize2 aria-hidden="true" size={15} />
        <b>进入此景</b>
        <small>{event.sourceChapter ?? event.title}</small>
      </span>
      <span className="scene-trigger-mobile"><BookOpen aria-hidden="true" size={14} /> 轻触进入场景</span>
      {children}
    </button>
  )
}
