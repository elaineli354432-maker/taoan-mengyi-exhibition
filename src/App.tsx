import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteHeader } from './components/navigation/SiteHeader'
import { LegacyActRedirect } from './pages/LegacyActRedirect'
import { DreamPage } from './pages/DreamPage'
import { TimelinePage } from './pages/TimelinePage'
import { MapPage } from './pages/MapPage'
import { ReadPage } from './pages/ReadPage'
import { ExhibitionsPage } from './pages/ExhibitionsPage'
import { ExhibitionPage } from './pages/ExhibitionPage'

export default function App() {
  return (
    <HashRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<DreamPage />} />
        <Route path="/dream/:stage" element={<LegacyActRedirect />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/read" element={<ReadPage />} />
        <Route path="/exhibitions" element={<ExhibitionsPage />} />
        <Route path="/exhibitions/:slug" element={<ExhibitionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-footer">
        <strong>陶庵一梦</strong>
        <span>《陶庵梦忆》中的张岱与晚明生活</span>
      </footer>
    </HashRouter>
  )
}
