import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        primaryColor: 'indigo',
        fontFamily: inter.style.fontFamily,
      }}
    >
      <Head>
        <title>codespace</title>
      </Head>
      <Notifications position="top-right" limit={3} />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
