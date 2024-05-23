import { Head, Html, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <link href="/tryonhub.min.css" rel="stylesheet"/>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}
