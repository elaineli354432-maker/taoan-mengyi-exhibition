import rawLifeRouteMap from './zhangdai_life_route_map_v2.json'

export type MapLayerId = 'lifeRoute' | 'workGeography' | 'historicalContext'
export type WorkRelationType = 'all' | 'direct' | 'context'
export type ContentState = 'all' | 'hasWorks' | 'routeOnly' | 'unmapped'
export type RoutePeriod = 'all' | 'early' | 'middle' | 'late' | 'uncertain'

export interface RouteCoordinate {
  lat: number
  lng: number
  precision?: string
}

export interface RouteVisit {
  period: string
  label: string
}

export interface RouteNode {
  id: string
  name: string
  historicalNames?: string[]
  modernRegion?: string
  nodeType: string
  importance: number
  coordinate?: RouteCoordinate
  visits?: RouteVisit[]
  subplaces?: string[]
  directWorks?: string[]
  contextWorks?: string[]
  nestedCatalog?: Record<string, string[]>
  notes?: string
}

export interface UnmappedWork {
  title: string
  status: string
  note?: string
}

export interface LifeRouteMapData {
  version: string
  module: string
  nodes: RouteNode[]
  unmappedWorks?: Array<UnmappedWork | string>
}

export interface RouteSegment {
  id: string
  label: string
  period: RoutePeriod
  certainty: 'exact' | 'approximate' | 'partial'
  nodeIds: string[]
}

export interface HistoricalOverlayNode {
  id: string
  nodeId: string
  date: string
  title: string
  note: string
}

export const lifeRouteMapData = rawLifeRouteMap as unknown as LifeRouteMapData
export const routeNodes = lifeRouteMapData.nodes
export const unmappedWorks: UnmappedWork[] = (lifeRouteMapData.unmappedWorks ?? []).map((work) => {
  if (typeof work === 'string') return { title: work, status: 'unresolved' }
  return work
})

export const routeSegments: RouteSegment[] = [
  {
    id: 'early-west-lake',
    label: '约1605—1606 初游西湖',
    period: 'early',
    certainty: 'approximate',
    nodeIds: ['shaoxing', 'hangzhou', 'shaoxing'],
  },
  {
    id: '1622-suzhou',
    label: '1622 葑门荷宕',
    period: 'middle',
    certainty: 'exact',
    nodeIds: ['shaoxing', 'suzhou', 'shaoxing'],
  },
  {
    id: '1629-shandong',
    label: '1629—1631 山东方向',
    period: 'middle',
    certainty: 'partial',
    nodeIds: ['shaoxing', 'nanjing', 'zhenjiang', 'yanzhou', 'qufu', 'taian', 'wuxi', 'shaoxing'],
  },
  {
    id: '1633-huqiu',
    label: '1633 虎丘中秋',
    period: 'middle',
    certainty: 'exact',
    nodeIds: ['shaoxing', 'suzhou', 'shaoxing'],
  },
  {
    id: '1638-coastal',
    label: '1638 宁波、定海、普陀',
    period: 'middle',
    certainty: 'partial',
    nodeIds: ['shaoxing', 'ningbo', 'zhenhai_dinghai_putuo', 'nanjing', 'shaoxing'],
  },
  {
    id: '1642-river',
    label: '1642 江北水路',
    period: 'middle',
    certainty: 'partial',
    nodeIds: ['shaoxing', 'zhenjiang', 'guazhou_yangzhou', 'nanjing', 'huai_an', 'shaoxing'],
  },
  {
    id: '1645-refuge',
    label: '1645—1646 避乱入山',
    period: 'late',
    certainty: 'partial',
    nodeIds: ['shaoxing', 'taizhou_tiantai', 'shengzhong_xibaishan', 'shaoxing'],
  },
  {
    id: '1654-west-lake',
    label: '1654—1657 晚年西湖',
    period: 'late',
    certainty: 'partial',
    nodeIds: ['shaoxing', 'hangzhou', 'shaoxing'],
  },
  {
    id: '1673-lanting',
    label: '1673 兰亭',
    period: 'late',
    certainty: 'exact',
    nodeIds: ['shaoxing', 'lanting'],
  },
]

export const historicalOverlayNodes: HistoricalOverlayNode[] = [
  {
    id: 'ming-fall',
    nodeId: 'shaoxing',
    date: '1644',
    title: '明亡以后',
    note: '历史背景仅作半透明叠加，不替代人生行迹与作品地理。',
  },
  {
    id: 'luwang',
    nodeId: 'shaoxing',
    date: '1645',
    title: '鲁王过越',
    note: '作为南明余影的历史背景节点，仍需和作品、行迹分层查看。',
  },
  {
    id: 'refuge',
    nodeId: 'shengzhong_xibaishan',
    date: '1645—1646',
    title: '入山避乱',
    note: '政治崩塌后的避居线索，保留为背景叠加。',
  },
]

export function getRouteNode(id: string | null | undefined) {
  return routeNodes.find((node) => node.id === id)
}

export function getNodeWorks(node: RouteNode, relation: WorkRelationType) {
  if (relation === 'direct') return node.directWorks ?? []
  if (relation === 'context') return node.contextWorks ?? []
  return [...(node.directWorks ?? []), ...(node.contextWorks ?? [])]
}

export function periodMatches(node: RouteNode, period: RoutePeriod) {
  if (period === 'all') return true
  const text = (node.visits ?? []).map((visit) => `${visit.period} ${visit.label}`).join(' ')
  if (period === 'early') return /1597|1605|1606|明亡以前|出生|成长|幼年/.test(text)
  if (period === 'middle') return /1622|1629|1631|1633|1638|1642/.test(text)
  if (period === 'late') return /1645|1646|1649|1654|1656|1657|1673|晚年|以后|避/.test(text)
  return /待考|不详|约/.test(text)
}
