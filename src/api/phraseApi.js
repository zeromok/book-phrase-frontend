import client from './client'

// 카드 피드 조회 (태그 기반 + 히스토리 제외)
export const getFeed = (tagId) =>
  client.get('/api/phrases/feed', { params: tagId ? { tagId } : {} })

// 책 정보 reveal
export const revealPhrase = (phraseId) =>
  client.post(`/api/phrases/${phraseId}/reveal`)

// 조회 기록 저장
export const viewPhrase = (phraseId) =>
  client.post(`/api/phrases/${phraseId}/view`)

// 태그 목록
export const getTags = () =>
  client.get('/api/tags')
