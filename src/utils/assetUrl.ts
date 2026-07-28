export function assetUrl(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  if (path.startsWith(base)) return path
  const cleanPath = path.replace(/^\/+/, '')
  return `${base}${cleanPath}`
}
