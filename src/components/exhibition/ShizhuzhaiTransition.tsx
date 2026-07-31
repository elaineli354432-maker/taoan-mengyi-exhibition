type ShizhuzhaiVariant = 'bamboo' | 'snow' | 'loss' | 'blank'
type ShizhuzhaiPlate = 1 | 2 | 3 | 4 | 5 | 6

export function ShizhuzhaiTransition({ variant, plate }: { variant: ShizhuzhaiVariant; plate?: ShizhuzhaiPlate }) {
  const plateId = plate ? String(plate).padStart(2, '0') : undefined

  return (
    <div className={`shizhuzhai-transition shizhuzhai-${variant} ${plate ? `shizhuzhai-plate shizhuzhai-plate-${plate}` : ''}`} aria-hidden="true">
      {plateId && (
        <div className="shizhuzhai-print" style={{ ['--jianpu-image' as string]: `url('/images/jianpu/patterns/shizhuzhai-pattern-${plateId}.png')` }}>
          <span className="shizhuzhai-print-layer shizhuzhai-print-emboss" />
          <span className="shizhuzhai-print-layer shizhuzhai-print-color" />
          <img className="shizhuzhai-art shizhuzhai-print-ink" src={`/images/jianpu/patterns/shizhuzhai-pattern-${plateId}.png`} alt="" />
        </div>
      )}
    </div>
  )
}
