import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  )
}
