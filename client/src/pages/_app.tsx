import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider {...pageProps}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            primaryColor: 'indigo',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ClerkProvider>
    </QueryClientProvider>
  )
}
