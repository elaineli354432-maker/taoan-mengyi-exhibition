import { type CSSProperties } from 'react'
import { assetUrl } from '../../utils/assetUrl'

export const imagePaths: Record<string, string> = {
  cover: '/images/taoan-cover-pan-tianshou.png',
  xuanyaoting: '/images/scene-child-wide.png',
  nanzhen: '/images/nanzhen.png',
  lanxue: '/images/lanxue.png',
  qinpai: '/images/qinpai.png',
  fengmen: '/images/fengmen.png',
  jinshan: '/images/scene-youth-wide.png',
  'qinhuai-river-house': '/images/qinhuai-river-house.png',
  huxinting: '/images/huxinting.png',
  'longshan-snow': '/images/longshan-snow.png',
  zhongqiu: '/images/zhongqiu.png',
  buxiyuan: '/images/buxiyuan.png',
  'goulou-shanfang': '/images/goulou-shanfang.png',
  lanterns: '/images/lanterns.png',
  zhaoqing: '/images/zhaoqing.png',
  famine: '/images/famine.png',
  roadblock: '/images/roadblock.png',
  mingwang: '/images/mingwang.png',
  books: '/images/books.png',
  shanzhong: '/images/scene-elder-wide.png',
  'old-zhangdai': '/images/old-zhangdai.png',
  map: '/images/jiangnan-antique-map-wash.png',
  archive: '/images/taoan-cover-mobile-landscape-v2.png',
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
  const src = assetUrl(imagePaths[image] ?? (image.startsWith('/images/') ? image : imagePaths.cover))
  return (
    <figure className={`responsive-image ${className}`} style={{ '--image-src': `url("${src}")` } as CSSProperties}>
      <img src={src} alt={alt} width="1600" height="900" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
    </figure>
  )
}
