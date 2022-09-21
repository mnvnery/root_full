import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <div className='bg-purple'><Component {...pageProps} /></div>
}

export default MyApp
