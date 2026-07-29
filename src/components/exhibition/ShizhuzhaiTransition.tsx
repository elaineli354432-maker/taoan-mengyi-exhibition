type ShizhuzhaiVariant = 'bamboo' | 'snow' | 'loss' | 'blank'
type ShizhuzhaiPlate = 1 | 2 | 3 | 4 | 5 | 6

export function ShizhuzhaiTransition({ variant, plate }: { variant: ShizhuzhaiVariant; plate?: ShizhuzhaiPlate }) {
  const plateId = plate ? String(plate).padStart(2, '0') : undefined

  return (
    <div className={`shizhuzhai-transition shizhuzhai-${variant} ${plate ? `shizhuzhai-plate shizhuzhai-plate-${plate}` : ''}`} aria-hidden="true">
      {plateId && (
        <img className="shizhuzhai-art" src={`/images/jianpu/cutouts/shizhuzhai-cutout-${plateId}.png`} alt="" />
      )}
    </div>
  )
}
