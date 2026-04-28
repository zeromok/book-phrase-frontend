import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { revealPhrase } from '../api/phraseApi'
import { useReadability } from '../contexts/ReadabilityContext'

export default function PhrasePage() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { phraseWeight } = useReadability()

  useEffect(() => {
    revealPhrase(id)
      .then((res) => {
        setData(res.data)
        // 동적 OG 태그 업데이트 (SPA 한계가 있지만 title은 반영됨)
        document.title = `"${res.data.text.slice(0, 30)}..." — O:GU`
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-400">불러오는 중...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center gap-4">
        <p className="text-stone-400">문구를 찾을 수 없어요</p>
        <Link to="/" className="text-sm text-stone-500 underline">피드로 돌아가기</Link>
      </div>
    )
  }

  const { text, book } = data

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* 카드 */}
        <div className="bg-stone-800 text-stone-50 rounded-2xl p-8 flex flex-col gap-6">
          {book.coverImageUrl && (
            <div className="flex justify-center">
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="h-48 rounded-lg shadow-lg"
              />
            </div>
          )}
          <p className={`text-stone-200 text-xl leading-relaxed ${phraseWeight} text-center`}>
            "{text}"
          </p>
          <div className="text-center">
            <h2 className="text-lg font-medium">{book.title}</h2>
            <p className="text-stone-400 text-sm mt-0.5">{book.author}</p>
          </div>
          <div className="flex justify-center gap-2">
            {book.purchaseLinks?.aladin && (
              <a
                href={book.purchaseLinks.aladin}
                target="_blank"
                rel="noreferrer"
                className="text-xs bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-full transition-colors"
              >
                알라딘 →
              </a>
            )}
            {book.purchaseLinks?.yes24 && (
              <a
                href={book.purchaseLinks.yes24}
                target="_blank"
                rel="noreferrer"
                className="text-xs bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-full transition-colors"
              >
                Yes24 →
              </a>
            )}
          </div>
        </div>

        {/* 피드 이동 */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            더 많은 문구 보기 →
          </Link>
        </div>
      </div>

      {/* 브랜딩 */}
      <p className="text-stone-300 text-xs mt-8 tracking-widest">O:GU — 오늘의 구절</p>
    </div>
  )
}
