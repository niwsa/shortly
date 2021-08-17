import styles from './index.module.css'
import Logo from 'components/Logo'

export default function Footer(): JSX.Element {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__logo']}>
        <Logo theme="light" />
      </div>
      <ul className={styles['footer__links']}>
        <li className={styles['footer__link-section']}>
          Features
          <ul className={styles['footer__sublist']}>
            <li className={styles['footer__link']}>Link Shortening</li>
            <li className={styles['footer__link']}>Branded Links</li>
            <li className={styles['footer__link']}>Analytics</li>
          </ul>
        </li>
        <li className={styles['footer__link-section']}>
          Resources
          <ul className={styles['footer__sublist']}>
            <li className={styles['footer__link']}>Blog</li>
            <li className={styles['footer__link']}>Developers</li>
            <li className={styles['footer__link']}>Support</li>
          </ul>
        </li>
        <li className={styles['footer__link-section']}>
          Company
          <ul className={styles['footer__sublist']}>
            <li className={styles['footer__link']}>About</li>
            <li className={styles['footer__link']}>Our Team</li>
            <li className={styles['footer__link']}>Careers</li>
            <li className={styles['footer__link']}>Contact</li>
          </ul>
        </li>
        <li className={styles['footer__socialmedialinks']}>
          <a
            href="/"
            aria-label="fb page"
            className={styles['footer__socialmedialink']}
          >
            <img
              src="/icon-facebook.svg"
              alt="fb page"
              className={styles['footer__socialmediaimg']}
            ></img>
          </a>
          <a
            href="/"
            aria-label="twitter handle"
            className={styles['footer__socialmedialink']}
          >
            <img
              src="/icon-twitter.svg"
              alt="twitter handle"
              className={styles['footer__socialmediaimg']}
            ></img>
          </a>
          <a
            href="/"
            aria-label="pinterest handle"
            className={styles['footer__socialmedialink']}
          >
            <img
              src="/icon-pinterest.svg"
              alt="pinterest handle"
              className={styles['footer__socialmediaimg']}
            ></img>
          </a>
          <a
            href="/"
            aria-label="instagram account"
            className={styles['footer__socialmedialink']}
          >
            <img
              src="/icon-instagram.svg"
              alt="instagram account"
              className={styles['footer__socialmediaimg']}
            ></img>
          </a>
        </li>
      </ul>
    </footer>
  )
}
