import { stages } from '../../data/stages'

export function ChapterProgress() {
  return (
    <nav className="chapter-progress" aria-label="主展章节">
      <a href="#top"><span>00</span>序章</a>
      {stages.map((stage) => (
        <a href={`#${stage.anchor}`} key={stage.id}>
          <span>{stage.number}</span>
          {stage.title}
        </a>
      ))}
      <a href="#archive"><span>06</span>进入档案</a>
    </nav>
  )
}
