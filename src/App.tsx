import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CarPage from './pages/CarPage'
import { I18nProvider, useI18n } from './context/I18nContext'
import LanguageSelector from './components/LanguageSelector'

function AppInner() {
  const { t } = useI18n()
  return (
    <div>
      <header className="header">
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Link to="/" className="brand">
            <img src="/assets/icons/partner.svg" alt="Partner" style={{ height: 28 }} />
            <strong>{t.appName}</strong>
          </Link>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a
              href="https://ajaxgeo.cartrawler.com/ctabe/cars.json"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              {t.feedLink}
            </a>
            <LanguageSelector />
          </div>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarPage />} />
        </Routes>
        <p className="footer-note">
          <img
            style={{ width: 120, height: 20 }}
            src="https://corporate.cartrawler.com/wp-content/uploads/2021/12/ct-logo-dark.svg"
            alt="CarTrawler"
          />
          <div>Driving successful partnerships</div>
        </p>
      </main>
    </div>
  )
}
export default function App() {
  return (
    <I18nProvider>
      <AppInner />
    </I18nProvider>
  )
}
