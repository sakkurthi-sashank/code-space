import { RouterTransition } from '@/components/common/RouterTransition'
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            primaryColor: 'indigo',
            fontFamily: inter.style.fontFamily,
          }}
        >
          <Notifications position="top-right" limit={3} />
          <RouterTransition />
          <ModalsProvider>
            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  )
}
