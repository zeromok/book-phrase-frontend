import client from './client'

export const getFeed = (tagId, seed, page = 0, size = 10) =>
  client.get('/api/v1/phrases/feed', {
    params: { ...(tagId ? { tagId } : {}), seed, page, size },
  })

export const revealPhrase = (phraseId) =>
  client.get(`/api/v1/phrases/${phraseId}/reveal`)

export const getTags = () =>
  client.get('/api/v1/tags')