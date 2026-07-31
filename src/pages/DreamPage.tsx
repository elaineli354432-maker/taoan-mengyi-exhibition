import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { ChapterProgress } from '../components/navigation/ChapterProgress'
import { SceneExhibition } from '../components/exhibition/SceneExhibition'
import { SceneTrigger } from '../components/exhibition/SceneTrigger'
import { ShizhuzhaiTransition } from '../components/exhibition/ShizhuzhaiTransition'
import { CuratorialText } from '../components/shared/CuratorialText'
import { ImageCaption } from '../components/shared/ImageCaption'
import { ResponsiveImage } from '../components/shared/ResponsiveImage'
import { VerifiedQuote } from '../components/shared/VerifiedQuote'
import { events, getEvent, type EventRecord } from '../data/events'
import { getScenePassages, type ScenePassage } from '../data/scenePassages'
import { sceneImageUrl } from '../components/exhibition/sceneImage'

const pick = (ids: string[]) => ids.map((id) => getEvent(id)).filter(Boolean) as EventRecord[]

const obsessionBranchMeta: Record<string, { title: string; image: string; note: string }> = {
  lanxue: {
    title: '为茶而痴',
    image: '/images/tea-obsession.png',
    note: '辨水、候火和择器，使“痴”落在味觉细节。',
  },
  qinpai: {
    title: '为琴而痴',
    image: '/images/qin-obsession.png',
    note: '琴社让听觉训练与社交组织相互支撑。',
  },
  buxiyuan: {
    title: '为园林而痴',
    image: '/images/garden-obsession.png',
    note: '园林把审美安排为可居可游的日常。',
  },
  'goulou-shanfang': {
    title: '为园林而痴',
    image: '/images/goulou-shanfang.png',
    note: '山房把桥、阁、竹泉与溪声组织成可居可听的园林经验。',
  },
}

function EventMini({ event }: { event: EventRecord }) {
  return (
    <article className="event-mini">
      <SceneTrigger event={event} />
      <div>
        <span>{event.displayDate} · {event.sourceChapter}</span>
        <h3>{event.title}</h3>
        <p>{event.curatorialText}</p>
      </div>
    </article>
  )
}

function EventStrip({ event, reverse = false }: { event: EventRecord; reverse?: boolean }) {
  return (
    <article className={`event-strip ${reverse ? 'is-reverse' : ''}`}>
      <SceneTrigger event={event} />
      <div>
        <span>{event.displayDate} · {event.sourceChapter}</span>
        <h3>{event.title}</h3>
        <CuratorialText>{event.curatorialText}</CuratorialText>
        <ImageCaption>{event.imageCaption ?? '现有视觉素材重排。'}</ImageCaption>
        <div className="text-links">
          <Link to={`/?scene=${event.id}`}>场景</Link>
          <Link to={`/timeline?event=${event.id}`}>年谱</Link>
          <Link to={`/map?event=${event.id}`}>行迹</Link>
          <Link to={`/read?chapter=${event.relatedChapterIds[0] ?? event.id}`}>完整篇目</Link>
        </div>
      </div>
    </article>
  )
}

type TourAct = {
  id: string
  number: string
  title: string
  description: string
  slides: TourSlide[]
}

type TourSlide = {
  event: EventRecord
  image?: string
  title?: string
  description?: string
  kicker?: string
  passageOrder?: number
}

const eventSlides = (items: EventRecord[]): TourSlide[] => items.map((event) => ({ event }))

const passageTitle = (sceneId: string, passage: ScenePassage) => {
  const luwangTitles = ['仓促接驾', '七重御席', '献膳奏乐', '戏台回声', '夜色退场']
  const qidreamTitles = ['时事日非', '青衣持刺', '梦中问答', '星落如雨', '以文字存梦']
  const titles = sceneId === 'luwang' ? luwangTitles : sceneId === 'qidream' ? qidreamTitles : []
  return titles[passage.order - 1] ?? `${passage.sourceChapter} ${String(passage.order).padStart(2, '0')}`
}

const passageSlides = (sceneId: string, event: EventRecord): TourSlide[] =>
  getScenePassages(sceneId).map((passage) => ({
    event,
    image: passage.image,
    title: `${event.title} · ${passageTitle(sceneId, passage)}`,
    description: passage.curatorialNote ?? passage.originalText,
    kicker: `${event.displayDate} · ${passage.sourceChapter}`,
    passageOrder: passage.order,
  }))

