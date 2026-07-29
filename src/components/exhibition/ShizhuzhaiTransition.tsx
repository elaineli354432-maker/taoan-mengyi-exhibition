type ShizhuzhaiVariant = 'bamboo' | 'snow' | 'loss' | 'blank'
type ShizhuzhaiPlate = 1 | 2 | 3 | 4 | 5 | 6

export function ShizhuzhaiTransition({ variant, plate }: { variant: ShizhuzhaiVariant; plate?: ShizhuzhaiPlate }) {
  return (
    <div className={`shizhuzhai-transition shizhuzhai-${variant} ${plate ? `shizhuzhai-plate shizhuzhai-plate-${plate}` : ''}`} aria-hidden="true">
      {plate && (
        <img className="shizhuzhai-art" src="/images/jianpu/shizhuzhai-pattern-strip.png" alt="" />
      )}
    </div>
  )
}
