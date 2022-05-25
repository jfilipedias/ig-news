import React from 'react'

import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  priceId
}: SubscribeButtonProps) => {
  return (
    <button
      type="button"
      className={styles.subscribeButton}
    >
      subscribe now
    </button>
  )
}
