export interface HistoricalContextRecord {
  id: string
  year: string
  title: string
  text: string
}

export const historicalContext: HistoricalContextRecord[] = [
  { id: 'chongzhen', year: '1627', title: '崇祯即位', text: '晚明朝局试图整饬，财政、边患与党争仍持续加压。' },
  { id: 'disaster', year: '1640前后', title: '灾荒加剧', text: '江南城市周边的饥荒与流徙，使原有游赏空间逐渐失去稳定背景。' },
  { id: 'ming-1644', year: '1644', title: '明亡', text: '北京政权覆灭，张岱此前经历的生活秩序转为需要追忆的旧梦。' },
  { id: 'southern-ming', year: '1645', title: '南明局势', text: '江南政治和军事局势急剧变化，行旅、交游与家族生活被迫中断。' },
  { id: 'early-qing', year: '清初', title: '新秩序形成', text: '遗民写作成为保存个人记忆和旧朝见证的重要方式。' },
]
