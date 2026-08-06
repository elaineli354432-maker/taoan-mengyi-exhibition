import { assetUrl } from '../../utils/assetUrl'

type ShizhuzhaiVariant = 'bamboo' | 'snow' | 'loss' | 'blank'
type ShizhuzhaiPlate = 1 | 2 | 3 | 4 | 5 | 6

export function ShizhuzhaiTransition({ variant, plate }: { variant: ShizhuzhaiVariant; plate?: ShizhuzhaiPlate }) {
  const plateId = plate ? String(plate).padStart(2, '0') : undefined
  const plateImage = plateId ? assetUrl(`/images/jianpu/patterns/shizhuzhai-pattern-${plateId}.webp`) : undefined

  return (
    <div className={`shizhuzhai-transition shizhuzhai-${variant} ${plate ? `shizhuzhai-plate shizhuzhai-plate-${plate}` : ''}`} aria-hidden="true">
      {plateImage && (
        <div className="shizhuzhai-print" style={{ ['--jianpu-image' as string]: `url('${plateImage}')` }}>
          <span className="shizhuzhai-print-layer shizhuzhai-print-emboss" />
          <span className="shizhuzhai-print-layer shizhuzhai-print-color" />
          <img loading="lazy" decoding="async" className="shizhuzhai-art shizhuzhai-print-ink" src={plateImage} alt="" />
        </div>
      )}
    </div>
  )
}
