import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ResponsiveImage } from '../components/shared/ResponsiveImage'
import {
  getNodeWorks,
  getRouteNode,
  periodMatches,
  routeNodes,
  routeSegments,
  type ContentState,
  type MapLayerId,
  type RouteNode,
  type RoutePeriod,
  type RouteSegment,
  type WorkRelationType,
  unmappedWorks,
} from '../data/lifeRouteMap'

const layerLabels: Record<MapLayerId, { title: string; note: string }> = {
  lifeRoute: {
    title: '人生行迹层',
    note: '只呈现确有居住、到访或途经证据的地点，路线按时期分段。',
  },
  workGeography: {
    title: '作品地理层',
    note: '呈现篇目和地点关系，但不把文学地点画成真实行走路线。',
  },
}

const periodLabels: Record<RoutePeriod, string> = {
  all: '全部时期',
  early: '出生至明亡前',
  middle: '1622—1642',
  late: '1645以后',
  uncertain: '日期待考',
}

const relationLabels: Record<WorkRelationType, string> = {
  all: '全部篇目关系',
  direct: '直接写及',
  context: '关联背景',
}

const stateLabels: Record<ContentState, string> = {
  all: '全部节点',
  hasWorks: '有对应篇目',
  routeOnly: '仅行迹节点',
  unmapped: '未定位作品',
}

const coordinateNodes = routeNodes.filter((node): node is RouteNode & { coordinate: NonNullable<RouteNode['coordinate']> } => Boolean(node.coordinate))
const latitudes = coordinateNodes.map((node) => node.coordinate.lat)
const longitudes = coordinateNodes.map((node) => node.coordinate.lng)
const bounds = {
  minLat: Math.min(...latitudes),
  maxLat: Math.max(...latitudes),
  minLng: Math.min(...longitudes),
  maxLng: Math.max(...longitudes),
}

function projectNode(node: RouteNode) {
  if (!node.coordinate) return null
  const lngRange = bounds.maxLng - bounds.minLng || 1
  const latRange = bounds.maxLat - bounds.minLat || 1
  return {
    x: 8 + ((node.coordinate.lng - bounds.minLng) / lngRange) * 84,
    y: 8 + ((bounds.maxLat - node.coordinate.lat) / latRange) * 84,
  }
}

function routePoints(segment: RouteSegment) {
  return segment.nodeIds
    .map((id) => getRouteNode(id))
    .map((node) => (node ? projectNode(node) : null))
    .filter((point): point is { x: number; y: number } => Boolean(point))
}

