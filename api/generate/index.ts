import { braveSearch } from '../../lib/search-web.js'
import { convertToHTML, writeArticle } from '../../lib/write-article.js'
import { postDraft } from '../../lib/post-draft.js'
import { sendNotification } from '../../lib/send-notification.js'

// mocks
import mockArticle from '../../assets/article.js'
import mockSearchResults from '../../assets/search-results.js'

export async function GET(req: Request) {
  const isDev = process.env.NODE_ENV === 'development'

  // Get web search results
  const query = 'Covid-19'
  const data = isDev ? mockSearchResults : await braveSearch(query)

  // Sent to LLM for summarization
  const article = isDev
    ? mockArticle.article
    : await writeArticle(data?.web?.results || [])
  const html = await convertToHTML(article)

  // Post draft to Sanity
  const draft = await postDraft('test', html)
  const id = draft._id.split('.')[1]
  const url = `https://cc-studio.vercel.app/preview/structure/blog;${id}`

  // Email draft to users
  const notification = await sendNotification(url)

  return new Response(JSON.stringify({ notification }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
