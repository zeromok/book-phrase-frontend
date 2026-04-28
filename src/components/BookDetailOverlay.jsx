import { useState } from 'react'
import { generateShareImage } from '../utils/shareImage'
import { useReadability } from '../contexts/ReadabilityContext'

export default function BookDetailOverlay({ phrase, book, onClose }) {
  const [sharing, setSharing] = useState(false)
  const { phraseWeight } = useReadability()

  const handleShare = async () => {
    setSharing(true)
    try {
      const blob = await generateShareImage(phrase, book)
      if (!blob) return

      const file = new File([blob], 'ogu-phrase.png', { type: 'image/png' })
      const siteUrl = 'https://www.todayogu.com'

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ url: siteUrl, files: [file] })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ogu-phrase.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (e) {
      if (e.name !== 'AbortError') console.error(e)
    } finally {
      setSharing(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-4 bg-stone-900 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-stone-300 hover:text-white hover:bg-black/60 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 표지 이미지 */}
        {book.coverImageUrl && (
          <div className="flex justify-center bg-stone-800 py-8">
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="h-56 sm:h-64 rounded-lg shadow-2xl"
            />
          </div>
        )}

        {/* 책 정보 */}
        <div className="px-6 pt-5 pb-4">
          <h2 className="text-stone-50 text-xl font-medium leading-snug">{book.title}</h2>
          <p className="text-stone-400 text-sm mt-1">{book.author}</p>
          <p className={`text-stone-400 text-sm leading-relaxed ${phraseWeight} mt-4`}>
            "{phrase.text}"
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="px-6 pb-6 flex gap-2">
          <button
            onClick={handleShare}
            disabled={sharing}
            className="flex-1 text-sm bg-stone-100 text-stone-800 font-medium py-2.5 rounded-full hover:bg-white transition-colors disabled:opacity-50"
          >
            {sharing ? '생성 중...' : '공유'}
          </button>
          {book.purchaseLinks?.aladin && (
            <a
              href={book.purchaseLinks.aladin}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-sm text-center bg-stone-700 text-stone-200 py-2.5 rounded-full hover:bg-stone-600 transition-colors"
            >
              알라딘
            </a>
          )}
          {book.purchaseLinks?.yes24 && (
            <a
              href={book.purchaseLinks.yes24}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-sm text-center bg-stone-700 text-stone-200 py-2.5 rounded-full hover:bg-stone-600 transition-colors"
            >
              Yes24
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
