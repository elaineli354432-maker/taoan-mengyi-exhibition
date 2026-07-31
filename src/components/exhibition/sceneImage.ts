import { imagePaths } from '../shared/ResponsiveImage'
import { assetUrl } from '../../utils/assetUrl'

export function sceneImageUrl(image: string) {
  if (image.startsWith('/images/')) return assetUrl(image)
  return assetUrl(imagePaths[image] ?? imagePaths.cover)
}
