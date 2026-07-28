import { useEffect, useRef, useState, type CSSProperties } from 'react'

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

export function SceneImage({ kind, variant, className = '', priority = false }: { kind: string; variant?: string; className?: string; priority?: boolean }) {
  const src = images[variant || kind] || '/images/jiangnan-antique-map-wash.png'
  const ref = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(priority || kind === 'cover' || variant === 'cover')

  useEffect(() => {
    if (shouldLoad) return
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '450px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ '--scene-image': shouldLoad ? `url('${src}')` : 'none' } as CSSProperties}
      className={`scene-image scene-${kind} ${className} ${shouldLoad ? 'is-loaded' : 'is-pending'}`}
    >
      {shouldLoad && (
        <img
          alt=""
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
          src={src}
          width="1600"
          height="900"
        />
      )}
    </div>
  )
}
