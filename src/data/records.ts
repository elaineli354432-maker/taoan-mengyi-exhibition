import { dreamEvents, stages } from './dreamEvents'
import { originalTexts } from './originalTexts'

export type DateCertainty = 'exact' | 'inferred' | 'approximate' | 'unknown'

export type TextSourceType =
  | 'taoan-mengyi'
  | 'other-zhangdai-work'
  | 'historical-source'
  | 'curatorial'

export interface EventRecord {
  id: string
  title: string
  startYear: number | null
  endYear: number | null
  displayDate: string
  dynastyDate?: string
  dateCertainty: DateCertainty
  dateSource?: string
  age?: string
  stageId: string
  stageTitle: string
  locationIds: string[]
  personIds: string[]
  sourceType: TextSourceType
  sourceWork?: string
  sourceVolume?: number
  sourceChapter?: string
  originalQuote?: string
  originalQuoteVerified: boolean
  curatorialSummary: string
  historicalContext?: string
  heroImage?: string
  galleryImages?: string[]
  relatedEventIds?: string[]
  relatedChapterIds?: string[]
  themes?: string[]
}

export interface ChapterRecord {
  id: string
  volume: number
  orderInVolume: number
  title: string
  originalText: string
  originalTextVerified: boolean
  sourceEdition?: string
  sourceReference?: string
  curatorialIntroduction?: string
  relatedEventIds: string[]
  relatedLocationIds: string[]
  relatedPersonIds: string[]
}

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
  eventIds: string[]
  chapterIds: string[]
  image?: string
}

export interface PersonRecord {
  id: string
  name: string
  courtesyName?: string
  relationshipToZhangDai?: string
  description: string
  eventIds: string[]
  chapterIds: string[]
}

export const stageRecords = stages.map((title, index) => ({
  id: `act-${index + 1}`,
  title,
  number: String(index + 1).padStart(2, '0'),
}))

const stageIdByTitle = new Map(stageRecords.map((stage) => [stage.title, stage.id]))

