import React from 'react'
import Image from 'next/image'

import { SignInButton } from '../SignInButton'

import styles from './styles.module.scss'

export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="ig.news logo"
          width={110}
          height={31}
        />

        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
