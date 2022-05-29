import React from 'react'
import { signIn, useSession } from 'next-auth/react'

import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripeJs'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  priceId
}: SubscribeButtonProps) => {
  const { data: session } = useSession()

  async function handleSubscription() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data

      const stripe = await getStripeJs()
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message)
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