const eventMeta: Record<string, {
  startYear: number | null
  endYear?: number | null
  dateCertainty: DateCertainty
  dynastyDate?: string
  locationIds: string[]
  personIds?: string[]
  chapterIds?: string[]
  themes?: string[]
  sourceType?: TextSourceType
  sourceVolume?: number
  sourceChapter?: string
  verifiedQuote?: boolean
}> = {
  birth: { startYear: 1597, dateCertainty: 'exact', dynastyDate: '万历二十五年', locationIds: ['shaoxing-shanyin'], sourceType: 'historical-source', chapterIds: [], themes: ['birth'] },
  xuanyaoting: { startYear: 1602, dateCertainty: 'approximate', locationIds: ['shaoxing-shanyin'], sourceVolume: 1, sourceChapter: '悬杪亭', verifiedQuote: false, themes: ['reading', 'garden'] },
  nanzhen: { startYear: 1612, dateCertainty: 'exact', dynastyDate: '万历壬子', locationIds: ['shaoxing-nanzhen'], sourceVolume: 4, sourceChapter: '祁止祥癖', verifiedQuote: false, themes: ['dream', 'youth'] },
  lanxue: { startYear: 1614, dateCertainty: 'inferred', locationIds: ['shaoxing-shanyin'], sourceVolume: 3, sourceChapter: '兰雪茶', themes: ['tea'] },
  qinpai: { startYear: 1616, endYear: 1618, dateCertainty: 'approximate', locationIds: ['shaoxing-shanyin'], sourceVolume: 3, sourceChapter: '绍兴琴派', themes: ['music'] },
  fengmen: { startYear: 1622, dateCertainty: 'inferred', locationIds: ['suzhou-fengmen'], sourceVolume: 2, sourceChapter: '葑门荷宕', themes: ['city', 'travel'] },
  jinshan: { startYear: 1629, dateCertainty: 'exact', dynastyDate: '崇祯二年', locationIds: ['zhenjiang-jinshan'], sourceVolume: 1, sourceChapter: '金山夜戏', themes: ['opera', 'night'] },
  huxinting: { startYear: 1632, dateCertainty: 'exact', dynastyDate: '崇祯五年十二月', locationIds: ['hangzhou-xihu'], sourceVolume: 2, sourceChapter: '湖心亭看雪', verifiedQuote: true, themes: ['snow', 'obsession'] },
  zhongqiu: { startYear: 1634, dateCertainty: 'inferred', locationIds: ['shaoxing-shanyin'], sourceVolume: 4, sourceChapter: '闰中秋', themes: ['festival'] },
  buxiyuan: { startYear: 1634, dateCertainty: 'inferred', locationIds: ['shaoxing-buxiyuan'], sourceVolume: 3, sourceChapter: '不系园', themes: ['garden'] },
  baiyang: { startYear: 1640, dateCertainty: 'inferred', locationIds: ['hangzhou-baiyang'], sourceVolume: 4, sourceChapter: '白洋潮', themes: ['tide'] },
  'snow-obsession': { startYear: 1632, dateCertainty: 'exact', locationIds: ['hangzhou-xihu'], sourceVolume: 2, sourceChapter: '湖心亭看雪', chapterIds: ['huxinting'], verifiedQuote: true, themes: ['snow', 'obsession'] },
  'opera-obsession': { startYear: 1629, dateCertainty: 'exact', locationIds: ['zhenjiang-jinshan'], sourceVolume: 1, sourceChapter: '金山夜戏', chapterIds: ['jinshan'], themes: ['opera', 'obsession'] },
  'tea-obsession': { startYear: 1614, dateCertainty: 'inferred', locationIds: ['shaoxing-shanyin'], sourceVolume: 3, sourceChapter: '兰雪茶', chapterIds: ['lanxue'], themes: ['tea', 'obsession'] },
  'qin-obsession': { startYear: 1616, endYear: 1618, dateCertainty: 'approximate', locationIds: ['shaoxing-shanyin'], sourceVolume: 3, sourceChapter: '绍兴琴派', chapterIds: ['qinpai'], themes: ['music', 'obsession'] },
  'garden-obsession': { startYear: 1634, dateCertainty: 'inferred', locationIds: ['shaoxing-buxiyuan'], sourceVolume: 3, sourceChapter: '不系园', chapterIds: ['buxiyuan'], themes: ['garden', 'obsession'] },
  lanterns: { startYear: 1640, dateCertainty: 'inferred', locationIds: ['shaoxing-shanyin'], sourceVolume: 0, sourceChapter: '绍兴灯景', themes: ['festival', 'decline'] },
  zhaoqing: { startYear: 1640, dateCertainty: 'inferred', locationIds: ['hangzhou-zhaoqing'], sourceVolume: 2, sourceChapter: '西湖香市', themes: ['city', 'fire'] },
  famine: { startYear: 1641, dateCertainty: 'inferred', locationIds: ['hangzhou-city'], sourceVolume: 2, sourceChapter: '西湖香市', chapterIds: ['zhaoqing'], themes: ['famine', 'decline'] },
  roadblock: { startYear: 1642, dateCertainty: 'approximate', locationIds: ['jiangnan'], sourceVolume: 8, sourceChapter: '梦忆序', chapterIds: ['dream-preface'], themes: ['war', 'travel'] },
  mingwang: { startYear: 1644, dateCertainty: 'exact', dynastyDate: '崇祯十七年', locationIds: ['jiangnan'], sourceType: 'historical-source', sourceVolume: 8, sourceChapter: '梦忆序', chapterIds: ['dream-preface'], themes: ['dynastic-change'] },
  books: { startYear: 1645, dateCertainty: 'inferred', locationIds: ['shaoxing-shanyin'], sourceVolume: 4, sourceChapter: '三世藏书', themes: ['books', 'loss'] },
  shanzhong: { startYear: 1645, endYear: 1646, dateCertainty: 'approximate', locationIds: ['shengzhou-shanzhong'], sourceVolume: 5, sourceChapter: '鹿苑寺方柿', themes: ['refuge', 'writing'] },
  'old-zhangdai': { startYear: null, dateCertainty: 'unknown', locationIds: ['shaoxing-shanyin', 'hangzhou-xihu'], sourceVolume: 8, sourceChapter: '梦忆序', chapterIds: ['dream-preface'], themes: ['memory', 'writing'] },
}

