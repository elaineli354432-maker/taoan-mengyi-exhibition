import { ArrowDown, BookOpen } from 'lucide-react'
import { assetUrl } from '../utils/assetUrl'
export function Hero() { const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); return <header id="top" className="hero">
  <div className="hero-copy"><p className="eyebrow">TAO AN · 1597—?</p><h1>陶庵旧梦</h1><p className="hero-sub">从湖心亭的一场雪，进入张岱的晚明记忆</p><p className="hero-intro">他曾把西湖的雪夜写成一场梦。<br />又在明亡之后，把整个旧世界写成梦忆。</p><div className="hero-actions"><button onClick={() => go('reading')} className="button primary">进入雪夜 <ArrowDown size={16}/></button><button onClick={() => go('life')} className="button ghost"><BookOpen size={16}/> 查看时间线</button></div></div>
  <div className="hero-art"><div className="art-stamp">陶庵<br/>旧梦</div><img src={assetUrl('/zhang-dai-hero.webp')} decoding="async" fetchPriority="high" loading="eager" alt="雪夜西湖中的张岱水墨人物插画" /><p>一叶舟轻，万籁俱寂</p></div>
</header> }
