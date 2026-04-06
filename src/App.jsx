import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="*" element={<FeedPage />} />
      </Routes>
    </BrowserRouter>
  )
}