import "@styles/globals.scss";
import Head from 'next/head';

import { GoogleAnalytics } from '@next/third-parties/google';

export default function App({ Component, pageProps }) {
    return (
    <>
      <Head>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </Head>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-7E46RP1M4D"/>
    </>
  )
}
