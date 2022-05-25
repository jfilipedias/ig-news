import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'

import styles from './home.module.scss'

const Home: NextPage = () => {
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
            <span>for $9 month</span>
          </p>
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

export default Home
