import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000
    }
  }
})
