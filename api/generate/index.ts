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

  // Post draft to Sanity
  const html = await convertToHTML(article)
  const title = `The Daily Checkup: ${new Date().toLocaleDateString()}`
  const draft = await postDraft(title, html)

  // Email draft to users
  const id = draft._id.split('.')[1]
  const { SANITY_DATASET } = process.env
  const env = SANITY_DATASET === 'development' ? 'preview' : 'live'
  const url = `https://cc-studio.vercel.app/${env}/structure/blog;${id}`
  const notification = await sendNotification(url)

  return new Response(JSON.stringify({ notification }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
