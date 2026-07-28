export interface StageRecord {
  id: string
  number: string
  title: string
  shortTitle: string
  anchor: string
}

export const stages: StageRecord[] = [
  { id: 'formation', number: '01', title: '感官的形成', shortTitle: '感官形成', anchor: 'formation' },
  { id: 'prosperity', number: '02', title: '创造一种生活', shortTitle: '江南生活', anchor: 'prosperity' },
  { id: 'obsession', number: '03', title: '天地一痴人', shortTitle: '天地一痴', anchor: 'obsession' },
  { id: 'collapse', number: '04', title: '人间散场', shortTitle: '人间散场', anchor: 'collapse' },
  { id: 'writing', number: '05', title: '以文字存梦', shortTitle: '以文存梦', anchor: 'writing' },
]

export const stageById = (id: string) => stages.find((stage) => stage.id === id)
