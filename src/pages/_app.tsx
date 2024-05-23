import '~/styles/global.css'
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import '../components/swiperCustomStyle.css';


import { NextUIProvider } from "@nextui-org/react";
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Be_Vietnam_Pro, Inter, PT_Serif } from 'next/font/google'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import { lazy } from 'react'

import AnnouncementBar from '~/components/announcementBar';

import Layout from './Layout';

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const mono = Be_Vietnam_Pro({
  variable: '--font-family-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const sans = Inter({
  variable: '--font-family-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

const serif = PT_Serif({
  variable: '--font-family-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {


  const { draftMode, token } = pageProps

  return (
    <div className={mono.className}>
      <SessionProvider session={session}>
        <Head>
          <meta name="description" content="TryOnHub - Where you shine with us."></meta>
          <link rel="canonical" href="https://www.tryonhub.ai" />
        </Head>
        {draftMode ? (

          <PreviewProvider token={token}>
            <Layout>

              <NextUIProvider>

                <Component {...pageProps} />

              </NextUIProvider>

            </Layout>
          </PreviewProvider>

        ) : (
          <Component {...pageProps} />
        )}
        <Analytics />
      </SessionProvider>
    </div>
  )
}
