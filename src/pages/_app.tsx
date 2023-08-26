import { RouterTransition } from '@/components/common/RouterTransition'
import '@/styles/globals.css'
import { InputStylesParams, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
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

// .shadow-sm {
//   --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
//   --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
//   box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
// }

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())
  const router = useRouter()

  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      router.push('/auth/signin')
    }
  })

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

            components: {
              Input: {
                styles: (theme, params: InputStylesParams, { variant }) => ({
                  input: {
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                  },
                }),
              },
            },
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
