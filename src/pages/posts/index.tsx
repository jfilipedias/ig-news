import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'

import styles from './styles.module.scss'

const Posts: NextPage = () => {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>12 de março de 2021</time>
            <strong>Next.JS - Novidades na versão 10 e atualização do blog para melhorar a performance</strong>
            <p>Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode.</p>
          </a>

          <a>
            <time>12 de março de 2021</time>
            <strong>Next.JS - Novidades na versão 10 e atualização do blog para melhorar a performance</strong>
            <p>Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode.</p>
          </a>

          <a>
            <time>12 de março de 2021</time>
            <strong>Next.JS - Novidades na versão 10 e atualização do blog para melhorar a performance</strong>
            <p>Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode.</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getByType(
    'post',
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100
    }
  )

  return {
    props: {}
  }
}

export default Posts