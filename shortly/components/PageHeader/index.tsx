import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Logo from 'components/Logo'
import styles from './index.module.css'
import useWindowSize from 'hooks/useWindowSize'
import useOnClickOutside from 'hooks/useOnClickOutside'
import useKeypress from 'hooks/useKeyPress'

export default function PageHeader(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function openMenu() {
    setIsMenuOpen(true)
  }

  const menuRef = useRef<HTMLUListElement>(null)
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])
  // catch outside click only when menu is open
  useOnClickOutside(menuRef, closeMenu, isMenuOpen)
  useKeypress('Escape', closeMenu, isMenuOpen)

  const [width] = useWindowSize()
  useEffect(() => {
    // If user resizes the browser window (or any event which causes window to resize ),
    // close the menu
    if (width > 700) {
      setIsMenuOpen(false)
    }
  }, [width])

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
        {/* menu button should be placed within <nav>, 
        so it's still reachable by landmark navigation. 
        👉 https://www.a11ymatters.com/pattern/mobile-nav/
        */}
        <button
          aria-label="Menu"
          className={styles['nav__button']}
          onClick={openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="menu-list"
        >
          <img src="/menu.svg" alt="Menu" aria-hidden="true"></img>
        </button>
        <ul
          id="menu-list"
          ref={menuRef}
          className={`${styles['nav__list']} ${
            isMenuOpen ? styles['nav__list--active'] : ''
          }`}
        >
          <li className={styles['nav__list-item']}>Features</li>
          <li className={styles['nav__list-item']}>Pricing</li>
          <li className={styles['nav__list-item']}>Resources</li>
          <li
            className={`${styles['nav__list-item']} ${styles['nav__list-item--spacer']}`}
          ></li>
          <li className={styles['nav__list-item']}>Login</li>
          <li className={styles['nav__list-item']}>
            <button type="button" className={`ctoa ${styles['nav__signup']}`}>
              Sign Up
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
