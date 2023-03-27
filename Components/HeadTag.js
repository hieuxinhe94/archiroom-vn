import React from 'react'
import Head from 'next/head'
import { pageInfo } from '../Constants/userinfo'

const HeadTag = ({page}) => {
    return (
        <Head>
            <title>{`${pageInfo.logoText} | ${page}`}</title>
            <link rel="icon" href="/favicon.svg" />
            <meta name="title" content={pageInfo.logoText} />
            <meta name="description" content={pageInfo.description} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={pageInfo.logoText} />
            <meta property="og:description" content={pageInfo.description} />
            <meta property="og:image" content="" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={pageInfo.logoText} />
            <meta property="twitter:description" content={pageInfo.description} />
            <meta property="twitter:image" content="" />
        </Head>
    )
}

export default HeadTag