const TOUR_END_ID = 'ending'

function ActTour({ acts }: { acts: TourAct[] }) {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const tourId = params.get('tour')
  const actIndex = acts.findIndex((act) => act.id === tourId)
  const act = actIndex >= 0 ? acts[actIndex] : undefined
  const isEnding = tourId === TOUR_END_ID
  if (!act && !isEnding) return null

  const enterHome = () => navigate({ pathname: '/', search: '' })
  const returnToFinalSlide = () => {
    const finalAct = acts[acts.length - 1]
    setParams(new URLSearchParams({ tour: finalAct.id, step: String(finalAct.slides.length) }))
  }

  if (isEnding) {
    return (
      <section className="act-tour is-ending" role="dialog" aria-modal="true" aria-label="展览结束">
        <div className="act-tour-topbar">
          <button type="button" onClick={enterHome} aria-label="进入网站主页"><X size={18} aria-hidden="true" />进入主页</button>
          <span>展览结束</span>
        </div>

        <article className="act-tour-ending">
          <span>终章</span>
          <h1>梦醒仍在文字中</h1>
          <p>五幕至此收束：感官、生活、痴念、散场与书写，都回到《陶庵梦忆》这一册记忆的容器。接下来进入网站主页，可重新选择章节、年谱、行迹与完整阅读。</p>
          <button type="button" onClick={enterHome}>进入网站主页</button>
        </article>

        <div className="act-tour-arrows">
          <button type="button" onClick={returnToFinalSlide} aria-label="回到上一幕"><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" onClick={enterHome} aria-label="进入网站主页"><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </section>
    )
  }
  if (!act) return null

  const requestedStep = Number(params.get('step') ?? 0)
  const total = act.slides.length + 1
  const step = Math.min(Math.max(Number.isFinite(requestedStep) ? requestedStep : 0, 0), total - 1)
  const slide = step > 0 ? act.slides[step - 1] : undefined
  const titlePlateId = String(Math.min(actIndex + 1, 6)).padStart(2, '0')

  const openActStep = (nextActIndex: number, nextStep: number) => {
    const wrappedActIndex = (nextActIndex + acts.length) % acts.length
    const nextAct = acts[wrappedActIndex]
    const nextTotal = nextAct.slides.length + 1
    const wrappedStep = (nextStep + nextTotal) % nextTotal
    setParams(new URLSearchParams({ tour: nextAct.id, step: String(wrappedStep) }))
  }

  const setStep = (nextStep: number) => {
    if (nextStep >= total) {
      if (actIndex === acts.length - 1) {
        setParams(new URLSearchParams({ tour: TOUR_END_ID }))
        return
      }
      openActStep(actIndex + 1, 0)
      return
    }
    if (nextStep < 0) {
      const previousActIndex = (actIndex - 1 + acts.length) % acts.length
      openActStep(previousActIndex, acts[previousActIndex].slides.length)
      return
    }
    setParams(new URLSearchParams({ tour: act.id, step: String(nextStep) }))
  }

  return (
    <section className={`act-tour ${step === 0 ? 'is-title' : 'is-image'}`} role="dialog" aria-modal="true" aria-label={`${act.title}专场`}>
      <div className="act-tour-topbar">
        <button type="button" onClick={() => navigate({ pathname: '/', search: '' })} aria-label="退出专场"><X size={18} aria-hidden="true" />退出</button>
        <span>{act.number} · {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>

      {step === 0 ? (
        <article className="act-tour-title">
          <div className={`shizhuzhai-print tour-jianpu-print shizhuzhai-plate-${actIndex + 1}`} style={{ ['--jianpu-image' as string]: `url('/images/jianpu/patterns/shizhuzhai-pattern-${titlePlateId}.png')` }}>
            <span className="shizhuzhai-print-layer shizhuzhai-print-emboss" />
            <span className="shizhuzhai-print-layer shizhuzhai-print-color" />
            <img className="shizhuzhai-art shizhuzhai-print-ink" src={`/images/jianpu/patterns/shizhuzhai-pattern-${titlePlateId}.png`} alt="" />
          </div>
          <span>{act.number}</span>
          <h1>{act.title}</h1>
          <p>{act.description}</p>
        </article>
      ) : slide && (
        <article className="act-tour-image">
          <img src={sceneImageUrl(slide.image ?? slide.event.heroImage ?? slide.event.id)} alt={slide.title ?? slide.event.title} />
          <div>
            <span>{slide.kicker ?? `${slide.event.displayDate} · ${slide.event.sourceChapter}`}</span>
            <h2>{slide.title ?? slide.event.title}</h2>
            <p>{slide.description ?? slide.event.curatorialText}</p>
            <Link to={`/?scene=${slide.event.id}&passage=${slide.passageOrder ?? 1}&returnTour=${act.id}&returnStep=${step}`}>进入此景</Link>
          </div>
        </article>
      )}

      <div className="act-tour-arrows">
        <button type="button" onClick={() => setStep(step - 1)} aria-label="上一场"><ArrowLeft size={18} aria-hidden="true" /></button>
        <button type="button" onClick={() => setStep(step + 1)} aria-label="下一场"><ArrowRight size={18} aria-hidden="true" /></button>
      </div>
    </section>
  )
}

export function DreamPage() {
  const [guideOpen, setGuideOpen] = useState(false)
  const navigate = useNavigate()
  const formation = pick(['xuanyaoting', 'nanzhen', 'lanxue', 'qinpai'])
  const prosperity = pick(['fengmen', 'jinshan', 'qinhuai-river-house', 'zhongqiu', 'buxiyuan'])
  const huxinting = getEvent('huxinting')!
  const collapse = pick(['lanterns', 'zhaoqing', 'famine', 'roadblock', 'mingwang'])
  const southMing = pick(['luwang', 'qidream'])
  const writing = pick(['books', 'shanzhong', 'old-zhangdai'])
  const tourActs: TourAct[] = [
    {
      id: 'formation',
      number: '01',
      title: '感官的形成',
      description: '张岱后来能敏锐记录声音、光线、器物和空间，不是偶然才情，而是童年书斋、园林、茶事与琴社长期训练出的辨别力。',
      slides: eventSlides(formation),
    },
    {
      id: 'prosperity',
      number: '02',
      title: '创造一种生活',
      description: '张岱不是晚明生活的旁观者。他组织戏曲、雅集、游赏和园林，把审美变成一套可以被实践的生活方式。',
      slides: eventSlides(prosperity),
    },
    {
      id: 'obsession',
      number: '03',
      title: '天地一痴人',
      description: '痴，不是一种标签，而是一种用行动进入世界的方法。湖心亭是主轴，龙山雪延展“雪痴”，茶、琴、园只是它的旁笺。',
      slides: eventSlides([huxinting, ...pick(['longshan-snow', 'lanxue', 'qinpai', 'buxiyuan', 'goulou-shanfang'])]),
    },
    {
      id: 'collapse',
      number: '04',
      title: '人间散场',
      description: '灯景、寺火、饥荒、香路断绝与国破家亡，让城市生活逐渐失去支撑。',
      slides: eventSlides(collapse),
    },
    {
      id: 'south-ming',
      number: '04B',
      title: '南明余影',
      description: '鲁王过越是外部政治行进，祁世培入梦是内部精神坍塌。两者共同通向“以文字存梦”。',
      slides: [
        ...passageSlides('luwang', southMing[0]),
        ...passageSlides('qidream', southMing[1]),
      ],
    },
    {
      id: 'writing',
      number: '05',
      title: '以文字存梦',
      description: '当园林、藏书、城市和交游消失之后，写作成为张岱保存感官世界的方式。',
      slides: eventSlides(writing),
    },
  ]

  const enterFirstAct = () => {
    setGuideOpen(false)
    navigate({ pathname: '/', search: 'tour=formation&step=0' })
  }

  return (
    <main className="home-page">
      <ChapterProgress />
      <ActTour acts={tourActs} />

      <section id="top" className={`dream-hero ${guideOpen ? 'guide-open' : ''}`} onClick={() => setGuideOpen(true)}>
        <ResponsiveImage image="huxinting" alt="湖心亭雪景" priority />
        <div className="dream-hero-copy">
          <h1>陶庵一梦</h1>
          <p>《陶庵梦忆》中的张岱与晚明生活</p>
          <span>五十年来，总成一梦。</span>
        </div>
        <button className="scroll-cue" type="button" onClick={(event) => {
          event.stopPropagation()
          setGuideOpen(true)
        }}>点击，打开展览导览</button>
        {guideOpen && (
          <div className="home-guide" role="dialog" aria-modal="true" aria-label="展览导览" onClick={(event) => event.stopPropagation()}>
            <div>
              <p>展览导览</p>
              <h2>选择进入方式</h2>
              <span>先看结构，或直接进入第一幕满屏展厅。</span>
            </div>
            <nav aria-label="主展结构">
              {tourActs.map((act) => (
                <Link to={`/?tour=${act.id}&step=0`} onClick={() => setGuideOpen(false)} key={act.id}>
                  {act.number} {act.title}
                </Link>
              ))}
            </nav>
            <div className="home-guide-tools">
              <Link to="/timeline">年谱</Link>
              <Link to="/map">行迹</Link>
              <Link to="/read">阅读器</Link>
            </div>
            <div className="home-guide-actions">
              <button type="button" onClick={enterFirstAct}>直接进入</button>
              <button type="button" onClick={() => setGuideOpen(false)}>留在封面</button>
            </div>
          </div>
        )}
      </section>

      <section id="formation" className="home-chapter chapter-formation">
        <header className="chapter-head">
          <span>01</span>
          <h2>感官的形成</h2>
          <p>张岱后来能敏锐记录声音、光线、器物和空间，不是偶然才情，而是童年书斋、园林、茶事与琴社长期训练出的辨别力。</p>
        </header>
        <div className="formation-layout">
          <EventStrip event={formation[0]} />
          <div className="detail-grid">
            {formation.slice(1).map((event) => <EventMini event={event} key={event.id} />)}
          </div>
        </div>
      </section>

      <ShizhuzhaiTransition variant="bamboo" plate={1} />

      <section id="prosperity" className="home-chapter chapter-prosperity">
        <header className="chapter-head">
          <span>02</span>
          <h2>创造一种生活</h2>
          <p>张岱不是晚明生活的旁观者。他组织戏曲、雅集、游赏和园林，把审美变成一套可以被实践的生活方式。</p>
        </header>
        <EventStrip event={prosperity[0]} />
        <article className="night-opera">
          <SceneTrigger event={prosperity[1]} />
          <div>
            <span>{prosperity[1].displayDate} · {prosperity[1].sourceChapter}</span>
            <h3>金山夜戏</h3>
            <p>从黑暗江面到寺院灯火，再到戏曲开始，张岱把一次夜游组织成完整的现场。这里的“痴”尚未显出孤绝，却已经是一种把感受付诸行动的能力。</p>
            <Link to="/?scene=jinshan">进入场景</Link>
          </div>
        </article>
        <div className="asymmetric-pair">
          <EventMini event={prosperity[2]} />
          <EventMini event={prosperity[4]} />
          <EventStrip event={prosperity[3]} reverse />
        </div>
      </section>

      <ShizhuzhaiTransition variant="snow" plate={2} />

      <section id="obsession" className="home-chapter chapter-obsession">
        <header className="chapter-head">
          <span>03</span>
          <h2>天地一痴人</h2>
          <p>这一章只把《湖心亭看雪》放在中心。“痴”不是抽象标签，而是愿意亲自进入极端场景、用行动确认感受。</p>
        </header>
        <div className="obsession-layout">
          <SceneTrigger event={huxinting} image="huxinting" alt="湖心亭雪景" />
          <aside>
            {huxinting.originalQuote && <VerifiedQuote quote={huxinting.originalQuote} source="《陶庵梦忆·湖心亭看雪》" />}
            <CuratorialText>{huxinting.curatorialText}</CuratorialText>
            <div className="westlake-maplet">
              <span>西湖</span>
              <i />
              <b>湖心亭</b>
            </div>
            <div className="text-links">
              <Link to="/read?chapter=huxinting&event=huxinting">阅读《湖心亭看雪》</Link>
              <Link to="/?scene=huxinting">进入雪中</Link>
              <Link to="/timeline?year=1632&event=huxinting">回到1632年</Link>
            </div>
          </aside>
        </div>
        <div className="obsession-branches">
          {pick(['lanxue', 'qinpai', 'buxiyuan', 'goulou-shanfang']).map((event) => {
            const branch = obsessionBranchMeta[event.id]
            const passage = getScenePassages(event.id)[0]
            return (
              <article className="obsession-branch-card" key={event.id}>
                <SceneTrigger event={event} image={branch.image} alt={branch.title} />
                <div>
                  <span>{event.displayDate} · {event.sourceChapter}</span>
                  <h3>{branch.title}</h3>
                  <p>{branch.note}</p>
                  {passage && <blockquote>{passage.originalText}</blockquote>}
                  <Link to={`/?scene=${event.id}`}>进入旁笺</Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <ShizhuzhaiTransition variant="loss" plate={3} />

      <section id="collapse" className="home-chapter chapter-collapse">
        <header className="chapter-head">
          <span>04</span>
          <h2>人间散场</h2>
          <p>本章不制造灾难奇观，只让城市生活逐渐失去支撑：灯景、寺火、饥荒、断路，最终抵达1644年的明亡。</p>
        </header>
        <div className="collapse-sequence">
          {collapse.map((event, index) => (
            <article className={`collapse-step step-${index + 1}`} key={event.id}>
              <SceneTrigger event={event} />
              <div>
                <span>{event.displayDate}</span>
                <h3>{event.title}</h3>
                <p>{event.curatorialText}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ShizhuzhaiTransition variant="loss" plate={4} />

      <section id="south-ming" className="home-chapter chapter-south-ming">
        <header className="chapter-head">
          <span>04B</span>
          <h2>南明余影</h2>
          <p>这里不新增历史人物叙事，只复用既有鲁王与祁氏视觉素材：一个外部政治行进，一个内部精神坍塌，把“人间散场”沉降到“以文字存梦”。</p>
        </header>
        <div className="south-ming-dual">
          {southMing.map((event) => (
            <article key={event.id} className={`south-ming-card south-ming-${event.id}`}>
              <SceneTrigger event={event} image={event.heroImage ?? event.id} />
              <div>
                <span>{event.displayDate} · {event.sourceChapter}</span>
                <h3>{event.title}</h3>
                <p>{event.curatorialText}</p>
                <Link to={`/?scene=${event.id}`}>进入此笺</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="south-ming-flow" aria-label="鲁王过越与祁世培入梦关系">
          <span>外部行进</span>
          <span>历史秩序残影</span>
          <span>内部坍塌</span>
          <span>空间记忆化</span>
          <span>以文字存梦</span>
        </div>
      </section>

      <ShizhuzhaiTransition variant="blank" plate={5} />

      <section id="writing" className="home-chapter chapter-writing">
        <header className="chapter-head">
          <span>05</span>
          <h2>以文字存梦</h2>
          <p>当园林、藏书、城市和交游消失之后，写作成为张岱保存感官世界的方式，也成为个人记忆与历史见证的交汇处。</p>
        </header>
        <div className="writing-layout">
          {writing.map((event) => <EventStrip event={event} key={event.id} reverse={event.id === 'shanzhong'} />)}
        </div>
        <VerifiedQuote quote="五十年来，总成一梦。" source="《陶庵梦忆·梦忆序》" />
      </section>

      <ShizhuzhaiTransition variant="blank" plate={6} />

      <section id="archive" className="archive-entrances">
        <header className="chapter-head">
          <span>06</span>
          <h2>进入档案</h2>
          <p>主展结束后，再进入时间、地点和文本工具，重新查询这场旧梦的结构。</p>
        </header>
        <div>
          <Link to="/timeline">
            <ResponsiveImage image="books" alt="年谱入口" />
            <strong>在时间中重排旧梦</strong>
            <span>查看《陶庵梦忆》中可以确定或推定年代的事件。</span>
          </Link>
          <Link to="/map">
            <ResponsiveImage image="map" alt="行迹入口" />
            <strong>沿江南重新行走</strong>
            <span>查看张岱在绍兴、杭州、南京、苏州、镇江、山东等地的活动。</span>
          </Link>
          <Link to="/read">
            <ResponsiveImage image="archive" alt="原文入口" />
            <strong>回到张岱的文字</strong>
            <span>阅读经过核对的《陶庵梦忆》精选篇目。</span>
          </Link>
        </div>
      </section>
      <SceneExhibition />
    </main>
  )
}
