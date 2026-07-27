export type DreamEvent = { id: string; year: string; age: string; stage: '少年有梦' | '人间繁华' | '天地一痴人' | '繁华将尽' | '总成一梦'; place: string; title: string; work: string; quote: string; description: string; image: string }

export const dreamEvents: DreamEvent[] = [
  {id:'birth',year:'1597',age:'出生',stage:'少年有梦',place:'浙江山阴 / 今绍兴',title:'生于山阴',work:'生平档案',quote:'万历二十五年（丁酉年），张岱生于山阴书香世家。',description:'张岱出身仕宦书香家庭；家族藏书、江南园林与水乡生活，构成他早年的文化环境。此年丰臣秀吉再度侵朝，明廷援朝抗倭；长白山火山喷发并引发地震，万历朝政困局与朝臣谏争亦在加剧。',image:'birth'},
  {id:'xuanyaoting',year:'约1602',age:'六岁',stage:'少年有梦',place:'绍兴',title:'悬杪亭读书',work:'《悬杪亭》',quote:'园林深处，书卷与砚台先塑造了他的感官。',description:'窗纸树影、小亭与书案构成张岱最早的阅读世界。',image:'youth-1'},
  {id:'nanzhen',year:'1612',age:'十六岁',stage:'少年有梦',place:'绍兴 / 南镇',title:'南镇祈梦',work:'《祁止祥癖》',quote:'夜间古祠，烛火与梦境交叠。',description:'以祠庙夜色与克制的烛光，呈现少年对于技艺、人格与命运的想象。',image:'youth-2'},
  {id:'lanxue',year:'1614',age:'十八岁',stage:'少年有梦',place:'绍兴',title:'兰雪茶',work:'《兰雪茶》',quote:'泉水、茶芽、白瓷茶盏，皆可成为一生的记忆。',description:'茶在张岱笔下不仅是技艺，更是对水、火、器物与感官的极细观察。',image:'youth-3'},
  {id:'qinpai',year:'1616—1618',age:'二十岁前后',stage:'少年有梦',place:'绍兴',title:'绍兴琴派',work:'《绍兴琴派》',quote:'琴弦、指尖与夜间书房，是一种被训练出的听觉。',description:'通过琴的局部而非肖像式人物，呈现张岱早年的艺术感受力。',image:'youth-4'},
  {id:'fengmen',year:'1622',age:'二十六岁',stage:'人间繁华',place:'苏州 / 吴中',title:'葑门荷宕',work:'《葑门荷宕》',quote:'舟楫、荷塘与市井人群，共同构成晚明江南。',description:'密集游船、荷叶与人声交错，他是繁华的参与者而非旁观者。',image:'prosperity-1'},
  {id:'jinshan',year:'1629',age:'三十三岁',stage:'人间繁华',place:'镇江 / 金山寺',title:'金山夜戏',work:'《金山夜戏》',quote:'半夜入金山寺，张灯演戏。',description:'寺、戏、灯火与围观者共同形成一场大胆而自由的夜游。',image:'prosperity-2'},
  {id:'huxinting',year:'1632',age:'三十六岁',stage:'人间繁华',place:'杭州 / 西湖',title:'湖心亭看雪',work:'《湖心亭看雪》',quote:'雾凇沆砀，天与云与山与水，上下一白。',description:'长堤、亭子、舟与人物被缩小到天地雪湖之间。',image:'prosperity-3'},
  {id:'zhongqiu',year:'1634',age:'三十八岁',stage:'人间繁华',place:'绍兴',title:'闰中秋',work:'《闰中秋》',quote:'灯光、戏台与人群轮廓，构成月下聚会。',description:'不以人数作写实炫耀，而以光、声与空间显出城市雅集。',image:'prosperity-4'},
  {id:'buxiyuan',year:'1634',age:'三十八岁',stage:'人间繁华',place:'绍兴',title:'不系园',work:'《不系园》',quote:'红叶、夜宴、酒盏与园林，是可以亲手营造的风雅。',description:'园林承接他的朋友、艺术与生活理想。',image:'prosperity-5'},
  {id:'baiyang',year:'1640',age:'四十四岁',stage:'人间繁华',place:'杭州 / 白洋',title:'白洋潮',work:'《白洋潮》',quote:'潮水占据主体，人物只是岸边小点。',description:'自然之力压过人间热闹，也预示着世界将被更大的力量改变。',image:'prosperity-6'},
  {id:'snow-obsession',year:'1632',age:'三十六岁',stage:'天地一痴人',place:'杭州 / 西湖',title:'为雪而痴',work:'《湖心亭看雪》',quote:'是日更定矣，余拏一小舟，拥毳衣炉火，独往湖心亭看雪。',description:'不是避开极寒，而是主动走入极静的雪夜。',image:'obsession-1'},
  {id:'opera-obsession',year:'1629',age:'三十三岁',stage:'天地一痴人',place:'镇江 / 金山寺',title:'为戏而痴',work:'《金山夜戏》',quote:'半夜入金山寺，张灯演戏。',description:'夜戏是对舞台、声响与现场感的一次极端追求。',image:'obsession-2'},
  {id:'tea-obsession',year:'1614',age:'十八岁',stage:'天地一痴人',place:'绍兴',title:'为茶而痴',work:'《兰雪茶》',quote:'一泉一叶一器，皆须细辨。',description:'茶把张岱的审美从宏大风景收拢到手与器物的细节。',image:'obsession-3'},
  {id:'qin-obsession',year:'1616—1618',age:'二十岁前后',stage:'天地一痴人',place:'绍兴',title:'为琴而痴',work:'《绍兴琴派》',quote:'琴弦震动，夜间书房因此获得另一种时间。',description:'琴让听觉成为一种可以被训练和保存的记忆。',image:'obsession-4'},
  {id:'garden-obsession',year:'1634',age:'三十八岁',stage:'天地一痴人',place:'绍兴',title:'为园林而痴',work:'《不系园》',quote:'奇石、池水、花木，都是被安排的感官。',description:'园林并非背景，而是张岱将生活审美化的现场。',image:'obsession-5'},
  {id:'lanterns',year:'1640',age:'四十四岁',stage:'繁华将尽',place:'绍兴',title:'绍兴灯景',work:'《绍兴灯景》',quote:'灯仍然亮着，黑暗却从画面边缘逼近。',description:'最后的华丽不再只是欢庆，而带有即将散场的预感。',image:'decline-1'},
  {id:'zhaoqing',year:'1640',age:'四十四岁',stage:'繁华将尽',place:'杭州 / 昭庆寺',title:'昭庆寺火灾',work:'《西湖香市》',quote:'火光映在水中，香市的物件渐被烟雾遮没。',description:'不以灾难奇观取胜，而以被烟遮住的日常显示失去。',image:'decline-2'},
  {id:'famine',year:'1641',age:'四十五岁',stage:'繁华将尽',place:'杭州',title:'杭州饥荒',work:'《西湖香市》',quote:'城中从喧闹转为空寂。',description:'空置街道、关闭商铺和散落器物，比宏大场面更能说明秩序的断裂。',image:'decline-3'},
  {id:'roadblock',year:'1642前后',age:'四十六岁前后',stage:'繁华将尽',place:'江南',title:'战乱与道路阻断',work:'《梦忆序》',quote:'原本连通各地的道路，开始逐一淡出。',description:'以雨路、行囊与手稿表现旅行空间如何变得不可抵达。',image:'decline-4'},
  {id:'mingwang',year:'1644',age:'四十八岁',stage:'总成一梦',place:'江南',title:'国破家亡',work:'《梦忆序》',quote:'五十年来，总成一梦。',description:'前半生的繁华不再是现实，而成为等待整理与追忆的材料。',image:'dream-1'},
  {id:'books',year:'1645',age:'四十九岁',stage:'总成一梦',place:'绍兴',title:'三世藏书散失',work:'《三世藏书》',quote:'藏书散失，家园破碎。',description:'倒下的书架与散落书卷，是家族记忆被迫中断的具体形状。',image:'dream-2'},
  {id:'shanzhong',year:'1645—1646',age:'五十岁前后',stage:'总成一梦',place:'剡县 / 山寺',title:'山中避兵',work:'《鹿苑寺方柿》',quote:'山间空屋、残卷、熄灭的灯。',description:'他在山寺与孤灯间继续写作，保存一个消逝的世界。',image:'dream-3'},
  {id:'old-zhangdai',year:'晚年',age:'晚年',stage:'总成一梦',place:'绍兴 / 杭州',title:'梦余成书',work:'《陶庵梦忆》',quote:'鸡鸣枕上，夜气方回。',description:'晚年背影、史稿、覆雪西湖与关闭的园门，共同收束为“旧梦”。',image:'dream-4'}
]
export const stages = ['少年有梦','人间繁华','天地一痴人','繁华将尽','总成一梦'] as const
