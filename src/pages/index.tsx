import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'

import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string
    amount: string
  }
}

const Home: NextPage<HomeProps> = ({ product }: HomeProps) => {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image
          src="/images/avatar.svg"
          alt="An image of a girl sitting in a chair with a laptop, a cup of coffee and books on a table coding a react app."
          width={336}
          height={521}
        />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID || '')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(price.unit_amount) / 100)
  }

  return {
    props: {
      product
    }
  }
}

export default Home
