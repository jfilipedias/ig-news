import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { stripe } from '../../services/stripe'
import { saveSubscription } from './_lib/manageSubscription'

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
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted'
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const payload = await buffer(req)
  const secret = req.headers['stripe-signature'] as string

  let event = {} as Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      secret,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return res.status(400).send(`Webhook Error: ${error.message}`)
    }
  }

  const { type } = event

  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription
          await saveSubscription(
            subscription.id,
            subscription.customer?.toString(),
          )
          break
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          await saveSubscription(
            checkoutSession.subscription?.toString() as string,
            checkoutSession.customer?.toString() as string,
            true
          )
          break
        default:
          throw new Error('Unhandled event type.')
      }
    } catch (err) {
      return res.status(400).send({ error: 'Webhook handler failed' })
    }
  }
  return res.json({ received: true })
}