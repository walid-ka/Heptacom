"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { ReactNode, useState } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {

    const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 0 } } }))
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    )
}

export default Provider
