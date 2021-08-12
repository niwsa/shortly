import Link from 'next/link'
import Logo from 'components/Logo'

export default function PageHeader(): JSX.Element {
  return (
    <header>
      <nav aria-label="Main Navigation">
        <Link href="/">
          <a>
            <Logo theme="dark" aria-hidden="true" />
          </a>
        </Link>
        <ul>
          <li>Features</li>
          <li>Pricing</li>
          <li>Resources</li>
        </ul>
      </nav>
    </header>
  )
}
