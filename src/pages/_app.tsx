import type { AppProps } from 'next/app'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Layout } from '@/styles/Layout'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  )
}
