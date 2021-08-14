import styles from './index.module.css'

export default function Hero(): JSX.Element {
  return (
    <div className={styles['hero-section']}>
      <img
        src="/illustration-working.svg"
        className={styles['hero-section__image']}
        width="733"
        height="482"
        alt="Person working on a computer"
      ></img>
      <h2 className={styles['hero-section__heading']}>
        More than just shorter links
      </h2>
      <p className={styles['hero-section__content']}>
        Build your brand&apos;s recognition and get detailed insights on how
        your links are performing.
      </p>
    </div>
  )
}
