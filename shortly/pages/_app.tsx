import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import 'styles/global.css'
import PageHeader from 'components/PageHeader'
import Footer from 'components/Footer'

function AppShell({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Shortly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}

export default AppShell
