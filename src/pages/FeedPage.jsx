import { useEffect, useState } from 'react'
import { getFeed, getTags } from '../api/phraseApi'
import PhraseCard from '../components/PhraseCard'

export default function FeedPage() {
  const [phrases, setPhrases] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTags().then((res) => setTags(res.data))
  }, [])

  useEffect(() => {
    setLoading(true)
    getFeed(selectedTag)
      .then((res) => setPhrases(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [selectedTag])

  return (
    <div className="min-h-screen bg-stone-100">
      {/* 헤더 */}
      <header className="sticky top-0 bg-stone-100/80 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-200">
        <h1 className="text-lg font-medium text-stone-700 tracking-tight">북구절</h1>
      </header>

      {/* 태그 필터 */}
      <div className="flex gap-2 px-6 py-4 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setSelectedTag(null)}
          className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-colors ${
            selectedTag === null
              ? 'bg-stone-800 text-stone-100 border-stone-800'
              : 'bg-transparent text-stone-500 border-stone-300 hover:border-stone-400'
          }`}
        >
          전체
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setSelectedTag(tag.id)}
            className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-colors ${
              selectedTag === tag.id
                ? 'bg-stone-800 text-stone-100 border-stone-800'
                : 'bg-transparent text-stone-500 border-stone-300 hover:border-stone-400'
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* 카드 피드 */}
      <main className="px-6 pb-20 space-y-4">
        {loading ? (
          <div className="pt-20 text-center text-stone-400">문구를 불러오는 중...</div>
        ) : phrases.length === 0 ? (
          <div className="pt-20 text-center text-stone-400">오늘의 문구가 없어요</div>
        ) : (
          phrases.map((phrase) => (
            <PhraseCard key={phrase.id} phrase={phrase} />
          ))
        )}
      </main>
    </div>
  )
}
