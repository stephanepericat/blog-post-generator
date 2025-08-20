import { generateText } from 'ai'
import { deepinfra } from '@ai-sdk/deepinfra'
import { marked } from 'marked'
import { JSDOM } from 'jsdom'
import createDOMPurify from 'dompurify'
import type { WindowLike } from 'dompurify'

const window = new JSDOM('').window as unknown as WindowLike
const DOMPurify = createDOMPurify(window)

import { systemPrompt2 } from './prompts.js'

export const writeArticle = async (context: any) => {
  const llm = deepinfra(process.env.DEEPINFRA_LLM_MODEL!)

  const { text } = await generateText({
    model: llm,
    system: systemPrompt2,
    messages: [
      {
        role: 'user',
        content: `${JSON.stringify(context, null, 2)}`,
      },
    ],
  })

  return text
}

export const convertToHTML = async (markdown: string) => {
  const html = await marked(markdown)
  return DOMPurify.sanitize(html)
}
