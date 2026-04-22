import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import PhrasePage from './pages/PhrasePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/phrases/:id" element={<PhrasePage />} />
        <Route path="*" element={<FeedPage />} />
      </Routes>
    </BrowserRouter>
  )
}