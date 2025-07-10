import React, { useEffect } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  // Handle RTL for Arabic
  useEffect(() => {
    const direction = router.locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = direction
    document.documentElement.lang = router.locale || 'en'
  }, [router.locale])

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Component {...pageProps} />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
              success: {
                className: 'toast-success',
              },
              error: {
                className: 'toast-error',
              },
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)