function hasVisibleText(node: RouteNode, searchTerm: string) {
  if (!searchTerm) return true
  const haystack = [
    node.name,
    node.modernRegion,
    node.nodeType,
    ...(node.historicalNames ?? []),
    ...(node.subplaces ?? []),
    ...(node.directWorks ?? []),
    ...(node.contextWorks ?? []),
    ...(node.visits ?? []).flatMap((visit) => [visit.period, visit.label]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(searchTerm.toLowerCase())
}

function contentStateMatches(node: RouteNode, state: ContentState) {
  const workCount = (node.directWorks?.length ?? 0) + (node.contextWorks?.length ?? 0)
  if (state === 'hasWorks') return workCount > 0
  if (state === 'routeOnly') return workCount === 0
  return true
}

function NestedCatalog({ catalog }: { catalog: Record<string, string[]> }) {
  return (
    <div className="map-catalog">
      <h3>西湖梦寻目录</h3>
      {Object.entries(catalog).map(([group, items]) => (
        <details key={group}>
          <summary>{group}<small>{items.length}</small></summary>
          <div>
            {items.map((item) => <span key={item}>{item}</span>)}
          </div>
        </details>
      ))}
    </div>
  )
}

function NodeDrawer({ node, relation }: { node: RouteNode; relation: WorkRelationType }) {
  const directWorks = node.directWorks ?? []
  const contextWorks = node.contextWorks ?? []
  const visibleWorks = getNodeWorks(node, relation)

  return (
    <aside className="location-panel route-drawer">
      <div className="drawer-kicker">
        {node.modernRegion && <span>{node.modernRegion}</span>}
        <span>{node.nodeType}</span>
      </div>
      <h2>{node.name}</h2>
      {node.historicalNames?.length ? <p>古称：{node.historicalNames.join(' / ')}</p> : null}

      <section>
        <h3>到访记录</h3>
        {node.visits?.length ? (
          <ol className="visit-list">
            {node.visits.map((visit) => (
              <li key={`${visit.period}-${visit.label}`}>
                <strong>{visit.period || '日期待考'}</strong>
                <span>{visit.label}</span>
              </li>
            ))}
          </ol>
        ) : <small>日期待考，待人工补充行迹证据。</small>}
      </section>

      {node.subplaces?.length ? (
        <section>
          <h3>子地点</h3>
          <div className="map-chip-grid">
            {node.subplaces.map((place) => <span key={place}>{place}</span>)}
          </div>
        </section>
      ) : null}

      <section>
        <h3>对应篇目</h3>
        <div className="work-columns">
          <div>
            <strong>直接写及</strong>
            {directWorks.length ? directWorks.map((work) => <span key={work}>{work}</span>) : <small>暂无</small>}
          </div>
          <div>
            <strong>关联背景</strong>
            {contextWorks.length ? contextWorks.map((work) => <span key={work}>{work}</span>) : <small>暂无</small>}
          </div>
        </div>
        {relation !== 'all' && <small className="drawer-hint">当前筛选：{relationLabels[relation]}，本节点显示 {visibleWorks.length} 条。</small>}
      </section>

      {node.nestedCatalog ? <NestedCatalog catalog={node.nestedCatalog} /> : null}

      <Link className="map-timeline-link" to={`/timeline?location=${node.id}`}>在年谱中查看</Link>
    </aside>
  )
}

export function MapPage() {
  const [params, setParams] = useSearchParams()
  const layerParam = params.get('layer') as MapLayerId | null
  const locationParam = params.get('location')
  const [layer, setLayer] = useState<MapLayerId>(layerParam && layerParam in layerLabels ? layerParam : 'lifeRoute')
  const [locationId, setLocationId] = useState(locationParam && getRouteNode(locationParam) ? locationParam : 'shaoxing')
  const [period, setPeriod] = useState<RoutePeriod>('all')
  const [relation, setRelation] = useState<WorkRelationType>('all')
  const [contentState, setContentState] = useState<ContentState>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeRouteId, setActiveRouteId] = useState('all')

  useEffect(() => {
    const nextLayer = params.get('layer') as MapLayerId | null
    const nextLocation = params.get('location')
    if (nextLayer && nextLayer in layerLabels) setLayer(nextLayer)
    if (nextLocation && getRouteNode(nextLocation)) setLocationId(nextLocation)
  }, [params])

  const selectedNode = getRouteNode(locationId) ?? routeNodes[0]

  const visibleNodes = useMemo(() => {
    return routeNodes.filter((node) => {
      if (!periodMatches(node, period)) return false
      if (!contentStateMatches(node, contentState)) return false
      if (!hasVisibleText(node, searchTerm)) return false
      if (layer === 'workGeography' && relation !== 'all' && getNodeWorks(node, relation).length === 0) return false
      return Boolean(node.coordinate)
    })
  }, [contentState, layer, period, relation, searchTerm])

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((node) => node.id)), [visibleNodes])

  const visibleSegments = useMemo(() => {
    if (layer !== 'lifeRoute') return []
    return routeSegments.filter((segment) => {
      if (activeRouteId !== 'all' && segment.id !== activeRouteId) return false
      if (period !== 'all' && segment.period !== period) return false
      return segment.nodeIds.some((id) => visibleNodeIds.has(id))
    })
  }, [activeRouteId, layer, period, visibleNodeIds])

  const chooseLayer = (nextLayer: MapLayerId) => {
    setLayer(nextLayer)
    const next = new URLSearchParams(params)
    next.set('layer', nextLayer)
    next.set('location', selectedNode.id)
    setParams(next)
  }

  const chooseNode = (id: string) => {
    const next = new URLSearchParams(params)
    next.set('layer', layer)
    next.set('location', id)
    setLocationId(id)
    setParams(next)
  }

  return (
    <main className="sub-page map-page">
      <header className="page-head map-page-head">
        <p>行迹</p>
        <h1>张岱人生路线地图</h1>
        <span>以真实行迹为默认层，作品地理分层查看；不以摘录卡片或文学地点虚构路线。</span>
      </header>

      <section className="route-map-shell">
        <div className="map-toolbar" aria-label="地图筛选">
          <div className="layer-tabs">
            {(Object.keys(layerLabels) as MapLayerId[]).map((item) => (
              <button className={layer === item ? 'on' : ''} onClick={() => chooseLayer(item)} key={item}>
                <strong>{layerLabels[item].title}</strong>
                <span>{layerLabels[item].note}</span>
              </button>
            ))}
          </div>

          <div className="map-filter-row">
            <label>
              <span>时期</span>
              <select value={period} onChange={(event) => setPeriod(event.target.value as RoutePeriod)}>
                {(Object.keys(periodLabels) as RoutePeriod[]).map((item) => <option value={item} key={item}>{periodLabels[item]}</option>)}
              </select>
            </label>
            <label>
              <span>篇目关系</span>
              <select value={relation} onChange={(event) => setRelation(event.target.value as WorkRelationType)}>
                {(Object.keys(relationLabels) as WorkRelationType[]).map((item) => <option value={item} key={item}>{relationLabels[item]}</option>)}
              </select>
            </label>
            <label>
              <span>内容状态</span>
              <select value={contentState} onChange={(event) => setContentState(event.target.value as ContentState)}>
                {(Object.keys(stateLabels) as ContentState[]).map((item) => <option value={item} key={item}>{stateLabels[item]}</option>)}
              </select>
            </label>
            <label className="search-filter">
              <span>搜索</span>
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="地点、篇目、子地点" />
            </label>
          </div>
        </div>

        <section className="literary-map route-map-layout">
          <div className={`map-canvas route-canvas layer-${layer}`}>
            <ResponsiveImage image="map" alt="张岱人生路线示意地图" />
            <svg className="route-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {visibleSegments.map((segment) => {
                const points = routePoints(segment)
                return points.length > 1 ? (
                  <polyline
                    key={segment.id}
                    className={`route-line route-${segment.certainty}`}
                    points={points.map((point) => `${point.x},${point.y}`).join(' ')}
                  />
                ) : null
              })}
            </svg>

            {visibleNodes.map((node) => {
              const point = projectNode(node)
              if (!point) return null
              const workCount = (node.directWorks?.length ?? 0) + (node.contextWorks?.length ?? 0)
              return (
                <button
                  className={`map-node ${node.id === selectedNode.id ? 'active' : ''} importance-${node.importance}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  onClick={() => chooseNode(node.id)}
                  key={node.id}
                >
                  <i />
                  <span>{node.name}</span>
                  {layer === 'workGeography' && workCount > 0 ? <em>{workCount}</em> : null}
                </button>
              )
            })}
          </div>

          <NodeDrawer node={selectedNode} relation={relation} />
        </section>

        {layer === 'lifeRoute' ? (
          <div className="route-segment-strip">
            <button className={activeRouteId === 'all' ? 'on' : ''} onClick={() => setActiveRouteId('all')}>全部路线</button>
            {routeSegments.map((segment) => (
              <button className={activeRouteId === segment.id ? 'on' : ''} onClick={() => setActiveRouteId(segment.id)} key={segment.id}>
                {segment.label}
                <small>{segment.certainty === 'exact' ? '确年' : segment.certainty === 'partial' ? '局部待考' : '约年'}</small>
              </button>
            ))}
          </div>
        ) : null}

        {contentState === 'unmapped' || layer === 'workGeography' ? (
          <section className="unmapped-works">
            <h2>未定位作品</h2>
            <p>地点证据不足的篇目不强行打点，也不进入真实行迹线。</p>
            <div>
              {unmappedWorks.length ? unmappedWorks.map((work) => (
                <span key={work.title}>{work.title}<small>{work.status}</small></span>
              )) : <small>当前数据未提供未定位条目。</small>}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  )
}
