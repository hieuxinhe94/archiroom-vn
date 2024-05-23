import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export async function getRoomPage(
  client: SanityClient,
  
): Promise<any> {
  return await client.fetch(groq`*[_type == "affliate-page"] | order(publishedAt desc, _createdAt desc) {
    ...,
       
  }`)
}

export async function getAffliateProducts(
  client: SanityClient,
  
): Promise<any> {
  return await client.fetch(groq`*[_type == "affliate-product"] | order(publishedAt desc, _createdAt desc) {
    ...,
  }`)
}

export const singleproductquery = groq `
*[_type == "affliate-product" && slug.current == $slug][0]
`;

export const pathproductquery = groq `
*[_type == "affliate-product"] {
  'slug': slug.current,
}
`;

export const filterProducts = (media, type) => {
  let filter = ""
  if(media) {
    filter += ` && media ==  "${media}"`
  }

  if(type) {
    filter += ` && type ==  "${type}"`
  }
  let query = `*[_type == "affliate-product" ${filter}] | order(publishedAt desc, _createdAt desc)`

  return groq`${query}`
}

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
