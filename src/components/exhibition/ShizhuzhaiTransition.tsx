export function ShizhuzhaiTransition({ variant }: { variant: 'bamboo' | 'snow' | 'loss' | 'blank' }) {
  return <div className={`shizhuzhai-transition shizhuzhai-${variant}`} aria-hidden="true" />
}
