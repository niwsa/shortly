import styles from './index.module.css'

interface DataCardProps {
  item: string
  value: string
}

export default function DataCard(props: DataCardProps): JSX.Element {
  async function copyToClipBoard(): Promise<void> {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(props.value)
      } else {
        // TODO: support for older browsers
        // use a polyfill 👉 https://github.com/lgarron/clipboard-polyfill
      }
    } catch (err) {
      console.error(`Failed to copy: `, err)
    }
  }

  return (
    <div className={styles['card']}>
      <div className={styles['card__item']}>{props.item}</div>
      <div className={styles['card__spacer']}></div>
      <div className={styles['card__value']}>{props.value}</div>
      <button
        className={styles['card__value-copy']}
        type="button"
        onClick={copyToClipBoard}
      >
        Copy
      </button>
    </div>
  )
}
