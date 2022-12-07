import '../styles/globals.css'
import Head from 'next/head'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name='viewport' content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>Root</title>
      <meta name='description' content='Root is a complete media planning and buying service for nonprofits—the only one in the UK.'/>
    </Head>
    <Component {...pageProps} />
    <Footer/>
    </>
  )
}

export default MyApp
