import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

export default function ShareCardOverlay({ phrase, book, onClose }) {
  const cardRef = useRef(null)
  const [sharing, setSharing] = useState(false)

  const generateImage = async () => {
    if (!cardRef.current) return null
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    })
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  }

  const handleShare = async () => {
    setSharing(true)
    try {
      const blob = await generateImage()
      if (!blob) return

      const file = new File([blob], 'ogu-phrase.png', { type: 'image/png' })

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `"${phrase.text.slice(0, 30)}..." — O:GU`,
          files: [file],
        })
      } else {
        // fallback: 다운로드
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ogu-phrase.png'
        a.click()
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
        className="flex flex-col items-center gap-4 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 공유용 카드 이미지 */}
        <div
          ref={cardRef}
          className="w-full rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #292524, #44403c)' }}
        >
          <div className="p-8 flex flex-col gap-6">
            {book.coverImageUrl && (
              <div className="flex justify-center">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  crossOrigin="anonymous"
                  className="h-40 rounded-lg shadow-lg"
                />
              </div>
            )}
            <p className="text-stone-200 text-lg leading-relaxed font-light text-center">
              "{phrase.text}"
            </p>
            <div className="text-center">
              <p className="text-stone-300 text-sm font-medium">{book.title}</p>
              <p className="text-stone-400 text-xs mt-0.5">{book.author}</p>
            </div>
            <p className="text-stone-500 text-[10px] text-center tracking-widest mt-2">O:GU</p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleShare}
            disabled={sharing}
            className="flex-1 bg-stone-100 text-stone-800 text-sm font-medium py-3 rounded-full hover:bg-white transition-colors disabled:opacity-50"
          >
            {sharing ? '생성 중...' : '공유하기'}
          </button>
          <button
            onClick={onClose}
            className="px-6 text-stone-400 text-sm py-3 rounded-full border border-stone-600 hover:border-stone-400 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
