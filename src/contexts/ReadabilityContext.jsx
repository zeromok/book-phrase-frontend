import { createContext, useContext, useEffect, useState } from 'react'

const ReadabilityContext = createContext({ bold: false, toggle: () => {} })
const STORAGE_KEY = 'ogu-bold'

export function ReadabilityProvider({ children }) {
  const [bold, setBold] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(bold))
    } catch {}
  }, [bold])

  const toggle = () => setBold((b) => !b)
  const phraseWeight = bold ? 'font-medium' : 'font-light'

  return (
    <ReadabilityContext.Provider value={{ bold, toggle, phraseWeight }}>
      {children}
    </ReadabilityContext.Provider>
  )
}

export function useReadability() {
  return useContext(ReadabilityContext)
}
