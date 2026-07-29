import type { ScenePassage } from '../../data/scenePassages'
import { sceneImageUrl } from './sceneImage'
import type { CSSProperties } from 'react'

export function SceneArtwork({
  sceneId,
  title,
  image,
  passage,
  showPassage,
  onAdvance,
}: {
  sceneId: string
  title: string
  image: string
  passage?: ScenePassage
  showPassage: boolean
  onAdvance: () => void
}) {
  const focus = passage?.imageFocus
  const style = {
    '--focus-x': `${focus?.x ?? 50}%`,
    '--focus-y': `${focus?.y ?? 50}%`,
    '--focus-scale': String(focus?.scale ?? 1.04),
  } as CSSProperties

  return (
    <button
      className={`scene-artwork scene-artwork-${sceneId} ${showPassage ? 'is-reading' : 'is-image-only'}`}
      type="button"
      onClick={onAdvance}
      style={style}
      aria-label={showPassage ? `切换${title}下一段原文` : `显示${title}原文`}
    >
      <img src={sceneImageUrl(passage?.image ?? image)} alt={title} />
    </button>
  )
}
