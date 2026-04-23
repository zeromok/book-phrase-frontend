import { useState } from 'react'
import { motion } from 'framer-motion'
import { revealPhrase } from '../api/phraseApi'
import BookDetailOverlay from './BookDetailOverlay'

export default function PhraseCard({ phrase }) {
  const [flipped, setFlipped] = useState(false)
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const handleTap = async () => {
    if (loading) return

    // 이미 reveal된 카드 → 바로 오버레이
    if (flipped && book) {
      setShowDetail(true)
      return
    }

    // 첫 탭 → reveal + 플립 + 오버레이
    setLoading(true)
    try {
      const res = await revealPhrase(phrase.id)
      setBook(res.data.book)
      setFlipped(true)
      setShowDetail(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className="relative w-full cursor-pointer"
        style={{ perspective: '1200px' }}
        onClick={handleTap}
      >
        <motion.div
          className="relative w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* 앞면: 문구 */}
          <div
            className="w-full min-h-64 bg-stone-50 border border-stone-200 rounded-2xl p-8 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-stone-800 text-xl leading-relaxed font-light tracking-wide">
              "{phrase.text}"
            </p>
            <div className="flex justify-end items-center mt-6">
              {loading ? (
                <span className="text-xs text-stone-300">불러오는 중...</span>
              ) : (
                <span className="text-xs text-stone-300">탭해서 책 보기 →</span>
              )}
            </div>
          </div>

          {/* 뒷면: 간단한 책 정보 (닫기 후 표시) */}
          <div
            className="absolute inset-0 w-full min-h-64 bg-stone-800 text-stone-50 rounded-2xl p-8 flex flex-col justify-between overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {book && (
              <>
                <div className="min-w-0">
                  <h2 className="text-xl font-medium tracking-tight line-clamp-2">{book.title}</h2>
                  <p className="text-stone-400 text-sm mt-1 truncate">{book.author}</p>
                  <p className="text-stone-400 text-xs mt-3 leading-relaxed line-clamp-3">
                    "{phrase.text}"
                  </p>
                </div>
                <div className="flex justify-end items-center mt-4">
                  <span className="text-xs text-stone-500">탭해서 다시 보기 →</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {showDetail && book && (
        <BookDetailOverlay
          phrase={phrase}
          book={book}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}
