export function assetUrl(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path
  const resolvedPath = mobileImagePath(path)
  return withBase(resolvedPath)
}

export function fallbackAssetUrl(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path
  return withBase(fallbackImagePath(path))
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

function mobileImagePath(path: string) {
  if (!shouldUseMobileImages()) return path
  if (path === '/zhang-dai-hero.webp') return '/zhang-dai-hero-mobile.webp'
  if (!path.startsWith('/images/') || !/\.(webp|jpe?g|png)$/i.test(path)) return path
  return path.replace(/^\/images\//, '/images-mobile/')
}

function shouldUseMobileImages() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(max-width: 820px)').matches) return true
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  return Boolean(connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? ''))
}
