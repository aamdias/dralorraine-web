import "@styles/globals.scss";
import Head from 'next/head';
export default function App({ Component, pageProps }) {
    return (
    <>
      <Head>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
