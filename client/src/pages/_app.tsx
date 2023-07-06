import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'

const inter = Inter({
  subsets: ['latin'],
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          primaryColor: 'dark',
          fontFamily: inter.style.fontFamily,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  )
}
