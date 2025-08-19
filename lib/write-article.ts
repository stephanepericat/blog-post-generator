import { generateText } from 'ai'
import { deepinfra } from '@ai-sdk/deepinfra'
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
