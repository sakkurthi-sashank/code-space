import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ClerkProvider {...pageProps}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            primaryColor: 'indigo',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
