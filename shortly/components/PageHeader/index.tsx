import { useState } from 'react'
import Link from 'next/link'
import Logo from 'components/Logo'
import styles from './index.module.css'

export default function PageHeader(): JSX.Element {
  const [isMenuOpen, setState] = useState(false)

  function toggle() {
    setState((prevState) => !prevState)
  }

  return (
    <header className={styles['header']}>
      <Link href="/">
        <a aria-label="home" title="home" className={styles['header__logo']}>
          <Logo theme="dark" aria-hidden="true" role="img" />
        </a>
      </Link>
      <nav
        aria-label="Main Navigation"
        className={styles['nav']}
        role="navigation"
      >
        {/* menu button should be placed within <nav>, so it's still reachable by landmark navigation. */}
        <button
          aria-label="Menu"
          className={styles['nav__button']}
          onClick={toggle}
          aria-expanded={isMenuOpen}
          aria-controls="menu-list"
        >
          <img src="/menu.svg" alt="Menu" aria-hidden="true"></img>
        </button>
        <ul
          id="menu-list"
          className={`${styles['nav__list']} ${
            isMenuOpen ? styles['nav__list--active'] : ''
          }`}
        >
          <li className={styles['nav__list-item']}>Features</li>
          <li className={styles['nav__list-item']}>Pricing</li>
          <li className={styles['nav__list-item']}>Resources</li>
          <li className={styles['nav__list-item']}>Login</li>
          <li className={styles['nav__list-item']}>Sign Up</li>
        </ul>
      </nav>
    </header>
  )
}
