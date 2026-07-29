import type { EventRecord } from '../../data/events'
import type { ScenePassage } from '../../data/scenePassages'

export function SceneMetadata({ event, passage }: { event: EventRecord; passage?: ScenePassage }) {
  return (
    <div className="scene-metadata">
      <span>{event.displayDate}</span>
      <strong>{event.sourceChapter ?? event.title}</strong>
      <small>{passage ? passage.sourceReference : event.dateSource ?? '再次点击，见原文'}</small>
    </div>
  )
}
