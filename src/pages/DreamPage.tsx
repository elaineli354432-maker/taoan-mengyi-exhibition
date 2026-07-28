import { Link } from 'react-router-dom'
import { ChapterProgress } from '../components/navigation/ChapterProgress'
import { CuratorialText } from '../components/shared/CuratorialText'
import { ImageCaption } from '../components/shared/ImageCaption'
import { ResponsiveImage } from '../components/shared/ResponsiveImage'
import { VerifiedQuote } from '../components/shared/VerifiedQuote'
import { events, getEvent, type EventRecord } from '../data/events'

const pick = (ids: string[]) => ids.map((id) => getEvent(id)).filter(Boolean) as EventRecord[]

function EventMini({ event }: { event: EventRecord }) {
  return (
    <article className="event-mini">
      <ResponsiveImage image={event.heroImage ?? event.id} alt={event.title} />
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
      <ResponsiveImage image={event.heroImage ?? event.id} alt={event.title} />
      <div>
        <span>{event.displayDate} · {event.sourceChapter}</span>
        <h3>{event.title}</h3>
        <CuratorialText>{event.curatorialText}</CuratorialText>
        <ImageCaption>{event.imageCaption ?? '现有视觉素材重排。'}</ImageCaption>
        <div className="text-links">
          <Link to={`/timeline?event=${event.id}`}>年谱</Link>
          <Link to={`/map?event=${event.id}`}>行迹</Link>
          <Link to={`/read?chapter=${event.relatedChapterIds[0] ?? event.id}`}>原文</Link>
        </div>
      </div>
    </article>
  )
}

export function DreamPage() {
  const formation = pick(['xuanyaoting', 'nanzhen', 'lanxue', 'qinpai'])
  const prosperity = pick(['fengmen', 'jinshan', 'zhongqiu', 'buxiyuan'])
  const huxinting = getEvent('huxinting')!
  const collapse = pick(['lanterns', 'zhaoqing', 'famine', 'roadblock', 'mingwang'])
  const writing = pick(['books', 'shanzhong', 'old-zhangdai'])

  return (
    <main className="home-page">
      <ChapterProgress />

      <section id="top" className="dream-hero">
        <ResponsiveImage image="huxinting" alt="湖心亭雪景" priority />
        <div className="dream-hero-copy">
          <h1>陶庵一梦</h1>
          <p>《陶庵梦忆》中的张岱与晚明生活</p>
          <span>五十年来，总成一梦。</span>
        </div>
        <a className="scroll-cue" href="#formation">向下，进入旧梦</a>
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

      <section id="prosperity" className="home-chapter chapter-prosperity">
        <header className="chapter-head">
          <span>02</span>
          <h2>创造一种生活</h2>
          <p>张岱不是晚明生活的旁观者。他组织戏曲、雅集、游赏和园林，把审美变成一套可以被实践的生活方式。</p>
        </header>
        <EventStrip event={prosperity[0]} />
        <article className="night-opera">
          <ResponsiveImage image={prosperity[1].heroImage ?? prosperity[1].id} alt={prosperity[1].title} />
          <div>
            <span>{prosperity[1].displayDate} · {prosperity[1].sourceChapter}</span>
            <h3>金山夜戏</h3>
            <p>从黑暗江面到寺院灯火，再到戏曲开始，张岱把一次夜游组织成完整的现场。这里的“痴”尚未显出孤绝，却已经是一种把感受付诸行动的能力。</p>
            <Link to="/read?chapter=jinshan&event=jinshan">进入篇目</Link>
          </div>
        </article>
        <div className="asymmetric-pair">
          <EventMini event={prosperity[2]} />
          <EventStrip event={prosperity[3]} reverse />
        </div>
      </section>

      <section id="obsession" className="home-chapter chapter-obsession">
        <header className="chapter-head">
          <span>03</span>
          <h2>天地一痴人</h2>
          <p>这一章只把《湖心亭看雪》放在中心。“痴”不是抽象标签，而是愿意亲自进入极端场景、用行动确认感受。</p>
        </header>
        <div className="obsession-layout">
          <ResponsiveImage image="huxinting" alt="湖心亭雪景" />
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
              <Link to="/timeline?year=1632&event=huxinting">回到1632年</Link>
            </div>
          </aside>
        </div>
        <div className="obsession-branches">
          {pick(['lanxue', 'qinpai', 'buxiyuan']).map((event) => (
            <p key={event.id}><strong>{event.title}</strong>{event.themes.includes('tea') ? '辨水、候火和择器，使“痴”落在味觉细节。' : event.themes.includes('music') ? '琴社让听觉训练与社交组织相互支撑。' : '园林把审美安排为可居可游的日常。'}</p>
          ))}
        </div>
      </section>

      <section id="collapse" className="home-chapter chapter-collapse">
        <header className="chapter-head">
          <span>04</span>
          <h2>人间散场</h2>
          <p>本章不制造灾难奇观，只让城市生活逐渐失去支撑：灯景、寺火、饥荒、断路，最终抵达1644年的明亡。</p>
        </header>
        <div className="collapse-sequence">
          {collapse.map((event, index) => (
            <article className={`collapse-step step-${index + 1}`} key={event.id}>
              <ResponsiveImage image={event.heroImage ?? event.id} alt={event.title} />
              <div>
                <span>{event.displayDate}</span>
                <h3>{event.title}</h3>
                <p>{event.curatorialText}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

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
    </main>
  )
}
