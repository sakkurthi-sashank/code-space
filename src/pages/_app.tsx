import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          primaryColor: 'indigo',
          fontFamily: inter.style.fontFamily,
        }}
      >
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  )
}
