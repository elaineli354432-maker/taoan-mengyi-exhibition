import { chapters } from './chapters'
import { events } from './events'

export interface LocationRecord {
  id: string
  modernName: string
  historicalName?: string
  region?: string
  latitude?: number
  longitude?: number
  svgX?: number
  svgY?: number
  description: string
  image?: string
  eventIds: string[]
  chapterIds: string[]
}

const baseLocations: Omit<LocationRecord, 'eventIds' | 'chapterIds'>[] = [
  { id: 'shaoxing-shanyin', modernName: '绍兴', historicalName: '山阴', region: '浙江', latitude: 30.0, longitude: 120.58, svgX: 67, svgY: 64, description: '张岱出生、读书、藏书和晚年回望的核心地点。家族书斋、园林和城市节庆都从这里展开。', image: 'xuanyaoting' },
  { id: 'shaoxing-nanzhen', modernName: '绍兴南镇', historicalName: '南镇', region: '浙江', svgX: 66, svgY: 70, description: '少年祈梦发生的祠庙空间，连接仪式、梦境和早年命运想象。', image: 'nanzhen' },
  { id: 'shaoxing-buxiyuan', modernName: '绍兴不系园', historicalName: '不系园', region: '浙江', svgX: 69, svgY: 61, description: '园林、雅集与晚明生活审美的现场，呈现张岱如何组织艺术化日常。', image: 'buxiyuan' },
  { id: 'hangzhou-xihu', modernName: '杭州西湖', historicalName: '西湖', region: '浙江', latitude: 30.24, longitude: 120.14, svgX: 48, svgY: 42, description: '《湖心亭看雪》的发生地，也是全站“痴”的精神中心。', image: 'huxinting' },
  { id: 'hangzhou-zhaoqing', modernName: '杭州昭庆寺', historicalName: '昭庆寺', region: '浙江', svgX: 49, svgY: 41, description: '西湖香市的重要节点，火灾后改变了香客、人流与游赏路线。', image: 'zhaoqing' },
  { id: 'hangzhou-city', modernName: '杭州', historicalName: '钱塘', region: '浙江', latitude: 30.27, longitude: 120.16, svgX: 47, svgY: 44, description: '晚明城市繁华与灾荒转折并存的地点。', image: 'famine' },
  { id: 'suzhou-fengmen', modernName: '苏州', historicalName: '葑门', region: '江苏', latitude: 31.3, longitude: 120.62, svgX: 31, svgY: 36, description: '荷宕、舟船和公共游赏生活共同构成的江南城市现场。', image: 'fengmen' },
  { id: 'zhenjiang-jinshan', modernName: '镇江', historicalName: '金山寺', region: '江苏', latitude: 32.21, longitude: 119.42, svgX: 34, svgY: 22, description: '《金山夜戏》的发生地，寺院、江面和戏曲在夜晚被重新组织。', image: 'jinshan' },
  { id: 'nanjing', modernName: '南京', historicalName: '金陵', region: '江苏', latitude: 32.06, longitude: 118.79, svgX: 39, svgY: 27, description: '南明局势和晚明政治背景的重要城市，本轮作为行迹地图基础地点。', image: 'roadblock' },
  { id: 'ningbo-tianning', modernName: '宁波', historicalName: '天童寺', region: '浙江', latitude: 29.81, longitude: 121.79, svgX: 82, svgY: 63, description: '佛寺与山林线索的基础地点，相关行程仍待史料补充。', image: 'shanzhong' },
  { id: 'yanzhou', modernName: '兖州', historicalName: '兖州', region: '山东', latitude: 35.55, longitude: 116.83, svgX: 54, svgY: 10, description: '北行叙事中的远方节点，本轮不编造具体行程，只作为待扩展地点。', image: 'roadblock' },
  { id: 'qufu', modernName: '曲阜', historicalName: '曲阜', region: '山东', latitude: 35.59, longitude: 116.99, svgX: 57, svgY: 9, description: '鲁地文化与北行路线的辅助节点，待后续专题与史料核对。', image: 'roadblock' },
  { id: 'shengzhou-shanzhong', modernName: '嵊州', historicalName: '剡县', region: '浙江', latitude: 29.59, longitude: 120.82, svgX: 72, svgY: 76, description: '避兵入山和晚年著述的关键空间。', image: 'shanzhong' },
  { id: 'jiangnan', modernName: '江南', region: '江南', svgX: 58, svgY: 54, description: '战乱、道路阻断与鼎革后的总体空间，不对应单一城市坐标。', image: 'roadblock' },
]

export const locations: LocationRecord[] = baseLocations.map((location) => ({
  ...location,
  eventIds: events.filter((event) => event.locationIds.includes(location.id)).map((event) => event.id),
  chapterIds: chapters.filter((chapter) => chapter.relatedLocationIds.includes(location.id)).map((chapter) => chapter.id),
}))

export const getLocation = (id: string) => locations.find((location) => location.id === id)
