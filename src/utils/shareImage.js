// 외부 이미지를 CORS 우회하여 로드
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
export async function generateShareImage(phrase, book) {
  const scale = 2
  const w = 540
  const h = 760
  const canvas = document.createElement('canvas')
  canvas.width = w * scale
  canvas.height = h * scale
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)

  // 배경
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

    ctx.save()
    ctx.beginPath()
    ctx.roundRect(imgX, y, imgW, imgH, 12)
    ctx.clip()
    ctx.drawImage(img, imgX, y, imgW, imgH)
    ctx.restore()

    y += imgH + 36
  } catch {
    y += 20
  }

  // 문구 텍스트
  ctx.fillStyle = '#e7e5e4'
  ctx.font = '300 20px "Pretendard Variable", "Noto Sans KR", system-ui, sans-serif'
  ctx.textAlign = 'center'
  const quotedText = `\u201C${phrase.text}\u201D`
  y = drawWrappedText(ctx, quotedText, w / 2, w - 80, 30, y)

  // 책 제목
  y += 16
  ctx.fillStyle = '#d6d3d1'
  ctx.font = '500 16px "Pretendard Variable", "Noto Sans KR", system-ui, sans-serif'
  y = drawWrappedText(ctx, book.title, w / 2, w - 80, 24, y)

  // 저자
  y += 4
  ctx.fillStyle = '#a8a29e'
  ctx.font = '400 13px "Pretendard Variable", "Noto Sans KR", system-ui, sans-serif'
  ctx.fillText(book.author, w / 2, y)

  // 워터마크
  ctx.fillStyle = '#78716c'
  ctx.font = '400 11px "Pretendard Variable", "Noto Sans KR", system-ui, sans-serif'
  ctx.letterSpacing = '3px'
  ctx.fillText('O:GU', w / 2, h - 32)

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}
