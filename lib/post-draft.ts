import * as blockTools from '@portabletext/block-tools'
import { createClient } from '@sanity/client'
import { JSDOM } from 'jsdom'
import { uriGenerator } from './hash-generator.js'
import { blockContentType } from './sanity-schema.js'

const { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECTID, SANITY_TOKEN } =
  process.env

export const client = createClient({
  apiVersion: SANITY_API_VERSION!,
  dataset: SANITY_DATASET!,
  projectId: SANITY_PROJECTID!,
  token: SANITY_TOKEN!,
  useCdn: true,
})

export const postDraft = async (
  title: string,
  content: string,
): Promise<any> => {
  let article

  try {
    article = blockTools.htmlToBlocks(content, blockContentType, {
      parseHtml: (html) => new JSDOM(html).window.document,
    })
  } catch (e) {
    console.log(e)
    return
  }

  const doc = {
    _type: 'blog',
    _id: `drafts.${crypto.randomUUID()}`,
    uri: {
      _type: 'slug',
      current: uriGenerator(title),
    },
    title: [
      {
        _key: 'en',
        _type: 'internationalizedArrayStringValue',
        value: title,
      },
    ],
    description: [
      {
        _key: 'en',
        _type: 'internationalizedArrayRichTextValue',
        value: article,
      },
    ],
  }

  const result = await client.create(doc)
  return result
}
