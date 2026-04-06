import client from './client'

export const getFeed = (tagId) =>
  client.get('/api/v1/phrases/feed', { params: tagId ? { tagId } : {} })

export const revealPhrase = (phraseId) =>
  client.get(`/api/v1/phrases/${phraseId}/reveal`)

export const getTags = () =>
  client.get('/api/v1/tags')