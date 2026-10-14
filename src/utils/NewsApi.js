const NEWS_API_BASE_URL = import.meta.env.PROD
  ? 'https://nomoreparties.co/news/v2/everything'
  : 'https://newsapi.org/v2/everything'

const PAGE_SIZE = 100
const REQUEST_TIMEOUT_MS = 10000

function formatDate(date) {
  return date.toISOString().split('T')[0]
}

export function searchArticles(keyword) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY

  const today = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(today.getDate() - 7)

  const url =
    `${NEWS_API_BASE_URL}?q=${encodeURIComponent(keyword)}` +
    `&from=${formatDate(sevenDaysAgo)}` +
    `&to=${formatDate(today)}` +
    `&pageSize=${PAGE_SIZE}` +
    `&apiKey=${apiKey}`

  return fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`)
      }
      return res.json()
    })
    .then((data) => data.articles)
}
