import styles from './index.module.css'

export interface FeatureCardProps {
  avatar: string
  avatarSize: number
  heading: string
  description: string
}

export default function FeatureCard({
  avatar,
  avatarSize,
  heading,
  description,
}: FeatureCardProps): JSX.Element {
  return (
    <div className={styles['card']}>
      <div className={styles['card__avatar']}>
        <img src={avatar} width={avatarSize} height={avatarSize}></img>
      </div>
      <h3 className={styles['card__heading']}>{heading}</h3>
      <div className={styles['card__description']}>{description}</div>
    </div>
  )
}
