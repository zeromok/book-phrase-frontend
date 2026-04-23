import { useEffect, useState } from 'react'
import { getDaily } from '../api/phraseApi'
import BookDetailOverlay from './BookDetailOverlay'

export default function DailyPhrase() {
  const [data, setData] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    getDaily()
      .then((res) => setData(res.data))
      .catch(() => {})
  }, [])

  if (!data) return null

  const phrase = { id: data.phraseId, text: data.text }
  const book = data.book

  return (
    <>
      <div
        className="mx-6 mt-4 mb-2 rounded-2xl p-6 cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #292524, #44403c)' }}
        onClick={() => setShowDetail(true)}
      >
        <p className="text-stone-500 text-xs font-medium tracking-widest mb-3">
          TODAY
        </p>
        <p className="text-stone-200 text-lg leading-relaxed font-light">
          "{data.text}"
        </p>
        <div className="flex justify-end mt-4">
          <span className="text-xs text-stone-500">탭해서 책 보기 →</span>
        </div>
      </div>

      {showDetail && (
        <BookDetailOverlay
          phrase={phrase}
          book={book}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}
