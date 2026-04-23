import { useEffect, useState, useRef, useCallback } from 'react'
import { getFeed, getTags } from '../api/phraseApi'
import PhraseCard from '../components/PhraseCard'
import DailyPhrase from '../components/DailyPhrase'
import TagFilterSheet from '../components/TagFilterSheet'

function generateSeed() {
  return Math.floor(Math.random() * 2147483647)
}

export default function FeedPage() {
  const [phrases, setPhrases] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const seedRef = useRef(generateSeed())
  const pageRef = useRef(0)
  const loadingRef = useRef(false)
  const hasNextRef = useRef(false)
  const observerRef = useRef(null)

  const selectedTagName = selectedTag === null
    ? '전체'
    : tags.find((t) => t.id === selectedTag)?.name || '전체'

  // 태그 로드
  useEffect(() => {
    getTags().then((res) => setTags(res.data))
  }, [])

  // 태그 변경 시 리셋 & 첫 페이지 로드
  useEffect(() => {
    seedRef.current = generateSeed()
    pageRef.current = 0
    loadingRef.current = false
    hasNextRef.current = false
    setPhrases([])
    setHasNext(false)
    setLoading(true)

    getFeed(selectedTag, seedRef.current, 0)
      .then((res) => {
        setPhrases(res.data.phrases)
        setHasNext(res.data.hasNext)
        hasNextRef.current = res.data.hasNext
        pageRef.current = 1
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [selectedTag])

  // 다음 페이지 로드
  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasNextRef.current) return
    loadingRef.current = true
    setLoadingMore(true)

    getFeed(selectedTag, seedRef.current, pageRef.current)
      .then((res) => {
        const newPhrases = res.data.phrases
        setPhrases((prev) => {
          const existingIds = new Set(prev.map((p) => p.id))
          const unique = newPhrases.filter((p) => !existingIds.has(p.id))
          return [...prev, ...unique]
        })
        setHasNext(res.data.hasNext)
        hasNextRef.current = res.data.hasNext
        pageRef.current += 1
      })
      .catch(console.error)
      .finally(() => {
        loadingRef.current = false
        setLoadingMore(false)
      })
  }, [selectedTag])

  // IntersectionObserver — callback ref
  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect()
      if (!node) return

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loadingRef.current && hasNextRef.current) {
            loadMore()
          }
        },
        { rootMargin: '200px' }
      )
      observerRef.current.observe(node)
    },
    [loadMore]
  )

  const openFeedback = () => {
    if (window.Tally) {
      window.Tally.openPopup('ODYx6R', { layout: 'modal' })
    } else {
      window.open('https://tally.so/r/ODYx6R', '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* 헤더 */}
      <header className="sticky top-0 bg-stone-100/80 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium text-stone-700 tracking-tight">
              O:GU <span className="text-stone-400 font-normal text-sm">(오구, 오늘의 구절)</span>
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">문구로 책을 발견하세요</p>
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1.5 text-sm text-stone-500 px-3 py-1.5 rounded-full border border-stone-300 hover:border-stone-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            {selectedTagName}
          </button>
        </div>
        <meta name="google-adsense-account" content="ca-pub-4320086350757226" />
      </header>

      {/* 오늘의 구절 */}
      <DailyPhrase />

      {/* 카드 피드 */}
      <main className="px-6 pb-20 pt-4 space-y-4">
        {loading ? (
          <div className="pt-20 text-center text-stone-400">문구를 불러오는 중...</div>
        ) : phrases.length === 0 ? (
          <div className="pt-20 text-center text-stone-400">문구가 없어요</div>
        ) : (
          <>
            {phrases.map((phrase) => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))}

            <div ref={sentinelRef} className="h-1" />

            {loadingMore && (
              <div className="py-6 text-center text-stone-400 text-sm">더 불러오는 중...</div>
            )}

            {!hasNext && phrases.length > 0 && (
              <div className="py-6 text-center text-stone-300 text-xs">모든 문구를 불러왔어요</div>
            )}
          </>
        )}
      </main>

      {/* 태그 필터 바텀시트 */}
      <TagFilterSheet
        open={filterOpen}
        tags={tags}
        selectedTag={selectedTag}
        onSelect={setSelectedTag}
        onClose={() => setFilterOpen(false)}
      />

      {/* 피드백 플로팅 버튼 */}
      <button
        onClick={openFeedback}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-1.5 bg-stone-800 text-stone-100 text-sm px-4 py-2.5 rounded-full shadow-lg hover:bg-stone-700 transition-colors"
      >
        <span>💬</span>
        <span>피드백</span>
      </button>
    </div>
  )
}
