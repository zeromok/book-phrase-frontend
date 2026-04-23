import { motion, AnimatePresence } from 'framer-motion'

export default function TagFilterSheet({ open, tags, selectedTag, onSelect, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 배경 */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 바텀시트 */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-stone-100 rounded-t-2xl px-6 pt-5 pb-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* 핸들 */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-stone-300 rounded-full" />
            </div>

            <p className="text-sm font-medium text-stone-600 mb-3">감정 태그</p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { onSelect(null); onClose() }}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  selectedTag === null
                    ? 'bg-stone-800 text-stone-100 border-stone-800'
                    : 'bg-transparent text-stone-500 border-stone-300'
                }`}
              >
                전체
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => { onSelect(tag.id); onClose() }}
                  className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                    selectedTag === tag.id
                      ? 'bg-stone-800 text-stone-100 border-stone-800'
                      : 'bg-transparent text-stone-500 border-stone-300'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
