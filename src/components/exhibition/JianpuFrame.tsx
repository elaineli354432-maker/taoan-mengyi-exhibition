export function JianpuFrame({ tone = 'neutral' }: { tone?: 'neutral' | 'warm' | 'cold' | 'lost' }) {
  return <div className={`jianpu-frame jianpu-frame-${tone}`} aria-hidden="true" />
}
