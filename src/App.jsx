import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import PhrasePage from './pages/PhrasePage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'
import { ReadabilityProvider } from './contexts/ReadabilityContext'

export default function App() {
  return (
    <ReadabilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/phrases/:id" element={<PhrasePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<FeedPage />} />
        </Routes>
      </BrowserRouter>
    </ReadabilityProvider>
  )
}