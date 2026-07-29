import { getEvent } from './events'
import { getChapterScenePassageIds } from './scenePassages'

export interface ChapterRecord {
  id: string
  volume: number
  orderInVolume: number
  title: string
  originalText: string
  originalTextVerified: boolean
  sourceEdition?: string
  sourceReference?: string
  editorialNote?: string
  curatorialIntroduction?: string
  relatedEventIds: string[]
  relatedLocationIds: string[]
  relatedPersonIds: string[]
  scenePassageIds?: string[]
}

const unverifiedNote = '本篇原文仍在校核，当前仅提供策展说明。'

const chapterRecords: ChapterRecord[] = [
  {
    id: 'huxinting',
    volume: 3,
    orderInVolume: 12,
    title: '湖心亭看雪',
    originalText: '崇祯五年十二月，余住西湖。大雪三日，湖中人鸟声俱绝。\n是日更定矣，余拏一小舟，拥毳衣炉火，独往湖心亭看雪。\n雾凇沆砀，天与云与山与水，上下一白。\n湖上影子，惟长堤一痕、湖心亭一点、与余舟一芥、舟中人两三粒而已。',
    originalTextVerified: true,
    sourceEdition: '《陶庵梦忆》通行文本，需后续逐字复核版本差异。',
    sourceReference: '卷三《湖心亭看雪》',
    curatorialIntroduction: getEvent('huxinting')?.curatorialText,
    relatedEventIds: ['huxinting'],
    relatedLocationIds: ['hangzhou-xihu'],
    relatedPersonIds: ['zhang-dai'],
  },
  {
    id: 'jinshan',
    volume: 1,
    orderInVolume: 6,
    title: '金山夜戏',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷一《金山夜戏》',
    curatorialIntroduction: getEvent('jinshan')?.curatorialText,
    relatedEventIds: ['jinshan'],
    relatedLocationIds: ['zhenjiang-jinshan'],
    relatedPersonIds: ['zhang-dai', 'opera-company'],
  },
  {
    id: 'fengmen',
    volume: 1,
    orderInVolume: 8,
    title: '葑门荷宕',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷一《葑门荷宕》',
    curatorialIntroduction: getEvent('fengmen')?.curatorialText,
    relatedEventIds: ['fengmen'],
    relatedLocationIds: ['suzhou-fengmen'],
    relatedPersonIds: ['zhang-dai'],
  },
  {
    id: 'lanxue',
    volume: 3,
    orderInVolume: 4,
    title: '兰雪茶',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷三《兰雪茶》',
    curatorialIntroduction: getEvent('lanxue')?.curatorialText,
    relatedEventIds: ['lanxue'],
    relatedLocationIds: ['shaoxing-shanyin'],
    relatedPersonIds: ['zhang-dai'],
  },
  {
    id: 'qinpai',
    volume: 2,
    orderInVolume: 6,
    title: '绍兴琴派',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷二《绍兴琴派》',
    curatorialIntroduction: getEvent('qinpai')?.curatorialText,
    relatedEventIds: ['qinpai'],
    relatedLocationIds: ['shaoxing-shanyin'],
    relatedPersonIds: ['zhang-dai'],
  },
  {
    id: 'zhongqiu',
    volume: 7,
    orderInVolume: 12,
    title: '闰中秋',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷七《闰中秋》',
    curatorialIntroduction: getEvent('zhongqiu')?.curatorialText,
    relatedEventIds: ['zhongqiu'],
    relatedLocationIds: ['shaoxing-shanyin'],
    relatedPersonIds: ['zhang-dai', 'opera-company'],
  },
  {
    id: 'buxiyuan',
    volume: 4,
    orderInVolume: 1,
    title: '不系园',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷四《不系园》',
    curatorialIntroduction: getEvent('buxiyuan')?.curatorialText,
    relatedEventIds: ['buxiyuan'],
    relatedLocationIds: ['shaoxing-buxiyuan'],
    relatedPersonIds: ['zhang-dai'],
  },
  {
    id: 'zhaoqing',
    volume: 7,
    orderInVolume: 1,
    title: '西湖香市',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷七《西湖香市》',
    curatorialIntroduction: getEvent('zhaoqing')?.curatorialText,
    relatedEventIds: ['zhaoqing', 'famine'],
    relatedLocationIds: ['hangzhou-zhaoqing', 'hangzhou-city'],
    relatedPersonIds: ['zhang-dai'],
  },
  {
    id: 'books',
    volume: 2,
    orderInVolume: 14,
    title: '三世藏书',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷二《三世藏书》',
    curatorialIntroduction: getEvent('books')?.curatorialText,
    relatedEventIds: ['books'],
    relatedLocationIds: ['shaoxing-shanyin'],
    relatedPersonIds: ['zhang-dai', 'family-library'],
  },
  {
    id: 'xuanyaoting',
    volume: 7,
    orderInVolume: 6,
    title: '悬杪亭',
    originalText: '',
    originalTextVerified: false,
    editorialNote: unverifiedNote,
    sourceReference: '卷七《悬杪亭》',
    curatorialIntroduction: getEvent('xuanyaoting')?.curatorialText,
    relatedEventIds: ['xuanyaoting'],
    relatedLocationIds: ['shaoxing-shanyin'],
    relatedPersonIds: ['zhang-dai', 'family-library'],
  },
  {
    id: 'dream-preface',
    volume: 0,
    orderInVolume: 1,
    title: '梦忆序',
    originalText: '五十年来，总成一梦。',
    originalTextVerified: true,
    sourceEdition: '《陶庵梦忆·梦忆序》摘句，需继续核对完整序文。',
    sourceReference: '《陶庵梦忆·梦忆序》',
    curatorialIntroduction: getEvent('old-zhangdai')?.curatorialText,
    relatedEventIds: ['mingwang', 'roadblock', 'old-zhangdai'],
    relatedLocationIds: ['jiangnan', 'shaoxing-shanyin', 'hangzhou-xihu'],
    relatedPersonIds: ['zhang-dai'],
  },
  {
    id: 'luwang',
    volume: 0,
    orderInVolume: 2,
    title: '鲁王过越',
    originalText: '',
    originalTextVerified: false,
    editorialNote: '本专题复用既有《陶庵梦忆补·鲁王》材料，作为场景原文容器，仍待版本逐字核对。',
    sourceReference: '《陶庵梦忆·补遗·鲁王》',
    curatorialIntroduction: getEvent('luwang')?.curatorialText,
    relatedEventIds: ['luwang'],
    relatedLocationIds: ['shaoxing-shanyin'],
    relatedPersonIds: ['zhang-dai', 'lu-wang-zhu-yihai', 'chen-hongshou'],
  },
  {
    id: 'qidream',
    volume: 0,
    orderInVolume: 3,
    title: '祁世培入梦',
    originalText: '',
    originalTextVerified: false,
    editorialNote: '本专题复用既有《陶庵梦忆补·祁世培》材料，作为空间记忆容器，仍待版本逐字核对。',
    sourceReference: '《陶庵梦忆·补遗·祁世培》',
    curatorialIntroduction: getEvent('qidream')?.curatorialText,
    relatedEventIds: ['qidream'],
    relatedLocationIds: ['shengzhou-shanzhong'],
    relatedPersonIds: ['zhang-dai', 'qi-biaojia'],
  },
]

export const chapters: ChapterRecord[] = chapterRecords.map((chapter) => ({
  ...chapter,
  scenePassageIds: getChapterScenePassageIds(chapter.id),
}))

export const sortedChapters = [...chapters].sort((a, b) => a.volume - b.volume || a.orderInVolume - b.orderInVolume)
export const getChapter = (id: string) => chapters.find((chapter) => chapter.id === id)
export const getPrimaryChapterForEvent = (eventId: string) =>
  sortedChapters.find((chapter) => chapter.relatedEventIds.includes(eventId))
