import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { assetUrl } from '../utils/assetUrl'

// Event IDs are intentionally mapped one-to-one to assets. Do not use one
// illustration as a visual fallback for another episode in the narrative.
const images: Record<string, string> = {
  cover: '/images/taoan-cover-pan-tianshou.webp',
  birth: '/images/birth-shanyin.webp',
  xuanyaoting: '/images/scene-child-wide.webp',
  nanzhen: '/images/nanzhen.webp',
  lanxue: '/images/lanxue.webp',
  qinpai: '/images/qinpai.webp',
  fengmen: '/images/fengmen.webp',
  jinshan: '/images/scene-youth-wide.webp',
  huxinting: '/images/huxinting.webp',
  zhongqiu: '/images/zhongqiu.webp',
  buxiyuan: '/images/buxiyuan.webp',
  baiyang: '/images/baiyang.webp',
  'snow-obsession': '/images/snow-obsession.webp',
  'opera-obsession': '/images/opera-obsession.webp',
  'tea-obsession': '/images/tea-obsession.webp',
  'qin-obsession': '/images/qin-obsession.webp',
  'garden-obsession': '/images/garden-obsession.webp',
  lanterns: '/images/lanterns.webp',
  zhaoqing: '/images/zhaoqing.webp',
  famine: '/images/famine.webp',
  roadblock: '/images/roadblock.webp',
  mingwang: '/images/mingwang.webp',
  books: '/images/books.webp',
  shanzhong: '/images/scene-elder-wide.webp',
  'old-zhangdai': '/images/old-zhangdai.webp',
  child: '/images/scene-child-wide.webp',
  youth: '/images/scene-youth-wide.webp',
  ruin: '/images/scene-ruin-wide.webp',
  elder: '/images/scene-elder-wide.webp',
  snow: '/images/huxinting.webp',
}

export function SceneImage({ kind, variant, className = '', priority = false }: { kind: string; variant?: string; className?: string; priority?: boolean }) {
  const imagePath = images[variant || kind] || '/images/jiangnan-antique-map-wash.webp'
  const src = assetUrl(imagePath)
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
