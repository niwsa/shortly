import { useEffect, useState } from 'react'
import styles from './index.module.css'

interface DataCardProps {
  item: string
  value: string
}

export default function DataCard(props: DataCardProps): JSX.Element {
  const [copyDone, setCopyDone] = useState(false)

  async function copyToClipBoard(): Promise<void> {
    try {
      if (navigator.clipboard) {
        // Requires secure context HTTPS or localhost
        await navigator.clipboard.writeText(props.value)
      } else {
        // TODO: support for older browsers
        // use a polyfill 👉 https://github.com/lgarron/clipboard-polyfill
      }
    } catch (err) {
      console.error(`Failed to copy: `, err)
    } finally {
      setCopyDone(true)
    }
  }

  useEffect(() => {
    let isCancelled = false
    if (copyDone) {
      setTimeout(() => {
        if (!isCancelled) {
          setCopyDone(false)
        }
      }, 1000)
    }
    return () => {
      isCancelled = true
    }
  }, [copyDone])

  return (
    <div className={styles['card']}>
      <div className={styles['card__item']}>{props.item}</div>
      <div className={styles['card__spacer']}></div>
      <div className={styles['card__value']}>{props.value}</div>
      <button
        className={`${styles['card__value-copy']} ${
          copyDone ? styles['card__value-copy--done'] : ''
        }`}
        type="button"
        onClick={copyToClipBoard}
      >
        {copyDone ? <span aria-live="polite">Copied!</span> : 'Copy'}
      </button>
    </div>
  )
}