const verifiedChapterIds = new Set(['huxinting', 'nanzhen', 'xuanyaoting'])

const chapterDefinitions: Array<{
  id: string
  volume: number
  orderInVolume: number
  title: string
  eventIds: string[]
  locationIds: string[]
  personIds?: string[]
  sourceReference?: string
}> = [
  { id: 'jinshan', volume: 1, orderInVolume: 1, title: '金山夜戏', eventIds: ['jinshan', 'opera-obsession'], locationIds: ['zhenjiang-jinshan'] },
  { id: 'xuanyaoting', volume: 1, orderInVolume: 2, title: '悬杪亭', eventIds: ['xuanyaoting'], locationIds: ['shaoxing-shanyin'] },
  { id: 'fengmen', volume: 2, orderInVolume: 1, title: '葑门荷宕', eventIds: ['fengmen'], locationIds: ['suzhou-fengmen'] },
  { id: 'zhaoqing', volume: 2, orderInVolume: 2, title: '西湖香市', eventIds: ['zhaoqing', 'famine'], locationIds: ['hangzhou-zhaoqing', 'hangzhou-city'] },
  { id: 'huxinting', volume: 2, orderInVolume: 3, title: '湖心亭看雪', eventIds: ['huxinting', 'snow-obsession'], locationIds: ['hangzhou-xihu'] },
  { id: 'lanxue', volume: 3, orderInVolume: 1, title: '兰雪茶', eventIds: ['lanxue', 'tea-obsession'], locationIds: ['shaoxing-shanyin'] },
  { id: 'qinpai', volume: 3, orderInVolume: 2, title: '绍兴琴派', eventIds: ['qinpai', 'qin-obsession'], locationIds: ['shaoxing-shanyin'] },
  { id: 'buxiyuan', volume: 3, orderInVolume: 3, title: '不系园', eventIds: ['buxiyuan', 'garden-obsession'], locationIds: ['shaoxing-buxiyuan'] },
  { id: 'zhongqiu', volume: 4, orderInVolume: 1, title: '闰中秋', eventIds: ['zhongqiu'], locationIds: ['shaoxing-shanyin'] },
  { id: 'baiyang', volume: 4, orderInVolume: 2, title: '白洋潮', eventIds: ['baiyang'], locationIds: ['hangzhou-baiyang'] },
  { id: 'books', volume: 4, orderInVolume: 3, title: '三世藏书', eventIds: ['books'], locationIds: ['shaoxing-shanyin'] },
  { id: 'nanzhen', volume: 4, orderInVolume: 4, title: '祁止祥癖', eventIds: ['nanzhen'], locationIds: ['shaoxing-nanzhen'] },
  { id: 'shanzhong', volume: 5, orderInVolume: 1, title: '鹿苑寺方柿', eventIds: ['shanzhong'], locationIds: ['shengzhou-shanzhong'] },
  { id: 'dream-preface', volume: 8, orderInVolume: 1, title: '梦忆序', eventIds: ['roadblock', 'mingwang', 'old-zhangdai'], locationIds: ['jiangnan', 'shaoxing-shanyin', 'hangzhou-xihu'] },
]

export const chapters: ChapterRecord[] = chapterDefinitions.map((chapter) => {
  const firstEventId = chapter.eventIds[0]
  const event = dreamEvents.find((item) => item.id === firstEventId)
  const paragraphs = originalTexts[firstEventId] ?? []
  const verified = verifiedChapterIds.has(chapter.id)

  return {
    id: chapter.id,
    volume: chapter.volume,
    orderInVolume: chapter.orderInVolume,
    title: chapter.title,
    originalText: verified ? paragraphs.join('\n') : '',
    originalTextVerified: verified,
    sourceEdition: verified ? '待与上传校注本逐字复核' : undefined,
    sourceReference: chapter.sourceReference,
    curatorialIntroduction: event?.description ?? '待补充策展说明。',
    relatedEventIds: chapter.eventIds,
    relatedLocationIds: chapter.locationIds,
    relatedPersonIds: chapter.personIds ?? ['zhang-dai'],
  }
})

