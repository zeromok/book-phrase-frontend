import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <FeedPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
