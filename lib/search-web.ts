export const braveSearch = async (query: string) => {
  const params = new URLSearchParams({
    count: '20',
    extra_snippets: 'true',
    freshness: 'pd',
    q: query,
    summary: 'true',
  })

  const response = await fetch(
    `https://api.search.brave.com/res/v1/web/search?${params}`,
    {
      headers: {
        'X-Subscription-Token': process.env.BRAVE_SEARCH_API_KEY!,
      },
    },
  )
  const data = await response.json()
  return data
}
