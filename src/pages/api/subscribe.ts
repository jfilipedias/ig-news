/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { stripe } from '../../services/stripe'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const session = await getSession({ req })

  const stripeCustomer = await stripe.customers.create({
    email: session?.user?.email as string,
  })

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL || '',
    cancel_url: process.env.STRIPE_CANCEL_URL || ''
  })

  return res.status(200).json({ sessionId: stripeCheckoutSession.id })
}