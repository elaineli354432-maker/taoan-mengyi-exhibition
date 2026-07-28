import { Navigate, useParams } from 'react-router-dom'

const stageAnchors: Record<string, string> = {
  '少年有梦': 'formation',
  '人间繁华': 'prosperity',
  '天地一痴人': 'obsession',
  '繁华将尽': 'collapse',
  '总成一梦': 'writing',
}

export function LegacyActRedirect() {
  const { stage = '' } = useParams()
  const decoded = decodeURIComponent(stage)
  const anchor = stageAnchors[decoded] ?? 'formation'
  return <Navigate to={`/#${anchor}`} replace />
}
