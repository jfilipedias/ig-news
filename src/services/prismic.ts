import { createClient } from '@prismicio/client'

export function getPrismicClient(req?: unknown) {
  const prismic = createClient(
    process.env.PRISMIC_API_URL!,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN!
    }
  )

  return prismic
}