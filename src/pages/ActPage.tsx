import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { dreamEvents, stages } from '../data/dreamEvents'
import { originalTexts } from '../data/originalTexts'
import { SceneImage } from '../components/SceneImage'
import { ActNavigator } from '../components/ActNavigator'

const actDescriptions: Record<string, string> = {
  '少年有梦': '茶、琴、泉石与书卷，先塑造了他的感官。',
  '人间繁华': '他不只记录繁华，他本身就是繁华的一部分。',
  '天地一痴人': '把全部感官交给一个正在消逝的世界。',
  '繁华将尽': '灯仍然亮着，但支撑一切的世界已经开始崩塌。',
  '总成一梦': '梦醒之后，文字成为保存旧世界的方式。',
}

export function ActPage() {
  const { stage } = useParams()
  const location = useLocation()
  const decoded = decodeURIComponent(stage || '')
  const title = stages.includes(decoded as typeof stages[number]) ? decoded : stages[0]
  const events = dreamEvents.filter((event) => event.stage === title)
  const currentScene = location.hash.replace('#', '') || events[0]?.id

  useEffect(() => {
    const sceneId = location.hash.replace('#', '')
    if (!sceneId) return
    requestAnimationFrame(() => document.getElementById(sceneId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }))
  }, [location.hash, title])

  return (
    <main className="act-page">
      <header className="act-head">
        <div className="act-head-copy">
          <Link to="/">← 回到五幕</Link>
          <p>五幕叙事 · 陶庵一梦</p>
          <h1>{title}</h1>
          <span>{actDescriptions[title]}</span>
        </div>
        <ActNavigator currentStage={title} currentScene={currentScene} />
      </header>
      <section className="act-scenes">
        {events.map((event, index) => (
          <article id={event.id} className="act-scene" key={event.id}>
            <SceneImage kind={event.image} variant={event.id} />
            <div className="act-overlay">
              <p>{event.year} · {event.age} · {event.place}</p>
              <h2>{event.title}</h2>
              <blockquote>{event.quote}</blockquote>
              {event.id === 'birth' && <div className="birth-era">
                <p><b>出身</b> 浙江山阴（今绍兴）仕宦书香之家；藏书、园林与水乡生活，是他最初的文化环境。</p>
                <p><b>纪年</b> 1597年，万历二十五年，丁酉年。</p>
                <p><b>时代</b> 丰臣秀吉再度侵朝，明廷援朝抗倭；长白山火山喷发并引发地震。万历帝疏于朝政，内政困局与朝臣谏争加剧。</p>
              </div>}
              <div className="on-image-text">
                {(originalTexts[event.id] || [event.quote]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div>
                <Link to={`/timeline?event=${event.id}`}>年谱</Link>
                <Link to={`/map?event=${event.id}`}>行迹</Link>
                <Link to={`/read?chapter=${event.id}`}>进入原文</Link>
              </div>
            </div>
            {index < events.length - 1 && <span className="scene-next">继续向右 →</span>}
          </article>
        ))}
      </section>
    </main>
  )
}
