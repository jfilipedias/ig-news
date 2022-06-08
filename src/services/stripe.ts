import Stripe from 'stripe'
import packageInfo from '../../package.json'

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'ig.news',
      version: packageInfo.version,
    }
  }
)