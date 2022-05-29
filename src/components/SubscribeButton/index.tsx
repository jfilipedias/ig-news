import React from 'react'
import { signIn, useSession } from 'next-auth/react'

import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  priceId
}: SubscribeButtonProps) => {
  const { data: session } = useSession()

  function handleSubscription() {
    if (!session) {
      signIn('github')
      return
    }


  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscription}
    >
      subscribe now
    </button>
  )
}
