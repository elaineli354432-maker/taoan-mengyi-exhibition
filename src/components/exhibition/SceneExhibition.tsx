import { useEffect, useMemo, useRef } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getEvent } from '../../data/events'
import { getScenePassages } from '../../data/scenePassages'
import { JianpuEmboss } from './JianpuEmboss'
import { JianpuFrame } from './JianpuFrame'
import { SceneArtwork } from './SceneArtwork'
import { SceneMetadata } from './SceneMetadata'
import { ScenePassagePanel } from './ScenePassagePanel'
import { SceneProgress } from './SceneProgress'

const coldScenes = new Set(['huxinting', 'mingwang', 'roadblock', 'old-zhangdai', 'qidream'])
const warmScenes = new Set(['lanxue', 'fengmen', 'jinshan', 'zhongqiu', 'buxiyuan', 'lanterns', 'luwang'])

function sceneTone(sceneId: string) {
  if (coldScenes.has(sceneId)) return 'cold'
  if (warmScenes.has(sceneId)) return 'warm'
  if (['famine', 'zhaoqing'].includes(sceneId)) return 'lost'
  return 'neutral'
}

export function SceneExhibition() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const closeRef = useRef<HTMLButtonElement>(null)
  const sceneId = params.get('scene')
  const passageParam = Number(params.get('passage') ?? 0)
  const event = sceneId ? getEvent(sceneId) : undefined
  const passages = useMemo(() => sceneId ? getScenePassages(sceneId) : [], [sceneId])
  const activeIndex = Math.min(Math.max(passageParam - 1, 0), Math.max(passages.length - 1, 0))
  const activePassage = passages[activeIndex]
  const showPassage = passageParam > 0 && Boolean(activePassage)
  const tone = sceneTone(sceneId ?? '')

  const setPassage = (order: number | null, replace = false) => {
    if (!sceneId) return
    const next = new URLSearchParams(params)
    if (order === null) next.delete('passage')
    else next.set('passage', String(order))
    setParams(next, { replace })
  }

  const close = () => {
    navigate({ pathname: '/', search: '' })
  }

  const nextPassage = () => {
    if (!showPassage) {
      setPassage(1)
      return
    }
    setPassage(activeIndex >= passages.length - 1 ? 1 : activeIndex + 2)
  }

  const previousPassage = () => {
    if (!showPassage) return
    if (activeIndex === 0) setPassage(null)
    else setPassage(activeIndex)
  }

  useEffect(() => {
    if (!sceneId) return
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (showPassage) setPassage(null)
        else close()
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextPassage()
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        previousPassage()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [sceneId, showPassage, activeIndex, passages.length])

  useEffect(() => {
    document.body.classList.toggle('scene-is-open', Boolean(sceneId))
    return () => document.body.classList.remove('scene-is-open')
  }, [sceneId])

  if (!sceneId || !event || passages.length === 0) return null

  return (
    <section className={`scene-exhibition scene-tone-${tone} ${showPassage ? 'has-passage' : 'image-layer'}`} role="dialog" aria-modal="true" aria-label={`${event.title}场景展览`}>
      <JianpuFrame tone={tone} />
      <JianpuEmboss />
      <div className="scene-topbar">
        <button type="button" ref={closeRef} className="scene-close" onClick={showPassage ? () => setPassage(null) : close} aria-label={showPassage ? '返回图像层' : '关闭场景'}>
          {showPassage ? <ArrowLeft size={18} aria-hidden="true" /> : <X size={18} aria-hidden="true" />}
          <span>{showPassage ? '返回图像' : '关闭'}</span>
        </button>
        <SceneMetadata event={event} passage={showPassage ? activePassage : undefined} />
        <SceneProgress current={showPassage ? activeIndex + 1 : 0} total={passages.length} />
      </div>
      <SceneArtwork
        sceneId={sceneId}
        title={event.title}
        image={event.heroImage ?? event.id}
        passage={activePassage}
        showPassage={showPassage}
        onAdvance={nextPassage}
      />
      {showPassage && activePassage && <ScenePassagePanel passage={activePassage} />}
      {showPassage && (
        <div className="scene-arrows">
          <button type="button" onClick={previousPassage} aria-label="上一段原文"><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" onClick={nextPassage} aria-label="下一段原文"><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      )}
    </section>
  )
}
