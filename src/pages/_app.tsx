import type { AppProps } from 'next/app'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Layout } from '@/styles/Layout'
import { GlobalStyles } from '@mui/material'
import { Head } from 'next/document'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
