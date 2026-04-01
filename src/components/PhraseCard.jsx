import { useState } from 'react'
import { motion } from 'framer-motion'
import { revealPhrase, viewPhrase } from '../api/phraseApi'

export default function PhraseCard({ phrase }) {
  const [flipped, setFlipped] = useState(false)
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFlip = async () => {
    if (flipped || loading) return
    setLoading(true)
    try {
      await viewPhrase(phrase.id)
      const res = await revealPhrase(phrase.id)
      setBook(res.data)
      setFlipped(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={handleFlip}
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
            "{phrase.content}"
          </p>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2 flex-wrap">
              {phrase.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-stone-400 border border-stone-200 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            {loading ? (
              <span className="text-xs text-stone-300">불러오는 중...</span>
            ) : (
              <span className="text-xs text-stone-300">탭해서 책 보기 →</span>
            )}
          </div>
        </div>

        {/* 뒷면: 책 정보 */}
        <div
          className="absolute inset-0 w-full min-h-64 bg-stone-800 text-stone-50 rounded-2xl p-8 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {book && (
            <>
              <div>
                <p className="text-stone-300 text-sm mb-4 leading-relaxed font-light">
                  "{phrase.content}"
                </p>
                <h2 className="text-2xl font-medium tracking-tight">{book.title}</h2>
                <p className="text-stone-400 mt-1">{book.author}</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-stone-500 text-sm">{book.publisher}</p>
                {book.externalLink && (
                  <a
                    href={book.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-full transition-colors"
                  >
                    구매하기 →
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
