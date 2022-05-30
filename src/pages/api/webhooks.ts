import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { stripe } from '../../services/stripe'

async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvents = new Set([
  'checkout.session.completed'
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const payload = await buffer(req)
  const secret = req.headers['stripe-signature'] as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      secret,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  const type = event.type

  if (!relevantEvents.has(type)) {
    return res.json({ received: true })
  }

  console.log({ event })
}