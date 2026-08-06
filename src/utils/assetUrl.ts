export function assetUrl(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path
  const resolvedPath = mobileImagePath(path)
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  if (resolvedPath.startsWith(base)) return resolvedPath
  const cleanPath = resolvedPath.replace(/^\/+/, '')
  return `${base}${cleanPath}`
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
