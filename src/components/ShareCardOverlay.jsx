import { useState, useEffect } from 'react'

// 외부 이미지를 CORS 우회하여 로드 (img → canvas 변환)
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image load failed'))
    img.src = url
  })
}

// Canvas에 줄바꿈 텍스트 그리기
function drawWrappedText(ctx, text, x, maxWidth, lineHeight, startY) {
  const chars = [...text]
  let line = ''
  let y = startY

  for (const char of chars) {
    const testLine = line + char
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y)
      line = char
      y += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, y)
  return y + lineHeight
}

// Canvas API로 공유 이미지 직접 생성
async function generateShareImage(phrase, book) {
  const scale = 2
  const w = 540
  const h = 760
  const canvas = document.createElement('canvas')
  canvas.width = w * scale
  canvas.height = h * scale
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)

  // 배경 — 둥근 모서리 + 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, w, h)
  gradient.addColorStop(0, '#292524')
  gradient.addColorStop(1, '#44403c')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.roundRect(0, 0, w, h, 24)
  ctx.fill()

  let y = 48

  // 책 표지 이미지 (CORS 실패 시 스킵)
  try {
    const img = await loadImage(book.coverImageUrl)
    const imgH = 200
    const imgW = imgH * (img.naturalWidth / img.naturalHeight)
    const imgX = (w - imgW) / 2

    // 둥근 모서리 클리핑
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(imgX, y, imgW, imgH, 12)
    ctx.clip()
    ctx.drawImage(img, imgX, y, imgW, imgH)
    ctx.restore()

    y += imgH + 36
  } catch {
    // 이미지 로드 실패 — 표지 없이 진행
    y += 20
  }

  // 문구 텍스트
  ctx.fillStyle = '#e7e5e4' // stone-200
  ctx.font = '300 20px "Pretendard Variable", "Noto Sans KR", system-ui, sans-serif'
  ctx.textAlign = 'center'
  const quotedText = `\u201C${phrase.text}\u201D`
  y = drawWrappedText(ctx, quotedText, w / 2, w - 80, 30, y)

  // 책 제목
  y += 16
  ctx.fillStyle = '#d6d3d1' // stone-300
  ctx.font = '500 16px "Pretendard Variable", "Noto Sans KR", system-ui, sans-serif'
  y = drawWrappedText(ctx, book.title, w / 2, w - 80, 24, y)

  // 저자
  y += 4
  ctx.fillStyle = '#a8a29e' // stone-400
  ctx.font = '400 13px "Pretendard Variable", "Noto Sans KR", system-ui, sans-serif'
  ctx.fillText(book.author, w / 2, y)

  // 워터마크
  ctx.fillStyle = '#78716c' // stone-500
  ctx.font = '400 11px "Pretendard Variable", "Noto Sans KR", system-ui, sans-serif'
  ctx.letterSpacing = '3px'
  ctx.fillText('O:GU', w / 2, h - 32)

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}

export default function ShareCardOverlay({ phrase, book, onClose }) {
  const [sharing, setSharing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState(false)

  // 오버레이 열릴 때 미리보기 이미지 생성
  useEffect(() => {
    generateShareImage(phrase, book)
      .then((blob) => {
        if (blob) setPreviewUrl(URL.createObjectURL(blob))
      })
      .catch(() => setError(true))

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleShare = async () => {
    setSharing(true)
    try {
      const blob = await generateShareImage(phrase, book)
      if (!blob) {
        setError(true)
        return
      }

      const file = new File([blob], 'ogu-phrase.png', { type: 'image/png' })

      // 모바일: 네이티브 공유
      const siteUrl = 'https://www.todayogu.com'

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `"${phrase.text}" — O:GU`,
          text: `"${phrase.text}"\n— ${book.title}, ${book.author}\n\n`,
          url: siteUrl,
          files: [file],
        })
      } else {
        // 데스크톱: 다운로드
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
      if (e.name !== 'AbortError') {
        console.error(e)
        setError(true)
      }
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
        {/* 미리보기 */}
        {previewUrl ? (
          <img src={previewUrl} alt="공유 미리보기" className="w-full rounded-2xl" />
        ) : error ? (
          <div className="w-full py-20 text-center text-stone-400 text-sm">
            이미지 생성에 실패했어요
          </div>
        ) : (
          <div className="w-full py-20 text-center text-stone-400 text-sm">
            미리보기 생성 중...
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleShare}
            disabled={sharing || error}
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
