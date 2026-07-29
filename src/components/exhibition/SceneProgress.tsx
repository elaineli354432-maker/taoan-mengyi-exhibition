export function SceneProgress({ current, total }: { current: number; total: number }) {
  return <span className="scene-progress">{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
}
