import "@styles/globals.scss";
import Head from 'next/head';
export default function App({ Component, pageProps }) {
    return (
    <>
      <Head>
        <script async src="https://tally.so/widgets/embed.js"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7E46RP1M4D"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'G-7E46RP1M4D');
        </script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