export const events: EventRecord[] = dreamEvents.map((event) => {
  const meta = eventMeta[event.id]
  const chapterIds = meta?.chapterIds ?? chapters.filter((chapter) => chapter.relatedEventIds.includes(event.id)).map((chapter) => chapter.id)
  const sourceWork = event.work.startsWith('《') ? event.work.replace(/[《》]/g, '') : undefined
  const sourceType = meta?.sourceType ?? (sourceWork ? 'taoan-mengyi' : 'curatorial')
  const quoteVerified = Boolean(meta?.verifiedQuote)

  return {
    id: event.id,
    title: event.title,
    startYear: meta?.startYear ?? null,
    endYear: meta?.endYear ?? meta?.startYear ?? null,
    displayDate: event.year,
    dynastyDate: meta?.dynastyDate,
    dateCertainty: meta?.dateCertainty ?? 'unknown',
    dateSource: meta?.dynastyDate ? '现有年谱字段与篇目纪年' : undefined,
    age: event.age,
    stageId: stageIdByTitle.get(event.stage) ?? 'act-1',
    stageTitle: event.stage,
    locationIds: meta?.locationIds ?? ['jiangnan'],
    personIds: ['zhang-dai', ...(meta?.personIds ?? [])],
    sourceType,
    sourceWork,
    sourceVolume: meta?.sourceVolume,
    sourceChapter: meta?.sourceChapter ?? sourceWork,
    originalQuote: quoteVerified ? event.quote : undefined,
    originalQuoteVerified: quoteVerified,
    curatorialSummary: event.description,
    heroImage: event.image,
    relatedChapterIds: chapterIds,
    themes: meta?.themes,
  }
})

const eventsForLocation = (id: string) => events.filter((event) => event.locationIds.includes(id)).map((event) => event.id)
const chaptersForLocation = (id: string) => chapters.filter((chapter) => chapter.relatedLocationIds.includes(id)).map((chapter) => chapter.id)

