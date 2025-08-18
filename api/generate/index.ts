import { braveSearch } from '../../lib/search-web.js'
import mockSearchResults from '../../assets/search-results.js'

export async function GET(req: Request) {
  const isDev = process.env.NODE_ENV === 'development'
  const query = 'Covid-19'
  const data = isDev ? mockSearchResults : await braveSearch(query)

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
