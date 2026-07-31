import { Link } from 'react-router-dom'
import type { ScenePassage } from '../../data/scenePassages'

export function ScenePassagePanel({ passage }: { passage: ScenePassage }) {
  return (
    <aside className={`scene-passage-panel reveal-${passage.passageRevealStyle}`}>
      <p className="scene-panel-kicker">原文</p>
      <blockquote>{passage.originalText}</blockquote>
      {passage.curatorialNote && <p className="scene-panel-note">{passage.curatorialNote}</p>}
      <dl>
        <div>
          <dt>篇目</dt>
          <dd>{passage.sourceWork} · {passage.sourceChapter}</dd>
        </div>
        <div>
          <dt>来源</dt>
          <dd>{passage.sourceReference}</dd>
        </div>
      </dl>
      <Link to={`/read?chapter=${passage.chapterId}&event=${passage.eventId}`}>阅读完整篇目</Link>
    </aside>
  )
}
