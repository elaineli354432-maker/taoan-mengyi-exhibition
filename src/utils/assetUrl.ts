const IMAGE_CDN_BASE = 'https://cdn.jsdelivr.net/gh/elaineli354432-maker/taoan-mengyi-exhibition@gh-pages/'

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
  const cleanPath = path.replace(/^\/+/, '')
  return `${IMAGE_CDN_BASE}${cleanPath}`
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
  const path = projectPathFromUrl(src)
  if (!path) return undefined
  if (path.endsWith('.webp')) return withCdn(fallbackImagePath(path))
  if (src.startsWith(IMAGE_CDN_BASE)) return withBase(path)
  return undefined
}

function projectPathFromUrl(src: string) {
  if (src.startsWith(IMAGE_CDN_BASE)) return `/${src.slice(IMAGE_CDN_BASE.length).replace(/^\/+/, '')}`
  try {
    const url = new URL(src, window.location.href)
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
    if (!url.pathname.startsWith(base)) return undefined
    return `/${url.pathname.slice(base.length).replace(/^\/+/, '')}`
  } catch {
    return undefined
  }
}