export const locations: LocationRecord[] = [
  { id: 'shaoxing-shanyin', modernName: '绍兴', historicalName: '山阴', region: '浙江', latitude: 30.0, longitude: 120.58, svgX: 67, svgY: 64, description: '张岱出生、读书、藏书与晚年回望的核心地点。', eventIds: [], chapterIds: [], image: 'birth' },
  { id: 'shaoxing-nanzhen', modernName: '绍兴南镇', historicalName: '南镇', region: '浙江', svgX: 66, svgY: 69, description: '张岱十六岁祈梦处，关联少年时期的命运想象。', eventIds: [], chapterIds: [], image: 'nanzhen' },
  { id: 'shaoxing-buxiyuan', modernName: '绍兴不系园', historicalName: '不系园', region: '浙江', svgX: 68, svgY: 62, description: '园林、雅集与晚明生活审美的现场。', eventIds: [], chapterIds: [], image: 'buxiyuan' },
  { id: 'hangzhou-xihu', modernName: '杭州西湖', historicalName: '西湖', region: '浙江', latitude: 30.24, longitude: 120.14, svgX: 48, svgY: 42, description: '《湖心亭看雪》的发生地，也是全站“痴”的精神中心。', eventIds: [], chapterIds: [], image: 'huxinting' },
  { id: 'hangzhou-zhaoqing', modernName: '杭州昭庆寺', historicalName: '昭庆寺', region: '浙江', svgX: 49, svgY: 41, description: '西湖香市中心，后因火灾与城市变化而显出衰落。', eventIds: [], chapterIds: [], image: 'zhaoqing' },
  { id: 'hangzhou-city', modernName: '杭州', historicalName: '钱塘', region: '浙江', latitude: 30.27, longitude: 120.16, svgX: 48, svgY: 43, description: '晚明城市繁华与灾荒转折并存的地点。', eventIds: [], chapterIds: [], image: 'famine' },
  { id: 'hangzhou-baiyang', modernName: '白洋', historicalName: '白洋', region: '浙江', svgX: 51, svgY: 45, description: '观潮记忆的发生地，展示自然之力压过人间热闹。', eventIds: [], chapterIds: [], image: 'baiyang' },
  { id: 'suzhou-fengmen', modernName: '苏州葑门', historicalName: '葑门', region: '江苏', latitude: 31.3, longitude: 120.62, svgX: 30, svgY: 35, description: '荷宕、游舫与晚明城市游赏生活。', eventIds: [], chapterIds: [], image: 'fengmen' },
  { id: 'zhenjiang-jinshan', modernName: '镇江金山寺', historicalName: '金山寺', region: '江苏', latitude: 32.21, longitude: 119.42, svgX: 34, svgY: 22, description: '《金山夜戏》的夜游、张灯与演剧地点。', eventIds: [], chapterIds: [], image: 'jinshan' },
  { id: 'nanjing', modernName: '南京', historicalName: '金陵', region: '江苏', latitude: 32.06, longitude: 118.79, svgX: 39, svgY: 27, description: '南明局势和晚明政治背景的重要城市，本轮先作为行迹地图基础点。', eventIds: [], chapterIds: [], image: 'roadblock' },
  { id: 'ningbo-tianning', modernName: '宁波天童寺', historicalName: '天童寺', region: '浙江', latitude: 29.81, longitude: 121.79, svgX: 82, svgY: 63, description: '张岱活动区域中的佛寺与山林线索，本轮先作为地图基础点。', eventIds: [], chapterIds: [], image: 'shanzhong' },
  { id: 'yanzhou', modernName: '兖州', historicalName: '兖州', region: '山东', latitude: 35.55, longitude: 116.83, svgX: 54, svgY: 10, description: '张岱北行叙事中的远方节点。', eventIds: [], chapterIds: [], image: 'jinshan' },
  { id: 'qufu', modernName: '曲阜', historicalName: '曲阜', region: '山东', latitude: 35.59, longitude: 116.99, svgX: 57, svgY: 9, description: '鲁地文化与北行路径的辅助节点，本轮先保留为地图基础点。', eventIds: [], chapterIds: [], image: 'roadblock' },
  { id: 'shengzhou-shanzhong', modernName: '嵊州', historicalName: '剡县', region: '浙江', latitude: 29.59, longitude: 120.82, svgX: 72, svgY: 76, description: '入山避兵与后半生著述的关键空间。', eventIds: [], chapterIds: [], image: 'shanzhong' },
  { id: 'jiangnan', modernName: '江南', region: '江南', svgX: 58, svgY: 54, description: '战乱、道路阻断与鼎革后的总体空间。', eventIds: [], chapterIds: [], image: 'roadblock' },
].map((location) => ({
  ...location,
  eventIds: eventsForLocation(location.id),
  chapterIds: chaptersForLocation(location.id),
}))

export const people: PersonRecord[] = [
  { id: 'zhang-dai', name: '张岱', courtesyName: '宗子、石公', relationshipToZhangDai: '本人', description: '晚明清初文学家、史学家。前半生经历江南繁华，后半生在鼎革后避乱、著史、追忆。', eventIds: events.map((event) => event.id), chapterIds: chapters.map((chapter) => chapter.id) },
  { id: 'lu-wang-zhu-yihai', name: '朱以海', courtesyName: '鲁王', relationshipToZhangDai: '南明政权相关人物', description: '南明鲁王与监国人物。鲁王过越专题中与张岱旧臣之家发生交集。', eventIds: [], chapterIds: [] },
  { id: 'qi-biaojia', name: '祁彪佳', courtesyName: '世培', relationshipToZhangDai: '同乡与亡友', description: '晚明政治人物、戏曲家、藏书家、造园家。祁世培入梦专题中劝张岱还山著史。', eventIds: [], chapterIds: [] },
  { id: 'chen-hongshou', name: '陈洪绶', courtesyName: '章侯', relationshipToZhangDai: '友人', description: '晚明画家，在鲁王过越场景中与张岱同席侍饮。', eventIds: [], chapterIds: [] },
]

export const getEvent = (id: string) => events.find((event) => event.id === id)
export const getChapter = (id: string) => chapters.find((chapter) => chapter.id === id)
export const getLocation = (id: string) => locations.find((location) => location.id === id)

export const getPrimaryChapterForEvent = (eventId: string) => {
  const event = getEvent(eventId)
  return event?.relatedChapterIds?.[0] ? getChapter(event.relatedChapterIds[0]) : undefined
}
