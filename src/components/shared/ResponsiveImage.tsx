import { type CSSProperties } from 'react'
import { assetUrl, fallbackAssetUrl } from '../../utils/assetUrl'

export const imagePaths: Record<string, string> = {
  cover: '/images/taoan-cover-pan-tianshou.webp',
  xuanyaoting: '/images/scene-child-wide.webp',
  nanzhen: '/images/nanzhen.webp',
  lanxue: '/images/lanxue.webp',
  qinpai: '/images/qinpai.webp',
  fengmen: '/images/fengmen.webp',
  jinshan: '/images/scene-youth-wide.webp',
  'qinhuai-river-house': '/images/qinhuai-river-house.webp',
  huxinting: '/images/huxinting.webp',
  'longshan-snow': '/images/longshan-snow.webp',
  zhongqiu: '/images/zhongqiu.webp',
  buxiyuan: '/images/buxiyuan.webp',
  'goulou-shanfang': '/images/goulou-shanfang.webp',
  lanterns: '/images/lanterns.webp',
  zhaoqing: '/images/zhaoqing.webp',
  famine: '/images/famine.webp',
  roadblock: '/images/roadblock.webp',
  mingwang: '/images/mingwang.webp',
  books: '/images/books.webp',
  shanzhong: '/images/scene-elder-wide.webp',
  'old-zhangdai': '/images/old-zhangdai.webp',
  map: '/images/jiangnan-antique-map-wash.webp',
  archive: '/images/taoan-cover-mobile-landscape-v2.webp',
}

export function ResponsiveImage({
  image,
  alt,
  priority = false,
  className = '',
}: {
  image: string
  alt: string
  priority?: boolean
  className?: string
}) {
  const imagePath = imagePaths[image] ?? (image.startsWith('/images/') ? image : imagePaths.cover)
  const src = assetUrl(imagePath)
  const fallbackSrc = fallbackAssetUrl(imagePath)
  const webpSrc = src.endsWith('.webp') ? src : undefined
  return (
    <figure className={`responsive-image ${className}`} style={{ '--image-src': `url("${src}")` } as CSSProperties}>
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img src={fallbackSrc} alt={alt} width="1600" height="900" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
      </picture>
    </figure>
  )
}
