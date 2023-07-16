import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (router.asPath.includes('access_token')) {
    router.replace(router.pathname)
  }

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
        <title>Code Sapce</title>
      </Head>
      <Notifications position="top-right" limit={3} />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
