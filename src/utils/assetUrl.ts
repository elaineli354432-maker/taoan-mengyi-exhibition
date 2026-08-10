const IMAGE_CDN_BASES = [
  'https://cdn.jsdelivr.net/gh/elaineli354432-maker/taoan-mengyi-exhibition@gh-pages/',
  'https://fastly.jsdelivr.net/gh/elaineli354432-maker/taoan-mengyi-exhibition@gh-pages/',
  'https://gcore.jsdelivr.net/gh/elaineli354432-maker/taoan-mengyi-exhibition@gh-pages/',
]

export function assetUrl(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path
  return withCdn(path)
}

export function fallbackAssetUrl(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path
  return withCdn(fallbackImagePath(path))
}

export function localFallbackAssetUrl(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path
  return withBase(fallbackImagePath(path))
}

export function installImageFallbacks() {
  if (typeof window === 'undefined') return
  window.addEventListener(
    'error',
    (event) => {
      const image = event.target
      if (!(image instanceof HTMLImageElement)) return
      const nextSrc = nextImageFallback(image.currentSrc || image.src)
      if (!nextSrc || image.src === nextSrc) return
      image.src = nextSrc
    },
    true,
  )
}

function withCdn(path: string) {
  if (!isProjectImage(path)) return withBase(path)
  return withCdnBase(path, IMAGE_CDN_BASES[0])
}

function withCdnBase(path: string, base: string) {
  const cleanPath = path.replace(/^\/+/, '')
  return `${base}${cleanPath}`
}

function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  if (path.startsWith(base)) return path
  const cleanPath = path.replace(/^\/+/, '')
  return `${base}${cleanPath}`
}

function fallbackImagePath(path: string) {
  if (path === '/zhang-dai-hero.webp') return '/zhang-dai-hero.png'
  if (!path.startsWith('/images/') || !path.endsWith('.webp')) return path
  return path.replace(/\.webp$/i, '.png')
}

function isProjectImage(path: string) {
  return path === '/zhang-dai-hero.webp' || path === '/zhang-dai-hero.png' || path.startsWith('/images/')
}

function nextImageFallback(src: string) {
  const match = cdnPathFromUrl(src)
  const path = match?.path ?? projectPathFromUrl(src)
  if (!path) return undefined
  if (match) {
    const nextBase = IMAGE_CDN_BASES[match.index + 1]
    if (path.endsWith('.webp') && nextBase) return withCdnBase(path, nextBase)
    if (path.endsWith('.webp')) return withCdn(fallbackImagePath(path))
    if (nextBase) return withCdnBase(path, nextBase)
    return withBase(path)
  }
  if (path.endsWith('.webp')) return withBase(fallbackImagePath(path))
  return undefined
}

function cdnPathFromUrl(src: string) {
  const index = IMAGE_CDN_BASES.findIndex((base) => src.startsWith(base))
  if (index === -1) return undefined
  return {
    index,
    path: `/${src.slice(IMAGE_CDN_BASES[index].length).replace(/^\/+/, '')}`,
  }
}

function projectPathFromUrl(src: string) {
  try {
    const url = new URL(src, window.location.href)
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
    if (!url.pathname.startsWith(base)) return undefined
    return `/${url.pathname.slice(base.length).replace(/^\/+/, '')}`
  } catch {
    return undefined
  }
}
