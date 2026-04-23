import { useState } from 'react'
import { generateShareImage } from '../utils/shareImage'

export default function BookDetailOverlay({ phrase, book, onClose }) {
  const [sharing, setSharing] = useState(false)

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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-4 mb-4 sm:mb-0 bg-stone-900 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 표지 이미지 — 크게 */}
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
          <p className="text-stone-400 text-sm leading-relaxed font-light mb-4">
            "{phrase.text}"
          </p>
          <h2 className="text-stone-50 text-xl font-medium leading-snug">{book.title}</h2>
          <p className="text-stone-400 text-sm mt-1">{book.author}</p>
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
