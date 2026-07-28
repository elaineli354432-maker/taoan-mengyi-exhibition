# 《陶庵一梦》重构工作日志

## 开工审计

1. 继续保留的组件与资源
   - 保留 `SceneImage` 和 `assetUrl` 的图片加载思路，改为统一读取公共图片路径。
   - 保留 `LuWangSection`、`QiBiaojiaSection`、旧五幕页面与专题页面文件，作为未导航的兼容资源，不从首页渲染。
   - 保留 `public/images` 下全部现有图片资源。

2. 从首页移除的组件
   - `JourneyAtlas`
   - `LifeRoute`
   - `HistoryComparison`
   - `LuWangSection`
   - `QiBiaojiaSection`
   - 五幕入口卡片和横向五幕主叙事入口

3. 合并方向
   - `JourneyAtlas` 的地点探索概念并入 `/map`。
   - `HistoryComparison` 改为 `/timeline` 的淡化历史辅助线。
   - `LifeRoute` 中的人生阶段逻辑并入统一 `stages/events/locations` 数据。

4. 弃用方向
   - 首页不再使用旧功能堆叠、旧横向分镜和专题扩展作为主结构。
   - 旧 `/dream/:stage` 改为锚点兼容跳转。

5. 数据重复
   - 事件、篇目、地点、人物此前散落在 `dreamEvents.ts`、`records.ts`、`lifeRoute.ts`、`lifeTimeline.ts`、`originalTexts.ts`、`historyComparison.ts` 等文件中。
   - 本轮改为 `events.ts`、`chapters.ts`、`locations.ts`、`people.ts`、`stages.ts`、`historicalContext.ts` 统一输出。

6. 需要人工核对的原文
   - 《金山夜戏》
   - 《西湖香市》
   - 《葑门荷宕》
   - 《兰雪茶》
   - 《绍兴琴派》
   - 《闰中秋》
   - 《不系园》
   - 《三世藏书》
   - 《悬杪亭》

7. 本轮主要修改文件
   - `src/App.tsx`
   - `src/main.tsx`
   - `src/index.css`
   - `index.html`
   - `src/pages/DreamPage.tsx`
   - `src/pages/TimelinePage.tsx`
   - `src/pages/MapPage.tsx`
   - `src/pages/ReadPage.tsx`
   - 新增导航、首页、共享、数据和拆分 CSS 文件
