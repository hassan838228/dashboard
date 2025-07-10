import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Advanced Discord Bot with Dashboard and Multi-Language Support" />
        <meta name="keywords" content="discord, bot, moderation, dashboard, anti-raid" />
        <meta name="author" content="Discord Bot Platform" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Discord Bot Platform" />
        <meta property="og:description" content="Advanced Discord Bot with Dashboard and Multi-Language Support" />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Discord Bot Platform" />
        <meta property="twitter:description" content="Advanced Discord Bot with Dashboard and Multi-Language Support" />
        <meta property="twitter:image" content="/og-image.png" />
      </Head>
      <body className="bg-white dark:bg-dark-50 text-gray-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}