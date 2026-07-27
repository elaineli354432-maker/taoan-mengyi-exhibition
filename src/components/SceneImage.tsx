import type { CSSProperties } from 'react'

// Event IDs are intentionally mapped one-to-one to assets. Do not use one
// illustration as a visual fallback for another episode in the narrative.
const images: Record<string, string> = {
  cover: '/images/taoan-cover-pan-tianshou.png',
  birth: '/images/birth-shanyin.png',
  xuanyaoting: '/images/scene-child-wide.png',
  nanzhen: '/images/nanzhen.png',
  lanxue: '/images/lanxue.png',
  qinpai: '/images/qinpai.png',
  fengmen: '/images/fengmen.png',
  jinshan: '/images/scene-youth-wide.png',
  huxinting: '/images/huxinting.png',
  zhongqiu: '/images/zhongqiu.png',
  buxiyuan: '/images/buxiyuan.png',
  baiyang: '/images/baiyang.png',
  'snow-obsession': '/images/snow-obsession.png',
  'opera-obsession': '/images/opera-obsession.png',
  'tea-obsession': '/images/tea-obsession.png',
  'qin-obsession': '/images/qin-obsession.png',
  'garden-obsession': '/images/garden-obsession.png',
  lanterns: '/images/lanterns.png',
  zhaoqing: '/images/zhaoqing.png',
  famine: '/images/famine.png',
  roadblock: '/images/roadblock.png',
  mingwang: '/images/mingwang.png',
  books: '/images/books.png',
  shanzhong: '/images/scene-elder-wide.png',
  'old-zhangdai': '/images/old-zhangdai.png',
  child: '/images/scene-child-wide.png',
  youth: '/images/scene-youth-wide.png',
  ruin: '/images/scene-ruin-wide.png',
  elder: '/images/scene-elder-wide.png',
  snow: '/images/huxinting.png',
}

export function SceneImage({ kind, variant, className = '' }: { kind: string; variant?: string; className?: string }) {
  const src = images[variant || kind] || '/images/jiangnan-antique-map-wash.png'

  return (
    <div
      aria-hidden="true"
      style={{ '--scene-image': `url('${src}')` } as CSSProperties}
      className={`scene-image scene-${kind} ${className}`}
    />
  )
}
