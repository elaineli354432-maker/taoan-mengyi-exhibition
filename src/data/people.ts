export interface PersonRecord {
  id: string
  name: string
  courtesyName?: string
  relationshipToZhangDai?: string
  description: string
  eventIds: string[]
  chapterIds: string[]
}

export const people: PersonRecord[] = [
  {
    id: 'zhang-dai',
    name: '张岱',
    courtesyName: '宗子、石公',
    relationshipToZhangDai: '本人',
    description: '晚明清初文学家、史学家。前半生见证江南城市与园林生活，明亡后避兵入山，以文字追忆旧日世界。',
    eventIds: [],
    chapterIds: [],
  },
  {
    id: 'family-library',
    name: '张氏家族',
    relationshipToZhangDai: '家族环境',
    description: '家族藏书、园林与交游构成张岱早年感官训练的重要背景。',
    eventIds: ['xuanyaoting', 'books'],
    chapterIds: ['xuanyaoting', 'books'],
  },
  {
    id: 'opera-company',
    name: '戏曲艺人',
    relationshipToZhangDai: '雅集与夜戏参与者',
    description: '金山夜戏等事件中，艺人与观者共同组成晚明公共生活的现场。',
    eventIds: ['jinshan', 'zhongqiu'],
    chapterIds: ['jinshan', 'zhongqiu'],
  },
]

export const getPerson = (id: string) => people.find((person) => person.id === id)
