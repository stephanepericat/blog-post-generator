import { braveSearch } from '../../lib/search-web.js'
import { writeArticle } from '../../lib/write-article.js'

// mocks
import mockArticle from '../../assets/article.js'
import mockSearchResults from '../../assets/search-results.js'

export async function GET(req: Request) {
  const isDev = process.env.NODE_ENV === 'development'

  // Get web search results
  const query = 'Covid-19'
  const data = isDev ? mockSearchResults : await braveSearch(query)

  // Sent to LLM for summarization
  const article = isDev ? mockArticle.article : await writeArticle(data)

  // Post draft to Sanity

  // Email draft to users

  return new Response(JSON.stringify({ article }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
